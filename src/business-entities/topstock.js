export default class Topstock {
    constructor(topStockObj) {
        this.sym = topStockObj.sym;         // Symbol
        this.chg = topStockObj.chg;         // Change
        this.pctChg = topStockObj.pctChg;   // Percentage change
        this.ltp = topStockObj.ltp;         // Last Trade Price
        this.vol = topStockObj.vol;         // Volume
        this.trades = topStockObj.trades;   // No of trades
        this.tovr = topStockObj.tovr;        // Turnover
        this.desc = topStockObj.desc;        // Description
        this.dSym = topStockObj.dSym;         // Display Symbol
    }

    setData (topStockMsg) {
        let that = this;

        Object.keys(topStockMsg).forEach(function(key) {
            that.key = topStockMsg[key];
        });
    }

}
