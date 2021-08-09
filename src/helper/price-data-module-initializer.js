import PriceService from '../services/PriceService';
import { userState, userSettings, registerService, getService } from '../protocols/Shared/SharedServices';
// import profileService from '../ua-kernal/models/shared/profile/profile-service';
// import NotificationService from '../ua-price/models/price/notification-service';
import utils from '../util/utils/utils';
import priceSettings from '../protocols/config/PriceSettings';
// import priceWidgetConfig from '../ua-price/config/price-widget-config';
// import extendedSettingsL1 from '../ua-kernal/config/extended-settings-level-1';
// import extendedSettingsL2 from '../ua-kernal/config/extended-settings-level-2';
import PriceConstants from '../constants/Price/PriceConstants';
import AppConfig from '../protocols/config/AppConfig';
import AuthenticationConstants from '../constants/Authentication/AuthenticationConstants';
import environment from '../protocols/config/environment';
// import formatterExtension from '../ua-kernal/models/shared/formatter-extension';

export default class PriceDataModuleInitializer {
    constructor() {
        this.priceService = {};
    }

    preInitialize() {
        let service;
        // window.appGlobal.priceUser = {};
        userSettings.currentLanguage = 'EN';
        // this._mergeConfigSettings();

        // if (window.appGlobal.multiScreen && !window.appGlobal.multiScreen.isParentWindow) { // if Child window of DT multiple window scenario
        //     let parentWindow = window.opener;
        //     service = parentWindow.window.appGlobal.multiScreen.parentgetService('price');
        // } else {
            service = this.createService();
        // }
console.log("service", service);
        this.priceService = service;
        registerService(service.subscriptionKey, service);

        // Overwrite formatter.js functions
        // formatterExtension.overwritePrototypes(service);

        // service.createDataStores();

        // this._loadConfigs();
        // this._loadPriceUserSettings();
        // this._setAuthParams();
        // this._setConnectionSettings();
        // this._loadPriceUser();
        // this._populateExchangeMetadata();
        // this._loadPriceUserData();
        // this._createNotificationService();
    }

    getRequestExchangeMetaData() {
        this.priceService.exchangeDS.requestExchangeMetadata(userSettings.price.currentExchange);
    }

    getRequestExchangeSymbolMetaData() {
        this.priceService.exchangeDS.requestExchangeSymbolMetadata(userSettings.price.currentExchange);
    }

    postInitialize() {
        // this.priceService.announcementDS.loadCachedStore();
        this.priceService.subscribeAuthSuccess(getService('analytics'), 'analytics');

        // profileService.initialize();
    }

    createService() {
        let priceService = new PriceService();
        return priceService;
    }

    // _createNotificationService() {
    //     let service = new NotificationService();
    //     registerService(service.subscriptionKey, service);
    // }

    // _mergeConfigSettings() {
    //     // Intermediate level settings
    //     utils.configHelper.mergeConfigSettings(priceSettings, extendedSettingsL1.priceSettings);
    //     utils.configHelper.mergeConfigSettings(priceWidgetConfig, extendedSettingsL1.priceWidgetConfig);
    //     // Customization level settings
    //     utils.configHelper.mergeConfigSettings(priceSettings, extendedSettingsL2.priceSettings);
    //     utils.configHelper.mergeConfigSettings(priceWidgetConfig, extendedSettingsL2.priceWidgetConfig);

    //     // Increased socket frame processing latency based on device
    //     if (AppConfig.customisation.isTablet) {
    //         PriceConstants.TimeIntervals.WebSocketInQueueProcessingInterval = 500;
    //     }
    // }

    _loadPriceUser() {
        // Load data as fresh, if version not available in local storage
        this.priceService.userDS.load();
        let authVersionMeta = this.priceService.userDS.metaVersion;

        if (!utils.validators.isAvailable(authVersionMeta) || isNaN(authVersionMeta)) {
            authVersionMeta = 0;
        }

        this.priceService.userDS.metaVersion = authVersionMeta;

        if (AppConfig.customisation.isEmbeddedMode) {
            this.priceService.userDS.username = window.appGlobal.queryParams.appParams[utils.Constants.EmbeddedModeParams.Username];
            this.priceService.userDS.sessionId = window.appGlobal.queryParams.appParams[utils.Constants.EmbeddedModeParams.Session];
        }
    }

    _populateExchangeMetadata() {
        this.priceService.exchangeDS.populateExchangeMetadata(userSettings.currentLanguage);
    }

    _loadPriceUserData() {
        this.priceService.priceUserData.load();
    }

    _setAuthParams() {
        switch (AppConfig.customisation.authenticationMode) {
            case AuthenticationConstants.AuthModes.PriceRetail:
                // sharedDataModuleInitializer.authController = priceRetailAuthenticator;
                break;

            case AuthenticationConstants.AuthModes.PriceSso:
            case AuthenticationConstants.AuthModes.PriceSsoTradeSso:
                // sharedDataModuleInitializer.authController = priceSsoAuthenticator;
                break;

            default:
                break;
        }
    }

    _setConnectionSettings() {
        let embeddedPort = window.appGlobal.queryParams.appParams[utils.Constants.EmbeddedModeParams.Port];
        let settings = {};
        let isConError = true;

        if (environment('development').APP.isTestMode) {
            settings = environment('development').APP.priceConnectionParameters.primary;
            isConError = false;
        } else if (AppConfig.customisation.readConParaModeEnabled) {
            settings = priceSettings.connectionParameters.primary;

        } else if (window.connectionParameters && window.connectionParameters.priceSettings) {
            let priceSettingsFromConfig = window.connectionParameters.priceSettings;

            if (priceSettingsFromConfig.ip !== '' && priceSettingsFromConfig.ip !== undefined && priceSettingsFromConfig.port !== undefined && priceSettingsFromConfig.secure !== undefined) {
                settings.ip = priceSettingsFromConfig.ip;
                settings.port = priceSettingsFromConfig.port;
                settings.secure = priceSettingsFromConfig.secure;

                settings.enablePulse = window.connectionParameters.enablePulse;
                settings.isAttemptRetry = window.connectionParameters.isAttemptRetry;

                isConError = false;
            }
        }

        if (isConError) {
            console.log('connection error');
        }

        let connectionSettings = {
            ip: settings.ip,
            port: embeddedPort ? embeddedPort : settings.port,
            secure: settings.secure,
            reconnectInterval: PriceConstants.Pulse.ReconnectionTimeInterval,
            enablePulse: settings.enablePulse !== undefined ? settings.enablePulse : priceSettings.enablePulse,
            isAttemptRetry: settings.isAttemptRetry !== undefined ? settings.isAttemptRetry : priceSettings.isAttemptRetry
        };

        this.priceService.webSocketManager.setConnectionSettings(connectionSettings);
    }

    // _loadConfigs() {
    //     this.priceService.settings = priceSettings;
    //     this.priceService.constants = PriceConstants;
    // }

    // _loadPriceUserSettings() {
    //     let isSettingsChanged;

    //     if (userSettings.price) {
    //         isSettingsChanged = utils.configHelper.mergeConfigSettings(userSettings.price, priceSettings.configs, true);
    //     } else {
    //         userSettings.price = priceSettings.configs;
    //         isSettingsChanged = true;
    //     }

    //     if (!utils.validators.isAvailable(userSettings.price.currentExchange)) {
    //         userSettings.price.currentExchange = priceSettings.configs.defaultExchange;
    //         isSettingsChanged = true;
    //     }

    //     if (!utils.validators.isAvailable(userSettings.price.currentIndex)) {
    //         userSettings.price.currentIndex = priceSettings.configs.defaultIndex;
    //         isSettingsChanged = true;
    //     }

    //     if (userSettings.price.secondaryExchanges.length === 0) {
    //         userSettings.price.secondaryExchanges = priceSettings.configs.secondaryExchanges;
    //         isSettingsChanged = true;
    //     }

    //     if (!utils.validators.isAvailable(userSettings.price.userDefaultExg)) {
    //         userSettings.price.userDefaultExg = priceSettings.configs.defaultExchange;
    //         isSettingsChanged = true;
    //     }

    //     if (isSettingsChanged) {
    //         userSettings.save();
    //     }

    //     if (!userState.globalArgs.exg) {
    //         userState.globalArgs.exg = userSettings.price.currentExchange;
    //     }
    // }
};