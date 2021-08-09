import PersistentObject from '../../../../ua-kernal/models/shared/business-entities/persistent-object';
import utils from '../../../../ua-kernal/utils/utils';

export default class PriceSymbolMeta extends PersistentObject {
    // RT = 303
    constructor() {
        super();
        this.cacheKey = 'priceSymbolMeta';
        this.isCompress = true;
        this.metaData = {};
    }

    getExgMetaObj (exchange) {
        let exgObj = this.metaData[exchange];

        if (!exgObj) {
            exgObj = {DAT: {TD: {}, VRS: [0]}, HED: {TD: {}}};
            this.metaData[exchange] = exgObj;
        }

        return exgObj;
    }

    setData (userParams) {
        if (userParams) {
            super.setData(userParams);
        } else {
            this.metaData = {};
        }
    }

    save (language) {
        super.save(utils.Constants.StorageType.Local, undefined, language);
    }

    load (language) {
        return super.load(utils.Constants.StorageType.Local, language);
    }

    getPersistentData () {
        return {metaData: this.metaData};
    }

}