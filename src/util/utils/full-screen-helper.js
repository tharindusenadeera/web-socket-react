import utils from '../utils/utils';

export default (function () {
    let requestFullScreen = function (element) {
        // Supports most browsers and their versions.
        let requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen ||
            element.msRequestFullscreen;

        if (requestMethod) { // Native full screen.
            requestMethod.call(element);
        } else { // Older IE.
            try {
                // Ignore from JSHint and ESLint, this is only available in IE and this is how it should be invoked
                /*eslint-disable */
                let wScript = new ActiveXObject('WScript.Shell'); // jshint ignore:line
                /*eslint-enable */

                wScript.SendKeys('{F11}');
            } catch (e) {
                utils.logger.logError('Full screen mode not supported by the browser');

                showMessage();
            }
        }
    };

    let cancelFullScreen = function (element) {
        let requestMethod = element.cancelFullScreen || element.webkitCancelFullScreen || element.mozCancelFullScreen ||
            element.exitFullscreen || element.webkitExitFullscreen || element.msExitFullscreen;

        if (requestMethod) { // cancel full screen.
            requestMethod.call(element);
        } else { // Older IE.
            try {
                // Ignore from JSHint and ESLint, this is only available in IE and this is how it should be invoked
                /*eslint-disable */
                let wScript = new ActiveXObject('WScript.Shell'); // jshint ignore:line
                /*eslint-enable */

                wScript.SendKeys('{F11}');
            } catch (e) {
                utils.logger.logError('Full screen mode not supported by the browser');

                showMessage();
            }
        }
    };

    let isInFullScreen = function () {
        // Checking whether the application is in fullscreen mode.
        // fullScreenElement is an Element that is in fullscreen if there is an element in fullscreen mode
        // It is undefined if there is no element in fullscreen mode. (standard)
        // mozFullScreen is either true or false depending whether the browser is in fullscreen mode and undefined
        // in browsers other than Firefox.
        // webkitIsFullScreen has the same behaviour as mozFullScreen for Chrome
        // msFullscreenElement is undefined in browsers other than IE
        // msFullscreenElement is null in IE when not in fullscreen mode
        // msFullscreenElement is an element (which is in fullscreen) when there is an element in fullscreen.
        let isFullScreen = document.fullScreenElement || document.mozFullScreen || document.webkitIsFullScreen ||
            document.msFullscreenElement;

        return isFullScreen;
    };

    let showMessage = function () {
        // TODO: [Sahan] Find a way to pass the message in current language
        utils.messageService.showMessage('Full screen mode not supported by the browser. Please press F11.', utils.Constants.MessageTypes.Warning, false, 'Warning', [{
            type: utils.Constants.MessageBoxButtons.Ok
        }]);
    };

    return {
        requestFullScreen: requestFullScreen,
        cancelFullScreen: cancelFullScreen,
        isInFullScreen: isInFullScreen
    };
})();