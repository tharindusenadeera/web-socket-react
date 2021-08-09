import utils from '../utils/utils';
import AppConfig from '../../protocols/config/AppConfig';
import profileService from '../../protocols/Shared/profile/profile-service';

export default (function () {
    let _isStorageAvailable = function () {
        return (typeof (Storage) !== 'undefined');
    };

    let _getFromStorageAsString = function (key, storageType) {
        let value;

        if (_isStorageAvailable() && utils.validators.isAvailable(key)) {
            if (storageType === utils.Constants.StorageType.Local) {
                value = localStorage.getItem(key);
            } else {
                value = sessionStorage.getItem(key);
            }
        }

        return value;
    };

    let _getFromStorageAsObj = function (key, storageType) {
        let obj;
        let str = _getFromStorageAsString(key, storageType);

        if (utils.validators.isAvailable(str)) {
            obj = utils.jsonHelper.convertFromJson(str);
        }

        return obj;
    };

    let _getFromStorageAsObjDecrypted = function (key, storageType) {
        let obj, decrypted;
        let str = _getFromStorageAsString(key, storageType);

        if (utils.validators.isAvailable(str)) {
            try {
                decrypted = utils.crypto.decryptText(str);
            } catch (e) {
                utils.logger.logError('Decryption failed retrieving data from storage : ' + key);
                decrypted = str;
            }

            try {
                obj = utils.jsonHelper.convertFromJson(decrypted);
            } catch (e) {
                utils.logger.logError('Json parse failed retrieving data from storage : ' + key);
                obj = utils.jsonHelper.convertFromJson(str);
            }
        }

        return obj;
    };

    let _containsInStorage = function (key, storageType) {
        let contains = false;

        if (_isStorageAvailable() && utils.validators.isAvailable(key)) {
            let storageObj;

            if (storageType === utils.Constants.StorageType.Local) {
                storageObj = localStorage.getItem(key);
            } else {
                storageObj = sessionStorage.getItem(key);
            }

            if (storageObj) {
                contains = true;
            }
        }

        return contains;
    };

    let _addToStorageFromString = function (key, value, storageType) {
        let status = false;

        if (_isStorageAvailable() && utils.validators.isAvailable(key) && utils.validators.isAvailable(value)) {
            if (storageType === utils.Constants.StorageType.Local) {
                localStorage.setItem(key, value);
            } else {
                sessionStorage.setItem(key, value);
            }

            status = true;
        }

        return status;
    };

    let _addToStorageFromObj = function (key, valueObj, storageType) {
        let status = false;

        if (utils.validators.isAvailable(key) && valueObj) {
            let valueString = utils.jsonHelper.convertToJson(valueObj);
            status = _addToStorageFromString(key, valueString, storageType);
        }

        return status;
    };

    let _addToStorageFromObjEncrypted = function (key, valueObj, storageType) {
        let status = false;

        if (utils.validators.isAvailable(key) && valueObj) {
            let valueString = utils.jsonHelper.convertToJson(valueObj);
            let encrypted = utils.crypto.encryptText(valueString);
            status = _addToStorageFromString(key, encrypted, storageType);
        }

        return status;
    };

    let _removeFromStorageByKey = function (key, storageType) {
        let status = false;

        if (_isStorageAvailable() && utils.validators.isAvailable(key)) {
            if (storageType === utils.Constants.StorageType.Local) {
                localStorage.removeItem(key);
            } else {
                sessionStorage.removeItem(key);
            }

            status = true;
        }

        return status;
    };

    let getKey = function (key, language) {
        let cacheKey = utils.validators.isAvailable(key) ? key : utils.Constants.StringConst.Empty;
        let keyArray = [AppConfig.customisation.clientPrefix];

        if (utils.validators.isAvailable(language)) {
            keyArray[keyArray.length] = language;
        }

        // if (utils.validators.isAvailable(windowId)) { // TODO: [DineshS] append user id before window id
        //     keyArray[keyArray.length] = windowId;
        // }

        keyArray[keyArray.length] = cacheKey;
        return keyArray.join(utils.Constants.StringConst.Underscore);
    };

    let getExchangeKey = function (key, exchange, language) {
        let cacheExchange = utils.validators.isAvailable(exchange) ? exchange : utils.Constants.StringConst.Empty;
        let cacheKey = utils.validators.isAvailable(key) ? key : utils.Constants.StringConst.Empty;
        let keyArray = [AppConfig.customisation.clientPrefix, cacheExchange, cacheKey];

        if (utils.validators.isAvailable(language)) {
            keyArray[keyArray.length] = language;
        }

        return keyArray.join(utils.Constants.StringConst.Underscore);
    };

    let addString = function (key, value, storageType, saveImmediately) {
        let storageTypeValue = storageType;

        if (!storageTypeValue) {
            profileService.saveComponent(key, value, saveImmediately);
            storageTypeValue = storageType || utils.Constants.StorageType.Local;
        }

        return _addToStorageFromString(key, value, storageTypeValue);
    };

    let addObject = function (key, value, storageType, saveImmediately) {
        let storageTypeValue = storageType;
        let strValue = utils.jsonHelper.convertToJson(value);

        if (!storageTypeValue) {
            profileService.saveComponent(key, strValue, saveImmediately);
            storageTypeValue = storageType || utils.Constants.StorageType.Local;
        }

        return _addToStorageFromObj(key, value, storageTypeValue);
    };

    let addFromObjEncrypted = function (key, value, storageType, saveImmediately) {
        let storageTypeValue = storageType;
        let strValue = utils.jsonHelper.convertToJson(value);

        if (!storageTypeValue) {
            profileService.saveComponent(key, strValue, saveImmediately);
            storageTypeValue = storageType || utils.Constants.StorageType.Local;
        }

        return _addToStorageFromObjEncrypted(key, value, storageTypeValue);
    };

    let getString = function (key, storageType) {
        let storageTypeValue = storageType || utils.Constants.StorageType.Local;
        return _getFromStorageAsString(key, storageTypeValue);
    };

    let getObject = function (key, storageType) {
        let storageTypeValue = storageType || utils.Constants.StorageType.Local;
        return _getFromStorageAsObj(key, storageTypeValue);
    };

    let getAsObjDecrypted = function (key, storageType) {
        let storageTypeValue = storageType || utils.Constants.StorageType.Local;
        return _getFromStorageAsObjDecrypted(key, storageTypeValue);
    };

    let contains = function (key, storageType) {
        let storageTypeValue = storageType || utils.Constants.StorageType.Local;
        return _containsInStorage(key, storageTypeValue);
    };

    let remove = function (key, storageType) {
        let storageTypeValue = storageType || utils.Constants.StorageType.Local;
        return _removeFromStorageByKey(key, storageTypeValue);
    };

    return {
        addString: addString,
        addObject: addObject,
        addFromObjEncrypted: addFromObjEncrypted,
        getString: getString,
        getObject: getObject,
        getAsObjDecrypted: getAsObjDecrypted,
        contains: contains,
        remove: remove,
        getKey: getKey,
        getExchangeKey: getExchangeKey
    };
})();