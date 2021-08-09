import Stock from '../../price/business-entities/stock';

//TODO: [Jayanes] Need to convert this file (computed property)
/*export default Stock.extend({
    trdExg: undefined,
    optExg: undefined,
    baseSym: undefined,
    optPrd: undefined,
    strkPrc: undefined,
    nearMon: undefined,
    optWeek: undefined,

    // Please do not access any properties inside below fields to map to ember table via price-widget-config
    // If do so, cannot identify user clicked column name as it is a second level property of below objects
    cStock: {},
    pStock: {},

    // All below properties are already available in 'cStock' and 'pStock'
    // But there is an issue when accessing these fields when identifying user clicked column name due to second level properties
    // Therefore exposed all required properties as first level properties to overcome that issue
    cSym: function () {
        return this.get('cStock.sym');
    }.property('cStock.sym'),

    cDisSym: function () {
        return this.get('cStock.dSym');
    }.property('cStock.dSym'),

    cExg: function () {
        return this.get('cStock.exg');
    }.property('cStock.exg'),

    cInst: function () {
        return this.get('cStock.inst');
    }.property('cStock.inst'),

    cLtp: function () {
        return this.get('cStock.ltp');
    }.property('cStock.ltp'),

    cChg: function () {
        return this.get('cStock.chg');
    }.property('cStock.chg'),

    cBbp: function () {
        return this.get('cStock.bbp');
    }.property('cStock.bbp'),

    cBap: function () {
        return this.get('cStock.bap');
    }.property('cStock.bap'),

    cVol: function () {
        return this.get('cStock.vol');
    }.property('cStock.vol'),

    pSym: function () {
        return this.get('pStock.sym');
    }.property('pStock.sym'),

    pDisSym: function () {
        return this.get('pStock.dSym');
    }.property('pStock.dSym'),

    pExg: function () {
        return this.get('pStock.exg');
    }.property('pStock.exg'),

    pInst: function () {
        return this.get('pStock.inst');
    }.property('pStock.inst'),

    pLtp: function () {
        return this.get('pStock.ltp');
    }.property('pStock.ltp'),

    pChg: function () {
        return this.get('pStock.chg');
    }.property('pStock.chg'),

    pBbp: function () {
        return this.get('pStock.bbp');
    }.property('pStock.bbp'),

    pBap: function () {
        return this.get('pStock.bap');
    }.property('pStock.bap'),

    pVol: function () {
        return this.get('pStock.vol');
    }.property('pStock.vol')
});*/
