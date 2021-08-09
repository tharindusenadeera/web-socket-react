import WebSocketConnection from './WebSocketConnection';
import utils from '../../util/utils/utils';
// import reduxStore from '../../../../utils/reduxStore';
// import {saveConnectionSettings} from "../../../../ua-price/actions";
import TinyQueue from 'tinyqueue';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (requestHandler, PriceSocketResponseHandler, service, subscriptionManager) {
    this.requestHandler = requestHandler; // Singleton request generator object
    this.responseHandler = PriceSocketResponseHandler; // Class blue-print
    this.subscriptionManager = subscriptionManager;
    this.connectionSettings = {};
    this.socketMap = {};
    this.socketStatusMap = {};
    this.responseHandlerMap = {};
    this.service = service;

    this.maxRetryInterval = 30000;
    this.authRetryInterval = 5000; // Retrying in this interval if authentication fails due to connectivity error
    this.maxAuthRetryCount = 3; // Maximum no of attempts taken to retry authentication if fails due to connectivity error
    this.authParms = undefined; // Authentication params received, this object is used when retrying at authentication failure due to connectivity error

    this.pendingQueue = new TinyQueue();

    this.retryIntervals = [
        {limit: 6, interval: 5000},
        {limit: 12, interval: 10000},
        {limit: 16, interval: 15000}
    ];

    let that = this;

    let sendAuth = function (authRequest, connectionType, authParams, isSecAuth) {
        that.authParms = authParams;

        _sendAuthRequest(authRequest, connectionType, that.responseHandler, {
            callbacks: {
                auth: {
                    successFn: authParams.authSuccess,
                    errorFn: authParams.authFailed,
                    postSuccessFn: function () {
                        if (authParams.resendSubscriptions) {
                            _resendCurrentSubscriptions(connectionType);
                        }
                    }
                }
            }
        }, false, isSecAuth);
    };

    let sendData = function (dataRequest, connectionType) {
        Object.keys(dataRequest).forEach(function(key) {
            getSocketConnection(connectionType).sendData(dataRequest[key]);
        });
    };

    let sendPreAuthData = function (dataRequest, connectionType) {
        let socketConnection = getSocketConnection(connectionType);

        if (!that.responseHandlerMap[connectionType]) {
            socketConnection.initialize(that.responseHandler);
            that.responseHandlerMap[connectionType] = true;
        }
        Object.keys(dataRequest).forEach(function(key) {
            socketConnection.sendPreAuthData(dataRequest[key]);
        });
    };

    let isConnected = function (connectionType) {
        return that.socketMap[connectionType] && that.socketMap[connectionType].isConnected();
    };

    let setConnectionSettings = function (connectionSettings) {
        that.connectionSettings = Object.assign({}, that.connectionSettings, connectionSettings);
        // reduxStore.store.dispatch(saveConnectionSettings(that.connectionSettings));

    };

    let _sendReconnectAuth = function (authRequest, connectionType, authSuccess, isSecAuth) {
        _sendAuthRequest(authRequest, connectionType, undefined, authSuccess, true, isSecAuth);
    };

    let _sendAuthRequest = function (authRequest, connectionType, respHandler, callbacks, isReconnection, isSecAuth) {
        let socketConnection = getSocketConnection(connectionType);

        socketConnection.initialize(respHandler, callbacks, isReconnection);
        socketConnection.sendAuth(authRequest);

        that.responseHandlerMap[connectionType] = true;
        that.socketStatusMap[connectionType].isSecAuth = isSecAuth;
    };

    let _onSocketConnect = function (socketConnection) {
        // Notify socket connection
        that.socketStatusMap[socketConnection.socketParams.type].retryCount = 0;
        that.socketStatusMap[socketConnection.socketParams.type].authRetryCount = 0;

        that.service.setConnectionStatus(true);
    };

    let _onSocketDisconnect = function (socketConnection, retry) {
        // Notify socket disconnection
        let socketType = socketConnection.socketParams.type;
        let isAuthenticated = that.service.isAuthenticated();

        that.service.setConnectionStatus(false);

        let retryCount = that.socketStatusMap[socketType].retryCount;
        that.socketStatusMap[socketType].retryCount = retryCount || 0;

        let authRetryCount = that.socketStatusMap[socketType].authRetryCount;
        that.socketStatusMap[socketType].authRetryCount = authRetryCount || 0;

        if (retry) {
            if (isAuthenticated) {
                _retryEstablishedConnection(socketConnection, isAuthenticated, socketType);
            } else if (that.socketStatusMap[socketType].isSecAuth) {
                _retryAuthFailure(socketConnection, isAuthenticated, socketType);
            }
        }
    };

    let _retryEstablishedConnection = function (socketConnection, isAuthenticated, socketType) {
        setTimeout(function () {
            // Checking whether already connected to fix sending reconnection request again
            if (!socketConnection.isConnectedToServer) {
                let authReq = that.requestHandler.generateReconnectionAuthRequest();

                if (isAuthenticated && authReq) {
                    utils.logger.logInfo('Reconnecting to ### ' + socketConnection.connectionPath);

                    _sendReconnectAuth(authReq, socketType, function () {
                        _resendCurrentSubscriptions(socketType);
                    }, that.socketStatusMap[socketType].isSecAuth);
                }

                that.socketStatusMap[socketType].retryCount++;
            }
        }, _getRetryInterval(that.socketStatusMap[socketType].retryCount));
    };

    let _retryAuthFailure = function (socketConnection, isAuthenticated, socketType) {
        setTimeout(function () {
            // Checking whether already connected to fix sending retrying request again
            if (!socketConnection.isConnectedToServer) {
                let authReq = that.requestHandler.generateSsoAuthRequest(that.authParms);

                if (!isAuthenticated && authReq && that.socketStatusMap[socketType].authRetryCount < that.maxAuthRetryCount) {
                    utils.logger.logInfo('Retrying authentication to ### ' + socketConnection.connectionPath);

                    _sendReconnectAuth(authReq, socketType, function () {
                        // _resendCurrentSubscriptions(socketType);
                    }, that.socketStatusMap[socketType].isSecAuth);
                }

                that.socketStatusMap[socketType].authRetryCount++;
            }
        }, that.authRetryInterval);
    };

    let _resendCurrentSubscriptions = function (connectionType) {
        let currentSubs = that.subscriptionManager.getCurrentSubscriptions();
        sendData(currentSubs, connectionType);
    };

    let getSocketConnection = function (connectionType) {
        let connectionSettingFromRedux = "";
        if (!that.socketMap[connectionType]) {
            let socketParams = {
                ip: that.connectionSettings.ip ? that.connectionSettings.ip : connectionSettingFromRedux.ip,
                port: that.connectionSettings.port ? that.connectionSettings.port : connectionSettingFromRedux.port ,
                secure: that.connectionSettings.secure ? that.connectionSettings.secure : connectionSettingFromRedux.secure,
                type: connectionType,
                onConnect: _onSocketConnect,
                onDisconnect: _onSocketDisconnect,
                enablePulse: that.connectionSettings.enablePulse ? that.connectionSettings.enablePulse : connectionSettingFromRedux.enablePulse,
                requestHandler: that.requestHandler ? that.requestHandler : connectionSettingFromRedux.requestHandler,
                isLogEnabled: that.connectionSettings.isLogEnabled ? that.connectionSettings.isLogEnabled : connectionSettingFromRedux.isLogEnabled,
                isAttemptRetry: that.connectionSettings.isAttemptRetry ? that.connectionSettings.isAttemptRetry : connectionSettingFromRedux.isAttemptRetry
            };


            that.socketMap[connectionType] = new WebSocketConnection(socketParams);
            that.socketStatusMap[connectionType] = {};
        }

        return that.socketMap[connectionType];
    };

    let _getRetryInterval = function (retryCount) {
        let retryInterval = that.maxRetryInterval;
        let intervalObject = that.retryIntervals;

        Object.keys(intervalObject).forEach(function(key) {
            if (retryCount <= intervalObject[key].limit) {
                retryInterval = intervalObject[key].interval;

                return false;
            }
        });


        return retryInterval;
    };

    let closeConnection = function (connectionType) {
        getSocketConnection(connectionType).closeConnection();
    };

    let clearConnection = function (connectionType) {
        let dataQueue = getSocketConnection(connectionType).getDataQueue();
        let queueLength = dataQueue.getLength();

        for (let i = 0; i < queueLength; i++) {
            that.pendingQueue.enqueue(dataQueue.dequeue());
        }

        closeConnection(connectionType);
        that.socketMap[connectionType] = '';
    };

    let setPendingData = function (connectionType) {
        let socket = getSocketConnection(connectionType);
        let queueLength = that.pendingQueue.getLength();

        for (let i = 0; i < queueLength; i++) {
            socket.sendData(that.pendingQueue.dequeue());
        }
    };

    return {
        sendAuth: sendAuth,
        sendData: sendData,
        sendPreAuthData: sendPreAuthData,
        isConnected: isConnected,
        setConnectionSettings: setConnectionSettings,
        closeConnection: closeConnection,
        clearConnection: clearConnection,
        getSocketConnection: getSocketConnection,
        setPendingData: setPendingData
    };
}