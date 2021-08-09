import PersistentObject from '../../../../ua-kernal/models/shared/business-entities/persistent-object';

export default class PriceUserData extends PersistentObject{
    constructor() {
        super();
        this.cacheKey = 'priceUserData';
        // This object contains user data shared across same type of widgets
        // Data key is dynamic and not pre-defined
    }

    setData (dataObj) {
        // BUG | ICAPSUPPOR-838 | [HTML5] Favorites watch list stores only 5 symbols in iPhone application
        // Live stock object array separated from local storage content
        // Local storage will have only the keys of the stock objects added to custom watch lists, not stock data store references
        if (dataObj) {
            let that = this;

            if (dataObj.customWL) {
                Object.keys(dataObj.customWL).forEach(function(key) {
                    let tempObject = dataObj.customWL[key].stkArray;
                    if (tempObject) {
                        let savedStockArray = [];

                        Object.keys(tempObject).forEach(function(key) {

                            if (tempObject[key] && tempObject[key].app) {
                                // Backward compatible code
                                // Checks whether saved object consists of unnecessary data by checking a selected property
                                // /if found, creates a simple object only with keys to identify stock object uniquely
                                savedStockArray[savedStockArray.length] = {
                                    sym: tempObject[key].sym,
                                    exg: tempObject[key].exg,
                                    inst: tempObject[key].inst,
                                    subMkt: tempObject[key].subMkt
                                };
                            } else {
                                // If saved object does not contain unnecessary fields, simply use the same object
                                savedStockArray[savedStockArray.length] = tempObject[key];
                            }
                        });

                        tempObject = savedStockArray;
                    }


                });
            }

            Object.keys(dataObj).forEach(function(key) {
                that.key =dataObj[key];
            });

        }
    }
}