import utils from './utils';

export default (function () {
    let generateQueryString = function (urlPrefix, params, generalQueryParams, isEncodeDisable) {
        let url, queryArray = [];
        let queryParams = _mergeParam(params, generalQueryParams || {});

        for (let prop in queryParams) {
            if (queryParams.hasOwnProperty(prop)) {
                let encoded = isEncodeDisable ? queryParams[prop] : encodeURIComponent(queryParams[prop]);
                queryArray[queryArray.length] = [prop, encoded].join(utils.Constants.StringConst.Equal);
            }
        }

        url = queryArray.join(utils.Constants.StringConst.Ampersand);

        if (urlPrefix) {
            url = [urlPrefix, url].join(utils.Constants.StringConst.Question);
        }

        return url;
    };

    let generateEncryptedQueryString = function (urlPrefix, params, generalQueryParams, isEncodeDisable) {
        let url, queryArray = [];
        let queryParams = _mergeParam(params, generalQueryParams || {});

        for (let prop in queryParams) {
            if (queryParams.hasOwnProperty(prop)) {
                let encoded = isEncodeDisable ? queryParams[prop] : encodeURIComponent(queryParams[prop]);
                queryArray[queryArray.length] = [prop, encoded].join(utils.Constants.StringConst.Equal);
            }
        }

        url = ['q', utils.crypto.encryptText(queryArray.join(utils.Constants.StringConst.Ampersand))].join(utils.Constants.StringConst.Equal);

        if (urlPrefix) {
            url = [urlPrefix, url].join(utils.Constants.StringConst.Question);
        }

        return url;
    };

    let getQueryParameters = function (url) {
        let parameters = {};

        if (url.indexOf(utils.Constants.StringConst.Question) > -1) {
            let queryString = url.split(utils.Constants.StringConst.Question)[1];
            let queryParams = queryString.split(utils.Constants.StringConst.Ampersand);

            if (queryParams && queryParams.length > 0) {
                Object.keys(queryParams).forEach(function(key) {
                    let keyVal = queryParams[key].split(utils.Constants.StringConst.Equal);

                    if (keyVal && keyVal.length > 1) {
                        parameters[keyVal[0].toLowerCase()] = decodeURIComponent(keyVal[1]);
                    }
                });
            }
        }

        return parameters;
    };

    let generateEncodedQueryString = function (urlPrefix, params, encoder) {
        let url, queryArray = [];

        for (let prop in params) {
            if (params.hasOwnProperty(prop)) {
                let value = params[prop];
                queryArray[queryArray.length] = [prop, value].join(utils.Constants.StringConst.Equal);
            }
        }

        url = queryArray.join(utils.Constants.StringConst.Ampersand);

        if (encoder) {
            url = encoder(url);
        }

        if (urlPrefix) {
            url = ['data', url].join(utils.Constants.StringConst.Equal);
            url = [urlPrefix, url].join(utils.Constants.StringConst.Question);
        }

        return url;
    };

    let _mergeParam = function (params, generalQueryParams) {
        if (params) {
            // Ember.$.extend(generalQueryParams, params);
            Object.assign(generalQueryParams,params);
        }

        return generalQueryParams;
    };

    return {
        generateQueryString: generateQueryString,
        getQueryParameters: getQueryParameters,
        generateEncodedQueryString: generateEncodedQueryString,
        generateEncryptedQueryString: generateEncryptedQueryString,
    };
})();