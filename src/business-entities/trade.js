// import Ember from 'ember';
import utils from '../../../../ua-kernal/utils/utils';
import sharedService from '../../../../ua-kernal/models/shared/shared-service';

//TODO: [Jayanes] Need to convert this file (computed property)
/*
export default Ember.Object.extend({
    sym: '',               // Symbol
    dSym: '',              // Display Symbol
    exg: '',               // Exchange
    inst: '',              // Instrument Type
    trp: 0,                // Traded Price
    trq: 0,               // Traded Quantity
    tts: '',               // Trade Time String
    mds: '',               // Market Date String
    tick: 0,               // Tick
    splits: 0,            // Splits
    nChg: '',              // Net Change
    pctChg: '',            // Percentage Change
    seq: '',               // Sequence
    vwap: '',              // VWAP
    trdType: 0,            // Trade Type
    buyCode: '',           // Buyer Code
    selCode: '',           // Seller Code

    isEmpty: false,        // Used to hide the row data before data updated.

    dDt: function () {
        var time = this.get('tts');

        return utils.formatters.formatToTime(time, this.get('exg'));
    }.property('tts'),      // Display date Time

    // TODO [Rasike] : No need to review this method until calculation logic get finalized.
    setTradeTick: function (prevTrp) {
        var currentTrp = this.get('trp');

        if (currentTrp === 0) {   // If default value for trp changed this need to be changed accordingly.
            currentTrp = prevTrp;
        }

        if (prevTrp < currentTrp) {
            this.set('tick', 1);
        } else if (prevTrp === currentTrp) {
            this.set('tick', 0);
        } else {
            this.set('tick', -1);
        }
    },

    sDes: function () {
        var stock = sharedService.getService('price').stockDS.getStock(this.get('exg'), this.get('sym'));
        return stock.sDes;
    }.property('sym'),

    buyerDes: function () {
        var exchange = sharedService.getService('price').exchangeDS.getExchange(this.get('exg'));
        return exchange.getBrokerDescription(this.get('buyCode'));
    }.property('buyCode'),

    sellerDes: function () {
        var exchange = sharedService.getService('price').exchangeDS.getExchange(this.get('exg'));
        return exchange.getBrokerDescription(this.get('selCode'));
    }.property('selCode'),

    dispProp1: function () {
        var stock = sharedService.getService('price').stockDS.getStock(this.get('exg'), this.get('sym'));
        return stock.get('dispProp1');
    }.property('sym'),

    setData: function (symbolMessage) {
        var that = this;

        Ember.$.each(symbolMessage, function (key, value) {
            that.set(key, value);
        });
    }
});*/
