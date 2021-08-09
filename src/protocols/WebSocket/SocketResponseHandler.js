import PriceConstants from '../../constants/Price/PriceConstants';
import utils from '../../util/utils/utils';

export default class SocketResponseHandler {
    constructor(callbacks) {
        this.callbacks = callbacks;
        this.inputQueue = undefined;
        this.processTimer = undefined;
        this.onSocketReady = undefined;
        this.previousFrame = '';
    }

    /* *
    * Executes immediately a response comes from the server
    * @param response Response message
    * @param onSocketReady Callback function to notify whether communication path established for data transfer
    */
    onMessage (response, onSocketReady) {
        this.inputQueue.push(response);
        this.onSocketReady = onSocketReady; // TODO: [Bashitha] Find a way to pass only once at initialization
    }

    /* *
    * Processes response from the server
    */
    processResponse () {
        while (this.inputQueue.length > 0) {
            let frameBuffer = this.inputQueue.pop();

            utils.logger.logDebug('Received frame : ' + frameBuffer);
            utils.logger.logDebug('Previous frame : ' + this.previousFrame);

            if (this.previousFrame.length > 0) {
                frameBuffer = this.previousFrame + frameBuffer;
                this.previousFrame = '';
            }

            utils.logger.logDebug('Appended frame : ' + frameBuffer);

            // Unexpected constant condition
            /*eslint-disable */
            while (true) {
                /*eslint-enable */
                let index = frameBuffer.indexOf('{');

                // Below is a rare case where the read buffer is terminated from a message length digits
                // Eg: OnMessage frame : 10{xxxxxxxx}5
                // 5 may not be the length of the next frame. If could be 5xx...
                // To handle this we need to skip processing immediately and move to the next OnMessage event to read the
                // rest of the buffer
                if (index === -1) {
                    this.previousFrame = frameBuffer;
                    break;
                }

                let frameLength = parseInt(frameBuffer.substr(0, index), 10);

                // Omit processing the frame if frame length is not retrieved
                // If frame length is not a number returns NaN from parseInt
                // Checking whether it is grater than zero since it is giving better performance than isNaN
                // https://fiber.directfn.net/pages/viewpage.action?pageId=47221265
                if (!(frameLength > 0)) { // frameLength = NaN, therefore cannot check for less than ( <= ), even it is false
                    utils.logger.logDebug('Invalid frame length. Breaking the loop');
                    break;
                }

                // To extract and process a single frame the single frame length must me greater than the total frame length.
                // Here the index is added when checking the lengths because the frame length indicating digits are not
                // considered for actual frame length.
                // Eg 01: 5{123} - In this buffer frame length is 5 but the total buffer length is 6.
                // So if this is applied to below logic the if condition would be
                // if (6 < 5+1) where it is a possible case for processing. So the else part would be executed
                //
                // Eg 01: 5{123 - In this buffer frame length is 5 but the total buffer length is also 5.
                // so the if logic would be if (5 < 5 + 1) where this logic becomes true as we cannot process this frame since
                // the latter '}' is missing. Hence we need to wait till the next OnMessage event and append this part at the
                // beginning of next read buffer.
                if (frameBuffer.length < frameLength + index) {
                    this.previousFrame = frameBuffer;
                    break;
                } else {
                    let singleFrame = frameBuffer.substr(index, frameLength);
                    frameBuffer = frameBuffer.slice(index + frameLength);

                    utils.logger.logDebug('Frame : ' + singleFrame);

                    try {
                        let that = this;
                        let frameMessage = JSON.parse(singleFrame);

                        that._processMessage(frameMessage, this.onSocketReady);
                    } catch (e) {
                        utils.logger.logError('Response processing failed : ' + e);
                    }

                    // If there are no remainder we are done with current read. So exit the loop and prepare for the next
                    // OnMessage event... :)
                    if (frameBuffer.length === 0) {
                        break;
                    }
                }
            }
        }

        let thats = this;

        setTimeout(function () {
            thats.processResponse();
        }, PriceConstants.TimeIntervals.WebSocketInQueueProcessingInterval);
    }
}