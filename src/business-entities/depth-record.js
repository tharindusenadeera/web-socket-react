import priceConstants from '../../../../ua-kernal/models/price/price-constants';

export default class DepthRecord {
    constructor () {
            this.type= '';               // Depth side (bid = 0 or offer = 1)
            this.lvl= '';                // Depth level
            this.prc= '';                // Price
            this.qty= '';                // Quantity
            this.splt= '';               // Number of splits
            this.per= '';                // Bar width percentage
            this.isHighestVol= false;    // Is highest Volume
            this.dispPrc= '';            // Depth display price
        
    }

    isBid () {
        return this.type === priceConstants.MarketDepthSide.Bid;
    }

    setData (depthRecord) {
        let that = this;

        Object.keys(depthRecord).forEach(function(key) {
            that.key =depthRecord[key];
        });

    }
}