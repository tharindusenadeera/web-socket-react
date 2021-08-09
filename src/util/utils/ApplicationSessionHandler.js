import appConfig from '../config/app-config';
import utils from '../utils';
import sharedService from '../models/shared/shared-service';
import appEvents from '../app-events';
import languageDataStore from '../models/shared/language/language-data-store';

export default (function () {
    let OneMinute = 60000; // One minute time interval in milliseconds 60 *1000
    let wkey = 'appSessionHandler';
    let isIdle = false;
    let timer;
    let lastActiveTime;
    let app;


    let initializeApplicationIdleCheck = function () {
        app = languageDataStore.getLanguageObj();

        if (appConfig.customisation.applicationIdleCheckConfig.isEnabledInactiveLogout) {
            bindUserEvents();
            setTimeInterval();
        }
    };

    let onVisibilityChanged = function (isHidden) {
        if (isHidden) {
            lastActiveTime = isIdle ? lastActiveTime : new Date().getTime();
            isIdle = true;
        } else if (appConfig.customisation.applicationIdleCheckConfig.isEnabledInactiveLogout) {
            checkIdle();
        }
    };

    let setTimeInterval = function () {
        timer = window.setInterval(checkIdle, OneMinute);
    };

    let bindUserEvents = function () {
        let that = this;

        if (appConfig.customisation.isMobile || appConfig.customisation.isTablet) {
            if (navigator.isNativeDevice) { // Native mobile register for cordova events
                document.addEventListener('pause', function () {
                    onVisibilityChanged(true);
                }, false);

                document.addEventListener('resume', function () {
                    onVisibilityChanged(false);
                }, false);
            } else { // Mobile version on browser
                appEvents.subscribeVisibilityChanged(that, wkey);
            }
        }

        document.onclick = function () {
            isIdle = false;
        };

        document.onmousemove = function () {
            isIdle = false;
        };

        document.onkeypress = function () {
            isIdle = false;
        };

        document.addEventListener('touchend', function () { // For mobile
            isIdle = false;
        }, false);
    };

    let checkIdle = function () {
        if (!isIdle) {
            lastActiveTime = new Date().getTime();
        }

        if (isIdle && lastActiveTime && new Date().getTime() - lastActiveTime >= appConfig.customisation.applicationIdleCheckConfig.defaultIdleTime * OneMinute) {
            utils.webStorage.addString(utils.webStorage.getKey(utils.Constants.CacheKeys.LoginErrorMsg), app.lang.messages.sessionExpired, utils.Constants.StorageType.Session);
            logout([app.lang.messages.sessionExpired, app.lang.messages.pleaseWait].join(', '));
        }

        isIdle = true;
    };

    let logout = function (message, isServerSessionExpired) {
        app = languageDataStore.getLanguageObj();
        window.clearInterval(timer);

        isIdle = false;
        lastActiveTime = undefined;

        let url = window.location.href;
        let hashIndex = url.indexOf('#');

        if (window.appGlobal.multiScreen) {
            window.multiScreen = {isParentLogoutFired: true};
        }

        if (hashIndex > 0 && hashIndex === url.length - 1) {
            url = url.substring(0, url.length - 1);
        }

        if (window.appGlobal.authType === 2) { // TODO: [Bashitha] Remove hard coded auth type
            if (!window.opener) { // window.opener will be available if the browser window is opened using window.open
                url = url.substring(0, url.indexOf('?'));
                _logoutUser(url, message, isServerSessionExpired);
            } else {
                let closeWindow = function () {
                    _sendLogoutRequest(isServerSessionExpired);
                    window.open('', '_self').close();
                };

                window.setTimeout(function () {
                    closeWindow();
                }, 1000);
            }
        } else {
            _logoutUser(url, message, isServerSessionExpired);
        }

        if (utils.nativeHelper.closeWindows instanceof Function) {
            utils.nativeHelper.closeWindows();
        }
    };

    let _logoutUser = function (locationUrl, message, isServerSessionExpired) {
        // Retail
        // Hide popup when application log outs on reconnection failure
        app = languageDataStore.getLanguageObj();
        let modal = sharedService.getService('sharedUI').getService('modalPopupId');

        if (modal) {
            modal.send('closeModalPopup');
        }

        utils.messageService.hideMessage();
        sharedService.getService('sharedUI').showSessionTimeout(message ? message : [app.lang.messages.closingSession, app.lang.messages.pleaseWait].join(', '), true);

        utils.webStorage.addString(utils.webStorage.getKey(utils.Constants.CacheKeys.LoggedIn), '0', utils.Constants.StorageType.Session);
        utils.logger.logInfo('Application refreshed. ' + message);

        _sendLogoutRequest(isServerSessionExpired);
        window.location.href = locationUrl;
    };

    let _sendLogoutRequest = function (isServerSessionExpired) {
        // Not sending the logout request again to the server if server session is already expired
        // Server will trigger the logout request to client if this is the case
        if (appConfig.customisation.isTradingEnabled && !isServerSessionExpired) {
            sharedService.getService('trade').logout();
        }
    };

    /* *
     * Reload application to its url
     */
    let reloadApplication = function () {
        window.location.reload();
    };

    return {
        logout: logout,
        initializeApplicationIdleCheck: initializeApplicationIdleCheck,
        onVisibilityChanged: onVisibilityChanged,
        reloadApplication: reloadApplication
    };
})();