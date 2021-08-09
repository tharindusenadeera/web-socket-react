// eslint-disable-next-line import/no-anonymous-default-export
export default {
    ChartRefreshTimeInterval: 30000, // n * 1000 - n number of seconds
    ChartWaitInterval: 1000,

    ChartCategory: {
        Intraday: {
            ID: 0,
            LanguageTag: 'chartIntraday',
            Icon: 'chart-graph-tb-intraday',
            DefaultChartViewPeriod: 'OneDay',
            RowTickFormat: 'minute',
            DefaultDataRequestDuration: 5 // five days
        },
        History: {
            ID: 1,
            LanguageTag: 'chartHistory',
            Icon: 'chart-graph-tb-history',
            DefaultChartViewPeriod: 'OneYear',
            RowTickFormat: 'day',
            DefaultDataRequestDuration: 20 // twenty years
        }
    },
    // Capacity of data request
    ChartDataLevel: {
        IntradayCurrentDay: 1,
        IntradayFiveDay: 2,
        IntradayOneMonth: 3,
        IntradayCustom: 4,
        HistoryTwoYear: 5,
        HistoryTenYear: 6,
        HistoryTwentyYear: 7,
        HistoryCustom: 8
    },

    ChartDataRequestMode: {
        Intraday5DayHistory: 1,
        IntradayActiveStock: 2,
        HistoryData: 3
    },

    ChartDefaultDataPeriod: {
        Year: 365,
        Month: 30,
        TwoDay: 2,
        FiveDay: 5,
        OneDay: 1,
        MilliSecondsPerDay: 86400000 // = 1000 * 60 * 60 * 24
    },

    ChartDataType: {
        Basic: 3,
        CorporateAction: 5,
        Ratio: 8
    },

    ChartStyle: {
        Area: {
            ID: 1,
            LanguageTag: 'chartArea',
            ChartIQChartType: 'mountain'
        },
        Candle: {
            ID: 2,
            LanguageTag: 'chartCandle',
            ChartIQChartType: 'candle'
        },
        OHLC: {
            ID: 3,
            LanguageTag: 'chartOHLC',
            ChartIQChartType: 'bar'
        },
        Line: {
            ID: 4,
            LanguageTag: 'chartLine',
            ChartIQChartType: 'line'
        },
        CandleWithTrend: {
            ID: 5,
            LanguageTag: 'chartCandleWithTrend',
            ChartIQChartType: 'hollow_candle'
        }
    },

    ChartViewInterval: {
        EveryMinutes: {
            LanguageTag: 'chartEveryMinute',
            ID: 1,
            Value: 1,
            PerSeconds: 60,
            IsHistory: false
        },
        EveryFiveMinutes: {
            LanguageTag: 'chartEvery5Minutes',
            ID: 2,
            Value: 5,
            PerSeconds: 5 * 60,
            IsHistory: false
        },
        EveryTenMinutes: {
            LanguageTag: 'chartEvery10Minutes',
            ID: 3,
            Value: 10,
            PerSeconds: 10 * 60,
            IsHistory: false
        },
        EveryFiftyMinutes: {
            LanguageTag: 'chartEvery15Minutes',
            ID: 4,
            Value: 15,
            PerSeconds: 15 * 60,
            IsHistory: false
        },
        EveryThirtyMinutes: {
            LanguageTag: 'chartEvery30Minutes',
            ID: 5,
            Value: 30,
            PerSeconds: 30 * 60,
            IsHistory: false
        },
        EverySixtyMinutes: {
            LanguageTag: 'chartEvery60Minutes',
            ID: 6,
            Value: 60,
            PerSeconds: 60 * 60,
            IsHistory: false
        },
        Daily: {
            LanguageTag: 'chartDaily',
            ID: 7,
            Value: 1,
            PerSeconds: 24 * 3600,  // 1 * 24 * 3600
            IsHistory: true
        },
        Weekly: {
            LanguageTag: 'chartWeekly',
            ID: 8,
            Value: 7,
            PerSeconds: 7 * 24 * 3600,
            IsHistory: true
        },
        Monthly: {
            LanguageTag: 'chartMonthly',
            ID: 9,
            Value: 30,
            PerSeconds: 30 * 24 * 3600,
            IsHistory: true
        },
        Quarterly: {
            LanguageTag: 'chartQuarterly',
            ID: 4,
            Value: 90,
            PerSeconds: 365 * 6 * 3600,
            IsHistory: true
        },
        Yearly: {
            LanguageTag: 'chartYearly',
            ID: 10,
            Value: 365,
            PerSeconds: 365 * 24 * 3600,
            IsHistory: true
        }
    },

    ChartViewPeriod: {
        OneDay: {
            DisplayName: '1D',
            ID: 0,
            IsHistory: false,
            ChartDataLevel: 1,
            DefaultInterval: 'EveryMinutes', // ChartInterval.Intraday.EveryMinutes
            title: 'oneDay'
        },
        TwoDay: {
            DisplayName: '2D',
            ID: 1,
            IsHistory: false,
            ChartDataLevel: 2,
            DefaultInterval: 'EveryMinutes', // ChartInterval.Intraday.EveryMinutes
            title: 'twoDays'
        },
        FiveDay: {
            DisplayName: '5D',
            ID: 2,
            IsHistory: false,
            ChartDataLevel: 2,
            DefaultInterval: 'EveryMinutes', // ChartInterval.Intraday.EveryMinutes
            title: 'fiveDays'
        },
        OneMonth: {
            DisplayName: '1M',
            ID: 3,
            IsHistory: true,
            ChartDataLevel: 5,
            DefaultInterval: 'Daily', // ChartInterval.History.Daily
            title: 'oneMonth'
        },
        ThreeMonth: {
            DisplayName: '3M',
            ID: 4,
            IsHistory: true,
            ChartDataLevel: 5,
            DefaultInterval: 'Daily', // ChartInterval.History.Daily
            title: 'threeMonths'
        },
        SixMonth: {
            DisplayName: '6M',
            ID: 5,
            IsHistory: true,
            ChartDataLevel: 5,
            DefaultInterval: 'Daily', // ChartInterval.History.Daily
            title: 'sixMonths'
        },
        YTD: {
            DisplayName: 'YTD',
            ID: 6,
            IsHistory: true,
            ChartDataLevel: 5,
            DefaultInterval: 'Daily', // ChartInterval.History.Daily
            title: 'yearToDate'
        },
        OneYear: {
            DisplayName: '1Y',
            ID: 7,
            IsHistory: true,
            ChartDataLevel: 5,
            DefaultInterval: 'Daily', // ChartInterval.History.Daily
            title: 'oneYear'
        },
        TwoYear: {
            DisplayName: '2Y',
            ID: 8,
            IsHistory: true,
            ChartDataLevel: 5,
            DefaultInterval: 'Daily', // ChartInterval.History.Daily
            title: 'twoYears'
        },
        ThreeYear: {
            DisplayName: '3Y',
            ID: 9,
            IsHistory: true,
            ChartDataLevel: 6,
            DefaultInterval: 'Daily', // ChartInterval.History.Daily
            title: 'threeYears'
        },
        FiveYear: {
            DisplayName: '5Y',
            ID: 10,
            IsHistory: true,
            ChartDataLevel: 6,
            DefaultInterval: 'Daily', // ChartInterval.History.Daily
            title: 'fiveYears'
        },
        TenYear: {
            DisplayName: '10Y',
            ID: 11,
            IsHistory: true,
            ChartDataLevel: 6,
            DefaultInterval: 'Daily', // ChartInterval.History.Daily
            title: 'tenYears'
        },
        All: {
            DisplayName: 'MAX',
            ID: 12,
            IsHistory: true,
            ChartDataLevel: 7,
            DefaultInterval: 'Daily', // ChartInterval.History.Daily
            title: 'maximum'
        },
        Custom: {
            DisplayName: '*',
            ID: 13,
            IsHistory: true,
            ChartDataLevel: 8,
            DefaultInterval: 'EveryMinutes', // ChartInterval.Intraday.EveryMinutes
            title: 'custom'
        }
    },

    // TODO: [Amila] Move below definition to a place where layout related configs are placed
    DetaiQuoteChartPeriodTab: {
        OneDay: true,
        TwoDay: true,
        FiveDay: false,
        OneMonth: true,
        ThreeMonth: true,
        SixMonth: true,
        YTD: false,
        OneYear: false,
        TwoYear: false,
        ThreeYear: false,
        FiveYear: false,
        TenYear: false,
        All: false,
        Custom: false
    },

    // TODO: [Amila] Move below definition to a place where layout related configs are placed
    ProChartPeriodTab: {
        OneDay: true,
        TwoDay: true,
        FiveDay: false,
        OneMonth: true,
        ThreeMonth: true,
        SixMonth: true,
        YTD: true,
        OneYear: true,
        TwoYear: true,
        ThreeYear: false,
        FiveYear: false,
        TenYear: false,
        All: true,
        Custom: false
    },

    MobileQuoteChartPeriodTab: {
        OneDay: true,
        TwoDay: true,
        FiveDay: false,
        OneMonth: true,
        ThreeMonth: false,
        SixMonth: true,
        YTD: false,
        OneYear: true,
        TwoYear: true,
        ThreeYear: false,
        FiveYear: false,
        TenYear: false,
        All: false,
        Custom: false
    },

    ProChartViewInterval: {
        EveryMinutes: true,
        EveryFiveMinutes: true,
        EveryTenMinutes: true,
        EveryFiftyMinutes: true,
        EveryThirtyMinutes: true,
        EverySixtyMinutes: true,
        Daily: true,
        Weekly: true,
        Monthly: true,
        Quarterly: true,
        Yearly: true
    },

    ProChartGridStyle: {
        Both: {
            ID: 0,
            LanguageTag: 'chartGridBoth',
            Icon: 'chart-graph-tb-grid-both'
        },
        None: {
            ID: 1,
            LanguageTag: 'chartGridNone',
            Icon: 'chart-graph-tb-grid-none'
        },
        Horizontal: {
            ID: 2,
            LanguageTag: 'chartGridHoriz',
            Icon: 'chart-graph-tb-grid-horiz'
        },
        Vertical: {
            ID: 3,
            LanguageTag: 'chartGridVerti',
            Icon: 'chart-graph-tb-grid-verti'
        }
    },

    ChartGAActions: {
        indAdded: 'indiacator-added',
        compare: 'compare'
    }
};