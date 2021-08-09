import PriceConstants from '../../constants/Price/PriceConstants';
import * as sharedService from '../Shared/SharedServices';
// import ChartConstants from '../../../../../ua-kernal/models/chart/chart-constants';
import utils from '../../util/utils/utils';
import AppConfig from '../config/AppConfig';
// import reduxStore from "../../../../../utils/reduxStore";

export default (function () {
    let generateExchangeMetadataUrl = function (exchange, language) {
        let metaObj = sharedService.getService('price').priceMeta.getExgMetaObj(exchange);
        let wlVer = metaObj.DAT.VRS.WL;
        let srcVer = metaObj.DAT.VRS.SRC;

        let queryParams = {
            RT: PriceConstants.MixRequest.ExchangeFullMeta.RT,
            SRC: exchange,
            MOD: PriceConstants.MetaVersionKeys.WatchList + ':' + ((wlVer) ? wlVer : '0') + ',' +
            PriceConstants.MetaVersionKeys.ExchangeDefinitions + ':' + ((srcVer) ? srcVer : '0'),
            L: language
        };


        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams, _getGeneralQueryParams());
    };

    let generateSymbolSearchUrl = function (searchKey, language, pageSize, params) {
        let queryParams = {
            RT: PriceConstants.MixRequest.SymbolSearch.RT,
            ST: PriceConstants.MixRequest.SymbolSearch.ST,
            PGI: '0',
            PGS: pageSize,
            IFLD: PriceConstants.MixRequest.SymbolSearch.IFLD,
            XFLD: PriceConstants.MixRequest.SymbolSearch.XFLD,
            SK: searchKey,
            AE: PriceConstants.MixRequestParameters.AllExchange,
            L: language
        };

        // Only option symbols should be available in option symbol search, else other symbols except options
        queryParams.UE = params.isOptionMode ? 'OPRA' : sharedService.getService('price').userDS.get('allExg').removeInClone('OPRA').join(utils.Constants.StringConst.Comma);

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.content, queryParams, _getGeneralQueryParams());
    };

    let generateSymbolValidationUrl = function (exchange, symbol, instrumentType) {
        let validationSymbol = _getValidationSymbol(exchange, symbol, instrumentType);

        let queryParams = {
            RT: PriceConstants.MixRequest.SymbolValidation.RT,
            E: exchange,
            S: validationSymbol,
            AE: PriceConstants.MixRequestParameters.AllExchange,
            AS: PriceConstants.MixRequestParameters.None
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams, _getGeneralQueryParams());
    };

    let generateSymbolValidationBulkUrl = function (symbolObjArray) {
        let symArray = [];

        Object.keys(symbolObjArray).forEach(function(key) {
            symArray[symArray.length] = _getValidationSymbol(symbolObjArray[key].exg, symbolObjArray[key].sym, symbolObjArray[key].inst);
        });

        let queryParams = {
            RT: PriceConstants.MixRequest.SymbolValidation.RT,
            S: symArray.join(utils.Constants.StringConst.Comma), // Symbol list
            AE: PriceConstants.MixRequestParameters.AllExchange,
            AS: PriceConstants.MixRequestParameters.None,
            UNC: '0'
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams, _getGeneralQueryParams());
    };

    //
    // News & announcement specific requests
    //
    let generateAnnouncementBodyUrl = function (annID, language) {
        let queryParams = {
            RT: PriceConstants.MixRequest.AnnouncementBody.RT,
            AI: annID, // Announcement Id
            L: language
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams, _getGeneralQueryParams());
    };

    let generateNewsBodyUrl = function (newsID, language) {
        let queryParams = {
            RT: PriceConstants.MixRequest.NewsBody.RT,
            NI: newsID, // News Id
            L: language
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams, _getGeneralQueryParams());
    };

    let generateAnnouncementSearchUrl = function (params) {
        let queryParams = {
            RT: PriceConstants.MixRequest.AnnouncementSearch.RT,
            AE: PriceConstants.MixRequestParameters.None,
            UNC: PriceConstants.MixRequestParameters.None,
            PGS: params.pageSize
        };

        if (params.AllExchange) {
            queryParams.AE = params.AllExchange;
        }

        if (params.exgList) {
            queryParams.UE = params.exgList;
        }

        if (params.exchange) {
            queryParams.E = params.exchange;
        }

        if (params.searchKey) {
            queryParams.SK = encodeURI(params.searchKey);
        }

        if (params.symbol) {
            queryParams.S = params.symbol;
        }

        if (params.startDate) {
            queryParams.SD = params.startDate;
        }

        if (params.endDate) {
            queryParams.ED = params.endDate;
        }

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.content, queryParams, _getGeneralQueryParams());
    };

    let generateNewsSearchUrl = function (params) {
        let queryParams = {
            RT: PriceConstants.MixRequest.NewsSearch.RT,
            AE: PriceConstants.MixRequestParameters.None,
            UNC: PriceConstants.MixRequestParameters.None,
            PGS: params.pageSize
        };

        if (params.AllExchange) {
            queryParams.AE = params.AllExchange;
        }

        if (params.exchange) {
            queryParams.E = params.exchange;
        }

        if (params.searchKey) {
            queryParams.SK = encodeURI(params.searchKey);
        }

        if (params.symbol) {
            queryParams.S = params.symbol;
        }

        if (params.provider) {
            queryParams.PRV = params.provider;
        }

        if (params.startDate) {
            queryParams.SD = params.startDate;
        }

        if (params.endDate) {
            queryParams.ED = params.endDate;
        }

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.content, queryParams, _getGeneralQueryParams());
    };

    //
    // Company Profile specific requests
    //
    let generateCompanyProfileUrl = function (exchange, symbol) {
        let symbolKey = _getValidationSymbol(exchange, symbol);
        let queryParams = {
            RT: PriceConstants.MixRequest.CompanyProfile.RT,
            S: symbolKey,
            CIT: PriceConstants.MixRequest.CompanyProfile.CIT,
            FC: '1',
            UNC: '0'
        };
        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.content, queryParams, _getGeneralQueryParams());
    };

    // Gms summary specific request
    let generateGmsSummaryUrl = function () {
        let queryParams = {
            RT: PriceConstants.MixRequest.SymbolMetaDetails.RT,
            MOD: 'GMS'
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.gms, queryParams, _getGeneralQueryParams());
    };

    // System Meta Data specific request
    let generateSystemMetaDataUrl = function () {
        let queryParams = {
            RT: PriceConstants.MixRequest.SymbolMetaDetails.RT
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams, _getGeneralQueryParams());
    };

    let generateTimeAndSalesBacklogUrl = function (exchange, symbol, endSequence, pgs) {
        let queryParams = {
            RT: PriceConstants.MixRequest.TimeAndSalesBacklog.RT,
            E: exchange,
            S: symbol ? symbol : '',
            AS: symbol === undefined ? PriceConstants.MixRequestParameters.AllSymbol : PriceConstants.MixRequestParameters.None,
            CT: PriceConstants.MixRequest.TimeAndSalesBacklog.ChartType.TickCount,
            SO: 'DESC',
            SC: PriceConstants.MixRequestParameters.None
        };

        if (pgs) {
            queryParams = Object.assign( {}, queryParams, {PGS: pgs});
        }

        if (AppConfig.customisation.isShowBuyerSeller) {
            queryParams = Object.assign( {}, queryParams,  {DT: 1});
            queryParams = Object.assign( {}, queryParams,   {IFLD: PriceConstants.MixRequest.TimeAndSalesBacklog.IFLD});
        }

        if (endSequence) {
            queryParams = Object.assign( {}, queryParams,  {ENDTSI: endSequence});
        }

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.content, queryParams, _getGeneralQueryParams());
    };

    let generateCalenderEventsUrl = function () {
        let queryParams = {
            RT: PriceConstants.MixRequest.CalenderEvents.RT,
            SNO: PriceConstants.MixRequest.CalenderEvents.SNO,
            ENO: PriceConstants.MixRequest.CalenderEvents.ENO
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.adx, queryParams);
    };

    let generatePressReleaseUrl = function () {
        let queryParams = {
            RT: PriceConstants.MixRequest.PressRelease.RT,
            SNO: PriceConstants.MixRequest.PressRelease.SNO,
            ENO: PriceConstants.MixRequest.PressRelease.ENO
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.adx, queryParams, _getGeneralQueryParams());
    };

    let generateYoutubeUrl = function (nextPageUrl) {
        let accessToken = AppConfig.customisation.socialMediaTokens.youtubeToken;

        if (nextPageUrl) {
            return AppConfig.socialMediaUrls.youTubeNextPageUrl.replace('[token]', accessToken).replace('[nextPage]', nextPageUrl);
        } else {
            return AppConfig.socialMediaUrls.youTubeUrl.replace('[token]', accessToken);
        }
    };

    let generateInstagramUrl = function () {
        return AppConfig.socialMediaUrls.instagramUrl.replace('[token]', AppConfig.customisation.socialMediaTokens.instagramToken);
    };

    let generateFacebookUrl = function (nextPageUrl) {
        if (nextPageUrl) {
            return nextPageUrl;
        } else {
            return AppConfig.socialMediaUrls.facebookUrl.replace('[token]', AppConfig.customisation.socialMediaTokens.facebookToken);
        }
    };

    let generateDownloadStatementUrl = function (queryParams) {
        return utils.requestHelper.generateEncryptedQueryString(sharedService.getService('price').settings.urlTypes.fileServer, queryParams, undefined, true);
    };

    // Alert Specific Request
    let generateAlertHistoryUrl = function () {
        let queryParams = {
            RT: PriceConstants.MixRequest.AlertSummary.RT,
            TA: 0,
            AC: 'PRC',
            UID: sharedService.getService('price').userDS.username
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.content, queryParams, _getGeneralQueryParams());
    };

    //
    // Chart specific requests
    //
    // let generateIntradayDataUrl = function (exchange, symbol, numberOfDays, chartType) {
    //     let queryParams = {
    //         RT: PriceConstants.MixRequest.Chart.RT,
    //         E: exchange,
    //         S: symbol,
    //         AE: PriceConstants.MixRequestParameters.AllExchange,
    //         CM: ChartConstants.ChartDataRequestMode.IntradayActiveStock,
    //         NOD: numberOfDays, // No of active days
    //         // CT: ChartConstants.ChartDataType.Ratio // Chart type
    //         CT: chartType
    //     };

    //     return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.chart, queryParams, _getGeneralQueryParams());
    // };

    // let generateTOPVIntradayDataUrl = function (exchange, symbol) {
    //     let queryParams = {
    //         RT: PriceConstants.MixRequest.TOPVChart.RT,
    //         E: exchange,
    //         S: symbol,
    //         AE: PriceConstants.MixRequestParameters.AllExchange,
    //         CM: ChartConstants.ChartDataRequestMode.IntradayActiveStock,
    //         CT: ChartConstants.ChartDataType.Basic // Chart type
    //     };

    //     return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.chartTopv, queryParams, _getGeneralQueryParams());
    // };

    // let generateChartDataUrl = function (exchange, symbol, charCategory, begin, chartType) {
    //     // Todo [Ravindu] CT value needs to be change for get more data in history mode [5] - Corporate action and News
    //     let beginDate;

    //     if (charCategory.ID === ChartConstants.ChartCategory.History.ID && begin !== undefined) {
    //         beginDate = utils.formatters.generateHistoryBeginDateString(begin, 0);
    //     } else if (charCategory.ID === ChartConstants.ChartCategory.Intraday.ID && begin !== undefined) {
    //         beginDate = utils.formatters.generateIntradayBeginDateString(begin);
    //     } else {
    //         beginDate = utils.formatters.generateChartBeginDateString(charCategory);
    //     }

    //     let queryParams = {
    //         RT: PriceConstants.MixRequest.Chart.RT,
    //         E: exchange,
    //         S: symbol,
    //         AE: PriceConstants.MixRequestParameters.AllExchange,
    //         CM: (charCategory.ID === ChartConstants.ChartCategory.History.ID) ? ChartConstants.ChartDataRequestMode.HistoryData : ChartConstants.ChartDataRequestMode.IntradayActiveStock,
    //         // CT: ChartConstants.ChartDataType.Ratio, // Chart type
    //         CT: chartType,
    //         SD: beginDate,
    //         ED: utils.formatters.generateChartEndDateString(charCategory)
    //     };

    //     return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.chart, queryParams, _getGeneralQueryParams());
    // };

    let generateExchangeSummaryUrl = function (exchanges, language) {
        let queryParams = {
            RT: PriceConstants.MixRequest.ExchangeStockSubMktDetails.RT,
            SRC: exchanges.join(utils.Constants.StringConst.Comma),
            L: language
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams, _getGeneralQueryParams());
    };

    let generateCorporateActionUrl = function (exchange, symbol, startDate) {
        let queryParams = {
            RT: PriceConstants.MixRequest.CorporateAction.RT,
            ITK: '4:' + exchange + ',3:' + symbol,
            SF: 472,
            SCDT: 'CPAC',
            SO: 'DESC',
            FC: 1
        };

        if (startDate && utils.validators.isAvailable(startDate)) {
            queryParams.FDK = '472~3~' + startDate;
        }

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.content, queryParams, _getGeneralQueryParams());
    };

    let generateFairValueHistoricalPriceUrl = function (exg, sym, date) {
        let queryParams = {
            RT: PriceConstants.MixRequest.FairValue.RT,
            IFC: PriceConstants.MixRequestParameters.None,
            FC: '1',
            SCDT: 'FRVL',
            SO: 'DESC',
            SF: '2230',
            ITK: '4:' + exg + ',3:' + sym,
            FDK: '2230~3~' + date
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.content, queryParams, _getGeneralQueryParams());
    };

    let generateFairValueReportUrl = function (docId) {
        let queryParams = {
            RT: PriceConstants.MixRequest.FairValueReport.RT,
            SID: '40613373-EE21-11D9-E053-EEF011ACCABC', // Content is pointed to Saudi and since for report generation need to get the data from ldc
            UID: '156683',                               // so these particular session and user which are pointing to ldc is hard coded here.
            ITK: 'DOC_ID:' + docId,
            UNC: PriceConstants.MixRequestParameters.None,
            PGI: PriceConstants.MixRequestParameters.None,
            IFC: '1',
            FC: '1',
            PL: sharedService.userSettings.currentLanguage
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.report, queryParams, _getGeneralQueryParams());
    };

    let generateFairValueReportLinkUrl = function (reportGuId) {
        let queryParams = {
            RT: PriceConstants.MixRequest.FairValueReportLink.RT,
            ID: reportGuId,
            SID: '40613373-EE21-11D9-E053-EEF011ACCABC', // Content is pointed to Saudi and since for report generation need to get the data from ldc
            UID: '156683'                                // so these particular session and user which are pointing to ldc is hard coded here.
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.reportLink, queryParams, {});
    };

    // let generateTOPVChartDataUrl = function (exchange, symbol, charCategory, begin) {
    //     let beginDate;

    //     if (charCategory.ID === ChartConstants.ChartCategory.History.ID) {
    //         beginDate = utils.formatters.generateHistoryBeginDateString(0, 1);
    //     } else if (charCategory.ID === ChartConstants.ChartCategory.Intraday.ID && begin !== undefined) {
    //         beginDate = utils.formatters.generateIntradayBeginDateString(begin);
    //     } else {
    //         beginDate = utils.formatters.generateChartBeginDateString(charCategory);
    //     }

    //     let queryParams = {
    //         RT: PriceConstants.MixRequest.TOPVChart.RT,
    //         E: exchange,
    //         S: symbol,
    //         AE: PriceConstants.MixRequestParameters.AllExchange,
    //         CM: ChartConstants.ChartDataRequestMode.IntradayActiveStock,
    //         CT: ChartConstants.ChartDataType.Basic,
    //         SD: beginDate,
    //         ED: utils.formatters.generateChartEndDateString(charCategory)
    //     };

    //     return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.chartTopv, queryParams, _getGeneralQueryParams());
    // };

    let generateVolumeWatcherURL = function (exchange) {
        let queryParams = {
            RT: PriceConstants.MixRequest.VolumeWatcher.RT,
            E: exchange,
            EC: PriceConstants.MixRequestParameters.None,
            AE: PriceConstants.MixRequestParameters.AllExchange
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams, _getGeneralQueryParams());
    };

    let generateOptionChainURL = function (params) {
        let queryParams = {
            RT: PriceConstants.MixRequest.OptionChain.RT,
            E: params.exg,
            S: params.sym,
            INS: params.inst,
            OPM: params.optPeriod,
            OPT: params.optListType,
            NMON: params.nearMon,
            IFLD: PriceConstants.MixRequest.OptionChain.IFLD,
            OT: params.optType,
            PGI: '0',
            PGS: '1000'
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams, _getGeneralQueryParams());
    };

    let generateExchangeSymbolDataUrl = function (exchange) {
        let metaObj = sharedService.getService('price').priceSymbolMeta.getExgMetaObj(exchange);

        let queryParams = {
            RT: PriceConstants.MixRequest.FullSymbolDescription.RT,
            SRC: exchange,
            AS: 1,
            VRS: metaObj.DAT.VRS[0]
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams, _getGeneralQueryParams());
    };

    let generateProductSubscriptionUrl = function (productId, encryptedToken) {
        let queryParams = {
            RT: PriceConstants.MixRequest.ProductSubscription.RT,
            UNM: encryptedToken,
            PRD: productId,
            APPID: 'MTBS'
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.prodSub, queryParams, _getGeneralQueryParams(), true);
    };

    // let generateLoginIndexPanelUrl = function () {
    //     let symbolKey = _getValidationSymbol(sharedService.userSettings.price.currentExchange, sharedService.userSettings.price.currentIndex, utils.AssetTypes.Indices);
    //
    //     let queryParams = {
    //         RT: PriceConstants.MixRequest.IndexPanel.RT,
    //         LI: PriceConstants.MixRequest.IndexPanel.LI,
    //         EC: PriceConstants.MixRequest.IndexPanel.EC,
    //         E: sharedService.userSettings.price.currentExchange,
    //         UE: sharedService.userSettings.price.currentExchange,
    //         SS: symbolKey,
    //         AS: PriceConstants.MixRequestParameters.None
    //     };
    //
    //     return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams);
    // };

    let generateLoginIndexPanelUrl = function () {
        let queryParams = {
            RT: PriceConstants.MixRequest.IndexPanel.RT,
            AE: PriceConstants.MixRequest.IndexPanel.AE,
            UE: sharedService.userSettings.price.currentExchange,
            AIS: PriceConstants.MixRequest.IndexPanel.AIS,
            H: PriceConstants.MixRequest.IndexPanel.H,
            EC: PriceConstants.MixRequest.IndexPanel.EC,
            M: PriceConstants.MixRequest.IndexPanel.M,
            MST: 'MS,SECI'
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams);
    };

    let generateFinancialUrl = function (exchange, symbol, language, periodType) {
        let symbolKey = _getValidationSymbol(exchange, symbol);

        let queryParams = {
            RT: PriceConstants.MixRequest.FinancialRatios.RT,
            CFT: 'IS,CF,BS,FR,MR',
            S: symbolKey,
            L: language,
            VT: 'Q',
            DES: PriceConstants.MixRequest.FinancialRatios.DES,
            // Q: periodType,
            ROW: PriceConstants.MixRequest.FinancialRatios.ROW,
            FC: PriceConstants.MixRequest.FinancialRatios.FC
        };

        if (periodType === PriceConstants.MixRequest.FinancialRatios.A) {
            queryParams.Q = periodType;
        }

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.content, queryParams, _getGeneralQueryParams());
    };

    // Closing Price request
    let generateClosingPriceUrl = function (exchange, symbol, language, startDate, endDate) {
        let priceService = sharedService.getService('price');

        let queryParams = {
            RT: PriceConstants.MixRequest.ClosingPrice.RT,
            SL: symbol,
            UID: priceService.userDS.userId,
            SID: priceService.userDS.sessionId,
            L: language,
            UNC: PriceConstants.MixRequestParameters.EnableUnicode,
            E: exchange,
            SO: 'ASC',
            SD: startDate,
            ED: endDate
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.content, queryParams, _getGeneralQueryParams());
    };

    // Book Shelf request
    let generateBookShelfUrl = function (exchange) {
        let queryParams = {
            RT: PriceConstants.MixRequest.BookShelf.RT,
            E: exchange,
            SNO: 1,
            ENO: 10
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.adx, queryParams, _getGeneralQueryParams());
    };

    // Special Trades request
    let generateSpecialTradesUrl = function (exchange) {
        let priceService = sharedService.getService('price');

        let queryParams = {
            SID: priceService.userDS.sessionId,
            UID: priceService.userDS.userId,
            RT: PriceConstants.MixRequest.TimeAndSalesBacklog.RT,
            E: exchange,
            SC: PriceConstants.MixRequestParameters.None,
            AS: PriceConstants.MixRequestParameters.AllSymbol,
            CT: PriceConstants.MixRequest.TimeAndSalesBacklog.ChartType.TickCount,
            DT: PriceConstants.MixRequest.TimeAndSalesBacklog.DT,
            IFLD: PriceConstants.MixRequest.TimeAndSalesBacklog.SpecialTrades.IFLD,
            ETT: PriceConstants.MixRequest.TimeAndSalesBacklog.SpecialTrades.ETT
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.content, queryParams, _getGeneralQueryParams());
    };

    // Transaction Menu request
    let generateTransMenuUrl = function (date) {
        let queryParams = {
            RT: PriceConstants.MixRequest.TransactionMenu.RT,
            FUD: date
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.transMenu, queryParams, _getGeneralQueryParams());
    };

    // User Registration request
    let generateUserRegistrationUrl = function (username, password, email) {
        let queryParams = {
            RT: PriceConstants.MixRequest.UserCreation.RT,
            UID: username,
            PASS: password,
            EMAIL: email
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.adx, queryParams, _getGeneralQueryParams());
    };

    // Investor Profile Investment Id
    let generateInvestmentIdUrl = function (uname) {
        let queryParams = {
            RT: PriceConstants.MixRequest.InvestmentId.RT,
            UNM: uname
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.adx, queryParams);
    };

    // Investor Portfolio Investment Id
    let generateInvestorPortfolioUrl = function (investId) {
        let queryParams = {
            RT: PriceConstants.MixRequest.InvestorPortfolio.RT,
            INUM: investId
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.adx, queryParams);
    };

    // Current Daily Volume and YTDP
    let generateCDVAndYTDPUrl = function (exchange) {
        let queryParams = {
            RT: PriceConstants.MixRequest.IndexPanel.RT,
            LI: PriceConstants.MixRequest.IndexPanel.LI,
            E: exchange,
            UE: exchange,
            AS: PriceConstants.MixRequestParameters.AllExchange,
            EC: PriceConstants.MixRequestParameters.None,
            UNC: PriceConstants.MixRequestParameters.None,
            IFLD: 'YTDP'
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams);
    };

    // Beta
    let generateBetaUrl = function (exchange, symbol, instrumentType) {
        let symbolKey = _getValidationSymbol(exchange, symbol, instrumentType);

        let queryParams = {
            RT: PriceConstants.MixRequest.Beta.RT,
            E: exchange,
            UE: exchange,
            SS: symbolKey,
            EC: PriceConstants.MixRequestParameters.None
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams);
    };

    // Technical Score
    // let generateTechnicalScoreUrl = function (exchange, symbol, charCategory, begin) {
    //     let beginDate;

    //     if (charCategory.ID === ChartConstants.ChartCategory.History.ID && begin) {
    //         beginDate = utils.formatters.generateHistoryBeginDateString(begin, 0);
    //     } else if (charCategory.ID === ChartConstants.ChartCategory.Intraday.ID && begin) {
    //         beginDate = utils.formatters.generateIntradayBeginDateString(begin);
    //     } else {
    //         beginDate = utils.formatters.generateChartBeginDateString(charCategory);
    //     }

    //     let queryParams = {
    //         RT: PriceConstants.MixRequest.TechnicalScore.RT,
    //         E: exchange,
    //         S: symbol,
    //         AE: PriceConstants.MixRequestParameters.AllExchange,
    //         SD: beginDate,
    //         ED: utils.formatters.generateChartEndDateString(charCategory)
    //     };

    //     return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams, _getGeneralQueryParams());
    // };

    //
    // private functions
    //
    let _getGeneralQueryParams = function () {
        // let userDS = reduxStore.store.getState().user.userData;

        return {
            UID: "",
            SID: "",
            L: sharedService.userSettings.currentLanguage, // User current Language
            UNC: PriceConstants.MixRequestParameters.EnableUnicode,
            UE: sharedService.userSettings.price.currentExchange,
            H: PriceConstants.MixRequestParameters.EnableHeaderTag,
            M: PriceConstants.MixRequestParameters.EnableMetaTag
        };
    };

    let _getValidationSymbol = function (exchange, symbol, instrumentType) {
        if (utils.validators.isAvailable(instrumentType)) {
            return [exchange, instrumentType, symbol].join(utils.Constants.StringConst.Tilde);
        } else {
            return [exchange, symbol].join(utils.Constants.StringConst.Tilde);
        }
    };

    let generateFundamentalScoreURL = function (exchange) {
        let priceService = sharedService.getService('price');

        let queryParams = {
            RT: PriceConstants.MixRequest.TechnicalScore.RT,
            E: exchange,
            AS: PriceConstants.MixRequestParameters.AllSymbol,
            UID: priceService.userDS.userId,
            SID: priceService.userDS.sessionId,
            MOD: 'FS',
            NOD: 3 // No of active days
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.analysis, queryParams);
    };

    let generateChangePwUrl = function (oldPassword, newPassword) {
        let priceService = sharedService.getService('price');

        let queryParams = {
            RT: PriceConstants.MixRequest.ChangePassword.RT,
            UID: priceService.userDS.username,
            OLDPASS: oldPassword,
            NEWPASS: newPassword
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.changePw, queryParams, _getGeneralQueryParams());
    };

    // Buyers Sellers request
    let generateBuyersSellersUrl = function (exchange, sym, fromDate, toDate) {
        let queryParams = {
            RT: PriceConstants.MixRequest.BuyersSellers.RT,
            E: exchange,
            S: sym,
            SD: fromDate,
            ED: toDate
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams, _getGeneralQueryParams());
    };

    // Broker Activities request
    let generateBrokerActivitiesUrl = function (exchange, brokerCode, fromDate, toDate) {
        let queryParams = {
            RT: PriceConstants.MixRequest.BrokerActivities.RT,
            E: exchange,
            ID: brokerCode,
            SD: fromDate,
            ED: toDate
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams, _getGeneralQueryParams());
    };

    // Broker Ranking request
    let generateBrokerRankingUrl = function (fromDate, toDate, exchange) {
        let queryParams = {
            RT: PriceConstants.MixRequest.BrokerRanking.RT,
            SD: fromDate,
            ED: toDate,
            E: exchange,
            UE: exchange
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.price, queryParams, _getGeneralQueryParams());
    };

    // Forgot password request
    let generateForgotPwUrl = function (email) {
        let priceService = sharedService.getService('price');

        let queryParams = {
            RT: PriceConstants.MixRequest.ForgotPassword.RT,
            UID: priceService.userDS.userId,
            EMAIL: email,
        };

        return utils.requestHelper.generateQueryString(sharedService.getService('price').settings.urlTypes.forgotPw, queryParams, _getGeneralQueryParams(), true);
    };

    return {
        generateExchangeMetadataUrl: generateExchangeMetadataUrl,
        generateSymbolValidationUrl: generateSymbolValidationUrl,
        generateSymbolValidationBulkUrl: generateSymbolValidationBulkUrl,
        generateSymbolSearchUrl: generateSymbolSearchUrl,
        // generateIntradayDataUrl: generateIntradayDataUrl,
        // generateChartDataUrl: generateChartDataUrl,
        generateAnnouncementBodyUrl: generateAnnouncementBodyUrl,
        generateNewsBodyUrl: generateNewsBodyUrl,
        generateAnnouncementSearchUrl: generateAnnouncementSearchUrl,
        generateNewsSearchUrl: generateNewsSearchUrl,
        generateCompanyProfileUrl: generateCompanyProfileUrl,
        generateTimeAndSalesBacklogUrl: generateTimeAndSalesBacklogUrl,
        generateCalenderEventsUrl: generateCalenderEventsUrl,
        generatePressReleaseUrl: generatePressReleaseUrl,
        generateYoutubeUrl: generateYoutubeUrl,
        generateInstagramUrl: generateInstagramUrl,
        generateFacebookUrl: generateFacebookUrl,
        generateDownloadStatementUrl: generateDownloadStatementUrl,
        generateExchangeSummaryUrl: generateExchangeSummaryUrl,
        generateGmsSummaryUrl: generateGmsSummaryUrl,
        generateSystemMetaDataUrl: generateSystemMetaDataUrl,
        generateAlertHistoryUrl: generateAlertHistoryUrl,
        generateFairValueHistoricalPriceUrl: generateFairValueHistoricalPriceUrl,
        generateFairValueReportUrl: generateFairValueReportUrl,
        generateFairValueReportLinkUrl: generateFairValueReportLinkUrl,
        generateCorporateActionUrl: generateCorporateActionUrl,
        // generateTOPVChartDataUrl: generateTOPVChartDataUrl,
        // generateTOPVIntradayDataUrl: generateTOPVIntradayDataUrl,
        generateVolumeWatcherURL: generateVolumeWatcherURL,
        generateOptionChainURL: generateOptionChainURL,
        generateExchangeSymbolDataUrl: generateExchangeSymbolDataUrl,
        generateProductSubscriptionUrl: generateProductSubscriptionUrl,
        generateLoginIndexPanelUrl: generateLoginIndexPanelUrl,
        generateClosingPriceUrl: generateClosingPriceUrl,
        generateBookShelfUrl: generateBookShelfUrl,
        generateTransMenuUrl: generateTransMenuUrl,
        generateFinancialUrl: generateFinancialUrl,
        generateUserRegistrationUrl: generateUserRegistrationUrl,
        generateInvestmentIdUrl: generateInvestmentIdUrl,
        generateInvestorPortfolioUrl: generateInvestorPortfolioUrl,
        generateCDVAndYTDPUrl: generateCDVAndYTDPUrl,
        generateBetaUrl: generateBetaUrl,
        generateFundamentalScoreURL: generateFundamentalScoreURL,
        // generateTechnicalScoreUrl: generateTechnicalScoreUrl,
        generateChangePwUrl: generateChangePwUrl,
        generateBuyersSellersUrl: generateBuyersSellersUrl,
        generateBrokerActivitiesUrl: generateBrokerActivitiesUrl,
        generateBrokerRankingUrl: generateBrokerRankingUrl,
        generateForgotPwUrl: generateForgotPwUrl,
        generateSpecialTradesUrl: generateSpecialTradesUrl
    };
})();