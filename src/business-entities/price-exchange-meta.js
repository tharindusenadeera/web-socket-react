import PersistentObject from '../../../../ua-kernal/models/shared/business-entities/persistent-object';
import utils from '../../../../ua-kernal/utils/utils';

export default  class  PriceExchangeMeta extends PersistentObject{
    constructor () {
        super();
        this.cacheKey = 'priceExchangeMeta';
        this.isCompress = true;
        this.exgMetaData = {};

    }

    getExgSummaryObj () {
        if (Object.keys(this.exgMetaData).length === 0) {
            this.exgMetaData = {HED: {}, DAT: {}, VRS: {}};
        }
        return this.exgMetaData;
    }

    setData (userParams) {
        if (userParams) {
            super.setData(userParams);
        } else {
            this.exgMetaData = {HED: {}, DAT: {}, VRS: {}};
        }
    }

    save (language) {
        super.save(utils.Constants.StorageType.Local, undefined, language);
    }

    load (language) {
        return super.load(utils.Constants.StorageType.Local, language);
    }

    getPersistentData () {
        return {exgMetaData: this.exgMetaData};
    }
}