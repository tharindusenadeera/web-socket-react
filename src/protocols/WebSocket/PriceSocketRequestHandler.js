// import priceSubscriptionManager from '../../price-subscription-manager';
import * as sharedService from '../Shared/SharedServices';
import utils from '../../util/utils/utils';
import AppConfig from '../config/AppConfig';

export default (function () {

    // Authentication related requests
    let generateRetailAuthRequest = function (authParams) {
        let reqElements = _generateAuthRequest();

        reqElements[reqElements.length] = '"UNM":"';
        reqElements[reqElements.length] = authParams.username;
        reqElements[reqElements.length] = '","PWD":"';
        reqElements[reqElements.length] = authParams.password;
        reqElements[reqElements.length] = '"}\n';

        let req = reqElements.join('');
        req = req.length + req;

        utils.logger.logInfo('Retail Auth Request : ' + req);

        return req;
    };

    let generateSsoAuthRequest = function (authParams) {
        let reqElements = _generateAuthRequest();

        reqElements[reqElements.length] = '"SSOTOK":"';
        reqElements[reqElements.length] = authParams.ssoToken;
        reqElements[reqElements.length] = '","SSOTYPE":"';
        reqElements[reqElements.length] = authParams.ssoType;
        reqElements[reqElements.length] = '"}\n';

        let req = reqElements.join('');
        req = req.length + req;

        window.logger = {priceAuthRequest: req};
        utils.logger.logInfo('SSO Auth Request : ' + req);

        return req;
    };

    let generateReconnectionAuthRequest = function () {
        let req;
        let priceService = sharedService.getService('price');

        if (utils.validators.isAvailable(priceService.userDS.username)) {
            let reqElements = [
                '{"AUTHVER":"10","UNM":"', priceService.userDS.username,
                '","SID":"', priceService.userDS.sessionId,
                '","PDM":"', AppConfig.customisation.productType,
                '","LAN":"', sharedService.userSettings.currentLanguage,
                '","METAVER":"', priceService.userDS.metaVersion,
                '"}\n'];

            req = reqElements.join('');
            req = req.length + req;
        }

        return req;
    };

    // 40 type requests
    let generateAddExchangeRequest = function (exchange, messagetype, language, subMarket) {
        // let subStatus = priceSubscriptionManager.addSubscription(messagetype, exchange, language, subMarket);

        // if (subStatus.retVal === 1) {
        //     let reqElements = ['{"40":"', messagetype, '","E":"', exchange];

        //     if (language !== undefined) {
        //         reqElements.push('","L":"', language);
        //     }

        //     if(subMarket !== undefined) {
        //         reqElements.push('","MKT":"', subMarket);
        //     }

        //     reqElements.push('"}\n');

        //     let req = reqElements.join('');
        //     req = req.length + req;

        //     subStatus.reqArray[subStatus.reqArray.length] = req;

        // }

        // return subStatus.reqArray;
    };

    let generateRemoveExchangeRequest = function (exchange, messagetype, language, subMarket) {
        // let subStatus = priceSubscriptionManager.removeSubscription(messagetype, exchange, language, subMarket);

        // if (subStatus.retVal === 0) {
        //     let reqElements = ['{"41":"', messagetype, '","E":"', exchange];

        //     if (language !== undefined) {
        //         reqElements.push('","L":"', language);
        //     }

        //     if(subMarket !== undefined) {
        //         reqElements.push('","MKT":"', subMarket);
        //     }

        //     reqElements.push('"}\n');
        //     let req = reqElements.join('');
        //     req = req.length + req;

        //     subStatus.reqArray[subStatus.reqArray.length] = req;
        // }

        // return subStatus.reqArray;
    };

    let generateAddProjectedPriceRequest = function (exchange, messagetype) {
        // let subStatus = priceSubscriptionManager.addSubscription(messagetype, exchange);

        // if (subStatus.retVal === 1) {
        //     let reqElements = ['{"40":"', messagetype, '","E":"', exchange];
        //     reqElements.push('"}\n');

        //     let req = reqElements.join('');
        //     req = req.length + req;

        //     subStatus.reqArray[subStatus.reqArray.length] = req;
        // }

        // return subStatus.reqArray;
    };

    let generateRemoveProjectedPriceRequest = function (exchange, messagetype) {
        // let subStatus = priceSubscriptionManager.removeSubscription(messagetype, exchange);

        // if (subStatus.retVal === 0) {
        //     let reqElements = ['{"41":"', messagetype, '","E":"', exchange];
        //     reqElements.push('"}\n');

        //     let req = reqElements.join('');
        //     req = req.length + req;

        //     subStatus.reqArray[subStatus.reqArray.length] = req;
        // }

        // return subStatus.reqArray;
    };

    // 80 type requests
    let generateAddSymbolRequest = function (exchange, symbol, messagetype) {
        // let subStatus = priceSubscriptionManager.addSubscription(messagetype, exchange, symbol);

        // if (subStatus.retVal === 1) {
        //     let reqElements = ['{"80":"', messagetype, '","E":"', exchange, '","S":"', symbol, '"}\n'];
        //     let req = reqElements.join('');
        //     req = req.length + req;

        //     subStatus.reqArray[subStatus.reqArray.length] = req;
        // }

        // return subStatus.reqArray;
    };

    let generateRemoveSymbolRequest = function (exchange, symbol, messagetype) {
        // let subStatus = priceSubscriptionManager.removeSubscription(messagetype, exchange, symbol);

        // if (subStatus.retVal === 0) {
        //     let reqElements = ['{"81":"', messagetype, '","E":"', exchange, '","S":"', symbol, '"}\n'];
        //     let req = reqElements.join('');
        //     req = req.length + req;

        //     subStatus.reqArray[subStatus.reqArray.length] = req;
        // }

        // return subStatus.reqArray;
    };

    // 160 type requests
    let generateAddSymbolBulkRequest = function (exchange, symbolList, messagetype) {
        // let subStatus = priceSubscriptionManager.addSubscription(messagetype, exchange, symbolList);

        // if (subStatus.retVal === 1) {
        //     let reqElements = ['{"160":"', messagetype, '","E":"', exchange, '","S":"', symbolList, '"}\n'];
        //     let req = reqElements.join('');
        //     req = req.length + req;

        //     subStatus.reqArray[subStatus.reqArray.length] = req;
        // }

        // return subStatus.reqArray;
    };

    let generateRemoveSymbolBulkRequest = function (exchange, symbolList, messagetype) {
        // let subStatus = priceSubscriptionManager.removeSubscription(messagetype, exchange, symbolList);

        // if (subStatus.retVal === 0) {
        //     let reqElements = ['{"161":"', messagetype, '","E":"', exchange, '","S":"', symbolList, '"}\n'];
        //     let req = reqElements.join('');
        //     req = req.length + req;

        //     subStatus.reqArray[subStatus.reqArray.length] = req;
        // }

        // return subStatus.reqArray;
    };

    // TopStock
    let generateTopStockRequest = function (exchange, topStockType, subMarketCode, language) {
        let lan = language ? language : sharedService.userSettings.currentLanguage;

        let reqElements = ['{"40":"64","E":"', exchange, '","TT":"', topStockType, '","MKT":"', subMarketCode, '","L":"', lan, '"}\n'];
        let req = reqElements.join('');
        req = req.length + req;

        return [req];
    };

    // Change Password
    let generateChangePasswordRequest = function (authParams) {
        let priceService = sharedService.getService('price');

        let reqElements = ['{"CHANGEPWD":"61", "PEM":"1", "SID":"', priceService.userDS.sessionId,
            '","UNM":"', priceService.userDS.username,
            '","OLDPWD":"', authParams.oldPwd,
            '","NEWPWD":"', authParams.newPwd,
            '"}\n'];

        let req = reqElements.join('');
        req = req.length + req;

        return [req];
    };

    // Alert Placement
    let generateAlertPlaceRequest = function (exchange, symbol, instrumentType, alertFilter, token, messageType) {
        let alertToken = token ? token : Date.now();
        let expPeriod = 30;
        let frequency = 30;
        let tradeService = sharedService.getService('trade');
        let userName = tradeService && tradeService.userDS.unqPrcUsr ? tradeService.userDS.unqPrcUsr : sharedService.getService('price').userDS.username;

        let reqElements = ['{"225":"', messageType,
            '","E":"', exchange,
            '","S":"', symbol,
            '","TOK":"', alertToken,
            '","FLT":"', alertFilter,
            '","INS":"', instrumentType ? instrumentType : 0,
            '","FR":"', frequency,
            '","EXP":"', expPeriod,
            '","UNM":"', userName,
            '"}\n'];

        let req = reqElements.join('');
        req = req.length + req;

        return [req];
    };

    // Alert History
    let generateAlertHistoryRequest = function () {     // TODO [Arosha] Remove unnecessary symbol field after fixing it in Backend
        let tradeService = sharedService.getService('trade');
        let userName = tradeService && tradeService.userDS.unqPrcUsr ? tradeService.userDS.unqPrcUsr : sharedService.getService('price').userDS.username;

        let reqElements = ['{"225":"3", "UNM":"', userName,
            '","E":"', sharedService.userSettings.price.currentExchange,
            '","S":"', '1010',
            '"}\n'];

        let req = reqElements.join('');
        req = req.length + req;

        return [req];
    };

    // Alert History
    let generateAlertUnsubscribeRequest = function (exchange, symbol, instrumentType, token) {
        let tradeService = sharedService.getService('trade');
        let userName = tradeService && tradeService.userDS.unqPrcUsr ? tradeService.userDS.unqPrcUsr : sharedService.getService('price').userDS.username;

        let reqElements = ['{"225":"2", "UNM":"', userName,
            '","E":"', exchange,
            '","S":"', symbol,
            '","TOK":"', token,
            '","INS":"', instrumentType ? instrumentType : 0,
            '"}\n'];

        let req = reqElements.join('');
        req = req.length + req;

        return [req];
    };

    let generatePulseMessage = function (missedHeartbeats) {
        let req = ['{"0":', missedHeartbeats, '}\n'].join('');
        req = req.length + req;

        return [req];
    };

    let _generateAuthRequest = function () {
        let configMetaVersion = AppConfig.customisation.metaVersion;
        let metaVersion = utils.validators.isAvailable(configMetaVersion) ? configMetaVersion : sharedService.getService('price').userDS.metaVersion;

        return [
            '{"AUTHVER":"10",',
            '"LOGINIP":"', '',
            '","CLVER":"', '1.0.0',
            '","PDM":"', AppConfig.customisation.productType,
            '","LAN":"', sharedService.userSettings.currentLanguage,
            '","METAVER":"', metaVersion,
            '",'];
    };

    return {
        generateRetailAuthRequest: generateRetailAuthRequest,
        generateSsoAuthRequest: generateSsoAuthRequest,
        generateReconnectionAuthRequest: generateReconnectionAuthRequest,
        generateAddExchangeRequest: generateAddExchangeRequest,
        generateRemoveExchangeRequest: generateRemoveExchangeRequest,
        generateAddSymbolRequest: generateAddSymbolRequest,
        generateRemoveSymbolRequest: generateRemoveSymbolRequest,
        generateAddSymbolBulkRequest: generateAddSymbolBulkRequest,
        generateRemoveSymbolBulkRequest: generateRemoveSymbolBulkRequest,
        generateTopStockRequest: generateTopStockRequest,
        generateAlertPlaceRequest: generateAlertPlaceRequest,
        generateAlertHistoryRequest: generateAlertHistoryRequest,
        generateAlertUnsubscribeRequest: generateAlertUnsubscribeRequest,
        generateChangePasswordRequest: generateChangePasswordRequest,
        generateAddProjectedPriceRequest: generateAddProjectedPriceRequest,
        generateRemoveProjectedPriceRequest: generateRemoveProjectedPriceRequest,
        generatePulseMessage: generatePulseMessage
    };
})();