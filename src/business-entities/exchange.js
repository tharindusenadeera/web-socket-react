// import Ember from 'ember';
import languageDataStore from '../../../../ua-kernal/models/shared/language/language-data-store';
import sharedService from '../../../../ua-kernal/models/shared/shared-service';

//TODO: [Jayanes] Need to convert this file (computed property)
export default class Exchange {
    constructor(exchangeObject) {
        this.app = exchangeObject.app;
        this.exg = exchangeObject.exg;              // Exchange
        this.des = exchangeObject.des;               // Description
        this.sDes = exchangeObject.sDes;              // Short Description
        this.dcf = exchangeObject.dcf;               // Decimal Correction Factor
        this.dep = exchangeObject.dep;               // Decimal Places
        this.de = exchangeObject.de;                // Display exchange
        this.stat = exchangeObject.stat;              // Market Status
        this.cur = exchangeObject.cur;               // Currency
        this.delTime = exchangeObject.delTime;           // Market Data Delayed Time (in minutes)
        this.country = exchangeObject.country;           // Country Code
        this.tzo = exchangeObject.tzo;               // Time zone offset
        this.date = exchangeObject.date;              // Market Date
        this.time = exchangeObject.time;              // Market Time
        this.led = exchangeObject.led;               // Last Eod Date - Need to check the usage of this
        this.ups = exchangeObject.ups;               // UPs
        this.dwns = exchangeObject.dwns;              // Downs
        this.nChg = exchangeObject.nChg;              // No Change
        this.symt = exchangeObject.symt;              // Number of Symbols Traded
        this.vol = exchangeObject.vol;               // Volume
        this.tovr = exchangeObject.tovr;              // TurnOver
        this.trades = exchangeObject.trades;            // No Of Trades
        this.mktCap = exchangeObject.mktCap;            // Market Capitalisation
        this.mboal = exchangeObject.mboal;              // MboAdvancedLimit
        this.mbol = exchangeObject.mbol;
        this.mbpal = exchangeObject.mbpal;              // MbpAdvancedLimit
        this.mbpl = exchangeObject.mbpl;
        this.mboae = exchangeObject.mboae;          // IsAdvancedMboEnabled
        this.mbpae = exchangeObject.mbpae;          // IsAdvancedMbpEnabled
        this.virtual = exchangeObject.virtual;        // IsVirtual Exchange
        this.cio = exchangeObject.cio;               // Cash In No of Orders
        this.civ = exchangeObject.civ;               // Cash In Volume
        this.cit = exchangeObject.cit;               // Cash In Turn Over
        this.coo = exchangeObject.coo;               // Cash Out No of Orders
        this.cov = exchangeObject.cov;               // Cash Out Volume
        this.cot = exchangeObject.cot;               // Cash Out Turnover
        this.netCashPer = exchangeObject.netCashPer;        // Net Cash per
        this.cashInPer = exchangeObject.cashInPer;         // Cash in per
        this.mainIdx = exchangeObject.mainIdx;           // Main index
        this.newsProv = exchangeObject.newsProv;          // News Provider
        this.openTime = exchangeObject.openTime;          // Market Open Time
        this.closeTime = exchangeObject.closeTime;         // Market Close Time
        this.statStr = exchangeObject.statStr;           // Market Status String
        this.subMarketArray = exchangeObject.subMarketArray;    // Sub Markets
        this.tick = exchangeObject.tick;               // Exchange Tick Size
        this.statStrLong = exchangeObject.statStrLong;
        this.brokerMapping = exchangeObject.brokerMapping;     // Broker Mapping
        this.exgOtherDesc = exchangeObject.exgOtherDesc;      // Exchange Other Description
        this.mktDateTime = exchangeObject.mktDateTime;
        this.tzId = exchangeObject.tzId;
    }

    init () {
        this.app = languageDataStore.getLanguageObj();
    }

    getBrokerDescription (brokerCode, isLongDes) {
        let brokerMapping = this.brokerMapping;
        let broker = brokerMapping[brokerCode];

        if (broker) {
            if (isLongDes) {
                return broker.longDes ? broker.longDes : sharedService.userSettings.displayFormat.noValue;
            } else {
                return broker.shortDes ? broker.shortDes : sharedService.userSettings.displayFormat.noValue;
            }
        } else {
            return sharedService.userSettings.displayFormat.noValue;
        }
    }

    getBrokerCollection () {
        return this.brokerMapping;
    }

    setData (exchangeMessage) {
        let that = this;

        Object.keys(exchangeMessage).forEach(function(key) {
            that.key = exchangeMessage[key];
        });
    }
}