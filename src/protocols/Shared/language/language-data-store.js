import appConfig from '../../config/AppConfig';
import sharedService from '../shared-service';
import appEvents from '../../../app-events';
import utils from '../../../utils/utils';
import themeDataStore from '../../../models/shared/data-stores/theme-data-store';

export default (function () {
    let langStore = {};
    let isLangSet = false;
    let isChangeLangSet = false;

    let selectedLangObj = {
        lang: {}
    };

    let changeLangObj = {
        lang: {}
    };

    let getUserLanguages = function () {
        return appConfig.customisation.supportedLanguages;
    };

    let getLanguageObj = function () {
        if (!isLangSet) {
            selectedLangObj.lang = langStore[sharedService.userSettings.currentLanguage];
            isLangSet = true;
        }

        return selectedLangObj;
    };

    let getObjByLanguage = function (langCode) {
        return langStore[langCode];
    };

    let getChangeLanguageObj = function () {
        if (!isChangeLangSet) {
            changeLangObj.set('lang', getChangeToLanguage(sharedService.userSettings.currentLanguage));
            isChangeLangSet = true;
        }

        return changeLangObj;
    };

    let setLanguageObj = function (langCode, langObj) {
        if (utils.validators.isAvailable(langCode) && langObj) {
            langStore[langCode] = langObj;
        } else {
            utils.logger.logError('Language data not available for : ' + langCode);
        }
    };

    let changeLanguage = function (langCode) {
        if (utils.validators.isAvailable(langCode)) {
            let langObj = langStore[langCode];

            if (langObj) {
                selectedLangObj.lang = langObj;
                changeLangObj.lang = getChangeToLanguage(langCode);
                themeDataStore.setOrientationClass(langCode);

                if (utils.browser.isIE()) {
                    let emberTables = document.getElementsByClassName('antiscroll-box');
                    // utils.messageService.showMessage(this.getLanguageObj().lang.labels.workspaceLoading, utils.Constants.MessageTypes.Info, false, undefined, undefined, undefined, undefined, true);

                    if (emberTables) {
                        for (let i = 0; i < emberTables.length; i++ ) {
                            emberTables[i].style.visibility = 'hidden';
                        }
                    }

                    window.requestAnimationFrame(function () {
                        startLanguageChangeInIE(langCode);
                    });
                } else {
                    startLanguageChange(langCode);
                }
            } else {
                utils.logger.logError('Language data not available for : ' + langCode);
            }
        } else {
            utils.logger.logError('Language code not available');
        }
    };

    let startLanguageChangeInIE = function (langCode) {
        let emberTables = document.getElementsByClassName('antiscroll-box');
        startLanguageChange(langCode);

        if (emberTables) {
            for (let i = 0; i < emberTables.length; i++ ) {
                emberTables[i].style.visibility = 'visible';
            }
        }

        utils.messageService.hideMessage();
    };

    let startLanguageChange = function (langCode) {
        // Save current language in user's local machine when language changes
        sharedService.userSettings.set('currentLanguage', langCode);
        sharedService.userSettings.save();

        // Notify subscribed widgets about the language change
        appEvents.languageChanged(langCode);
    };

    let getChangeToLanguage = function (selectedLanguage) {
        let changeLang = {};
        let appConfigSupportLanguages = appConfig.customisation.supportedLanguages;

        Object.keys(appConfigSupportLanguages).forEach(function(key) {
            if (selectedLanguage !== appConfigSupportLanguages[key].code) {
                changeLang = appConfigSupportLanguages[key];
                return changeLang;
            }
        });

        return changeLang;
    };

    let generateLangMessage = function (message, separator) {
        let msgSeparator = separator || utils.Constants.StringConst.Pipe;

        if (message && message.includes(msgSeparator)) {
            let langDesMap = _getLangMessage(message, msgSeparator);
            return langDesMap[sharedService.userSettings.currentLanguage];
        } else {
            return message;
        }
    };

    let _getLangMessage = function (msg, separator) {
        let nativeMsg = utils.formatters.convertUnicodeToNativeString(msg);
        let desArray = nativeMsg.split(separator);
        let langDesMap = {};
        let supportedLangArray = appConfig.customisation.supportedLanguages;

        for (let i = 0; i < desArray.length; i++) {
            if (supportedLangArray[i]) {
                langDesMap[supportedLangArray[i].code] = desArray[i];
            }
        }

        return langDesMap;
    };

    return {
        getUserLanguages: getUserLanguages,
        getChangeToLanguage: getChangeToLanguage,
        getLanguageObj: getLanguageObj,
        getObjByLanguage: getObjByLanguage,
        getChangeLanguageObj: getChangeLanguageObj,
        setLanguageObj: setLanguageObj,
        changeLanguage: changeLanguage,
        generateLangMessage: generateLangMessage
    };
})();