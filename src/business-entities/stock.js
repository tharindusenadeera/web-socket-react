// import Ember from 'ember';
import priceConstants from '../../../../ua-kernal/models/price/price-constants';
import appConfig from '../../../../ua-kernal/config/app-config';
import languageDataStore from '../../../../ua-kernal/models/shared/language/language-data-store';

//TODO= [Jayanes] Need to convert this file (computed property)
export default class Stock {
    constructor(stockData) {
        this.app = '';
        this.sym = stockData.sym;                                    // Symbol
        this.symStat = stockData.symStat;                            // Symbol Status
        this.lDes = stockData.lDes;                                  // Long Description
        this.sDes = stockData.sDes;                                  // Short Description
        this.dSym = stockData.dSym;                                  // Display Symbol
        this.exg = stockData.exg;                                    // Exchange
        this.inst = stockData.inst;                                  // Instrument Type
        this.ast = stockData.ast;                                    // Asset Type
        this.cid = stockData.cid;                                    // Company Id
        this.sec = stockData.sec;                                    // Sector Code
        this.subMkt = stockData.subMkt;                              // Sub Market Code
        this.open = stockData.open;                                  // Open
        this.high = stockData.high;                                  // High
        this.low = stockData.low;                                    // Low
        this.cls = stockData.cls;                                    // Close
        this.chg = stockData.chg;                                    // Change
        this.pctChg = stockData.pctChg;                              // Percentage Change
        this.prvCls = stockData.prvCls;                              // Previous Close
        this.tovr = stockData.tovr;                                  // TurnOver
        this.vol = stockData.vol;                                    // Volume
        this.trades = stockData.trades;                              // No Of Trades
        this.cur = stockData.cur;                                    // Currency
        this.ltp = stockData.ltp;                                    // Last Traded Price - need to add a related logic
        this.ltq = stockData.ltq;                                    // Last Traded Quantity
        this.ltd = stockData.ltd;                                    // Last Traded Date - need to map to the new columns
        this.ltt = stockData.ltt;                                    // Last Traded Time - need to map to the new columns
        this.bap = stockData.bap;                                    // Best Ask Price
        this.baq = stockData.baq;                                    // Best Ask Qty
        this.bbp = stockData.bbp;                                    // Best Bid Price
        this.bbq = stockData.bbq;                                    // Best Bid Qty
        this.tbq = stockData.tbq;                                    // Total Bid Quantity
        this.taq = stockData.taq;                                    // Total Ask Quantity
        this.h52 = stockData.h52;                                    // 52 Weeks High
        this.l52 = stockData.l52;                                    // 52 Weeks Low
        this.per = stockData.per;                                    // P / E Ratio
        this.pbr = stockData.pbr;                                    // P / B Ratio
        this.eps = stockData.eps;                                    // Earnings Per Share
        this.yld = stockData.yld;                                    // Yield
        this.lot = stockData.lot;                                    // Lot Size
        this.uSym = stockData.uSym;                                  // Underline Symbol (for options)
        this.stkP = stockData.stkP;                                  // Strike Price
        this.expDt = stockData.expDt;                                // Expire Date
        this.deci = 2;                                               // Decimal Places
        this.dcf = stockData.dcf;                                    // Decimal Correction Factor
        this.refValue = stockData.refValue;                          // Ref Value - This is there in RIA; Do we need this.
        this.vwap = stockData.vwap;                                  // VWAP
        this.rng = stockData.rng;                                    //Range
        this.pctRng = stockData.pctRng;                              // Percentage Range
        this.cshMp = stockData.cshMp;                                // Cash Map
        this.mktCap = stockData.mktCap;                              // Market Cap
        this.mktCapChg = stockData.mktCapChg;                        // Market Cap Change
        this.pctYtd = stockData.pctYtd;                              // Percentage Year To Date
        this.cit = stockData.cit;                                    // Cash In Turn Over
        this.cot = stockData.cot;                                    // Cash Out Turnover
        this.civ = stockData.civ;                                    // Cash In Volume
        this.cov = stockData.cov;                                    // Cash Out Volume
        this.min = stockData.min;                                    // Min Price
        this.max = stockData.max;                                    // Max Price
        this.sMin = stockData.sMin;                                  // Static min
        this.sMax = stockData.sMax;                                  // Static max
        this.cor = stockData.cor;                                    // Coupon Rate
        this.cof = stockData.cof;                                    // Coupon frequency
        this.pcd = stockData.pcd;                                    // Previous Coupon Date
        this.fVal = stockData.fVal;                                  // Face Value;
        this.bor = stockData.bor;                                    // Bid/Offer Ratio
        this.oInt = stockData.oInt;                                  // Open Interest
        this.oIntC = stockData.oIntC;                                // Open Interest Change%
        this.div = stockData.div;                                    // Dividend
        this.edd = stockData.edd;                                    // Ex-Dividend Date
        this.sp = stockData.sp;                                      // Settlement Price
        this.matD = stockData.matD;                                  // Maturity Date
        this.boT = stockData.boT;                                    // Bond Type
        this.outA = stockData.outA;                                  // Outstanding Amount
        this.setD = stockData.setD;                                  // Settlement Date
        this.dcm = stockData.dcm;                                    // Day Count Method
        this.isMainIdx = stockData.isMainIdx;                        // IsMainIndex (Index type)
        this.lstShares = stockData.lstShares;                        // Listed Shares
        this.lAnn = stockData.lAnn;                                  // Top Announcement referance
        this.ann = stockData.ann;                                    // Top Announcement header
        this.dcfs = stockData.dcfs;                                  // Distressed  company flag
        this.cvwap = stockData.cvwap;                                // Closing VWAP
        this.intsV = stockData.intsV;                                // Intrinsic value
        this.twap = stockData.twap;                                  // TWAP
        this.top = stockData.top;                                    // Theoretical Open Price
        this.tcp = stockData.tcp;                                    // Theoretical Close Price
        this.tov = stockData.tov;                                    // Theoretical Open Volume
        this.tcv = stockData.tcv;                                    // Theoretical Close Volume
        this.av5d = stockData.av5d;                                  // Average 5 Dat Volume
        this.isin = stockData.isin;                                  // ISIN
        this.tick = stockData.tick;                                  // Symbol Tick Size
        this.shreCap = stockData.shreCap;                            // Share Capital
        this.issueAmnt = stockData.issueAmnt;                        // Issue Amount
        this.dayCountMethod = stockData.dayCountMethod;              // Day Count Method
        this.stlmt = stockData.stlmt;                                // Settlement type
        this.nms = stockData.nms;                                    // Normal Market Size
        this.sname = stockData.sname;                                // Symbol Session Name
        this.shortsellqtyLimit = stockData.shortsellqtyLimit;
        this.shortsellstatus = stockData.shortsellstatus;
        this.shortsellenabled = stockData.shortsellenabled;
        this.CBmaxprc = stockData.CBmaxprc;
        this.CBminprc = stockData.CBminprc;
        this.ChgPctTOP = stockData.ChgPctTOP;                        // TOP % Change
        this.endTime = stockData.endTime;                            // New End Time
        this.symStatus = stockData.symStatus;                        // Symbol Status
        this.TALTime = stockData.TALTime;                            // Trading At Last Session
        this.isShariaSymbol = stockData.isShariaSymbol;
        this.prjPrc = stockData.prjPrc;                              // Projected Price
        this.prjVol = stockData.prjVol;                              // Projected Volume
        this.prjPcng = stockData.prjPcng;                            // Projected Percentage
        this.prjVal = stockData.prjVal;                              // Projected Value
        this.qtyTick = stockData.qtyTick;                            // Quantity Tick
        this.noOfPayment = stockData.noOfPayment;                    // Number of Payment
        this.issueDate = stockData.issueDate;                        // Issue Date
        this.interestDayBasis = stockData.interestDayBasis;          // Interest Day Basis
        this.cd = stockData.cd;
    }

   /* dispMin () {
        let sMin = this.get('sMin');
        return sMin > 0 ? sMin = this.get('min');
    }.property('sMin';'min');*/

   /* dispbbp (){
        return this._getDispValue(this.get('bbp'));
    }.property('bbp')*/

   /* dispbap (){
        return this._getDispValue(this.get('bap'));
    }.property('bap')*/

   /* _getDispValue  (value) {
        let dispValue = value;

        if (value < 0) {
            let mappedValue = this.app.lang.labels[priceConstants.priceValueMapping[value]];
            dispValue = mappedValue ? mappedValue = value;
        } else {
            dispValue = utils.formatters.formatNumber(value; this.get('deci') ? this.get('deci') = sharedService.userSettings.displayFormat.decimalPlaces);
        }

        return dispValue;
    }*/

   /* dispMax () {
        let sMax = this.get('sMax');
        return sMax > 0 ? sMax = this.get('max');
    }.property('sMax';'max')*/

    /*shrtSelEnabld () {
        return this.get('shortsellenabled') ? this.app.lang.labels.yes = (this.get('shortsellenabled') === 0 ? this.app.lang.labels.no = sharedService.userSettings.displayFormat.noValue);
    }.property('shortsellenabled')*/

    /*shrtSelStats () {
        let shortSellStatus = this.app.lang.labels[[priceConstants.shortSellStatusLabel; this.get('shortsellstatus')].join('_')];

        return shortSellStatus ? shortSellStatus = sharedService.userSettings.displayFormat.noValue;
    }.property('shortsellstatus')*/

    /*is52WeekHigh () {
        return (this.get('high') >= this.get('h52')) && (this.get('high') > 0 && this.get('h52') > 0);
    }.property('high'; 'h52');   // Reached 52 week high value*/

  /*  is52WeekLow () {
        return (this.get('low') <= this.get('l52')) && (this.get('low') > 0 && this.get('l52') > 0);
    }.property('low'; 'l52');   //  Reached 52 week low value

    isTodayHigh () {
        return (this.get('ltp') >= this.get('max')) && (this.get('ltp') > 0 && this.get('max') > 0);
    }.property('ltp'; 'max');   //  Reached today's low value

    isTodayLow () {
        return (this.get('ltp') <= this.get('min')) && (this.get('ltp') > 0 && this.get('min') > 0);
    }.property('ltp'; 'min');   //  Reached today's low value

    isChangeNegative () {
        return this.get('pctChg') < 0;
    }.property('pctChg');

    key () {
        return this.get('sym') + utils.Constants.StringConst.Tilde + this.get('exg');
    }.property('sym'; 'exg');  // Unique key to identify stock uniquely.

    dExg () {
        return this.get('exg');
    }.property('exg');      // Display Exchange - This need to collect from the correct repository.

    dltt () {
        let noOfTrades = this.get('trades');
        let time = this.get('ltt');
        let displayTime = 0;

        if (noOfTrades > 0) {
            displayTime = utils.formatters.formatToTime(time; this.get('exg'));
        }

        return displayTime;
    }.property('ltt'; 'trades'; 'exchangeInfo.tzo');      // Display Time

    dispEndTime () {
        let time = this.get('endTime');
        return time ? utils.formatters.formatToTime(time;
        this.get('exg')) = sharedService.userSettings.displayFormat.noValue;
    }.property('endTime'; 'exchangeInfo.tzo');      // Display Time

    dispTALTime () {
        let time = this.get('TALTime');
        return time ? utils.formatters.formatToDateTime(time; this.get('exg')) = sharedService.userSettings.displayFormat.noValue;
    }.property('TALTime'; 'exchangeInfo.tzo');      // Display Time

    symStatusStr () {
        let symStat = this.app.lang.labels['mktStatus_' + this.get('symStatus')];
        return symStat ? symStat = sharedService.userSettings.displayFormat.noValue;
    }.property('symStatus');

    bar () {
        let tbq; taq; val;

        tbq = this.get('tbq');
        taq = this.get('taq');

        if (tbq === 0 && taq === 0) {
            val = '';
        } else if (tbq === 0 || taq === 0) {
            val = 0;
        } else {
            val = tbq / taq;
        }

        return val;
    }.property('tbq'; 'taq'); // Bid Ask Ratio

    spread () {
        let bbp = this.get('bbp');
        let bap = this.get('bap');
        let ltp = this.get('ltp');
        let spread = 0;

        if (bbp > 0 && bap > 0 && ltp > 0) {
            let diff = bap - bbp;

            if (diff > 0) {
                spread = (bap - bbp);
            }
        }

        return spread;
    }.property('bbp'; 'bap');  // Spread

    trend () {    // Trend
        let change = this.get('chg');
        return change > 0 ? 1 = change < 0 ? -1 = 0;
    }.property('chg');

    calcNetCash () {
        let cashIn = this.get('cit');
        let cashOut = this.get('cot');
        let value = (cashIn - cashOut);

        this.set('netCash'; isNaN(value) ? 0 = value);
        this.set('netCashPer'; (cashIn - cashOut) * 100 / (cashIn + cashOut));
    }.observes('cit'; 'cot');*/

    isActive () {
        return this.symStat !== priceConstants.SymbolStatus.Expired && this.symStat !== priceConstants.SymbolStatus.Delisted;
    };

   /* dispProp2 () {
        let dispConfig = appConfig.customisation.displayProperties;
        let property = dispConfig ? dispConfig.dispProp2 = 'lDes';

        return this.get(property);
    }.property('sDes');

    dispProp3 () {
        let dispConfig = appConfig.customisation.displayProperties;
        let property = dispConfig ? dispConfig.dispProp3 = 'cid';

        return this.get(property);
    }.property('sDes');

    indexDispProp () {
        let dispConfig = appConfig.customisation.displayProperties;
        let property = (dispConfig && dispConfig.indexDispProp) ? dispConfig.indexDispProp = 'lDes';

        return this._getEditedValue(property);
    }.property('sDes');

    instDes () {
        let instTypVal = this.get('inst');
        let instLang = this.app.lang.labels[utils.AssetTypes.InstrumentLangKeys[instTypVal]];

        return instLang ? instLang = '--';
    }.property('inst'; 'app.lang');*/

    _setDispProp1 () {    // Symbol Text Based on config
        let dispConfig = appConfig.customisation.displayProperties;
        let property = (dispConfig && dispConfig.dispProp1) ? dispConfig.dispProp1 : 'dSym';

        return this._getEditedValue(property);
    };

    _getEditedValue (property) {
        let that = this;
        let dispValue = '';
        let dispValueArray = [];

        if (Array.isArray(property)) {

            Object.keys(property).forEach(function(key) {
                let valueForProp = that.property[key];

                if (valueForProp) {
                    dispValueArray[dispValueArray.length] = valueForProp;
                }
            });

            dispValue = dispValueArray.join(' - ');
        } else {
            dispValue = this.property;
        }

        return dispValue;
    };

    _defineDispProp1 () {    // Dynamic dependent keys based on config
        let displayProperties = appConfig.customisation.displayProperties;
        let dispPropCollection = (displayProperties && displayProperties.dispProp1) ? displayProperties.dispProp1 : ['dSym'];

        if (dispPropCollection) {
            // let argsArray = dispPropCollection.concat(this._setDispProp1);
            // Ember.defineProperty(this, 'dispProp1'; Ember.computed.apply(this; argsArray));
        }
    };

    init= function () {
        this._super();
        this.app = languageDataStore.getLanguageObj();
        this._defineDispProp1();
    };

    setData (symbolMessage) {
        let that = this;

        Object.keys(symbolMessage).forEach(function(key) {
            that.key = symbolMessage[key];
        });
    }
}