import sharedService from '../models/shared/shared-service';

const assetTypes = {
    // Equity types
    Equity: 0,
    EquityNew: 60,
    EquityAssetType: 1,
    CommonStock: 61,
    PreferredStock: 62,
    Warrant: 63,
    Premium: 64,
    Trust: 65,
    Right: 66,
    WarrantRight: 67,
    Etf: 86,

    // Option types
    Future: 68,
    FutureSpread: 69,
    Option: 10,
    EquityOption: 71,
    IndexOption: 72,
    FutureOption: 73,
    IndexFuture: 92,
    FutureInterest: 93,
    CurrencyFuture: 105,
    CommodityFuture: 96,
    CommodityOption: 95,
    FutureFuture: 97,

    // Mutual fund types
    MutualFund: 5,
    FixedIncome: 74,
    SukukBonds: 75,
    ConvertibleBond: 76,
    MBS: 77,
    GovBond: 78,
    CorpBond: 79,
    USAgencyBond: 80,
    USTreasuryBill: 81,
    USTreasuryCoupon: 82,
    MoneyMarket: 83,
    CD: 84,
    TreasuryBill: 108,
    LendingRate: 109,
    BorrowningRate: 110,
    InterbankRate: 111,
    Debenture: 112,
    Sukuk: 121,

    // Forex types
    Forex: 14,
    ForexFra: 88,
    ForexDeposit: 89,
    ForexForward: 90,
    Statistics: 91,

    // Index types
    Indices: 7,
    IndexAssetType: 8,

    // Stock Borrowing  types
    StockBorrowing: 106,

    FixedIncomes: '6',

    isEquity: function (inst) {
        return inst === this.Equity;
    },

    isRight: function (inst) {
        return inst === this.Right;
    },

    isSukukBonds: function (inst) {
        return inst === this.SukukBonds;
    },

    isEtf: function (inst) {
        return inst === this.Etf;
    },

    isIndices: function (inst) {
        return inst === this.Indices;
    },

    isOption: function (inst) {
        return inst === this.Option;
    },

    isForex: function (inst) {
        return inst === this.Forex;
    },

    isFixedIncome: function (inst) {
        return inst === this.FixedIncomes;
    },

    isTradableAssetType: function (inst) {
        if (sharedService.getService('trade')) {
            return !sharedService.getService('trade').settings.tradingDisabledInstTypes.contains(inst);
        }

        return false;
    },

    isEquityAssetType: function (inst) {
        return this.EquityAssetType === this.InstrumentToAssetMapping[inst];
    },

    InstrumentLangKeys: {
        0: 'equity',
        2: 'mutualFund',
        5: 'mutualFund',
        7: 'indices',
        10: 'option',
        11: 'currency',
        14: 'forex',
        60:	'equity',
        61:	'equity',
        62:	'preferredStock',
        63:	'warrant',
        64:	'premium',
        65:	'trust',
        66:	'rights',
        67:	'warrantRight',
        68:	'future',
        69:	'futureSpread',
        71:	'equityOption',
        72:	'indexOption',
        73:	'futureOption',
        74:	'fixedIncome',
        75:	'sukukBonds',
        76:	'convertibleBond',
        77:	'mbs',
        78:	'govBond',
        79:	'corpBond',
        80:	'usAgencyBond',
        81:	'usTreasuryBill',
        82:	'usTreasuryCoupon',
        83:	'moneyMarket',
        84:	'cd',
        86:	'etf',
        88:	'forexFra',
        89:	'forexDeposit',
        90:	'forexForward',
        91:	'statistics',
        92:	'indexFuture',
        93:	'interestRateFuture',
        94:	'interestRateOption',
        95:	'commodityOption',
        96:	'commodityFuture',
        97:	'futureFuture',
        98:	'crudeOil',
        99:	'heatingOil',
        100: 'naturalGas',
        101: 'gold',
        102: 'silver',
        103: 'platinum',
        104: 'corn',
        105: 'currencyFuture',
        106: 'stockBorrowing',
        108: 'treasuryBill',
        109: 'lendingDate',
        110: 'borrowingDate',
        111: 'interbankDate',
        112: 'debenture',
        113: 'interventionRates',
        114: 'exchangeRates',
        115: 'economicPolicyDebt',
        116: 'financialSector',
        117: 'publicSector',
        118: 'healthPopulationStructure',
        119: 'generalCountryData',
        120: 'labourSocialProtection',
        121: 'sukuk',
        122: 'certificate'
    },

    AssetLangKeys: {
        1: 'equity',
        2: 'warrant',
        3: 'option',
        4: 'future',
        5: 'mutualFund',
        6: 'fixedIncome',
        7: 'forex',
        8: 'index',
        9: 'moneyMarket',
        10: 'commodity',
        11: 'stockBorrowing',
        12: 'countryData',
        13: 'alternatives',
        14: 'multiAssets',
        15: 'realEstate'
    },

    // TODO: [Imalka] Should be handled at runtime based on the response from https://data.directfn.com/mix2/ClientServiceProvider?SID=sid&UID=123&RT=300&L=EN&M=1&H=1&UNC=0
    InstrumentToAssetMapping: {
        0: 1,
        2: 5,
        5: 5,
        7: 8,
        10: 3,
        11: 7,
        14: 7,
        60:	1,
        61:	1,
        62:	1,
        63:	2,
        64:	1,
        65:	1,
        66:	1,
        67:	1,
        68:	4,
        69:	4,
        71:	3,
        72:	3,
        73:	3,
        74:	4,
        75:	6,
        76:	6,
        77:	6,
        78:	6,
        79:	6,
        80:	6,
        81:	6,
        82:	6,
        83:	9,
        84:	6,
        86:	1,
        88:	7,
        89:	7,
        90:	7,
        91:	7,
        92:	4,
        93:	4,
        94:	3,
        95:	3,
        96:	4,
        97:	4,
        98:	10,
        99:	10,
        100: 10,
        101: 10,
        102: 10,
        103: 10,
        104: 10,
        105: 4,
        106: 11,
        108: 6,
        109: 6,
        110: 6,
        111: 6,
        112: 6,
        113: 7,
        114: 7,
        115: 12,
        116: 12,
        117: 12,
        118: 12,
        119: 12,
        120: 12,
        121: 6,
        122: 1
    },

    // TODO: [Imalka] Should be handled at runtime based on the response from https://data.directfn.com/mix2/ClientServiceProvider?SID=sid&UID=123&RT=300&L=EN&M=1&H=1&UNC=0
    AssetToInstrumentMapping: {
        1: [0, 60, 61, 62, 64, 65, 66, 67, 86, 122],
        2: [63],
        3: [10, 71, 72, 73, 94, 95],
        4: [68, 69, 74, 92, 93, 96, 97, 105],
        5: [2, 5],
        6: [75, 76, 77, 78, 79, 80, 81, 82, 84, 108, 109, 110, 111, 112, 121],
        7: [11, 14, 88, 89, 90, 91, 113, 114],
        8: [7],
        9: [83],
        10: [98, 99, 100, 101, 102, 103, 104],
        11: [106],
        12: [115, 116, 117, 118, 119, 120],
        13: [],
        14: [],
        15: []
    }
};
export default assetTypes;