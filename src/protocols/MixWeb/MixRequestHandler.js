import WebConnection from '../CommunicationAdapter/WebHttpConnection.js';
import ResponseHandler from './MixResponseHandler.js';
import RequestGenerator from './MixRequestGenerator';
import * as sharedService from '../Shared/SharedServices';
// import ChartConstants from '../../../../../ua-kernal/models/chart/chart-constants';
import utils from '../../util/utils/utils.js';

export default (function () {
    const loadExchangeMetadata = function (exchange, language, successFn, errorFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateExchangeMetadataUrl(exchange, language),

            onSuccess: function (dataObj) {
                ResponseHandler.processExchangeMetadataResponse(dataObj, language, exchange);

                if (successFn instanceof Function) {
                    successFn();
                }
            },

            onError: function () {
                let priceService = sharedService.getService('price');

                if (exchange === sharedService.userSettings.price.defaultExchange) {
                    priceService.isDefaultMetaRequestFail = true;
                }

                if (errorFn instanceof Function) {
                    errorFn();
                }

                priceService.onPriceMetaReady(false); // Pass false when price meta fail
                // TODO: Handle error on exchange data loading
            }
        });
    };

    const loadSymbolValidationData = function (exchange, symbol, instrumentType) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateSymbolValidationUrl(exchange, symbol, instrumentType),
            onSuccess: ResponseHandler.processSymbolValidationResponse,

            onError: function () {
                // TODO: Handle error on symbol validation data loading
            }
        });
    };

    const loadSymbolValidationBulkData = function (symbolObjArray) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateSymbolValidationBulkUrl(symbolObjArray),
            onSuccess: ResponseHandler.processSymbolValidationResponse,

            onError: function () {
                // TODO: Handle error on symbols validation data loading
            }
        });
    };

    const loadSymbolSearchData = function (searchKey, language, pageSize, notifyFn, params, searchNumber) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateSymbolSearchUrl(searchKey, language, pageSize, params),

            onSuccess: function (dataObj) {
                ResponseHandler.processSymbolSearchResponse(dataObj, searchKey, notifyFn, searchNumber);
            },

            onError: function () {
                // TODO: Handle error on symbol search data loading
            }
        });
    };

    //
    // Chart specific requests
    //
    const loadIntradayData = function (exchange, symbol, numberOfDays, chartType, reqSuccessFn, reqFailureFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateIntradayDataUrl(exchange, symbol, numberOfDays, chartType),

            onSuccess: function (dataObj) {
                // ResponseHandler.processChartResponse(dataObj, ChartConstants.ChartCategory.Intraday, reqSuccessFn, reqFailureFn);
            },

            onError: function () {
                // TODO: Handle error on chart data loading
            }
        });
    };

    const loadChartData = function (exchange, symbol, chartCategory, begin, chartType, reqSuccessFn, reqFailureFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateChartDataUrl(exchange, symbol, chartCategory, begin, chartType),

            onSuccess: function (dataObj) {
                ResponseHandler.processChartResponse(dataObj, chartCategory, reqSuccessFn, reqFailureFn);
            },

            onError: function () {
                // TODO: Handle error on chart data loading
            }
        });
    };

    //
    // News & announcement specific requests
    //
    const loadAnnouncementBody = function (annID, reqSuccessFn, reqFailureFn, language) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateAnnouncementBodyUrl(annID, language),

            onSuccess: function (dataObj) {
                ResponseHandler.processAnnouncementBodyResponse(dataObj, reqSuccessFn, reqFailureFn);
            },

            onError: function () {
                if (reqFailureFn instanceof Function) {
                    reqFailureFn();
                }
            }
        });
    };

    const loadAnnouncementSearchData = function (params, annCollection) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateAnnouncementSearchUrl(params),

            onSuccess: function (dataObj) {
                ResponseHandler.processAnnouncementSearchResponse(dataObj, annCollection, params.reqSuccessFn, params.reqFailureFn);
            },

            onError: function () {
                // TODO: Handle error on data loading
            }
        });
    };

    const loadNewsBody = function (newsID, reqSuccessFn, reqFailureFn, language) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateNewsBodyUrl(newsID, language),

            onSuccess: function (dataObj) {
                ResponseHandler.processNewsBodyResponse(dataObj, reqSuccessFn, reqFailureFn);
            },

            onError: function () {
                if (reqFailureFn instanceof Function) {
                    reqFailureFn();
                }
            }
        });
    };

    const loadNewsSearchData = function (params, newsCollection) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateNewsSearchUrl(params),

            onSuccess: function (dataObj) {
                ResponseHandler.processNewsSearchResponse(dataObj, newsCollection, params.reqSuccessFn, params.reqFailureFn);
            },

            onError: function () {
                // TODO: Handle error on data loading
            }
        });
    };

    //
    // Company Profile specific requests
    //
    const loadCompanyProfileData = function (exchange, symbol, language, postSuccess, Error) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateCompanyProfileUrl(exchange, symbol),

            onSuccess: function (dataObj) {
                ResponseHandler.processCompanyProfileResponse(dataObj, exchange, symbol, language);

                if (postSuccess instanceof Function) {
                    postSuccess();
                }
            },

            onError: function () {
                // TODO: Handle error on symbol data loading
                if (Error instanceof Function) {
                    Error();
                }
            }
        });
    };

    // Gms summary specific profile
    const loadGmsSummary = function () {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateGmsSummaryUrl(),

            onSuccess: function (dataObj) {
                ResponseHandler.processGmsSummaryResponse(dataObj);
            },

            onError: function () {
                // TODO: Handle error on symbol data loading
                if (Error instanceof Function) {
                    Error();
                }
            }
        });
    };

    // System Meta Data specific Request
    const loadSystemMetaData = function () {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateSystemMetaDataUrl(),

            onSuccess: function (dataObj) {
                ResponseHandler.processSystemMetaDataResponse(dataObj);
            },

            onError: function () {
                // TODO: Handle error on symbol data loading
                if (Error instanceof Function) {
                    Error();
                }
            }
        });
    };

    //
    // Alert Specific Requests
    //
    const loadAlertHistory = function () {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateAlertHistoryUrl(),

            onSuccess: function (dataObj) {
                ResponseHandler.processAlertHistoryResponse(dataObj);
            },

            onError: function () {
                if (Error instanceof Function) {
                    Error();
                }
            }
        });
    };

    const loadFairValueHistoricalPriceData = function (exg, sym, date, fvCallbackFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateFairValueHistoricalPriceUrl(exg, sym, date),

            onSuccess: function (dataObj) {
                ResponseHandler.processFairValueHistoricalPriceResponse(dataObj);
                fvCallbackFn();
            },

            onError: function (error) {
                ResponseHandler.onError('Fair Value Data Request Error - ' + error);
            }
        });
    };

    const loadFairValueReport = function (docId, showReportFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateFairValueReportUrl(docId),

            onSuccess: function (dataObj) {
                let reportGuId = ResponseHandler.processFairValueReportResponse(dataObj);

                showReportFn(reportGuId);
            },

            onError: function (error) {
                ResponseHandler.onError('Fair Value Report Request Error - ' + error);
            }
        });
    };

    const downloadFairValueReport = function (reportGuId) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateFairValueReportLinkUrl(reportGuId),

            onSuccess: function () {
                utils.logger.logDebug('Download pdf response received');
            },

            onError: function (e) {
                ResponseHandler.onError('Fair Value Report Download Error - ' + e);
            }
        });
    };

    const sendTimeAndSalesBackLogRequest = function (exchange, symbol, endSequence, pgs) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateTimeAndSalesBacklogUrl(exchange, symbol, endSequence, pgs),
            onSuccess: ResponseHandler.processTimeAndSalesBacklogResponse,

            onError: function () {
                // TODO: Handle error on symbol validation data loading
            }
        });
    };

    const sendCalenderEventsRequest = function (exg, callbackFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateCalenderEventsUrl(),
            onSuccess: function (dataObj) {
                ResponseHandler.processCalenderEventsResponse(dataObj, callbackFn);
                callbackFn();
            },

            onError: function () {
                // TODO: Handle error on Calender Events validation data loading
            }
        });
    };

    const sendYoutubeEventsRequest = function (nextPageUrl, callbackFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateYoutubeUrl(nextPageUrl),
            onSuccess: function (dataObj) {
                ResponseHandler.processYoutubeEventsResponse(dataObj, callbackFn);
            },

            onError: function () {
                // TODO: Handle error on Youtube validation data loading
            }
        });
    };

    const sendInstagramEventsRequest = function () {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateInstagramUrl(),
            async: true,
            contentType: 'text/plain; charset=us-ascii',
            headers: {},
            dataType: 'text',
            onSuccess: function (dataObj) {
                ResponseHandler.processInstagramEventsResponse(dataObj);
            },

            onError: function () {
                // TODO: Handle error on Instagram validation data loading
            }
        });
    };

    const sendFacebookEventsRequest = function (nextPageUrl, callbackFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateFacebookUrl(nextPageUrl),
            onSuccess: function (dataObj) {
                ResponseHandler.processFacebookEventsResponse(dataObj, nextPageUrl, callbackFn);
            },
            onError: function () {
                // TODO: Handle error on Facebook validation data loading
            }
        });
    };

    const sendDownloadStatementRequest = function (requestObj, callbackFn) {
        WebConnection.sendAjaxFileRequest({
            url: RequestGenerator.generateDownloadStatementUrl(requestObj),
            fileName: 'statement.pdf',
            requestMethod: 'GET',
            onSuccess: function (dataObj) {
                if (callbackFn instanceof Function) {
                    callbackFn(dataObj);
                }
            },
            onError: function () {
                utils.logger.logError('There was an error in statement download request');
            }
        });
    };

    const sendPressReleaseRequest = function () {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generatePressReleaseUrl(),
            onSuccess: function (dataObj) {
                ResponseHandler.processPressReleaseResponse(dataObj);
            },

            onError: function () {
                // TODO: Handle error on Press Releases validation data loading
            }
        });
    };

    const sendExchangeSummaryRequest = function (exchanges, language, callback) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateExchangeSummaryUrl(exchanges, language),

            onSuccess: function (dataObj) {
                ResponseHandler.processExchangeSummaryResponse(dataObj, language, callback);
            },

            onError: function () {
                // TODO: Handle error on data loading
            }
        });
    };

    const sendCorporateActionRequest = function (exchange, symbol, callbackFn, startDate) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateCorporateActionUrl(exchange, symbol, startDate),

            onSuccess: function (dataObj) {
                let corporateActionArray = ResponseHandler.processCorporateActionResponse(dataObj);
                callbackFn(corporateActionArray);
            },

            onError: function () {
                // TODO: Handle error on data loading
            }
        });
    };

    const loadTOPVIntradayData = function (exchange, symbol, reqSuccessFn, reqFailureFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateTOPVIntradayDataUrl(exchange, symbol),

            onSuccess: function (dataObj) {
                // ResponseHandler.processTOPVChartResponse(dataObj, ChartConstants.ChartCategory.Intraday, reqSuccessFn, reqFailureFn);
            },

            onError: function () {
                // TODO: Handle error on chart data loading
            }
        });
    };

    const loadTOPVChartData = function (exchange, symbol, chartCategory, begin, reqSuccessFn, reqFailureFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateTOPVChartDataUrl(exchange, symbol, chartCategory, begin),

            onSuccess: function (dataObj) {
                ResponseHandler.processTOPVChartResponse(dataObj, chartCategory, reqSuccessFn, reqFailureFn);
            },

            onError: function (error) {
                ResponseHandler.onError('loadTOPVChartData - ' + error);
            }
        });
    };

    const sendVolumeWatcherRequest = function (exchanges) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateVolumeWatcherURL(exchanges),

            onSuccess: function (dataObj) {
                ResponseHandler.processVolumeWatcherResponse(dataObj);
            },

            onError: function (error) {
                ResponseHandler.onError('sendVolumeWatcherRequest - ' + error);
            }
        });
    };

    const sendOptionChainRequest = function (params, callbackFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateOptionChainURL(params),

            onSuccess: function (dataObj) {
                if (params.optListType === 0) {
                    ResponseHandler.processOptionChainResponse(dataObj, params.exg, params.sym, callbackFn);
                } else {
                    let responseTag = params.optType === 0 ? 'OL' : 'WOL';
                    ResponseHandler.processOptionListResponse(dataObj, params.exg, params.sym, callbackFn, responseTag);
                }
            },

            onError: function (error) {
                ResponseHandler.onError('sendOptionChainRequest - ' + error);
            }
        });
    };

    const loadExchangeSymbolData = function (exchange, language) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateExchangeSymbolDataUrl(exchange),

            onSuccess: function (dataObj) {
                ResponseHandler.processExchangeSymbolResponse(dataObj, exchange, language);
            },

            onError: function () {
                // TODO: Handle error on symbol data loading
            }
        });
    };

    const sendProductSubscriptionRequest = function (productId, encryptedToken) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateProductSubscriptionUrl(productId, encryptedToken),

            onSuccess: function () {
                // Response is not needed to be processed
            },

            onError: function () {
                // Response is not needed to be processed
            }
        });
    };

    const sendLoginIndexPanelRequest = function (callBackFunc) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateLoginIndexPanelUrl(),
            onSuccess: function (dataObj) {
                ResponseHandler.processLoginIndexPanelResponse(dataObj, callBackFunc);
            },

            onError: function () {
                // TODO: Handle error on Login Index Panel
            }
        });
    };

    // Financial Data Request
    const loadFinancialData = function (exchange, symbol, language, secondSymAdded, primarySymbol, secondarySymbol, periodType, callbackFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateFinancialUrl(exchange, symbol, language, periodType),

            onSuccess: function (dataObj) {
                ResponseHandler.processFinancialResponse(dataObj, exchange, symbol, secondSymAdded, primarySymbol, secondarySymbol, periodType, callbackFn);
            },

            onError: function () {
                if (Error instanceof Function) {
                    Error();
                }
            }
        });
    };

    // Historical Closing Price Data
    const loadClosingPriceData = function (exchange, symbol, language, startDate, endDate, callbackFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateClosingPriceUrl(exchange, symbol, language, startDate, endDate),

            onSuccess: function (dataObj) {
                ResponseHandler.processClosingPriceResponse(dataObj, callbackFn);
            },

            onError: function () {
                if (Error instanceof Function) {
                    Error();
                }
            }
        });
    };

    // Book Shelf Data
    const loadBookShelfData = function (exchange, callback) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateBookShelfUrl(exchange),

            onSuccess: function (dataObj) {
                ResponseHandler.processBookShelfResponse(dataObj, callback);
            },

            onError: function () {
                if (Error instanceof Function) {
                    Error();
                }
            }
        });
    };

    // Special Trades Data
    const loadSpecialTradesData = function (exchange, callback) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateSpecialTradesUrl(exchange),

            onSuccess: function (dataObj) {
                ResponseHandler.processSpecialTrades(dataObj, callback);
            },

            onError: function () {
                if (Error instanceof Function) {
                    Error();
                }
            }
        });
    };

    //Transactions Menu
    const loadTransactionsMenu = function (date, callback) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateTransMenuUrl(date),

            onSuccess: function (dataObj) {
                ResponseHandler.processTransMenuResponse(dataObj, callback);
            },

            onError: function () {
                if (Error instanceof Function) {
                    Error();
                }
            }
        });
    };

    // New User Registration Data
    const sendUserRegistrationRequest = function (username, password, email) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateUserRegistrationUrl(username, password, email),

            onSuccess: function (dataObj) {
                ResponseHandler.processUserRegistrationResponse(dataObj);
            },

            onError: function () {
                // Response is not needed to be processed
            }
        });
    };

    // Investment ID Request
    const loadInvestmentId = function (exchange, uname, callbackFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateInvestmentIdUrl(uname),

            onSuccess: function (dataObj) {
                ResponseHandler.processInvestmentIdResponse(dataObj, exchange, callbackFn);
            },

            onError: function () {
                if (Error instanceof Function) {
                    Error();
                }
            }
        });
    };

    // Investor Portfolio Request
    const loadInvestorPortfolioData = function (investId, callbackFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateInvestorPortfolioUrl(investId),

            onSuccess: function (dataObj) {
                ResponseHandler.processInvestorPortfolioResponse(dataObj, investId, callbackFn);
            },

            onError: function () {
                if (Error instanceof Function) {
                    Error();
                }
            }
        });
    };

    // AppStore Version Request
    const loadAppStoreVersion = function (callbackFn) {
        WebConnection.sendAjaxRequest({
            url: 'version.json',

            onSuccess: function (dataObj) {
                if (callbackFn instanceof Function) {
                    callbackFn(dataObj);
                }
            },

            onError: function (error) {
                if (callbackFn instanceof Function) {
                    callbackFn(error);
                }
            }
        });
    };

    const uploadFile = function (file, callbackFn) {
        let formData = new FormData();
        formData.append('filename', file);

        WebConnection.sendAjaxRequest({
            url: sharedService.getService('price').settings.urlTypes.upload,
            type: 'POST',
            enctype: 'multipart/form-data',
            contentType: false,
            processData: false,
            dataType: false,
            headers: false,
            data: formData,

            onSuccess: function (dataObj) {
                if (callbackFn instanceof Function) {
                    callbackFn(dataObj);
                }
            },

            onError: function (error) {
                if (callbackFn instanceof Function) {
                    callbackFn(error);
                }
            }
        });
    };

    // CDV and YTDP Request
    const loadCDVAndYTDPRequest = function (exchange, callbackFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateCDVAndYTDPUrl(exchange),

            onSuccess: function (dataObj) {
                ResponseHandler.processCDVAndYTDPUrlResponse(dataObj, callbackFn);
            },

            onError: function () {
                if (Error instanceof Function) {
                    Error();
                }
            }
        });
    };

    // Beta
    const loadBetaRequest = function (exchange, symbol, instrumentType, callbackFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateBetaUrl(exchange, symbol, instrumentType),

            onSuccess: function (dataObj) {
                ResponseHandler.processBetaResponse(dataObj, callbackFn);
            },

            onError: function () {
                if (Error instanceof Function) {
                    Error();
                }
            }
        });
    };

    const loadFundamentalScoreData = function (exchange, callbackFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateFundamentalScoreURL(exchange),

            onSuccess: function (dataObj) {
                ResponseHandler.processFundamentalScoreResponse(dataObj);

                if (callbackFn instanceof Function) {
                    callbackFn();
                }
            },

            onError: function (error) {
                ResponseHandler.onError('sendFundamentalScoreRequest - ' + error);
            }
        });
    };

    const loadTechnicalScoreData = function (exchange, symbol, chartCategory, begin, reqSuccessFn, reqFailureFn) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateTechnicalScoreUrl(exchange, symbol, chartCategory, begin),

            onSuccess: function (dataObj) {
                ResponseHandler.processTechnicalScoreResponse(dataObj, chartCategory, reqSuccessFn, reqFailureFn);
            },

            onError: function () {
                if (Error instanceof Function) {
                    Error();
                }
            }
        });
    };

    const sendChangePasswordRequest = function (oldPassword, newPassword, callBack) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateChangePwUrl(oldPassword, newPassword),

            onSuccess: function (dataObj) {
                ResponseHandler.processChangePasswordResponse(dataObj, callBack);
            },

            onError: function () {
                // TODO: Handle error on data loading
            }
        });
    };

    // Buyers Sellers Data
    const loadBuyersSellersData = function (exchange, sym, fromDate, toDate, mode) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateBuyersSellersUrl(exchange, sym, fromDate, toDate),

            onSuccess: function (dataObj) {
                ResponseHandler.processBuyersSellersResponse(dataObj, mode);
            },

            onError: function () {
                if (Error instanceof Function) {
                    Error();
                }
            }
        });
    };

    // Broker Activities Data
    const loadBrokerActivitiesData = function (exchange, brokerCode, fromDate, toDate, mode) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateBrokerActivitiesUrl(exchange, brokerCode, fromDate, toDate),

            onSuccess: function (dataObj) {
                ResponseHandler.processBrokerActivitiesResponse(dataObj, mode);
            },

            onError: function () {
                if (Error instanceof Function) {
                    Error();
                }
            }
        });
    };

    // Broker Ranking Data
    const loadBrokerRankingData = function (fromDate, toDate, exchange) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateBrokerRankingUrl(fromDate, toDate, exchange),

            onSuccess: function (dataObj) {
                ResponseHandler.processBrokerRankingResponse(dataObj);
            },

            onError: function () {
                if (Error instanceof Function) {
                    Error();
                }
            }
        });
    };

    // Forgot Password
    const sendForgotPasswordRequest = function (email, callBack) {
        WebConnection.sendAjaxRequest({
            url: RequestGenerator.generateForgotPwUrl(email),

            onSuccess: function (dataObj) {
                ResponseHandler.processForgotPasswordResponse(dataObj, callBack);
            },

            onError: function () {
                // TODO: [Imalka] Handle error on data loading.
            }
        });
    };

    return {
        loadExchangeMetadata: loadExchangeMetadata,
        loadSymbolValidationData: loadSymbolValidationData,
        loadSymbolValidationBulkData: loadSymbolValidationBulkData,
        loadSymbolSearchData: loadSymbolSearchData,
        loadIntradayData: loadIntradayData,
        loadChartData: loadChartData,
        loadAnnouncementBody: loadAnnouncementBody,
        loadNewsBody: loadNewsBody,
        loadAnnouncementSearchData: loadAnnouncementSearchData,
        loadNewsSearchData: loadNewsSearchData,
        loadCompanyProfileData: loadCompanyProfileData,
        loadGmsSummary: loadGmsSummary,
        loadSystemMetaData: loadSystemMetaData,
        loadAlertHistory: loadAlertHistory,
        loadFairValueHistoricalPriceData: loadFairValueHistoricalPriceData,
        loadFairValueReport: loadFairValueReport,
        downloadFairValueReport: downloadFairValueReport,
        sendTimeAndSalesBackLogRequest: sendTimeAndSalesBackLogRequest,
        sendCalenderEventsRequest: sendCalenderEventsRequest,
        sendYoutubeEventsRequest: sendYoutubeEventsRequest,
        sendInstagramEventsRequest: sendInstagramEventsRequest,
        sendFacebookEventsRequest: sendFacebookEventsRequest,
        sendDownloadStatementRequest: sendDownloadStatementRequest,
        sendPressReleaseRequest: sendPressReleaseRequest,
        sendExchangeSummaryRequest: sendExchangeSummaryRequest,
        sendCorporateActionRequest: sendCorporateActionRequest,
        loadTOPVChartData: loadTOPVChartData,
        loadTOPVIntradayData: loadTOPVIntradayData,
        sendVolumeWatcherRequest: sendVolumeWatcherRequest,
        sendOptionChainRequest: sendOptionChainRequest,
        loadExchangeSymbolData: loadExchangeSymbolData,
        sendProductSubscriptionRequest: sendProductSubscriptionRequest,
        sendLoginIndexPanelRequest: sendLoginIndexPanelRequest,
        loadClosingPriceData: loadClosingPriceData,
        loadBookShelfData: loadBookShelfData,
        loadTransactionsMenu: loadTransactionsMenu,
        loadFinancialData: loadFinancialData,
        sendUserRegistrationRequest: sendUserRegistrationRequest,
        loadInvestmentId: loadInvestmentId,
        loadAppStoreVersion: loadAppStoreVersion,
        loadInvestorPortfolioData: loadInvestorPortfolioData,
        uploadFile: uploadFile,
        loadCDVAndYTDPRequest: loadCDVAndYTDPRequest,
        loadBetaRequest: loadBetaRequest,
        loadFundamentalScoreData: loadFundamentalScoreData,
        loadTechnicalScoreData: loadTechnicalScoreData,
        sendChangePasswordRequest: sendChangePasswordRequest,
        loadBuyersSellersData: loadBuyersSellersData,
        loadBrokerActivitiesData: loadBrokerActivitiesData,
        loadBrokerRankingData: loadBrokerRankingData,
        sendForgotPasswordRequest: sendForgotPasswordRequest,
        loadSpecialTradesData: loadSpecialTradesData
    };
})();