import DepthRecord from './depth-record';
import priceConstants from '../../../../ua-kernal/models/price/price-constants';
import languageDataStore from '../../../../ua-kernal/models/shared/language/language-data-store';
import appConfig from '../../../../ua-kernal/config/app-config';
import utils from '../../../../ua-kernal/utils/utils';

export default class Depth {
    constructor (depthObj) {
        this.app = languageDataStore.getLanguageObj();
        this.sym = depthObj.sym;                                            // Symbol
        this.exg =depthObj.exg;                                             // Exchange
        this.dt = depthObj.dt;    // Depth Type (DepthByPrice: 1, DepthByOrder: 2)
        this.bidRecords =[];                                      // Bid side records
        this.offerRecords =[];                                    // Offer side records

        // Calculation related params

        this.minBidQty =  Number.MAX_VALUE;
        this.maxBidQty = 0;
        this.minOfferQty =  Number.MAX_VALUE;
        this.maxOfferQty =0;

        // All possible values for market depth fields
        // type: integer - 0 or 1 only
        // level: integer - any positive value including zero
        // price: number with decimal - can be minus / zero / positive / undefined
        // quantity: integer - zero / positive / undefined
        // split: integer - positive / undefined

        // Protocol: https://fiber.directfn.net/display/PROC/Market+Depth+Protocol+-+UA

    }

    setData (depthMessage, depthType) {
        let that = this;
        let bidMinIndex = Infinity;
        let offerMinIndex = Infinity;

        depthMessage.forEach(function (depthObj,key) {
            if (depthObj !== undefined) {

                if ((depthObj.type === priceConstants.MarketDepthSide.Bid || depthObj.type === priceConstants.MarketDepthSide.Offer) &&
                    (depthObj.lvl !== '' && !isNaN(depthObj.lvl) && depthObj.lvl >= 0)) {
                    // Take correct record list
                    let recordArray = depthObj.type === priceConstants.MarketDepthSide.Bid ? that.bidRecords : that.offerRecords;

                    if (depthObj.qty === 0 || (depthObj.qty === undefined && depthObj.prc === undefined && depthObj.splt === undefined)) {
                        // Depth record not available / matched (to be removed)
                        // Apply the depth reset logic
                        // Reset logic : For both market depth types, if the quantity received as 0, then all records after that level should be removed
                        // Find min index to remove from depth array and remove after the loop to make sure array index exceptions are not thrown
                        if (depthObj.type === priceConstants.MarketDepthSide.Bid) {
                            bidMinIndex = bidMinIndex > depthObj.lvl ? depthObj.lvl : bidMinIndex;
                        } else {
                            offerMinIndex = offerMinIndex > depthObj.lvl ? depthObj.lvl : offerMinIndex;
                        }
                    } else {
                        // Add depth record
                        // Check for the existence of the level, if not create a new one
                        let record = recordArray.objectAt(depthObj.lvl);

                        if (!record) {
                            record = new DepthRecord();
                            that._addRecordToArray(recordArray, depthObj.lvl, record);
                        }

                        // Set depth data received into object in the array
                        that._setDepthData(depthObj, record, depthType);
                    }
                } else {
                    utils.logger.logError('Invalid depth type: ' + depthObj.type + ' or Invalid depth level: ' + depthObj.lvl);
                }
            } else {
                utils.logger.logError('Depth object not available');
            }
        });
    }

    _setDepthData (depthObj, depthRecord, depthType) {
        // Use previous value if new value is invalid
        depthObj.prc = isNaN(depthObj.prc) ? depthRecord.prc : depthObj.prc;
        depthObj.qty = isNaN(depthObj.qty) ? depthRecord.qty : depthObj.qty;
        depthObj.splt = isNaN(depthObj.splt) ? depthRecord.splt : depthObj.splt;



        // Format price according to the customizations
        if (appConfig.customisation.isMKDepthSpecialValuesAllowed && depthObj.prc && depthObj.prc < 0) {
            let mappedValue = this.app.lang.labels[priceConstants.priceValueMapping[depthObj.prc]];
            depthObj.dispPrc = mappedValue ? mappedValue : depthObj.prc;
        } else if (depthObj.prc || depthObj.prc === 0) {
            depthObj.dispPrc = depthObj.prc;
        } else {
            // Only updated and initial price values are updated here
        }

        depthRecord.setData(depthObj);

        if (depthType === priceConstants.MarketDepthType.DepthByOrder) {
            // Fill the sequence manually
            depthRecord.splt= depthObj.lvl + 1;
        }
    }

    _addRecordToArray (recordArray, depthLevel, recordToAdd) {
        // Pushing is incorrect because we cannot guarantee data receiving in ascending order all the time
        if (recordArray.length < depthLevel) {
            // Fill out remaining indices up to adding index with empty depth records
            for (let i = recordArray.length; i < depthLevel; i++) {
                recordArray.splice(i,0, new DepthRecord());
            }

            recordArray.splice(depthLevel,0, recordToAdd);
        } else if (recordArray.length === depthLevel) {
            // Add new depth record at the end of the array
            recordArray.splice(depthLevel,0, recordToAdd);
        } // Else is not required because if index is already existing, new object will not create
    }

    calculateBidBarValues () {
        // Bid side calculations
        let that = this;
        let tempVal;
        let highestVolIndex = -1;
        let arrRecords = that.bidRecords;

        that.minBidQty = Number.MAX_VALUE;
        that.maxBidQty = 0;

        arrRecords.forEach(function (item, index) {
            tempVal = parseInt(item.qty, 10);

            if (index === 0) {
                item.isBestPrice= true;
            }

            if (tempVal < that.minBidQty) {
                that.sminBidQty = tempVal;
            }

            if (tempVal > that.maxBidQty) {
                that.maxBidQty = tempVal;
                highestVolIndex = index;
            }
        });

        // Now calculate the percentages
        let min = that.minBidQty;
        let max = that.maxBidQty;

        arrRecords.forEach(function (item) {
            let percentage = 20 + (100 * (parseInt(item.qty, 10) - min) / (max - min) * 0.8);
            item.per = 'width:' + percentage + '%';

            if (highestVolIndex > -1) {
                if (item.qty === max) {
                    item.isHighestVol = true;
                } else {
                    item.isHighestVol = false;
                }
            }
        });
    }

    calculateOfferBarValues () {
        // Offer side calculations
        let that = this;
        let tempVal;
        let highestVolIndex = -1;
        let arrRecords = that.offerRecords;

        that.minOfferQty= Number.MAX_VALUE;
        that.maxOfferQty = 0;

        arrRecords.forEach(function (item, index) {
            tempVal = parseInt(item.qty, 10);

            if (index === 0) {
                item.isBestPrice = true;
            }

            if (tempVal < that.minOfferQty) {
                that.minOfferQty = tempVal;
            }

            if (tempVal > that.maxOfferQty) {
                that.maxOfferQty = tempVal;
                highestVolIndex = index;
            }
        });

        // Now calculate the percentages
        let min = that.minOfferQty;
        let max = that.maxOfferQty;

        arrRecords.forEach(function (item) {
            let percentage = 20 + (100 * (parseInt(item.qty, 10) - min) / (max - min)) * 0.8;
            item.per = 'width:' + percentage + '%';

            if (highestVolIndex > -1) {
                if (item.qty === max) {
                    item.isHighestVol = true;
                } else {
                    item.isHighestVol = false;
                }
            }
        });
    }
}