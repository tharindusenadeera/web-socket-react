import utils from './utils';

export default (function () {
    let convertToJson = function (obj) {
        try {
            return JSON.stringify(obj);
        } catch (e) {
            utils.logger.logError('Error in converting to JSON: ' + e);
        }
    };

    let convertFromJson = function (json) {
        return JSON.parse(json);
    };

    return {
        convertToJson: convertToJson,
        convertFromJson: convertFromJson
    };
})();