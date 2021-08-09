// import sharedService from '../protocols/Shared/SharedServices';
import appConfig from '../protocols/config/AppConfig';
import utils from '../util/utils/utils';
// import appEvents from '../ua-kernal/app-events';
import { getService, userSettings, userState } from '../protocols/Shared/SharedServices';

export default class Login {
    constructor() {
        this.resendSubscriptions = false;
    }

    authenticateUser(username, password, allowInit, authSuccess, authFail) {
        let that = this;
        let priceService = getService('price');

        // this.onLoginEvent(username);
        // authSuccess(username, password, allowInit);

        priceService.authenticateWithUsernameAndPassword({
            username: username,
            password: password,
            resendSubscriptions: that.resendSubscriptions,

            // authSuccess: function () {
            //     // Initialize application if and only if the given user is the last successfully logged-in user
            //     authSuccess(username, password, !allowInit);
            // },

            // authFailed: function (reason) {
            //     that.resendSubscriptions = true;
            //     priceService.webSocketManager.closeConnection(priceService.constants.SocketConnectionType.QuoteServer);

            //     authFail(reason, username, password);
            // }
        });
    }


    _retailAuthSuccess(username, password, allowInit) {
        // if (allowInit) {

        //     let tradeService = getService('trade');

        //     if (window.appGlobal.session.isLoginUserChanged) {
        //         appEvents.triggerEvent('onLoginUserChanged');
        //     }

        //     if (tradeService && appConfig.customisation.profileServiceEnabled) {
        //         let tradeUser = tradeService.userDS;
        //         utils.webStorage.addObject(utils.webStorage.getKey(utils.Constants.CacheKeys.ReconnectionDetails), {
        //             'mubNo': tradeUser.mubNo,
        //             'sessionId': tradeUser.sessionId,
        //             'crntLgnDteTme': tradeUser.crntLgnDteTme,
        //             'usrId': tradeUser.usrId
        //         }, utils.Constants.StorageType.Session);
        //     } else {
        //         // Handle profile service for price only setups
        //     }

        //     if (tradeService && tradeService.userDS && tradeService.userDS.authSts === tradeService.constants.AuthStatus.OtpEnabled) {
        //         // this.loginViewController.showOtpLogin();
        //     } else {
        //         if (appConfig.customisation.isUserAgreementEnabled && userSettings.previousLoggedIn === utils.Constants.No) {
        //             // this.loginViewController.showAgreement();
        //         } else if (!appConfig.customisation.profileServiceEnabled || !window.appGlobal.session.isLoginUserChanged) {
        //             // this.loginViewController.showHomePage();
        //         }
        //     }
        // }
    }

    _retailAuthFail(reason, username, password) {
        // let that = this;
        // let tradeService = getService('trade');

        // if (appConfig.customisation.loginViewSettings.isLoginFailedCaptchaEnabled && tradeService.userDS.failAtmps === tradeService.constants.CaptchaValidation.FailedAttempts) {
        //     // this.loginViewController.showLoginCaptcha();
        // } else {
        //     userSettings.clearLoginToken();
        //     // this.loginViewController.showAuthFailMessage(reason);

        //     this.prepareLoginFailedView(username, password, function (_username, _password, allowInit) {
        //         that._retailAuthSuccess(_username, _password, allowInit);
        //     }, function (_reason, _username, _password) {
        //         that._retailAuthFail(_reason, _username, _password);
        //     });
        // }
    }

    prepareLoginView(username, password) {
        console.log("username =", username, "password =", password);
        let that = this;
        this.authenticateUser(username, password, this._isInitAllowed(username, password), function (_username, _password, allowInit) {
            that._retailAuthSuccess(username, password, allowInit);
        }, function (reason, username, password) {
            that._retailAuthFail(reason, username, password);
        });

    }

    _isInitAllowed(username, password) {
        let isInitAllowed = false;

        if (appConfig.customisation.smartLoginEnabled) {

            let storedUnmToken = userSettings.appToken;
            let storedPwdToken = userSettings.verToken;
            let isUserAvailable = utils.validators.isAvailable(storedUnmToken) && utils.validators.isAvailable(storedPwdToken);

            isInitAllowed = isUserAvailable && storedUnmToken === this._getLoginToken(username) &&
                storedPwdToken === this._getLoginToken(password) && utils.browser.isNetworkConnected();
        }

        return isInitAllowed;
    }

    _getLoginToken(loginValue) {
        let loginToken = '';

        if (utils.validators.isAvailable(loginValue)) {
            let charCount = loginValue.length;
            let firstChar = loginValue.charAt(0);
            let lastChar = loginValue.charAt(charCount - 1);

            loginToken = utils.crypto.hashMd5([firstChar, lastChar, charCount].join(''));
        }

        return loginToken;
    };

    prepareLoginFailedView(username, password, authSuccess, authFail) {

    }


    onLoginEvent(username) {
        userSettings.currentLoginName = username; // Store current user login
        let previousLoginName = utils.webStorage.getString(utils.webStorage.getKey(utils.Constants.PreviousLoginName), utils.Constants.StorageType.Local);

        if (username !== previousLoginName) {
            // window.appGlobal.session.isLoginUserChanged = true;

            utils.webStorage.addString(utils.webStorage.getKey(utils.Constants.CacheKeys.PreviousLoginName), username, utils.Constants.StorageType.Local);
            utils.webStorage.addObject(utils.webStorage.getKey(utils.Constants.CacheKeys.LoginUserChanged), {'isLoginUserChanged': true}, utils.Constants.StorageType.Session);
        }
    };
}