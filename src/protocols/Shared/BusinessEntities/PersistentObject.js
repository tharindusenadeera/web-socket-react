import utils from '../../../util/utils/utils';
// import languageDataStore from '../language/language-data-store';

export default class PersistentObject {
    constructor() {
        this.cacheKey = '';
        this.isEncrypt = false;
        this.isCompress = false;
        this.persistData = {};
    }

    setData (dataObj) {
        if (dataObj) {
            let that = this;

            Object.keys(dataObj).forEach(function(key) {
                that.key = dataObj[key];
            });
        }
    }

    save (storageType, saveImmediately, language, windowId) {
        let saveString = utils.jsonHelper.convertToJson(this.getPersistentData());

        if (this.isEncrypt) {
            saveString = utils.crypto.encryptText(saveString);
        }

        if (this.isCompress) {
            saveString = utils.compressionHelper.getCompressedString(saveString);
        }
        utils.webStorage.addString(utils.webStorage.getKey(this.cacheKey, language, windowId), saveString, storageType, saveImmediately);
    }

    load (storageType, language, windowId) {
        let savedObj;
        let savedString = utils.webStorage.getString(utils.webStorage.getKey(this.cacheKey, language, windowId), utils.Constants.StorageType.Local);

        if (this.isCompress) {
            savedString = utils.compressionHelper.getDecompressedString(savedString);
        }

        if (this.isEncrypt && utils.validators.isAvailable(savedString)) {
            try {
                savedString = utils.crypto.decryptText(savedString);
            } catch (e) {
                utils.logger.logWarning('Decryption failed retrieving data from storage : ' + this.cacheKey + language);
            }
        }

        try {
            savedObj = utils.jsonHelper.convertFromJson(savedString);
        } catch (e) {
            utils.logger.logWarning('Json parse failed retrieving data from storage : ' + this.cacheKey + language);
        }

        this.setData(savedObj);

        return savedObj;
    }

    remove (storageType, language, windowId) {
        utils.webStorage.remove(utils.webStorage.getKey(this.cacheKey, language, windowId), storageType);
    }

    clearSavedData () {
        // let that = this;
        // let languages = languageDataStore.getUserLanguages();

        // Object.keys(languages).forEach(function(key) {
        //     that.remove(utils.Constants.StorageType.Local, languages[key].code);
        // });
    }

    getPersistentData () {
        return this;
    }
}