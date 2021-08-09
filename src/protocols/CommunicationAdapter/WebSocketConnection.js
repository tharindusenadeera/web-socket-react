import PriceConstants from '../../constants/Price/PriceConstants';
import utils from '../../util/utils/utils';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (socketParams) {
    this.socketParams = socketParams;
    this.responseHandler = undefined; // Local instance created for this web socket connection
    this.webSocket = undefined;
    this.connectionPath = '';

    this.preAuthQueue = new window.Queue();
    this.authQueue = new window.Queue();
    this.dataQueue = new window.Queue();

    this.isConnectedToServer = false;
    this.isAuthenticated = false;
    this.isAttemptRetry = socketParams.isAttemptRetry;
    this.missedHeartbeats = 1;

    let that = this;

    let initialize = function (PriceSocketResponseHandler, callbacks, isReconnection) {
        if (PriceSocketResponseHandler) {
            that.responseHandler = new PriceSocketResponseHandler(callbacks); // Local instance created for this web socket connection
        } else {

            that.responseHandler.callbacks.callbacks.auth.successFn = callbacks;
            that.responseHandler.callbacks.callbacks.auth.isReconnection = isReconnection;
            that.responseHandler.callbacks.callbacks.auth.postSuccessFn = undefined;
        }
    };

    let sendAuth = function (authRequest) {
        if (that.authQueue.getLength() === 0) {
            that.authQueue.enqueue(authRequest);
            utils.logger.logInfo('Authenticating user - request queued to send');
        }

        if (!that.webSocket) {
            utils.logger.logInfo('Opening web socket to send request');
            _openConnection();
        } else {
            utils.logger.logInfo('Web socket connection already established');
        }
    };

    let sendData = function (dataRequest) {

        if (!(dataRequest === null || dataRequest.length === 0)) {
            that.dataQueue.enqueue(dataRequest);
        }
    };

    let sendPreAuthData = function (dataRequest) {
        if (!(dataRequest === null || dataRequest.length === 0)) {
            that.preAuthQueue.enqueue(dataRequest);
        }

        if (!that.webSocket) {
            _openConnection();
        }
    };

    let isConnected = function () {
        return that.isAuthenticated;
    };

    let _openConnection = function () {
        if ('WebSocket' in window) {
            utils.logger.logInfo('WebSocket is supported by the browser!');

            let path = [that.socketParams.secure ? 'wss://' : 'ws://', that.socketParams.ip,
                that.socketParams.port ? ':' : '', that.socketParams.port].join('');

            try {
                // Open a web socket
                utils.logger.logInfo('Connecting to path : ' + path);
                that.connectionPath = path;

                that.webSocket = new WebSocket(path);

                that.webSocket.onopen = _onOpen;
                that.webSocket.onmessage = _onMessage;
                that.webSocket.onclose = _onClose;
                that.webSocket.onerror = _onError;

                utils.logger.logInfo('Web socket connection initiated to ### ' + that.connectionPath);
            } catch (ex) {
                utils.logger.logInfo('Web socket initialization error and retrying  ### ' + that.connectionPath + ' ### ' + ex.message);
                _closeConnection(true);

                utils.logger.logError('Connection failure to path : ' + path);
            }
        } else {
            utils.logger.logInfo('WebSocket is not supported by the Browser!');
        }
    };

    let _closeConnection = function (retry) {
        that.isAttemptRetry = that.isAttemptRetry && retry;
        that.isConnectedToServer = false;
        that.isAuthenticated = false;

        if (that.webSocket) {
            that.webSocket.onclose = function () {}; // Disable onclose handler first
            that.webSocket.close();
            that.webSocket = undefined;
        }

        _flushOutQueues();

        let isRetrying = that.isAttemptRetry ? 'retrying...' : 'not retrying';
        utils.logger.logInfo('Web socket closed and ' + isRetrying + ' ### ' + that.connectionPath);

        that.socketParams.onDisconnect(that, that.isAttemptRetry);
    };

    let _onOpen = function () {
        that.isConnectedToServer = true;
        utils.logger.logInfo('_onOpen() : Web socket opened to ### ' + that.connectionPath);

        _sendQueuedData();

        if (that.socketParams.enablePulse) {
            utils.logger.logInfo('Socket Pulse start');
            setTimeout(_sendPulse, PriceConstants.Pulse.PulseInterval);
        }
    };

    let _onClose = function (event) {
        // Adding a delay to allow already received frames to be processed and take necessary actions
        // This fix was added specifically to fix the issue of closing the socket connection before we process logout response in trade
        setTimeout(function () {
            let errorMsg = _getErrorMessage(event);
            utils.logger.logError('_onClose() : Web socket closed due to ### ' + errorMsg + ' ### ' + that.connectionPath);

            _closeConnection(true);
        }, 250);
    };

    let _onError = function () {
        utils.logger.logError('_onError() : Web socket error ### ' + that.connectionPath);
    };

    let _onMessage = function (event) {
        that.missedHeartbeats = 0;
        that.responseHandler.onMessage(event.data, _onSocketReady);
    };

    let _sendQueuedData = function () {
        // Commented out below line assuming web socket is ready to transfer data to server after 'open' event
        // if (that.webSocket && that.webSocket.readyState === 1) {
        try {
            if (that.isConnectedToServer) {
                _sendMessage(that.preAuthQueue);
                _sendMessage(that.authQueue, true);

                if (that.isAuthenticated) {


                    _sendMessage(that.dataQueue, that.socketParams.isLogEnabled);
                    // _sendMessage(that.dataQueue, true);
                }
            } else {
                utils.logger.logInfo('Not sending queued data since not connecting to server ### ' + that.connectionPath);
            }
        } catch (e) {
            utils.logger.logError('Error in sending data to server ### ' + that.connectionPath + ' - ' + e.message);
        }
        // }

        if (that.isConnectedToServer) {
            setTimeout(_sendQueuedData, PriceConstants.TimeIntervals.WebSocketOutQueueProcessingInterval);
        }
    };

    let _sendMessage = function (messageQueue, isLog) {

        while (messageQueue.getLength() > 0) {
            let message = messageQueue.dequeue();
            that.webSocket.send(message);

            utils.logger.logDebug('Message sent to server : ' + message);

            if (isLog) {
                utils.logger.logInfo('Message sent to server : ' + message);
            }
        }
    };

    let _getErrorMessage = function (event) {
        let reason;
        // See http://tools.ietf.org/html/rfc6455#section-7.4.1

        switch (event.code) {
            case 1000:
                reason = 'Normal closure, meaning that the purpose for which the connection was established has been fulfilled.';
                break;

            case 1001:
                reason = 'An endpoint is \\"going away\\", such as a server going down or a browser having navigated away from a page.';
                break;

            case 1002:
                reason = 'An endpoint is terminating the connection due to a protocol error';
                break;

            case 1003:
                reason = 'An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).';
                break;

            case 1004:
                reason = 'Reserved. The specific meaning might be defined in the future.';
                break;

            case 1005:
                reason = 'No status code was actually present.';
                break;

            case 1006:
                reason = 'The connection was closed abnormally, e.g., without sending or receiving a Close control frame';
                break;

            case 1007:
                reason = 'An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629] data within a text message).';
                break;

            case 1008:
                reason = 'An endpoint is terminating the connection because it has received a message that \\"violates its policy\\". This reason is given either if there is no other suitable reason, or if there is a need to hide specific details about the policy.';
                break;

            case 1009:
                reason = 'An endpoint is terminating the connection because it has received a message that is too big for it to process.';
                break;

            case 1010: // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
                reason = 'An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn\'t return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: ' + event.reason;
                break;

            case 1011:
                reason = 'A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.';
                break;

            case 1015:
                reason = 'The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can\'t be verified).';
                break;

            default:
                reason = 'Unknown reason';
                break;
        }

        return reason;
    };

    let _flushOutQueues = function () {
        // Flush the out queues
        // TODO: [Bashitha] Implement the flush feature in the Queue library
        while (that.dataQueue.getLength() > 0) {
            that.dataQueue.dequeue();
        }

        while (that.authQueue.getLength() > 0) {
            that.authQueue.dequeue();
        }
    };

    let _onSocketReady = function (authenticated) {
        that.isAuthenticated = authenticated;

        if (that.isAuthenticated) {
            that.socketParams.onConnect(that);
            that.isAttemptRetry = socketParams.isAttemptRetry;

            // if (that.socketParams.enablePulse) {
            //     utils.logger.logInfo('Socket Pulse start');
            //     setTimeout(_sendPulse, PriceConstants.Pulse.PulseInterval);
            // }
        } else {
            utils.logger.logInfo('Closing web socket connection due to authentication failure at socket readiness. ### ' + that.connectionPath);
            _closeConnection(false);
        }
    };

    let _sendPulse = function () {
        if (that.isConnectedToServer) {
            sendPreAuthData(that.socketParams.requestHandler.generatePulseMessage(that.missedHeartbeats));

            that.missedHeartbeats++;

            if (that.missedHeartbeats > PriceConstants.Pulse.MissedPulseCount) {
                utils.logger.logInfo('### Missed ' + that.missedHeartbeats + ' pulses. Disconnecting from ' + that.connectionPath);
                _closeConnection(true);
            } else {
                setTimeout(_sendPulse, PriceConstants.Pulse.PulseInterval);
            }
        }
    };

    let closeConnection = function () {
        utils.logger.logInfo('Closing web socket connection due to authentication timed out. ### ' + that.connectionPath);
        _closeConnection(false);
    };

    let getConnectionPath = function () {
        return that.connectionPath;
    };

    let getDataQueue = function () {
        return that.dataQueue;
    };

    return {
        initialize: initialize,
        sendAuth: sendAuth,
        sendData: sendData,
        sendPreAuthData: sendPreAuthData,
        isConnected: isConnected,
        closeConnection: closeConnection,
        getConnectionPath: getConnectionPath,
        getDataQueue: getDataQueue
    };
}