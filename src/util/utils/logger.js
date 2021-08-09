/* global LOGGERHELPER */
import appConfig from '../../protocols/config/AppConfig';
import webConnection from '../../protocols/CommunicationAdapter/WebHttpConnection';
import { getService } from '../../protocols/Shared/SharedServices';
// import environmentConfig from '../config/environment';
import utils from '../utils/utils';

// TODO: [Amila] Implement the logs server uploading part. This can be integrated with SMM.
// TODO: [Amila] Discuss with the team and decide up to which level we are going to upload logs to the server.
// TODO: [Amila] My personal view is to provide the facility to ERROR level logs only

export default (function () {
    let logBuffer = [];
    let tempBuffer = [];
    let isImmediateLog = false;

    // Constants
    let logLevel = {
        disableLogs: 0,
        logError: 1,
        logWarning: 2,
        logInfo: 3,
        logDebug: 4
    };

    let logPrefix = {
        error: 'ERROR: ',
        warn: 'WARN: ',
        info: 'INFO: ',
        debug: 'DEBUG: '
    };

    let loggerUrl = '/logger';
    let isRequestInProgress = false;
    let lastSentIndex = 0;
    let isPeriodicUpdateStarted = false;
    let serverLogLevel = 0;
    let isServerLogLevelAvailable = false;
    let isLoggerHelperInitilaized = false;

    let _browser = {};

    (function () {
        setTimeout(function () {
            try {
                if (!isServerLogLevelAvailable) {
                    serverLogLevel = appConfig.loggerConfig.serverLogLevel;
                    isServerLogLevelAvailable = true;
                    _flushTempBufferToServer();
                }
            } catch (e) {
                window.console.error(['Logger error: ', e].join(''));
            }
        }, 10000); // Set the serverLogLevel from appConfig when file read is taking more time
    })();

    (function () {
        try {
            window.addEventListener('onServerLogConfigFileRead', function () {
                try {
                    serverLogLevel = LOGGERHELPER.LoggerServiceConfig.configValue;
                    isServerLogLevelAvailable = true;
                    _flushTempBufferToServer();
                } catch (e) {
                    window.console.error(['Logger error: ', e].join(''));
                }
            }, false);
        } catch (e) {
            window.console.error(['Logger error: ', e].join(''));
        }
    })(); // This will fire when the async JSON read is success

    let logError = function (logEntry, obj) {
        _amendLog(logEntry, logLevel.logError, obj);
    };

    let logWarning = function (logEntry, obj) {
        _amendLog(logEntry, logLevel.logWarning, obj);
    };

    let logInfo = function (logEntry, obj) {
        _amendLog(logEntry, logLevel.logInfo, obj);
    };

    let logDebug = function (logEntry, obj) {
        _amendLog(logEntry, logLevel.logDebug, obj);
    };

    let logTrace = function (message, obj) {
        if (appConfig.loggerConfig.isAppLogEnabled) {
            let stackTraceStore = window.appGlobal.logger.stackTrace;

            window.logger = {stackTrace: stackTraceStore.push(new Date() + ' - ' + message)};
        }

        logInfo(message, obj);
    };

    let _amendLog = function (logEntry, logType, obj) {
        try {
            if (isServerLogLevelAvailable) {
                if (serverLogLevel >= logType) {
                    _amendLogToBuffer(logEntry, logType, obj);
                }
            } else {
                if (typeof LOGGERHELPER !== 'undefined') {
                    if(!isLoggerHelperInitilaized) {
                        LOGGERHELPER.LoggerServiceConfig();
                    }

                    isLoggerHelperInitilaized = true;
                }

                if (appConfig.loggerConfig.serverLogLevel >= logType) {
                    let tempArrayEntry = {
                        'logEntry': logEntry,
                        'logType': logType,
                        'obj': obj
                    };

                    tempBuffer.push(tempArrayEntry);
                }
            }

            if (appConfig.loggerConfig.consoleLogLevel >= logType) {
                _amendLogConsole(logEntry, logType);
            }
        } catch (e) {
            window.console.error(['Logger error: ', e].join(''));
        }
    };

    let _amendLogConsole = function (logEntry, logType) {
        switch (logType) {
            case logLevel.logError:
                window.console.error([logPrefix.error, logEntry].join(''));
                break;

            case logLevel.logWarning:
                window.console.warn([logPrefix.warn, logEntry].join(''));
                break;

            case logLevel.logInfo:
                window.console.info([logPrefix.info, logEntry].join(''));
                break;

            case logLevel.logDebug:
                window.console.log([logPrefix.debug, logEntry].join(''));
                break;

            default:
                window.console.log(logEntry);
                break;
        }
    };

    let _flushTempBufferToServer = function () {
        tempBuffer.forEach(function (item) {
            if (serverLogLevel >= item.logType) {
                _amendLogToBuffer(item.logEntry, item.logType, item.obj);
            }
        });

        tempBuffer = [];
    };

    let _amendLogToBuffer = function (logEntry, logType, obj) {
        if (!isPeriodicUpdateStarted) {
            _browser = utils.browser.getBrowserInfo();

            setTimeout(function () {
                _periodicServerUpdate();
            }, appConfig.loggerConfig.logUpdateTimeout);

            isPeriodicUpdateStarted = true;
        }

        let messageType = '';
        let hasValidLogType = true;

        switch (logType) {
            case logLevel.logError:
                messageType = logPrefix.error;
                break;

            case logLevel.logWarning:
                messageType = logPrefix.warn;
                break;

            case logLevel.logInfo:
                messageType = logPrefix.info;
                break;

            case logLevel.logDebug:
                messageType = logPrefix.debug;
                break;

            default:
                hasValidLogType = false;

                window.console.log(logEntry);
                break;
        }

        if (hasValidLogType) {
            let response = '';

            if (obj) {
                if (obj.resp) {
                    response = utils.crypto.encryptText(obj.resp, utils.Constants.Encryption.loggerKey, utils.Constants.Encryption.loggerIv);
                }

                if (obj.isPriorityLog) {
                    isImmediateLog = true;
                }
            }

            let serverLogEntry = {
                'message': logEntry,
                'response': response,
                'message_type': messageType,
                'env': appConfig.customisation.clientPrefix,
                'timeStamp': utils.moment(new Date()).format('YYYY/MM/DD HH:mm:ss')
            };

            logBuffer.push(serverLogEntry);
        }

        if (((logBuffer.length > appConfig.loggerConfig.logBufferSize) || isImmediateLog) && !isRequestInProgress) {
                _sendLogsToServer();
                isImmediateLog = false;
        }
    };

    let _sendLogsToServer = function () {
        isRequestInProgress = true;
        lastSentIndex = logBuffer.length;

        let userName = '';
        // let appVersion = environmentConfig.APP.version;
        let logTime = utils.moment(new Date()).format('YYYYMMDDHHmmss');
        let stringJSON = utils.jsonHelper.convertToJson(logBuffer);
        let compressedResponse = utils.compressionHelper.getCompressedString(JSON.stringify(stringJSON).trim());

        // Change the code as below to obtain encryption and priority functionalities
        // utils.logger.logInfo('Trade auth response : ', {'resp': tradeAuthResponse, 'isPriorityLog': true});

        if (appConfig.customisation.isTradingEnabled) {
            userName = getService('trade').userDS.mubNo;
        } else {
            userName = getService('price').userDS.username;
        }
        let data = '';
        //let data = utils.jsonHelper.convertToJson({logTime: logTime, appVersion: appVersion, userName: userName, browser: _browser.name, browserVersion: _browser.version, messages: compressedResponse});

        _sendLogRequest(loggerUrl, 'POST', 'application/json', data, _onSuccess(), _onError());
    };

    let _onSuccess = function () {
        logBuffer = logBuffer.slice(lastSentIndex);
        isRequestInProgress = false;
    };

    let _onError = function () {
        if (logBuffer.length > appConfig.loggerConfig.maxLogBufferSize) {
            logBuffer = [];
        }

        // If a network error is occurred, application will report many error logs and it will trigger the logger to
        // send another request to server immediately. So here a delay is added. So the requests will have a time between them.

        setTimeout(function () {
            isRequestInProgress = false;
        },10000)
    };

    let _sendLogRequest = function (url, type, contentType, data, onSuccess, onError) {
        webConnection.sendAjaxRequest({
            url: url,
            type: type,
            contentType: contentType,
            data: data,
            onSuccess: onSuccess,
            onError: onError
        });
    };

    let _periodicServerUpdate = function () {
        if (!isRequestInProgress && logBuffer.length > 0) {
            _sendLogsToServer();
        }

        setTimeout(function () {
            _periodicServerUpdate();
        }, appConfig.loggerConfig.logUpdateTimeout);
    };

    return {
        logError: logError,
        logWarning: logWarning,
        logInfo: logInfo,
        logDebug: logDebug,
        logTrace: logTrace
    };
})();