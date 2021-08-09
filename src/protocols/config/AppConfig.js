// eslint-disable-next-line import/no-anonymous-default-export
export default {
    appVersion: '0.0.0',
    helpGuidePath: '',

    customisation: {
        appName: 'NetPlus New',
        clientPrefix: 'default',
        authenticationMode: 1,
        isStateSavingEnabled: true,
        productType: 56,
        sharedProductType: 999, // product type of shared profile
        titleBarDefaultComponentPath: 'price/top-panel/mobile/announcement-panel',
        thousandSeperator: ',',  // Empty string is not accepted for thousand seperator
        isBlockedRootedDevice: true,
        isMKDepthSpecialValuesAllowed: false,
        readConParaModeEnabled: false, // Used to read connection settings
        isChangeAveragePriceHeaderName: false,
        isB2BDisabled: false,

        supportedLanguages: [
            {code: 'EN', desc: 'English'},
            {code: 'AR', desc: 'العربية'}
        ],

        applicationIdleCheckConfig: {
            defaultIdleTime: 14, // 14 minute
            isEnabledInactiveLogout: true
        },

        supportedThemes: [
            {code: 'theme2', desc: 'Light', category: 'Light', langKey: 'light'},
            {code: 'theme1', desc: 'Dark', category: 'Dark', langKey: 'dark'}
        ],

        profileServiceEnabled: false,
        smartLoginEnabled: false,
        isPasswordChangeEnable: false,
        isEmbeddedMode: false,
        isVirtualKeyboardEnable: false,
        hashType: '',
        hidePreLogin: true,
        isDiscloseQtyEnabled: false,
        isUpperCasePassword: false,
        isMultipleMenuExpand: false,
        isCustomWorkSpaceEnabled: false,
        isAlertEnabled: true,
        showFailedLoginAttempt: false,
        isCacheClearEnabled: false,
        isEnabledPwRules: false,
        isPromptCacheUpdate: false,
        isExportToExcelEnabled: false,
        isExportToPdfEnabled: false,
        isPrintEnabled: false,
        isEnabledTransactionPw: false,
        isEnabledTransactionPwChange: false,
        isGroupByAssetType: false,
        isFirstTimePasswordChangeEnabled: true,
        isShowBuyerSeller: false,
        isPwExpiryEnabled: false,
        isBrokerageAgreementEnabled: false,
        showCusStatementPostMsg: false,
        enableOrderExecHis: false,
        metaVersion: 0,
        isForgotOptionEnable: false,
        isSessionCustomize: false, // Enable customized session timeout settings
        isCompareOptionEnable: false,
        isAppVersionBottom: false, // Shows app version in the bottom of the login when set to true

        defaultSubMarket: {
            TDWL: '1'
        },

        loginViewSettings: {
            showTermsAndConditions: false,
            isHelpEnable: false,
            OLAOExternalLink: '',
            OLAOShowMsgs: true,
            isContactUsEnabled: false,
            isOtpResendAvailable: true,
            isCopyAndPasteCredentialsDisabled: false // Default value for copy and paste for Username and Password
        },

        onlineAccountSettings: {
            onlineAccountOpeningNew: false,
            wkey: 'OAO'
        }
    },

    loginConfig: {
        isRememberPassword: false
    },

    profileServiceConfig: {
        priorityQueueTimer: 10000,
        generalQueueTimer: 5000,
        productPDM: 56,
        billingCode: 'ISI'
    },

    loggerConfig: {
        serverLogLevel: 0, // Server log level is off
        consoleLogLevel: 3, // Console log level is info
        logBufferSize: 50, // This number of latest logs will be maintained. Will be used only in sendLogToServer mode
        logUpdateTimeout: 300000, // Logs will be uploaded to server every 5min
        maxLogBufferSize: 10000, // Log buffer will be cleared when it reach maxLogBufferSize
        isEncryptDebugLog: true,
        isAppLogEnabled: false
    },

    searchConfig: {
        minCharLenForSymbol: 1, // Minimum input characters for performing symbol search
        minCharLenForContent: 3 // Minimum input characters for performing news & announcement search
    },

    googleAnalyticConfig: {
        id: ''
    },

    subscriptionConfig: {
        registrationPath: '',
        upgradeSubscriptionPath: '',
        renewSubscriptionPath: '',
        daysBeforeExpiration: 7
    },

    chartConfig: {
        chartIndicators: ['MovingAverage', 'BollingerBands', 'MACD', 'Momentum'],
        chartType: 3, // ChartConstants.ChartDataType.Basic,
        isMobileComparisonEnabled: false
    },

    socialMediaUrls: {
        facebookUrl: 'https://graph.facebook.com[token]',
        youTubeUrl: 'https://www.googleapis.com/youtube/v3/search?key=[token]&part=snippet,id&order=date&maxResults=50',
        youTubeNextPageUrl: 'https://www.googleapis.com/youtube/v3/search?pageToken=[nextPage]&key=[token]&part=snippet,id&order=date&maxResults=50',
        instagramUrl: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=[token]'
    }
};