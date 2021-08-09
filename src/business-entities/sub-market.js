// import Ember from 'ember';
import languageDataStore from '../../../../ua-kernal/models/shared/language/language-data-store';

//TODO: [Jayanes] Need to convert this file (computed property)
export default class SubMarket {
    constructor(subMarketObj) {
        this.marketId = subMarketObj.marketId;
        this.lDes = subMarketObj.lDes;
        this.def = subMarketObj.def;
        this.isMktSummary = subMarketObj.isMktSummary;
        this.stat = subMarketObj.stat;
        this.exg = subMarketObj.exg;
        this.app = subMarketObj.app;
    }

    init () {
        this.app = languageDataStore.getLanguageObj();
    }

    /*statStr () {
        return this.app.lang.labels['mktStatus_' + this.get('stat')]; // Sub Market Status String
    }.property('stat', 'lDes')*/

    setData (subMktMsg) {
        let that = this;

        Object.keys(subMktMsg).forEach(function(key) {
            that.key = subMktMsg[key];
        });
    }
}