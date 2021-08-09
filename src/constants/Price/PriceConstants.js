// eslint-disable-next-line import/no-anonymous-default-export
export default {
    UnixTimestampByMinutes: 60,
    UnixTimestampByMilliSeconds: 1000,
    AnnouncementNewsCashSize: 10,
    SymbolSearchPageSize: 15,
    AnnouncementSearchPageSize: 50,
    NewsSearchPageSize: 10,

    shortSellStatusLabel: 'shortSellStatus',

    AuthStatus: {
        ForceChangePassword: -2
    },

    MarketStatus: {
        PreOpen: 1,
        Open: 2,
        Close: 3,
        PreClose: 4,
        CallMarket: 21,
        SessionClosed: 22,
        Break: 33,
        Enquiry: 23,
        OrderAcceptance: 24,
        Trading: 25,
        TradingFWD: 31,
        PreAuction: 26,
        ClosingAuction: 27,
        Closing: 277,
        QuoteEntry: 29,
        QuoteEnquiry: 30,
        ClosingPriceTrading: 28,
        PostClose: 12,
        EndOfDay: 32,
        Unknown: -1,
        PNC: 8,  // Pre open no cancellation
        PCNC: 9, // Pre close no cancellation
        TAL: 20, // Trading at last
        EMH: 35, // End of market hrs

        isOfflineStatus: function (mktStatus) {
            return mktStatus && (mktStatus === this.Close || mktStatus === this.PreClose);
        }
    },

    // TODO: [Amila] Response and request types needs to be merged as per the protocol suggestion (item 08 of the google doc)
    RequestType: {
        Authentication: 150,

        Data: {
            RequestEquity: 0,
            RequestIndex: 7,
            RequestOption: 0,
            RequestOHLC: 17,
            RequestTOPVOHLC: 270,
            RequestAnnouncement: 27,
            RequestMarketDepthByOrder: 29,
            RequestMarketDepthByPrice: 30,
            RequestExchange: 32,
            RequestTopStocks: 64,
            RequestNews: 77,
            RequestTimeAndSales: 1,
            RequestTimeAndSalesDetail: 24,
            RequestAlertPlace: 0,   // Message Type key is different for Alert
            RequestAlertUpdate: 1,
            RequestXStream: 275,
            RequestFSBulk: 276,
            RequestProjectedPrice: 277
        }
    },

    ResponseType: {
        Authentication: 150,
        Pulse: 0,
        MessageType: '1',

        Data: {
            ResponseEquity: 3,
            ResponseIndex: 4,
            ResponseExchange: 5,
            ResponseSubMarket: 20,
            ResponseOHLC: 6,
            ResponseTOVPOHLC: 175,
            ResponseMarketDepthByOrder: 7,
            ResponseMarketDepthByPrice: 9,
            ResponseAnnouncement: 11,
            ResponseTopStocks: 64,
            ResponseNews: 77,
            ResponseTimeAndSales: 2,
            ResponseTimeAndSalesDetail: 10,
            ResponseFullMarketEnd: 500,
            ResponseAlert: '225',
            ResponseAlertTrigger: '226',
            ResponseAlertHistory: '227',
            ResponseAlertUnsubscribe: '228',
            ResponseChangePassword: 61,
            ResponseXStream: 180,
            ResponseFSBulk: 191,
            ResponseProjectedPrice: 194
        }
    },

    MixRequest: {
        SymbolValidation: {
            RT: 52
        },
        SymbolSearch: {
            RT: 53,
            IFLD: 'MC,DES,ISINC,DEP,CFID,TC,DS,SYMT,SYMC',
            ST: 'S,SDES,DES,SYMC',
            XFLD: 'SEC'
        },
        SymbolMetaDetails: {
            RT: 301
        },
        FullSymbolDescription: {
            RT: 303
        },
        ExchangeFullMeta: {
            RT: 306
        },
        ExchangeStockSubMktDetails: {
            RT: 308
        },
        Chart: {
            RT: 37
        },
        TOPVChart: {
            RT: 233
        },
        AnnouncementBody: {
            RT: 26
        },
        NewsSearch: {
            RT: 27
        },
        NewsBody: {
            RT: 28
        },
        AnnouncementSearch: {
            RT: 25
        },
        CompanyProfile: {
            RT: 32,
            CIT: 'CP,INMGT,STK,OWN_IND,CPCLS,SUBS,AUD'
        },
        TimeAndSalesBacklog: {
            RT: 12,
            ChartType: {
                TickCount: 1
            },
            DT: 1,
            SpecialTrades: {
                IFLD: 'ETT',
                ETT: 1
            },
            IFLD: 'BUYERCODE,SELLERCODE'
        },
        FairValue: {
            RT: 30
        },
        FairValueReport: {
            RT: 97
        },
        FairValueReportLink: {
            RT: 87
        },
        CorporateAction: {
            RT: 30
        },
        VolumeWatcher: {
            RT: 11
        },
        OptionChain: {
            RT: 58,
            IFLD: 'S,E'
        },
        AlertSummary: {
            RT: 84
        },
        ProductSubscription: {
            RT: 1005
        },
        FinancialRatios: {
            RT: 131,
            DES: 1,
            Q: '1,2,3,4',
            A: '5',
            ROW: 10,
            FC: 1
        },
        ClosingPrice: {
            RT: 49
        },
        BookShelf: {
            RT: 3002
        },
        TransactionMenu: {
            RT: 3007
        },
        CalenderEvents: {
            RT: 3001
        },
        PressRelease: {
            RT: 3003
        },
        // IndexPanel: {
        //     RT: 2,
        //     LI: 0,
        //     EC: 0
        // },
        IndexPanel: {
            RT: 6,
            EC: 0,
            AE: 1,
            AIS: 1,
            H: 1,
            M: 0
        },
        UserCreation: {
            RT: 3000
        },
        InvestmentId: {
            RT: 3004
        },
        InvestorPortfolio: {
            RT: 3005
        },
        ChangePassword: {
            RT: 3008
        },
        ForgotPassword: {
            RT: 3013
        },
        TechnicalScore: {
            RT: 235
        },
        Beta: {
            RT: 21
        },
        BuyersSellers: {
            RT: 238
        },
        BrokerActivities: {
            RT: 239
        },
        BrokerRanking: {
            RT: 242
        }
    },

    MarketDepthSide: {
        Bid: 0,
        Offer: 1
    },

    MixRequestParameters: {
        AllExchange: 1,
        AllSymbol: 1,
        EnableUnicode: 1,
        EnableMetaTag: 1,
        EnableHeaderTag: 1,
        None: 0
    },

    TimeAndSales: {
        BacklogRequestDelay: 2500,
        MinItemCount: 5
    },

    AssetTypes: {
        0: 'equity',
        7: 'indices',
        75: 'sukukBonds',
        66: 'right',
        86: 'etf',
        11: 'currency',
        68: 'future',
        79: 'corpBond',
        108: 'treasuryBill',
        78: 'govBond',
        76: 'convertibleBond',
        2: 'mutualFund',
        14: 'forex',
        121: 'sukuk',
        73: 'futureOption'
    },

    priceValueMapping: {
        '-2': 'mx',
        '-3': 'ouv'
    },

    TopStocksTypes: {
        TopGainersByChange: 0,
        TopGainersByPercentageChange: 1,
        TopLosersByChange: 2,
        TopLosersByPercentageChange: 3,
        MostActiveByVolume: 4,
        MostActiveByTrades: 5,
        MostActiveByValue: 6
    },

    MetaVersionKeys: {
        WatchList: 'WL',
        ExchangeDefinitions: 'SRC'
    },

    // All below intervals are in milli seconds
    TimeIntervals: {
        AnnouncementCachingInterval: 60000, // Time interval - 60 * 1000 (1 min)
        AnnouncementCacheDelay: 15000, // 15 Seconds
        WebSocketOutQueueProcessingInterval: 100,
        WebSocketInQueueProcessingInterval: 100,
        TopStocksUpdateInterval: 60000,
        SearchAutoCompleteInterval: 400,
        AjaxRequestTimeout: 30000,
        TimeAndSalesRealTimeDebounce: 200,
        CashMapChartRefreshInterval: 1000,
        ContentSortInterval: 500,
        AntiScrollInitInterval: 200,
        AlertNotificationInterval: 5000,
        AuthenticationTimeout: 30000,
        DeviceWakeTimeout: 15000,
        ShowNotificationTimeout: 10000
    },

    // Pulse related constants
    Pulse: {
        PulseInterval: 30000, // Time interval - n * 1000 (n seconds)
        MissedPulseCount: 5, // After this number of missed pulses, application will trigger a disconnection
        ReconnectionTimeInterval: 5000 // Attempt reconnection in this time interval
    },

    SocketConnectionType: {
        QuoteServer: 'qs'
    },

    PriceComponent: {
        DaysRange: 1,
        FiftyTwoWeekHighLow: 2,
        CashMap: 3
    },

    MarketDepthType: {
        DepthByPrice: 1,
        DepthByOrder: 2
    },

    TOPVWidgetType: {
        Stock: 1,
        Index: 2
    },

    // DCFS constants
    DcfsConstants: {
        DcfsLessThanFifty: '0',
        DcfsLessThanSeventyFive: '1',
        DcfsLessThanHundred: '2',
        DcfsGreaterThanHundred: '3'
    },

    DateTimeFormat: {
        ShortDate: 'YYYYMMDD'
    },

    RatioFields: {
        'FR_PER': {lanKey: 'peRatio'},
        'FR_PBR': {lanKey: 'pbRatio'},
        'FR_EPS': {lanKey: 'eps'},
        'FR_ROAA': {lanKey: 'roaa'},
        'FR_NPGRWT': {lanKey: 'netProfitGrwt'},
        'FR_BVGrwt': {lanKey: 'bookValueGrwt'},
        'FR_EPSGrwt': {lanKey: 'epsGrwt'},
        'FR_CshFrmOptn': {lanKey: 'cashFlowfrmOperations'},
        'FR_CurRatio': {lanKey: 'currRatio'},
        'FR_QkRatio': {lanKey: 'qkRatio'},
        'FR_ROAE': {lanKey: 'roae'}
    },

    GmsType: {
        Summary: 0,
        Commodities: 10,
        Currencies: 7,
        Indices: 8
    },

    WindowType: {
        MarketDepthByPrice: '3',
        MarketDepthByOrder: '20',
        MarketDepthByPriceAdvanced: '60',
        MarketDepthByOrderAdvanced: '61',
        News: '213'
    },

    SymbolStatus: {
        Available: '0',
        Expired: '1',
        Delisted: '2',
        Suspended: '3',
        Halted: '4',
        Delayed: '5',
        ShuttingDown: '6'
    },

    AlertStatus: {
        Active: 'active',
        Triggered: 'triggered',
        Rejected: 'rejected'
    },

    AlertParamMap: {
        BEST_BID: 'bestBid',
        BEST_ASK: 'bestOffer',
        BEST_ASK_QTY: 'offerQty',
        BEST_BID_QTY: 'bidQty',
        VOLUME: 'volume',
        CHANGE: 'change',
        LAST_TRADE_PRICE: 'last',
        LAST_TRADE_QTY: 'lastQty',
        PCT_CHANGE: 'perChange'
    },

    TechnicalScoreConstants: {
        BOLLINGER_BAND: 'BB',
        WILLIAMS_PCT_R: 'WILLR',
        MACD: 'MACD',
        CHAIKIN_MONEY_FLOW: 'CHKNMF',
        PRICE_ROC: 'PXROC',
        PARABOLIC_SAR: 'PABSAR',
        CHAIKIN_AD_OSCILLATOR: 'CHKOSC',
        CHANDE_MOMENTUM_OSCILLATOR: 'CHNOSC',
        COMMODITY_CHANNEL_INDEX: 'CMDOCH',
        DEMA: 'DEMA',
        RELATIVE_STRENGTH_INDEX: 'RSI',
        FAST_STOCHASTICS: 'FASTO',
        INTRADAY_MOMENTUM_INDEX: 'IMNTM',
        MOMENTUM: 'MOMNT',
        MONEY_FLOW_INDEX: 'MF',
        MOVING_AVERAGE: 'MVAVG',
        PRICE_OSCILLATOR: 'PXOSC',
        QSTICK: 'QSTIC',
        RELATIVE_MOMENTUM_INDEX: 'RLTMNT',
        RELATIVE_VELOCITY_INDEX: 'RLTVOL',
        SLOW_STOCHASTICS: 'SLSTO',
        STOCHASTIC_MOMENTUM_INDEX: 'SMTNM',
        TEMA: 'TEMA',
        TRIX: 'TRIX',
        VOLUME_OSCILLATOR: 'VOLOSC'
    },

    ExchangeSubscriptionType: {
        RealTime: '0',
        Delayed: '1',
        PrevDay: '2'
    }
};