const constants = {
    DefaultAssetType: 1,

    Yes: '1',
    No: '0',
    Delayed: '(d)',
    PreviousDayData: '(s)',

    StringConst: {
        Equal: '=',
        Ampersand: '&',
        Question: '?',
        Pipe: '|',
        Comma: ',',
        Empty: '',
        Tilde: '~',
        Dot: '.',
        Space: ' ',
        Underscore: '_',
        Colon: ':',
        Slash: '/',
        At: '@',
        Hyphen: '-',
        SemiColon: ';',
        time: 'T',
        NumberSign: '#',
        Asterisk: '*',
        Quarter: 'Q'
    },

    StorageType: {
        Local: 'local', // Local storage
        Session: 'session' // Session storage
    },

    CacheType: {
        Announcement: 'anns',
        User: 'user',
        System: 'sys',
        Exchange: 'exchg'
    },

    CacheKeys: {
        LatestAnnouncements: 'latestAnn',
        LoggedIn: 'loggedIn',
        ManuallyLoggedOut: 'manuallyLoggedOut',
        LoginErrorMsg: 'loginErrorMsg',
        VirtualKeyboardEnabled: 'virtualKeyboardEnabled',
        ReconnectionDetails: 'reconnectionObj',
        LoginUserChanged: 'isLoginUserChanged',
        PreviousLoginName: 'previousLoginName'
    },

    DataFormatter: {
        Long: 'L',
        Integer: 'I',
        Float: 'F',
        Currency: 'C',
        String: 'S',
        Date: 'D',
        Time: 'T',
        Percentage: 'P',
        DivideNumber: 'DN',
        DateTime: 'DT'
    },

    Encryption: {
        TDesPrimaryKey: '21969ca8a64af278f240c014', // First 24 characters of MD5 of 'universalapp'
        TDesPrimaryIv: '15607a23', // First 8 characters of MD5 of 'vivaldi'
        TDesSecondaryKey: '5520d0da75a8557c30962c18', // First 24 characters of MD5 of 'uditha'
        TDesSecondaryIv: 'f1255279' // First 8 characters of MD5 of 'bashitha'
    },

    HashTypes: {
        Md5: 'MD5',
        Sha1: 'SHA-1',
        Sha256: 'SHA-256',
        Custom: 'Custom'
    },

    HashOutputTypes: {
        B64: 'B64',
        HEX: 'HEX'
    },

    MessageTypes: {
        Error: 1,
        Warning: 2,
        Question: 3,
        Info: 4,
        Success: 5
    },

    SsoTypes: {
        Price: 1,
        Trade: 2
    },

    MessageBoxButtons: {
        Ok: 'ok',
        Cancel: 'cancel',
        Yes: 'yes',
        No: 'no',
        Retry: 'retry'
    },

    GAActions: {
        show: 'show',
        viewChanged: 'view-changed',
        maximize: 'maximize',
        restore: 'restore',
        rowClick: 'row-click',
        search: 'search',
        columnsChanged: 'columns-changed',
        rowDoubleClick: 'row-double-click',
        rowRightClick: 'row-right-click',
        rowMenuButton: 'row-menu-button',
        settingsChanged: 'settings-changed',
        popup: 'popup',
        keyboardShortcut: 'keyboard-shortcut',
        rowIconClick: 'row-icon-click',
        click: 'click',
        filter: 'filter',
        select: 'select',
        logout: 'logout'
    },

    KeyCodes: {
        Backspace: 8,
        Tab: 9,
        Enter: 13,
        Escape: 27,
        Delete: 46,
        End: 35,
        Home: 36,
        Space: 32,
        LeftArrow: 37,
        UpArrow: 38,
        RightArrow: 39,
        DownArrow: 40,
        DecimalPoint: 110,
        DecimalPointMobile: 46,
        Period: 190,
        /*eslint-disable */
        Num_0: 48,
        Num_9: 57,
        Numpad_0: 96,
        Numpad_9: 105,
        SpecialCharStart_1: 186,
        SpecialCharEnd_1: 192,
        SpecialCharStart_2: 219,
        SpecialCharEnd_2: 222,
        /*eslint-enable */
        NumPadCharStart: 96,
        NumPadCharEnd: 111,
        A: 65,
        C: 67,
        V: 86,
        X: 88,
        F5: 116
    },

    ReqStatus: {
        NotSent: 0,
        InProgress: 1,
        Success: 2,
        Failed: 3
    },

    EmbeddedModeParams: {
        AppData: 'appdata',
        WidgetData: 'wdata',
        Language: 'lang',
        Theme: 'theme',
        Username: 'unm',
        Session: 'sid',
        Page: 'page',
        Widget: 'widget',
        Port: 'port',
        ChildWindowId: 'cwid'
    },

    MouseButtons: {
        RightClick: 2
    },

    EventTypes: {
        OnSymbolChanged: 'onSymbolChanged',
        OnExchangeChanged: 'onExchangeChanged',
        OnSubMarketChanged: 'onSubMarketChanged',
        OnThemeChanged: 'onThemeChanged',
        OnLanguageChanged: 'onLanguageChanged',
        OnVisibilityChanged: 'onVisibilityChanged',
        OnWorkspaceUpdated: 'onWorkspaceUpdated',
        OnOrientationChanged: 'onOrientationChanged',
        OnWindowResize: 'onWindowResize',
        OnAppClose: 'onAppClose',
        OnDomReady: 'onDomReady',
        OnLayoutReady: 'onLayoutReady'
    }
};
export default constants;