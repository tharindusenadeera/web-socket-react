/* global moment */
import Constants from '../utils/Constants';
import logger from '../utils/logger';
// import chartConstants from '../models/chart/chart-constants';
import jsonHelper from '../utils/json-helper';
// import imageHelper from '../utils/image-helper';
// import fullScreenHelper from '../utils/full-screen-helper';
// import crypto from '../utils/crypto';
// import formatters from '../utils/formatters';
import validators from '../utils/validators';
// import AssetTypes from '../utils/asset-types';
// import messageService from '../utils/message-service';
// import keyGenerator from '../utils/key-generator';
import webStorage from '../utils/web-storage';
// import AnalyticsService from '../utils/analytics-service';
// import browser from '../utils/browser';
// import configHelper from '../utils/config-helper';
// import requestHelper from './request-helper';
// import compressionHelper from './compression-helper';
// import indexedDBConnector from '../utils/indexed-db-connector';
// import nativeHelper from '../utils/native-helper';
// import screenHelper from '../utils/screen-helper';
// import applicationSessionHandler from '../utils/application-session-handler';
// import flagGenerator from '../utils/flag-generator';
// import islamicDateConverter from '../utils/islamic-date-converter';
// import numberArabicWordConverter from '../utils/number-arabic-word-converter';

export default (function () {
    return {
        // applicationSessionHandler: applicationSessionHandler,
        // screenHelper: screenHelper,
        jsonHelper: jsonHelper,
        // imageHelper: imageHelper,
        // fullScreenHelper: fullScreenHelper,
        // crypto: crypto,
        webStorage: webStorage,
        logger: logger,
        // formatters: formatters,
        validators: validators,
        // AssetTypes: AssetTypes,
        // messageService: messageService,
        Constants: Constants,
        // keyGenerator: keyGenerator,
        // chartConstants: chartConstants,
        // analyticsService: new AnalyticsService(),
        // browser: browser,
        // configHelper: configHelper,
        // requestHelper: requestHelper,
        // moment: moment,
        // compressionHelper: compressionHelper,
        // indexedDBConnector: indexedDBConnector,
        // nativeHelper: nativeHelper,
        // flagGenerator: flagGenerator,
        // islamicDateConverter: islamicDateConverter,
        // numberArabicWordConverter: numberArabicWordConverter
    };
})();