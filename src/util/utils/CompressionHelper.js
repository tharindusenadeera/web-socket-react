import utils from '../utils/utils';

export default (function () {
    let getCompressedString = function (dataString) {
        let compressedString;

        try {
            compressedString = window.LZString.compressToUTF16(dataString);
        } catch (e) {
            utils.logger.logError('Error in compressing json string: ' + e);
        }

        return compressedString;
    };

    let getDecompressedString = function (compressedString) {
        let decompressedString;

        if (compressedString) {
            try {
                decompressedString = window.LZString.decompressFromUTF16(compressedString);
            } catch (e) {
                utils.logger.logError('Error in decompressing string: ' + e);
            }
        }

        return decompressedString;
    };

    return {
        getCompressedString: getCompressedString,
        getDecompressedString: getDecompressedString
    };
})();