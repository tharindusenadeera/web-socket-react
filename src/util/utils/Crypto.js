import utils from '../utils/utils';
import appConfig from '../config/app-config';

export default (function () {
    let encryptText = function (plainText, key, iv) {
        return _encryptText(plainText, key ? key : utils.Constants.Encryption.TDesPrimaryKey, iv ? iv : utils.Constants.Encryption.TDesPrimaryIv);
    };

    let decryptText = function (cipherText, key, iv) {
        return _decryptText(cipherText, key ? key : utils.Constants.Encryption.TDesPrimaryKey, iv ? iv : utils.Constants.Encryption.TDesPrimaryIv);
    };

    let generateHashedText = function (plainText, randomNo) {
        switch (appConfig.customisation.hashType) {
            case utils.Constants.HashTypes.Md5:
                return {
                    password: hashMd5(plainText)
                };

            case utils.Constants.HashTypes.Sha1:
                return {
                    password: hashSha1(plainText)
                };

            case utils.Constants.HashTypes.Sha256:
                return {
                    password: _hashSha(plainText, utils.Constants.HashTypes.Sha256, utils.Constants.HashOutputTypes.HEX)
                };

            case utils.Constants.HashTypes.Custom:
                return _encryptCustom(plainText, randomNo);

            default :
                return {
                    password: plainText
                };
        }
    };

    let _encryptCustom = function (plainText, randomNo) {
        let sha256Encryptn = _hashSha(plainText, utils.Constants.HashTypes.Sha1, utils.Constants.HashOutputTypes.HEX);
        let randomNum = randomNo ? randomNo : generateRandom(8);
        let encryptedPw = sha256Encryptn;
        let randomChar = generateRandomChar();

        for (let lastIndex = 0, round = 1; lastIndex + randomNum < encryptedPw.length; round++) {
            encryptedPw = encryptedPw.slice(0, lastIndex + randomNum) + randomChar + encryptedPw.slice(lastIndex + randomNum);
            lastIndex = round + randomNum * round;
        }

        return {
            password: encryptedPw,
            pwRcp: randomNum
        };
    };

    let generateRandom = function (maxValue, min) {
        let minValue = min ? min : 1;
        return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    };

    let generateRandomChar = function () {
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return characters.charAt(Math.floor(Math.random() * characters.length));
    };

    let hashMd5 = function (plainText) {
        let hashText = '';

        try {
            hashText = window.CryptoJS.MD5(plainText).toString();
        } catch (e) {
            utils.logger.logError('Error in converting to hash type 1 : ' + e);
        }

        return appConfig.customisation.isUpperCasePassword ? hashText.toUpperCase() : hashText;
    };

    let hashSha1 = function (plainText) {
        return _hashSha(plainText, utils.Constants.HashTypes.Sha1, utils.Constants.HashOutputTypes.B64);
    };

    let encodeBase64 = function (text) {
        let base64Str = '';

        try {
            if (text) {
                let wordArray = window.CryptoJS.enc.Utf8.parse(text);
                base64Str = window.CryptoJS.enc.window.Base64.stringify(wordArray);
            }
        } catch (e) {
            utils.logger.logError('Error in encodeBase64 : ' + e);
        }

        return base64Str;
    };

    let _hashSha = function (plainText, hashType, outputType) {
        // Ignore from JSHint and ESLint, to avoid defining global reference or importing
        /*eslint-disable */
        //noinspection JSPotentiallyInvalidConstructorUsage
        let shaObj = new jsSHA(hashType, 'TEXT'); // jshint ignore:line
        /*eslint-enable */

        shaObj.update(plainText);

        return appConfig.customisation.isUpperCasePassword ? shaObj.getHash(outputType).toUpperCase() : shaObj.getHash(outputType);
    };

    let _encryptText = function (plainText, key, iv) {
        let encryptedText = plainText;

        try {
            let keyUtf8 = window.CryptoJS.enc.Utf8.parse(key);
            let ivUtf8 = window.CryptoJS.enc.Utf8.parse(iv);
            let encryptedUtf8 = window.CryptoJS.TripleDES.encrypt(plainText, keyUtf8, {iv: ivUtf8});

            encryptedText = encryptedUtf8.toString();
        } catch (e) {
            utils.logger.logError('Error in encrypting : ' + e);
        }

        return encryptedText;
    };

    let _decryptText = function (cipherText, key, iv) {
        let decryptedText = cipherText;

        try {
            let keyUtf8 = window.CryptoJS.enc.Utf8.parse(key);
            let ivUtf8 = window.CryptoJS.enc.Utf8.parse(iv);
            let decryptedUtf8 = window.CryptoJS.TripleDES.decrypt(cipherText, keyUtf8, {iv: ivUtf8});

            let decryptStr = window.CryptoJS.enc.Utf8;
            decryptedText = decryptedUtf8.toString(decryptStr);
        } catch (e) {
            utils.logger.logError('Error in decrypting : ' + e);
        }

        return decryptedText;
    };

    return {
        encryptText: encryptText,
        decryptText: decryptText,
        generateHashedText: generateHashedText,
        hashMd5: hashMd5,
        hashSha1: hashSha1,
        encodeBase64: encodeBase64
    };
})();