import WebSocketManager from '../protocols/CommunicationAdapter/WebSocketManager';
import priceSocketRequestHandler from '../protocols/WebSocket/PriceSocketRequestHandler'; // Singleton request generator object
import PriceSocketResponseHandler from '../protocols/WebSocket/PriceSocketResponseHandler'; // Class blue-print
import mixRequestHandler from '../protocols/MixWeb/MixRequestHandler';
import mixResponseHandler from '../protocols/MixWeb/MixResponseHandler';
import PriceConstants from '../constants/Price/PriceConstants';
// import ChartConstants from '../constants/Chart/ChartConstants';
import utils from '../util/utils/utils';
// import priceSubscriptionManager from '../../models/price/price-subscription-manager';
// import profileService from '../../../ua-kernal/models/shared/profile/profile-service';
// import PriceMeta from './business-entities/price-meta';
// import PriceExchangeMeta from './business-entities/price-exchange-meta';
// import PriceSymbolMeta from './business-entities/price-symbol-meta';
import AppConfig from '../protocols/config/AppConfig';
// import PriceUserData from './business-entities/price-user-data';
import * as sharedService from '../protocols/Shared/SharedServices';
import appEvents from '../protocols/app-events';
// import priceDataStoreFactory from './data-stores/price-data-store-factory';
// import languageDataStore from '../../../ua-kernal/models/shared/language/language-data-store';
// import PriceUser from './business-entities/price-user';
// import reduxStore from '../../../utils/reduxStore';
import TinyQueue from 'tinyqueue';

export default class PriceService {
    constructor() {
        this.userData = {
            cacheKey: 'priceUser',
            isEncrypt: true,
            oneDayInMillis: 86400000, // 1000 * 60 * 60 * 24

            sessionId: '',
            authStatus: 0,
            userId: '',
            username: '',
            userExchg: [], // Only default exchanges
            newsProviders: '',
            expiryDate: '',
            windowTypes: {},
            name: '',
            expiredExchg: '',
            inactiveExchg: '',
            metaVersion: '',
            delayedExchg: [], // Only delayed exchanges
            prevDayExchg: [], // Only previous market day exchanges
            billingCode: 'ISI',
            nonDefExg: [], // Only non-default exchanges
            isMultipleUserExchangesAvailable: false,
        };
        this.subscriptionKey = 'price';
        this.symbolMultiSubscriptionMap = {};
        this.pendingFullMktSubscriptions = {};
        this.settings = {};

        // Generate single web socket manager instance specific to price service
        this.webSocketManager = undefined;
        this.connectionStatus = false;

        // API for accessing the data stores
        this.announcementDS = undefined;
        this.marketDepthDS = undefined;
        this.exchangeDS = undefined;
        this.ohlcDS = undefined;
        this.stockDS = undefined;
        this.gmsDS = undefined;
        this.systemMetaDS = undefined;
        this.alertDS = undefined;
        this.topStockDS = undefined;
        this.companyProfileDS = undefined;
        this.timeAndSalesDS = undefined;
        this.socialMediaDS = undefined;
        this.searchDS = undefined;
        this.sectorDS = undefined;
        this.subMarketDS = undefined;
        this.watchListDS = undefined;
        this.optionStockDS = undefined;
        this.fairValueDS = undefined;
        this.corporateActionDS = undefined;
        this.theoreticalChartDS = undefined;
        this.theoreticalStockDS = undefined;
        this.financialDS = undefined;
        this.portfolioDS = undefined;
        this.bookShelfDS = undefined;
        this.registrationDS = undefined;
        this.investorsDS = undefined;
        this.technicalScoreDS = undefined;
        this.buyersSellersDS = undefined;
        this.brokerActivitiesDS = undefined;
        this.brokerRankingDS = undefined;
        this.transactionMenuDS = undefined;
        this.specialTradesDS = undefined;

        // this.userDS = new PriceUser(this.userData);
        // this.priceMeta = new PriceMeta();
        // this.priceExchangeMeta = new PriceExchangeMeta();
        // // this.priceSymbolMeta = new PriceSymbolMeta();
        // this.priceUserData = new PriceUserData();
        this.authSuccessSubscription = {};
        this.fullMarketSubscription = {};
        this.priceMetaReadySubscription = {};
        this.priceExchangeSummaryMetaReadySubscription = {};
        this.connectionStatusSubscription = {};
        this.MarketStatus = PriceConstants.MarketStatus;

        this.isPriceMetaReady = false;
        this.isExchangeSummaryMetaReady = false;
        this.isDefaultMetaRequestFail = false;
        this.isAuthSuccess = false;
        this.mixReqQueue = new TinyQueue();
        this.socketReqQueue = new TinyQueue();
        this.isAuthResponse = false;
        this.changePasswordCallback = {};

        this.webSocketManager = new WebSocketManager(priceSocketRequestHandler, PriceSocketResponseHandler, this);
        // this.subscribeAuthSuccess(this, this.subscriptionKey);

        // appEvents.subscribeLanguageChanged(this, this.subscriptionKey);
        // this.app = languageDataStore.getLanguageObj();

    }



    isMoreMarketsAvailable () {
        return this.userDS.userExchg.length > 1;
    }

    isPriceMetadataReady () {
        return this.isPriceMetaReady;
    }

    isAuthenticated () {
        return this.isAuthSuccess;
    }

    isExchangeSummaryMetadataReady () {
        return this.isExchangeSummaryMetaReady;
    }

    createDataStores () {
        // this.announcementDS = priceDataStoreFactory.createAnnouncementDataStore(this);
        // this.marketDepthDS = priceDataStoreFactory.createMarketDepthDataStore(this);
        // this.exchangeDS = priceDataStoreFactory.createExchangeDataStore(this);
        // this.ohlcDS = priceDataStoreFactory.createOHLCDataStore(this);
        // this.stockDS = priceDataStoreFactory.createStockDataStore(this);
        // this.alertDS = priceDataStoreFactory.createAlertDataStore(this);
        // this.gmsDS = priceDataStoreFactory.createGMSDataStore(this);
        // this.systemMetaDS = priceDataStoreFactory.createSystemMetaDataStore(this);
        // this.topStockDS = priceDataStoreFactory.createTopStockDataStore(this);
        // this.companyProfileDS = priceDataStoreFactory.createCompanyProfileDataStore(this);
        // this.timeAndSalesDS = priceDataStoreFactory.createTimeAndSalesDataStore(this);
        // this.searchDS = priceDataStoreFactory.createSearchDataStore(this);
        // this.sectorDS = priceDataStoreFactory.createSectorDataStore(this);
        // this.subMarketDS = priceDataStoreFactory.createSubMarketDataStore(this);
        // this.watchListDS = priceDataStoreFactory.createWatchListDataStore(this);
        // this.fairValueDS = priceDataStoreFactory.createFairValueDataStore(this);
        // this.corporateActionDS = priceDataStoreFactory.createCorporateActionDataStore(this);
        // this.theoreticalChartDS = priceDataStoreFactory.createTheoreticalChartDataStore(this);
        // this.theoreticalStockDS = priceDataStoreFactory.createTheoreticalStockDataStore(this);
        // this.optionStockDS = priceDataStoreFactory.createOptionStockDataStore(this);
        // this.optionPeriodDS = priceDataStoreFactory.createOptionPeriodDataStore(this);

    }

    subscribeAuthSuccess (subscriber, key) {
        this.authSuccessSubscription[key] = subscriber;
    }

    subscribePriceMetaReady (subscriber, key) {
        if (utils.validators.isAvailable(key)) {
            this.priceMetaReadySubscription[key] = subscriber;
        }
    }

    unSubscribePriceMetaReady (key) {
        if (utils.validators.isAvailable(key)) {
            this.priceMetaReadySubscription[key] = undefined;
        }
    }

    subscribePriceExchangeSummaryMetaReady (subscriber, key) {
        if (utils.validators.isAvailable(key)) {
            this.priceExchangeSummaryMetaReadySubscription[key] = subscriber;
        }
    }

     sendDataToServer (exchange) {
        let submarket = sharedService.getService('price').exchangeDS.getDefaultSubMarket(exchange);

         // reduxStore.store.dispatch(getDefaultSubMarket(exchange))
         // var defaultSubMkt = reduxStore.store.getState().exchangeStore.marketId;

        this.sendTopStocksRequest(exchange, 1, submarket);
        this.sendTopStocksRequest(exchange, 3, submarket);
        this.sendTopStocksRequest(exchange, 4, submarket);

    }
    onAuthSuccess () {
        let that = this;
        this.isAuthSuccess = true;

        // reduxStore.store.dispatch(setLoginStatus());
        let exg =  sharedService.userSettings.price.currentExchange;
        let mainIndex = sharedService.userSettings.price.currentIndex;

        // console.log('exg response  ', exg ,mainIndex);
        // profileService.handleProfileService();
        this.sendExchangeSummaryRequest();

        // Update metadata with delayed indicator
        mixResponseHandler.processDelayedPriceMeta();

        // Request for user exchange metadata
        this.exchangeDS.requestAllExchangeMetadata();
        // Initialize symbol validation timer to periodically validate for symbols
        this.stockDS.initializeSymbolValidation();

        // TODO: [Bashitha] Handle sub market wise full market subscription after QS implementation

        let symbolMM =this.symbolMultiSubscriptionMap;
        Object.keys(symbolMM).forEach(function(key) {
            if (symbolMM[key]) {
                setTimeout(function (){
                    that.onFullMarketSnapshotReceived(key);
                },30000);
            }
        });

        that.addFullMarketIndexRequest(exg);

        that.addExchangeRequest(exg);

        that.addIndexRequest(exg,mainIndex);
        // that.addSymbolRequest(exg,mainIndex)

        // that.addFullMarketSymbolRequest(exg,1)
        // that.sendTopStocksRequest('TDWL', 1, 1)


        if (this.isPriceMetadataReady()) {
            this._sendQueuedMixSocketRequest();
            that.addFullMarketSymbolRequest(exg)

            that.sendDataToServer(exg);

            setTimeout(function () {
                that.sendDataToServer(exg);
            }, PriceConstants.TimeIntervals.TopStocksUpdateInterval)
        }

        setTimeout(function () {
            that.sendSystemMetaDataRequest();
        }, 2000);
    }

    onPriceExchangeSummaryMetaReady () {
        this.isExchangeSummaryMetaReady = true;
        let priceExg =this.priceExchangeSummaryMetaReadySubscription;

        Object.keys(priceExg).forEach(function(key) {

            if (priceExg[key] && priceExg[key].onPriceExchangeSummaryMetaReady instanceof Function) {
                priceExg[key].onPriceExchangeSummaryMetaReady();
            }
        });
    }

    subscribeFullMarketReceived (key, subscriber) {
        if (utils.validators.isAvailable(key)) {
            this.fullMarketSubscription[key] = subscriber;
        }
    }

    unSubscribeFullMarketReceived (key) {
        if (utils.validators.isAvailable(key)) {
            this.fullMarketSubscription[key] = undefined;
        }
    }

    onFullMarketSnapshotReceived (exchange) {
        let fullMS = this.fullMarketSubscription;
        Object.keys(fullMS).forEach(function(key) {
            if (fullMS[key] && fullMS[key].onFullMarketSnapshotReceived instanceof Function) {
                fullMS[key].onFullMarketSnapshotReceived(exchange);
            }
        });
    }

    subscribeConnectionStatusChanged (key, subscriber) {
        if (utils.validators.isAvailable(key)) {
            this.connectionStatusSubscription[key] = subscriber;
        }
    }

    unSubscribeConnectionStatusChanged (key) {
        if (utils.validators.isAvailable(key)) {
            this.connectionStatusSubscription[key] = undefined;
        }
    }

    onPriceConnectionStatusChanged (stat) {
        let connectionStatusData = this.connectionStatusSubscription;

        Object.keys(connectionStatusData).forEach(function(key) {
            if (connectionStatusData[key] && connectionStatusData[key].onPriceConnectionStatusChanged instanceof Function) {
                connectionStatusData[key].onPriceConnectionStatusChanged(stat);
            }
        });
    }

    /* *
    * Authenticate with username and password
    * @param authParams An object with following properties set
    *                      username    : Username. Mandatory.
    *                      password    : Password. Mandatory.
    *                      loginIP     : Machine IP
    *                      appVersion  : Application version
    *                      lan         : Current Language. Mandatory.
    *                      metaVer     : Auth meta version (taken from the cache). Default 0. Mandatory.
    *                      authSuccess : Auth success function. Mandatory.
    *                      authFailed  : Auth failure function. Mandatory.
    */
    authenticateWithUsernameAndPassword (authParams) {
        try {
            authParams.authSuccess = this._modifyAuthSuccess(authParams);
            authParams.authFailed = this._modifyAuthFailed(authParams);

            utils.logger.logInfo('Authenticating price retail user...');

            let req = priceSocketRequestHandler.generateRetailAuthRequest(authParams);
            console.log("---- Auth req ----");
            console.log(req);
            this.webSocketManager.sendAuth(req, PriceConstants.SocketConnectionType.QuoteServer, authParams);

        } catch (e) {
            utils.logger.logError('Error in price retail authenticating... ' + e.message);
        }

        this._checkAuthResponse(authParams);
    }

    authenticateWithSsoToken (authParams) {
        try {
            // authParams.authSuccess = this._modifyAuthSuccess(authParams);
            // authParams.authFailed = this._modifyAuthFailed(authParams);

            // utils.logger.logInfo('Authenticating price sso user...');

            let req = priceSocketRequestHandler.generateSsoAuthRequest(authParams);
            this.webSocketManager.sendAuth(req, PriceConstants.SocketConnectionType.QuoteServer, authParams, true);
        } catch (e) {
            utils.logger.logError('Error in price sso authenticating... ' + e.message);
        }

        this._checkAuthResponse(authParams);
    }

    _modifyAuthSuccess (authParams) {
        let that = this;
        let origAuthSuccess = authParams.authSuccess;

        return function () {
            that._updateUserExchange(origAuthSuccess);
        };
    }

    _modifyAuthFailed (authParams) {
        let origAuthFailed = authParams.authFailed;
        let that = this;

        return function (response) {
            if (origAuthFailed instanceof Function) {
                that.isAuthResponse = true;
                origAuthFailed(response);
            }
        };
    }

    _checkAuthResponse (authParams) {
        let that = this;

        setInterval(function () {
            if (!that.isAuthResponse) {
                // TODO [Jayanes] need to handle that.app.lang.messages.authTimedOut
                let authTimeoutMessage = 'authentication error';
                let origAuthFailed = authParams.authFailed;

                // sharedService.userSettings.clearLoginToken();

                if (origAuthFailed instanceof Function) {
                    origAuthFailed(authTimeoutMessage);
                }
            }
        },  PriceConstants.TimeIntervals.AuthenticationTimeout);
    }

    setConnectionStatus (stat) {
        this.connectionStatus = stat;   // TODO: [Jayanes] Need to check
        this.onPriceConnectionStatusChanged(stat);
    }

    isConnected () {
        return this.webSocketManager.isConnected(PriceConstants.SocketConnectionType.QuoteServer);
    }

    // API for handling market data and meta data

    /* *
     * Subscribe and Un-subscribe from exchange updates
     * @param exchange Exchange code string
     */
    addExchangeRequest (exchange) {
        if (utils.validators.isAvailable(exchange)) {
            let req = priceSocketRequestHandler.generateAddExchangeRequest(exchange, PriceConstants.RequestType.Data.RequestExchange);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    removeExchangeRequest (exchange) {
        if (utils.validators.isAvailable(exchange)) {
            let req = priceSocketRequestHandler.generateRemoveExchangeRequest(exchange, PriceConstants.RequestType.Data.RequestExchange);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    /* *
     * Subscribe and Un-subscribe from symbol updates
     * @param exchange Exchange Code string
     * @param symbol Symbol Code string
     * @param insType Instrument type String
     */
    addSymbolRequest (exchange, symbol, insType) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            let req = priceSocketRequestHandler.generateAddSymbolRequest(exchange, this._updateSymbolCode(symbol, insType), this._getStockMessageType(insType));
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    removeSymbolRequest (exchange, symbol, insType) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            let req = priceSocketRequestHandler.generateRemoveSymbolRequest(exchange, this._updateSymbolCode(symbol, insType), this._getStockMessageType(insType));
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    /* *
     * Subscribe and Un-subscribe from index updates
     * @param exchange Exchange Code string
     * @param symbol Index Code string
     */
    addIndexRequest (exchange, symbol) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            let req = priceSocketRequestHandler.generateAddSymbolRequest(exchange, symbol, PriceConstants.RequestType.Data.RequestIndex);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    removeIndexRequest (exchange, symbol) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            let req = priceSocketRequestHandler.generateRemoveSymbolRequest(exchange, symbol, PriceConstants.RequestType.Data.RequestIndex);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    /* *
     * Subscribe and Un-subscribe from full market symbol updates
     * @param exchange Exchange Code string
     * @param subMarketId sub marketId string
     */
    addFullMarketSymbolRequest (exchange, subMarketId) {
        let exchangeObj = this.exchangeDS.getExchange(exchange);

        if (exchangeObj.subMarketArray) {
            this._addFullMarketSymbolRequest(exchange, subMarketId);
        } else {
            this.pendingFullMktSubscriptions[exchange] = true;

            if (this.isPriceMetadataReady()) {
                this._addFullMarketSymbolRequest(exchange, subMarketId);
            } else {
                this.socketReqQueue.push({
                    callbackFn: this._addFullMarketSymbolRequest,
                    args: [exchange, subMarketId] // Queue arguments as an array
                });
            }
        }
    }

    _addFullMarketSymbolRequest (exchange, subMarketId) {
        let symbolList;
        let that = this;
        // let subMarket = subMarketId ? subMarketId : this.exchangeDS.getDefaultSubMarket(exchange);
        let subMarket = subMarketId;
        let allowedSubMktsByExchange;

        if (AppConfig.customisation.allowedSubMarkets) {
            allowedSubMktsByExchange = AppConfig.customisation.allowedSubMarkets[exchange];
        }

        // if (subMarket === -1) {
        if (!subMarket) {
            symbolList = this.stockDS.getSymbolCollectionByExchange(exchange);
        } else {
            symbolList = this.stockDS.getStockCollectionBySubMarket(exchange, subMarket);

        }

        // console.log('>>>>> ', symbolList, subMarket)
        if (symbolList.length > 500) {
            this.symbolMultiSubscriptionMap[exchange] = true;
            Object.keys(symbolList).forEach(function(key) {
                that.addSymbolRequest(exchange, symbolList[key].sym, symbolList[key].inst);
            });

            this.pendingFullMktSubscriptions[exchange] = false;
        } else if (symbolList.length > 0 && utils.validators.isAvailable(exchange)) {
            this.symbolMultiSubscriptionMap[exchange] = false;

            if (allowedSubMktsByExchange && allowedSubMktsByExchange.length > 0) {
                if (subMarketId && allowedSubMktsByExchange.contains(subMarketId)) {
                    this._sendAddFullMarketSymbolRequest(exchange, subMarketId);
                } else if (!subMarketId) {
                    Object.keys(allowedSubMktsByExchange).forEach(function(key) {
                        that._sendAddFullMarketSymbolRequest(exchange, allowedSubMktsByExchange[key]);
                    });
                }
            } else if (subMarketId) {
                this._sendAddFullMarketSymbolRequest(exchange, subMarketId);
            } else {
                this._sendAddFullMarketSymbolRequest(exchange);
            }

            this.pendingFullMktSubscriptions[exchange] = false;
        } else {
            this.pendingFullMktSubscriptions[exchange] = true;
        }
    }

    removeFullMarketSymbolRequest (exchange, subMarketId) {
        if (utils.validators.isAvailable(exchange) && !this.symbolMultiSubscriptionMap[exchange]) {
            let allowedSubMktsByExchange;
            let that = this;

            if (AppConfig.customisation.allowedSubMarkets) {
                allowedSubMktsByExchange = AppConfig.customisation.allowedSubMarkets[exchange];
            }

            if (allowedSubMktsByExchange && allowedSubMktsByExchange.length > 0) {
                if (subMarketId && allowedSubMktsByExchange.contains(subMarketId)) {
                    this._sendRemoveFullMarketSymbolRequest(exchange, subMarketId);
                } else if (!subMarketId) {
                    Object.keys(allowedSubMktsByExchange).forEach(function(key) {
                        that._sendRemoveFullMarketSymbolRequest(exchange, allowedSubMktsByExchange[key]);
                    });
                }
            } else if (subMarketId) {
                this._sendRemoveFullMarketSymbolRequest(exchange, subMarketId);
            } else {
                this._sendRemoveFullMarketSymbolRequest(exchange);
            }
        }
    }

    /* *
     * Subscribe and Un-subscribe from full market index updates
     * @param exchange Exchange Code string
     */
    addFullMarketIndexRequest (exchange) {
        if (utils.validators.isAvailable(exchange)) {
            let req = priceSocketRequestHandler.generateAddExchangeRequest(exchange, PriceConstants.RequestType.Data.RequestIndex);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    removeFullMarketIndexRequest (exchange) {
        if (utils.validators.isAvailable(exchange)) {
            let req = priceSocketRequestHandler.generateRemoveExchangeRequest(exchange, PriceConstants.RequestType.Data.RequestIndex);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    /* *
     * Subscribe and Un-subscribe from custom list of symbols
     * @param exchange Exchange Code string
     * @param symbolList Symbol List array
     * @param insType Instrument type
     */
    addSymbolListRequest (exchange, symbolList, insType) {
        let req = priceSocketRequestHandler.generateAddSymbolBulkRequest(exchange, this._updateSymbolCodeArray(symbolList, insType).join('~'), this._getStockMessageType(insType));
        this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
    }

    removeSymbolListRequest (exchange, symbolList, insType) {
        let req = priceSocketRequestHandler.generateRemoveSymbolBulkRequest(exchange, this._updateSymbolCodeArray(symbolList, insType).join('~'), this._getStockMessageType(insType));
        this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
    }

    /* *
     * Subscribe and Un-subscribe from market depth by price updates
     * @param exchange Exchange code string
     * @param symbol Symbol code string
     */
    addMarketDepthByPriceRequest (exchange, symbol) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            if (this.isAuthenticated()) {
                this._sendMarketDepthByPriceRequest(exchange, symbol);
            } else {
                this.socketReqQueue.push({
                    callbackFn: this._sendMarketDepthByPriceRequest,
                    args: [exchange, symbol] // Queue arguments as an array
                });
            }
        }
    }

    removeMarketDepthByPriceRequest (exchange, symbol) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            let req = priceSocketRequestHandler.generateRemoveSymbolRequest(exchange, symbol, PriceConstants.RequestType.Data.RequestMarketDepthByPrice);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    /* *
     * Subscribe and Un-subscribe from market depth by order updates
     * @param exchange Exchange code string
     * @param symbol Symbol code string
     */
    addMarketDepthByOrderRequest (exchange, symbol) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            if (this.isAuthenticated()) {
                this._sendMarketDepthByOrderRequest(exchange, symbol);
            } else {
                this.socketReqQueue.push({
                    callbackFn: this._sendMarketDepthByOrderRequest,
                    args: [exchange, symbol] // Queue arguments as an array
                });
            }
        }
    }

    removeMarketDepthByOrderRequest (exchange, symbol) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            let req = priceSocketRequestHandler.generateRemoveSymbolRequest(exchange, symbol, PriceConstants.RequestType.Data.RequestMarketDepthByOrder);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    /* *
     * Subscribe and Un-subscribe from Intraday chart (OHLC) updates
     * @param exchange Exchange code string
     * @param symbol Symbol code string
     */
    addIntradayChartRequest (exchange, symbol) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            if (this.isPriceMetadataReady()) {
                this._sendIntraDayChartRequest(exchange, symbol);
            } else {
                this.socketReqQueue.push({
                    callbackFn: this._sendIntraDayChartRequest,
                    args: [exchange, symbol] // Queue arguments as an array
                });
            }
        }
    }

    removeIntradayChartRequest (exchange, symbol) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            let req = priceSocketRequestHandler.generateRemoveSymbolRequest(exchange, symbol, PriceConstants.RequestType.Data.RequestOHLC);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    /* *
     * Subscribe and Un-subscribe from Intraday chart (TOPV) updates
     * @param exchange Exchange code string
     * @param symbol Symbol code string
     */
    addTOPVIntradayChartRequest (exchange, symbol) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            if (this.isPriceMetadataReady()) {
                this._sendTOPVIntraDayChartRequest(exchange, symbol);
            } else {
                this.socketReqQueue.push({
                    callbackFn: this._sendTOPVIntraDayChartRequest,
                    args: [exchange, symbol] // Queue arguments as an array
                });
            }
        }
    }

    removeTOPVIntradayChartRequest (exchange, symbol) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            let req = priceSocketRequestHandler.generateRemoveSymbolRequest(exchange, symbol, PriceConstants.RequestType.Data.RequestTOPVOHLC);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    /* *
     * Subscribe and Un-subscribe from Announcements updates
     * @param exchange Exchange code string
     * @param language Language code string
     */
    addFullMarketAnnouncementRequest (exchange, language) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(language)) {
            let req = priceSocketRequestHandler.generateAddExchangeRequest(exchange, PriceConstants.RequestType.Data.RequestAnnouncement, language);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    removeFullMarketAnnouncementRequest (exchange, language) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(language)) {
            let req = priceSocketRequestHandler.generateRemoveExchangeRequest(exchange, PriceConstants.RequestType.Data.RequestAnnouncement, language);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    /* *
    * Subscribe and Un-subscribe from News updates
    * @param newsProvider News provider string
    * @param language Language code string
    */
    addFullMarketNewsRequest (newsProviders, language) {
        if (newsProviders && newsProviders.length > 0) {
            let that = this;
            Object.keys(newsProviders).forEach(function(key) {
                that.key =newsProviders[key];
                if (utils.validators.isAvailable(newsProviders[key]) && utils.validators.isAvailable(language) &&
                    that.userDS.isWindowTypeAvailable([PriceConstants.WindowType.News], 'SYS')) {
                    let req = priceSocketRequestHandler.generateAddExchangeRequest(newsProviders[key], PriceConstants.RequestType.Data.RequestNews, language);
                    that.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
                }
            });
        }
    }

    removeFullMarketNewsRequest (newsProviders, language) {
        if (newsProviders && newsProviders.length > 0) {
            let that = this;

            Object.keys(newsProviders).forEach(function(key) {
                if (utils.validators.isAvailable(newsProviders[key]) && utils.validators.isAvailable(language)) {
                    let req = priceSocketRequestHandler.generateRemoveExchangeRequest(newsProviders[key], PriceConstants.RequestType.Data.RequestNews, language);
                    that.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
                }
            });
        }
    }

    /* *
     * Subscribe and Un-subscribe from time and sales updates
     * @param exchange Exchange code string
     * @param symbol Symbol code string
     */
    addTimeAndSalesRequest (exchange, symbol, isShowBuyerSeller) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            if (this.isAuthenticated() && this.isPriceMetadataReady()) {
                this._sendTimeAndSalesRequest(exchange, symbol, isShowBuyerSeller);
            } else {
                this.socketReqQueue.push({
                    callbackFn: this._sendTimeAndSalesRequest,
                    args: [exchange, symbol, isShowBuyerSeller] // Queue arguments as an array
                });
            }
        }
    }

    addCalenderEventRequest (exchange, callbackFn) {
        if (utils.validators.isAvailable(exchange)) {
            if (this.isAuthenticated() && this.isPriceMetadataReady()) {
                this._sendCalenderEventMixRequest(exchange, callbackFn);
            } else {
                this.socketReqQueue.push({
                    callbackFn: this._sendCalenderEventMixRequest,
                    args: [exchange] // Queue arguments as an array
                });
            }
        }
    }

    addYoutubeEventRequest (exchange, nextPageUrl, callbackFn) {
        if (utils.validators.isAvailable(exchange)) {
            if (this.isAuthenticated() && this.isPriceMetadataReady()) {
                this._sendYoutubeEventMixRequest(nextPageUrl, callbackFn);
            } else {
                this.socketReqQueue.push({
                    callbackFn: this._sendYoutubeEventMixRequest,
                    args: [nextPageUrl] // Queue arguments as an array
                });
            }
        }
    }

    addInstagramEventRequest (exchange) {
        if (utils.validators.isAvailable(exchange)) {
            if (this.isAuthenticated() && this.isPriceMetadataReady()) {
                this._sendInstagramEventMixRequest();
            } else {
                this.socketReqQueue.push({
                    callbackFn: this._sendInstagramEventMixRequest,
                    args: [exchange] // Queue arguments as an array
                });
            }
        }
    }

    addFacebookEventRequest (exchange, nextPageUrl, callbackFn) {
        if (utils.validators.isAvailable(exchange)) {
            if (this.isAuthenticated() && this.isPriceMetadataReady()) {
                this._sendFacebookEventMixRequest(nextPageUrl, callbackFn);
            } else {
                this.socketReqQueue.push({
                    callbackFn: this._sendFacebookEventMixRequest,
                    args: [nextPageUrl, callbackFn] // Queue arguments as an array
                });
            }
        }
    }

    addDownloadStatementRequest (requestObj, callbackFn) {
        this._sendDownloadStatementMixRequest(requestObj, callbackFn);
    }

    addPressReleaseRequest (exchange) {
        if (utils.validators.isAvailable(exchange)) {
            if (this.isAuthenticated() && this.isPriceMetadataReady()) {
                this._sendPressReleaseMixRequest();
            } else {
                this.socketReqQueue.push({
                    callbackFn: this._sendPressReleaseMixRequest,
                    args: [exchange] // Queue arguments as an array
                });
            }
        }
    }

    removeTimeAndSalesRequest (exchange, symbol, isShowBuyerSeller) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            let reqType = isShowBuyerSeller ? PriceConstants.RequestType.Data.RequestTimeAndSalesDetail : PriceConstants.RequestType.Data.RequestTimeAndSales;
            let req = priceSocketRequestHandler.generateRemoveSymbolRequest(exchange, symbol, reqType);

            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    /* *
     * Subscribe and Un-subscribe from market time and sales updates
     * @param exchange Exchange code string
     */
    addMarketTimeAndSalesRequest (exchange) {
        if (utils.validators.isAvailable(exchange)) {
            if (this.isAuthenticated() && this.isPriceMetadataReady()) {
                this._sendMarketTimeAndSalesRequest(exchange);
            } else {
                this.socketReqQueue.push({
                    callbackFn: this._sendMarketTimeAndSalesRequest,
                    args: [exchange] // Queue arguments as an array
                });
            }
        }
    }


    removeMarketTimeAndSalesRequest (exchange) {
        if (utils.validators.isAvailable(exchange)) {
            let req = priceSocketRequestHandler.generateRemoveExchangeRequest(exchange, PriceConstants.RequestType.Data.RequestTimeAndSales);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    /* *
     * Placing an Alert
     * @param exchange Exchange code string
     * @param symbol symbol code string
     * @param instrumentType instrument Type string
     * @param alertFilter alert Filter string
     * @param token alert token string
     * @param isEdit alert edit mode string
     */
    sendAlertPlaceRequest (exchange, symbol, instrumentType, alertFilter, token, isEdit) {
        let messageType = isEdit ? PriceConstants.RequestType.Data.RequestAlertUpdate : PriceConstants.RequestType.Data.RequestAlertPlace;
        let req = priceSocketRequestHandler.generateAlertPlaceRequest(exchange, symbol, instrumentType, alertFilter, token, messageType);

        this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
    }

    /* *
     * Alert History for client - WS
     *
     */
    sendAlertHistoryRequest () {
        let req = priceSocketRequestHandler.generateAlertHistoryRequest();
        this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
    }

    /* *
     * Alert UnSubscribe
     *
     * @param exchange Exchange code string
     * @param symbol symbol code string
     * @param instrumentType instrument Type string
     * @param token alert token string
     * */
    sendAlertUnsubscribeRequest (exchange, symbol, instrumentType, token) {
        let req = priceSocketRequestHandler.generateAlertUnsubscribeRequest(exchange, symbol, instrumentType, token);
        this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
    }

    /* *
     * Query top stock data
     * @param exchange Exchange code string
     * @param topStockType Top stock type string
     * @param subMarketCode Sub market code string
     * @param language Language code string
     */
    sendTopStocksRequest (exchange, topStockType, subMarketCode, language) {
        let req = priceSocketRequestHandler.generateTopStockRequest(exchange, topStockType, subMarketCode, language);
        this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
    }

    changePassword (reqObj, callbackFn) {
        let oldPwd = utils.crypto.encryptText(reqObj.oldPwd);
        reqObj.oldPwd = [';', utils.formatters.convertBase64toHEX(oldPwd)].join('');

        let newPwd = utils.crypto.encryptText(reqObj.newPwd);
        reqObj.newPwd = [';', utils.formatters.convertBase64toHEX(newPwd)].join('');

        let req = priceSocketRequestHandler.generateChangePasswordRequest(reqObj);

        this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        this.changePasswordCallback = callbackFn;
    }

    /* *
     * Subscribe and Un-subscribe from projected price stock updates
     * @param exchange Exchange Code string
     */
    addProjectedPriceRequest (exchange) {
        if (utils.validators.isAvailable(exchange)) {
            let req = priceSocketRequestHandler.generateAddProjectedPriceRequest(exchange, PriceConstants.RequestType.Data.RequestProjectedPrice);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    removeProjectedPriceRequest (exchange) {
        if (utils.validators.isAvailable(exchange)) {
            let req = priceSocketRequestHandler.generateRemoveProjectedPriceRequest(exchange, PriceConstants.RequestType.Data.RequestProjectedPrice);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }


    // MIX Requests

    // Symbol Validation Request to Receive Meta Data for a symbol
    sendSymbolValidationRequest (exchange, symbol, insType) {
        mixRequestHandler.loadSymbolValidationData(exchange, symbol, insType);
    }

    sendChangePasswordRequest (reqObj, callbackFn) {
        mixRequestHandler.sendChangePasswordRequest(reqObj.oldPwd, reqObj.newPwd, callbackFn);
    }

    sendForgotPasswordRequest (reqObj, callbackFn) {
        mixRequestHandler.sendForgotPasswordRequest(reqObj.email, callbackFn);
    }

    // Symbol Validation Request to Receive Meta Data for Symbol List
    sendSymbolValidationBulkRequest (symbolObjArray) {
        mixRequestHandler.loadSymbolValidationBulkData(symbolObjArray);
    }

    sendSymbolSearchRequest (searchKey, language, pageSize, notifyFn, params, searchNumber) {
        mixRequestHandler.loadSymbolSearchData(searchKey, language, pageSize, notifyFn, params, searchNumber);
    }

    // Company Profile
    sendCompanyProfileRequest (exchange, symbol, language, postSuccess, Error) {
        mixRequestHandler.loadCompanyProfileData(exchange, symbol, language, postSuccess, Error);
    }

    // Gms Summary
    sendGmsSummaryRequest () {
        if (this.isPriceMetadataReady()) {
            mixRequestHandler.loadGmsSummary();
        } else {
            this.mixReqQueue.push({
                callbackFn: mixRequestHandler.loadGmsSummary
            });
        }
    }

    // System Meta Data
    sendSystemMetaDataRequest () {
        mixRequestHandler.loadSystemMetaData();
    }

    // Financials and Ratios Data request(RT=131)
    sendFinancialRatioDataRequest (exchange, symbol, language, secondSymAdded, primarySymbol, secondarySymbol, periodType, callbackFn) {
        mixRequestHandler.loadFinancialData(exchange, symbol, language, secondSymAdded, primarySymbol, secondarySymbol, periodType, callbackFn);
    }

    // Historical Closing Price Data
    sendClosingPriceRequest (exchange, symbol, language, startDate, endDate, callbackFn) {
        mixRequestHandler.loadClosingPriceData(exchange, symbol, language, startDate, endDate, callbackFn);
    }

    // Bookshelf Data
    sendBookShelfRequest (exchange, callback) {
        mixRequestHandler.loadBookShelfData(exchange, callback);
    }

    // Special Trades Data
    sendSpecialTradesRequest (exchange, callback) {
        mixRequestHandler.loadSpecialTradesData(exchange, callback);
    }

    sendTransMenuRequest (date, callback) {
        mixRequestHandler.loadTransactionsMenu(date, callback);
    }

    // New User Registration Data
    sendUserRegistrationRequest (username, password, email) {
        mixRequestHandler.sendUserRegistrationRequest(username, password, email);
    }

    // Investment ID
    sendInvestmentIdRequest (exchange, uname, callbackFn) {
        mixRequestHandler.loadInvestmentId(exchange, uname, callbackFn);
    }

    // Investor Portfolio Data
    sendInvestorPortfolioRequest (investId, callbackFn) {
        mixRequestHandler.loadInvestorPortfolioData(investId, callbackFn);
    }

    // Alert History
    sendAlertHistoryMetaRequest () {
        mixRequestHandler.loadAlertHistory();
    }

    // App Store Versions
    sendAppStoreVersionRequest (callbackFn) {
        mixRequestHandler.loadAppStoreVersion(callbackFn);
    }

    // Fundamental Score Data request(RT=131)
    sendFundamentalScoreRequest (exchange, callbackFn) {
        mixRequestHandler.loadFundamentalScoreData(exchange, callbackFn);
    }

    // Buyers Sellers Data
    sendBuyersSellersRequest (exchange, sym, fromDate, toDate, mode) {
        mixRequestHandler.loadBuyersSellersData(exchange, sym, fromDate, toDate, mode);
    }

    // Broker Activities Data
    sendBrokerActivitiesRequest (exchange, brokerCode, fromDate, toDate, mode) {
        mixRequestHandler.loadBrokerActivitiesData(exchange, brokerCode, fromDate, toDate, mode);
    }

    // Broker Ranking Data
    sendBrokerRankingRequest (fromDate, toDate, exchange) {
        mixRequestHandler.loadBrokerRankingData(fromDate, toDate, exchange);
    }

    // Content Requests
    // RT = 306 (Composite Request)
    loadExchangeMetadata (exchanges, successFn, errorFn) {
        let that = this;

        Object.keys(exchanges).forEach(function(key) {
            let metaSuccessFn = function () {
                if (that.pendingFullMktSubscriptions[exchanges[key]]) {
                    that.addFullMarketSymbolRequest(exchanges[key]);
                }

                if (successFn instanceof Function) {
                    successFn();
                }
            };
            mixRequestHandler.loadExchangeMetadata(exchanges[key], sharedService.userSettings.currentLanguage, metaSuccessFn, errorFn);
        });
    }

    processPriceMeta (language) {
        // let priceMetaObj = PriceMeta.metaData;

        // if (typeof priceMetaObj !== 'undefined') {
        //     Object.keys(priceMetaObj).forEach(function(key) {
        //         mixResponseHandler.processExchangeMetadataResponse(priceMetaObj[key], language, key);
        //     });
        // }
    }

    // processPriceExchangeMeta (language) {
    //     let priceExgMetaObj = PriceExchangeMeta.exgMetaData;
    //     mixResponseHandler.processExchangeSummaryResponse(priceExgMetaObj, language);
    // }

    // processPriceSymbolMeta (language) {
        // let symbolMetaObj = PriceSymbolMeta.metaData;

    //     if (typeof symbolMetaObj !== 'undefined') {
    //         Object.keys(symbolMetaObj).forEach(function(key) {
    //             mixResponseHandler.processExchangeSymbolResponse(symbolMetaObj[key], key, language);
    //         });
    //     }
    // }

    languageChanged (language) {
        setTimeout(this, this._languageChanged ,language);
    }

    _languageChanged (language) {
        // this.exchangeDS.populatePriceExchangeMeta(language);
        this.exchangeDS.populatePriceMeta(language);
        // this.exchangeDS.populatePriceSymbolMeta(language);
        this.exchangeDS.requestAllExchangeMetadata();
    }

    loadExchangeSymbolData (exchanges) {
        Object.keys(exchanges).forEach(function(key) {
            mixRequestHandler.loadExchangeSymbolData(exchanges[key], sharedService.userSettings.currentLanguage);
        });
    }

    downloadIntradayOHLCData (params) {
        let numberOfDays;

        // if (this.isAuthenticated() && this.isPriceMetadataReady()) {
        //     if (params.chartDataLevel === ChartConstants.ChartDataLevel.IntradayCurrentDay || params.chartDataLevel === ChartConstants.ChartDataLevel.IntradayFiveDay) {
        //         numberOfDays = params.chartDataLevel === ChartConstants.ChartDataLevel.IntradayCurrentDay ?
        //             ChartConstants.ChartDataLevel.IntradayCurrentDay : ChartConstants.ChartDataLevel.IntradayFiveDay;

        //         mixRequestHandler.loadIntradayData(params.exchange, params.symbol, numberOfDays, params.chartType, params.reqSuccessFn, params.reqFailureFn);
        //     } else {
        //         mixRequestHandler.loadChartData(params.exchange, params.symbol, ChartConstants.ChartCategory.Intraday, params.begin, params.chartType, params.reqSuccessFn, params.reqFailureFn);
        //     }
        // } else {
        //     if (params.chartDataLevel === ChartConstants.ChartDataLevel.IntradayCurrentDay || params.chartDataLevel === ChartConstants.ChartDataLevel.IntradayFiveDay) {
        //         numberOfDays = params.chartDataLevel === ChartConstants.ChartDataLevel.IntradayCurrentDay ?
        //             ChartConstants.ChartDataLevel.IntradayCurrentDay : ChartConstants.ChartDataLevel.IntradayFiveDay;

        //         this.mixReqQueue.push({
        //             callbackFn: mixRequestHandler.loadIntradayData,
        //             args: [params.exchange, params.symbol, numberOfDays, params.chartType, params.reqSuccessFn, params.reqFailureFn] // Queue arguments as an array
        //         });
        //     } else {
        //         this.mixReqQueue.push({
        //             callbackFn: mixRequestHandler.loadChartData,
        //             args: [params.exchange, params.symbol, ChartConstants.ChartCategory.Intraday, params.begin, params.chartType, params.reqSuccessFn, params.reqFailureFn] // Queue arguments as an array
        //         });
        //     }
        // }
    }

    downloadTOPVIntradayOHLCData (params) {
        let numberOfDays;

        // if (this.isPriceMetadataReady()) {
        //     if (params.chartDataLevel === ChartConstants.ChartDataLevel.IntradayCurrentDay || params.chartDataLevel === ChartConstants.ChartDataLevel.IntradayFiveDay) {
        //         mixRequestHandler.loadTOPVIntradayData(params.exchange, params.symbol, params.reqSuccessFn, params.reqFailureFn);
        //     } else {
        //         mixRequestHandler.loadTOPVChartData(params.exchange, params.symbol, ChartConstants.ChartCategory.Intraday, params.begin, params.reqSuccessFn, params.reqFailureFn);
        //     }
        // } else {
        //     if (params.chartDataLevel === ChartConstants.ChartDataLevel.IntradayCurrentDay || params.chartDataLevel === ChartConstants.ChartDataLevel.IntradayFiveDay) {
        //         numberOfDays = params.chartDataLevel === ChartConstants.ChartDataLevel.IntradayCurrentDay ?
        //             ChartConstants.ChartDataLevel.IntradayCurrentDay : ChartConstants.ChartDataLevel.IntradayFiveDay;

        //         this.mixReqQueue.push({
        //             callbackFn: mixRequestHandler.loadTOPVIntradayData,
        //             args: [params.exchange, params.symbol, numberOfDays, params.reqSuccessFn, params.reqFailureFn] // Queue arguments as an array
        //         });
        //     } else {
        //         this.mixReqQueue.push({
        //             callbackFn: mixRequestHandler.loadTOPVChartData,
        //             args: [params.exchange, params.symbol, ChartConstants.ChartCategory.Intraday, params.begin, params.reqSuccessFn, params.reqFailureFn] // Queue arguments as an array
        //         });
        //     }
        // }
    }

    downloadHistoryOHLCData (params) {
        // mixRequestHandler.loadChartData(
        //     params.exchange,
        //     params.symbol,
        //     // ChartConstants.ChartCategory.History,
        //     params.begin,
        //     params.chartType,
        //     params.reqSuccessFn,
        //     params.reqFailureFn
        // );
    }

    downloadTOPVHistoryData (params) {
        // mixRequestHandler.loadTOPVChartData(
        //     params.exchange,
        //     params.symbol,
        //     ChartConstants.ChartCategory.History,
        //     params.begin,
        //     params.reqSuccessFn,
        //     params.reqFailureFn
        // );
    }

    sendNewsAnnBodyRequest (params) {
        if (params.type === PriceConstants.ResponseType.Data.ResponseAnnouncement) {
            mixRequestHandler.loadAnnouncementBody(params.id, params.reqSuccessFn, params.reqFailureFn, params.lan);
        } else {
            mixRequestHandler.loadNewsBody(params.id, params.reqSuccessFn, params.reqFailureFn, params.lan);
        }
    }

    sendAnnouncementSearchRequest (params, announcementCollection) {
        mixRequestHandler.loadAnnouncementSearchData(params, announcementCollection);
    }

    sendNewsSearchRequest (params, newsCollection) {
        if (this.userDS.isWindowTypeAvailable([PriceConstants.WindowType.News], 'SYS')) {
            mixRequestHandler.loadNewsSearchData(params, newsCollection);
        }
    }

    sendTimeAndSalesBacklogRequest (exchange, symbol, endSequence, pgs) {
        if (utils.validators.isAvailable(exchange)) {
            if (this.isAuthenticated() && this.isPriceMetadataReady()) {
                this._sendTimeAndSalesMixRequest(exchange, symbol, endSequence, pgs);
            } else {
                this.mixReqQueue.push({
                    callbackFn: this._sendTimeAndSalesMixRequest,
                    args: [exchange, symbol, endSequence, pgs] // Queue arguments as an array
                });
            }
        }
    }

    sendExchangeMetaDataRequest (exchanges, callback) {
        mixRequestHandler.sendExchangeSummaryRequest(exchanges, sharedService.userSettings.currentLanguage, callback);
    }

    sendExchangeSummaryRequest () {
        // let userDS = reduxStore.store.getState().user.userData;
        // let userExg =  userDS.userExchg;

        Object.keys(AppConfig.customisation.supportedLanguages).forEach(function(key) {
            // mixRequestHandler.sendExchangeSummaryRequest(userExg, AppConfig.customisation.supportedLanguages[key].code);
        });

    }

    sendFairValueHistoricalPriceRequest (exg, sym, date, fvCallbackFn) {
        mixRequestHandler.loadFairValueHistoricalPriceData(exg, sym, date, fvCallbackFn);
    }

    sendFairValueReportRequest (docId, showReportFn) {
        mixRequestHandler.loadFairValueReport(docId, showReportFn);
    }

    sendFairValueReportDownloadRequest (reportGuId) {
        mixRequestHandler.downloadFairValueReport(reportGuId);
    }

    sendCorporateActionRequest (exchange, symbol, callbackFn, startDate) {
        mixRequestHandler.sendCorporateActionRequest(exchange, symbol, callbackFn, startDate);
    }

    sendVolumeWatcherRequest (exchange) {
        mixRequestHandler.sendVolumeWatcherRequest(exchange);
    }

    sendOptionChainRequest (params, callbackFn) {
        mixRequestHandler.sendOptionChainRequest(params, callbackFn);
    }

    sendProductSubscriptionRequest (productId, encryptedToken) {
        mixRequestHandler.sendProductSubscriptionRequest(productId, encryptedToken);
    }

    sendCDVAndYTDPRequest (exchange, callbackFn) {
        mixRequestHandler.loadCDVAndYTDPRequest(exchange, callbackFn);
    }

    sendBetaRequest (exchange, symbol, instrumentType, callbackFn) {
        mixRequestHandler.loadBetaRequest(exchange, symbol, instrumentType, callbackFn);
    }

    sendTechnicalScoreRequest (exchange, symbol, chartCategory, begin, callbackFn) {
        mixRequestHandler.loadTechnicalScoreData(exchange, symbol, chartCategory, begin, callbackFn);
    }

    sendToEmail (content, recipients) {
        if (AppConfig.customisation.isEmbeddedMode) {
            if (window.opener) {
                window.opener.globals.sendEmail(content, recipients);
                utils.logger.logDebug('sendToEmail: success');
            } else {
                utils.logger.logDebug('sendToEmail: window.opener not available');
            }
        } else {
            window.open(content);
        }
    }

    notifyAlertTrigger (alert) {
        sharedService.getService('priceUI').notifyAlertTrigger(alert);
    }

    onPriceMetaReady (isSuccess) {
        if (isSuccess) {
            this.isPriceMetaReady = true;

            if (this.isAuthenticated()) {
                this._sendQueuedMixSocketRequest();
            }
        }

        this._sendPriceMetaReadySubscription(isSuccess);
    }

    addLoginIndexPanelRequest (callBackFunc) {
        this._addLoginIndexPanelRequest(callBackFunc);
    }

    /* *
     * Subscribe and Un-subscribe from xstream  updates
     * @param exchange Exchange Code string
     * @param symbol Index Code string
     */
    addXStreamRequest (exchange, symbol) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            let req = priceSocketRequestHandler.generateAddSymbolRequest(exchange, symbol, PriceConstants.RequestType.Data.RequestXStream);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    removeXStreamRequest (exchange, symbol) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            let req = priceSocketRequestHandler.generateRemoveSymbolRequest(exchange, symbol, PriceConstants.RequestType.Data.RequestXStream);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    addXStreamBulkRequest (exchange) {
        if (utils.validators.isAvailable(exchange)) {
            let req = priceSocketRequestHandler.generateAddExchangeRequest(exchange, PriceConstants.RequestType.Data.RequestXStream);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    removeXStreamBulkRequest (exchange) {
        if (utils.validators.isAvailable(exchange)) {
            let req = priceSocketRequestHandler.generateRemoveExchangeRequest(exchange, PriceConstants.RequestType.Data.RequestXStream);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    addFSBulkRequest (exchange) {
        if (utils.validators.isAvailable(exchange)) {
            let req = priceSocketRequestHandler.generateAddExchangeRequest(exchange, PriceConstants.RequestType.Data.RequestFSBulk);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    removeFSBulkRequest (exchange) {
        if (utils.validators.isAvailable(exchange)) {
            let req = priceSocketRequestHandler.generateRemoveExchangeRequest(exchange, PriceConstants.RequestType.Data.RequestFSBulk);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    addIntradayTechScoreRequest (exchange, symbol) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            if (this.isPriceMetadataReady()) {
                this._sendIntraDayTechScoreRequest(exchange, symbol);
            } else {
                this.socketReqQueue.push({
                    callbackFn: this._sendIntraDayTechScoreRequest,
                    args: [exchange, symbol]
                });
            }
        }
    }

    removeIntradayTechScoreRequest (exchange, symbol) {
        if (utils.validators.isAvailable(exchange) && utils.validators.isAvailable(symbol)) {
            let req = priceSocketRequestHandler.generateRemoveSymbolRequest(exchange, symbol, PriceConstants.RequestType.Data.RequestTechnicalScore);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    /* *
     * Check whether user default exchange and current exchange available in authentication response
     * Update user exchanges according to subscription
     */
    _updateUserExchange (origAuthSuccessCb) {
        let that = this;
        // let userDS = reduxStore.store.getState().user.userData;
        // let userExchgs =  userDS.userExchg;

        // if (userExchgs && userExchgs.length > 0) {
        //     let exg = userExchgs[0];

        //     if (userExchgs.includes(sharedService.userSettings.price.currentExchange)) {
        //         this._exchangeMetaReady(origAuthSuccessCb, false);
        //     } else {
        //         this.exchangeDS.getExchangeMetadata(exg, true, function () {
        //             that._exchangeMetaReady(origAuthSuccessCb, true);
        //         });

        //         if (!userExchgs.contains(sharedService.userSettings.price.userDefaultExg)) {
        //             sharedService.userSettings.price.userDefaultExg = exg;
        //         }

        //         utils.logger.logInfo('User current exchange updated to: ' + exg);
        //     }
        // }
    }

    _exchangeMetaReady (origAuthSuccessCb, isRefreshWidgets) {
        let authSuccessSubscription = this.authSuccessSubscription;


        if (authSuccessSubscription && typeof authSuccessSubscription !== 'undefined') {
            Object.keys(authSuccessSubscription).forEach(function(key) {
                if (authSuccessSubscription[key] && authSuccessSubscription[key].onAuthSuccess instanceof Function) {
                    authSuccessSubscription[key].onAuthSuccess();
                }
            });
        }

        if (isRefreshWidgets) {
            sharedService.getService('sharedUI').refreshPanelWidgets({exg: sharedService.userSettings.price.currentExchange});
        }

        if (origAuthSuccessCb instanceof Function) {
            origAuthSuccessCb();
        }

        this.isAuthResponse = true;
    }

    _getStockMessageType (assetType) {
        let messageType;

        switch (assetType) {
            case utils.AssetTypes.Indices:
                messageType = PriceConstants.RequestType.Data.RequestIndex;
                break;

            case utils.AssetTypes.Option:
                messageType = PriceConstants.RequestType.Data.RequestOption;
                break;

            default:
                messageType = PriceConstants.RequestType.Data.RequestEquity;
                break;
        }

        return messageType;
    }

    _updateSymbolCodeArray (symbolCodeArray, assetType) {
        let that = this;

        Object.keys(symbolCodeArray).forEach(function(key) {
            symbolCodeArray[key] = that._updateSymbolCode(symbolCodeArray[key], assetType);
        });

        return symbolCodeArray;
    }

    _updateSymbolCode (symbolCode, assetType) {
        return assetType === utils.AssetTypes.Option ? symbolCode.replaceAll('\\', '\\\\') : symbolCode;
    }

    _sendPriceMetaReadySubscription (isSuccess) {
        let pmrs = this.priceMetaReadySubscription;
        Object.keys(pmrs).forEach(function (key) {
            if (pmrs[key] && pmrs[key].onPriceMetaReady instanceof Function) {
                pmrs[key].onPriceMetaReady(isSuccess);
            }
        });
    }

    _sendQueuedMixSocketRequest () {
        while (this.mixReqQueue.length > 0) {
            // Get queued request
            let mixReqObj = this.mixReqQueue.pop();

            // Call queued function
            // Pass-in queued arguments as an array, but use as properties inside callback function
            mixReqObj.callbackFn.apply(this, mixReqObj.args);
        }

        while (this.socketReqQueue.length > 0) {
            // Get queued request
            let socketReqObj = this.socketReqQueue.pop();

            // Call queued function
            // Pass-in queued arguments as an array, but use as properties inside callback function
            socketReqObj.callbackFn.apply(this, socketReqObj.args);
        }
    }

    _sendMarketDepthByPriceRequest (exchange, symbol) {
        let mdpWindowTypes = [PriceConstants.WindowType.MarketDepthByPrice, PriceConstants.WindowType.MarketDepthByPriceAdvanced];

        if (!this.userDS.isExchangeDelayed(exchange) && this.userDS.isWindowTypeAvailable(mdpWindowTypes, exchange)) {
            let req = priceSocketRequestHandler.generateAddSymbolRequest(exchange, symbol, PriceConstants.RequestType.Data.RequestMarketDepthByPrice);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    _sendMarketDepthByOrderRequest (exchange, symbol) {
        let mdoWindowTypes = [PriceConstants.WindowType.MarketDepthByOrder, PriceConstants.WindowType.MarketDepthByOrderAdvanced];

        if (!this.userDS.isExchangeDelayed(exchange) && this.userDS.isWindowTypeAvailable(mdoWindowTypes, exchange)) {
            let req = priceSocketRequestHandler.generateAddSymbolRequest(exchange, symbol, PriceConstants.RequestType.Data.RequestMarketDepthByOrder);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    _sendTimeAndSalesRequest (exchange, symbol, isShowBuyerSeller) {
        if (!this.userDS.isExchangeDelayed(exchange)) {
            let reqType = isShowBuyerSeller ? PriceConstants.RequestType.Data.RequestTimeAndSalesDetail : PriceConstants.RequestType.Data.RequestTimeAndSales;
            let req = priceSocketRequestHandler.generateAddSymbolRequest(exchange, symbol, reqType);

            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    _sendMarketTimeAndSalesRequest (exchange) {
        if (!this.userDS.isExchangeDelayed(exchange)) {
            let req = priceSocketRequestHandler.generateAddExchangeRequest(exchange, PriceConstants.RequestType.Data.RequestTimeAndSales);
            this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
        }
    }

    _sendIntraDayChartRequest (exchange, symbol) {
        let req = priceSocketRequestHandler.generateAddSymbolRequest(exchange, symbol, PriceConstants.RequestType.Data.RequestOHLC);
        this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
    }

    _sendTOPVIntraDayChartRequest (exchange, symbol) {
        let req = priceSocketRequestHandler.generateAddSymbolRequest(exchange, symbol, PriceConstants.RequestType.Data.RequestTOPVOHLC);
        this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
    }

    _sendTimeAndSalesMixRequest (exchange, symbol, endSequence, pgs) {
        if (!this.userDS.isExchangeDelayed(exchange)) {
            mixRequestHandler.sendTimeAndSalesBackLogRequest(exchange, symbol, endSequence, pgs);
        }
    }

    _sendCalenderEventMixRequest (exchange, callbackFn) {
        mixRequestHandler.sendCalenderEventsRequest(exchange, callbackFn);
    }

    _sendYoutubeEventMixRequest (nextPageUrl, callbackFn) {
        mixRequestHandler.sendYoutubeEventsRequest(nextPageUrl, callbackFn);
    }

    _sendInstagramEventMixRequest () {
        mixRequestHandler.sendInstagramEventsRequest();
    }

    _sendFacebookEventMixRequest (nextPageUrl, callbackFn) {
        mixRequestHandler.sendFacebookEventsRequest(nextPageUrl, callbackFn);
    }

    _sendDownloadStatementMixRequest (requestObj, callbackFn) {
        mixRequestHandler.sendDownloadStatementRequest(requestObj, callbackFn);
    }

    _sendPressReleaseMixRequest () {
        mixRequestHandler.sendPressReleaseRequest();
    }

    _sendAddFullMarketSymbolRequest (exchange, subMarketId) {
        let req;
        if (subMarketId) {
            req = priceSocketRequestHandler.generateAddExchangeRequest(exchange, PriceConstants.RequestType.Data.RequestEquity, '', subMarketId);
        } else {
            req = priceSocketRequestHandler.generateAddExchangeRequest(exchange, PriceConstants.RequestType.Data.RequestEquity);
        }

        // console.log('test ', req)
        this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
    }

    _sendRemoveFullMarketSymbolRequest (exchange, subMarketId) {
        let req;

        if (subMarketId) {
            req = priceSocketRequestHandler.generateRemoveExchangeRequest(exchange, PriceConstants.RequestType.Data.RequestEquity, '', subMarketId);
        } else {
            req = priceSocketRequestHandler.generateRemoveExchangeRequest(exchange, PriceConstants.RequestType.Data.RequestEquity);
        }

        this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
    }

    _addLoginIndexPanelRequest (callBackFunc) {
        mixRequestHandler.sendLoginIndexPanelRequest(callBackFunc);
    }

    sendFileUploadRequest (data, callBackFunc) {
        mixRequestHandler.uploadFile(data, callBackFunc);
    }

    _sendIntraDayTechScoreRequest (exchange, symbol) {
        let req = priceSocketRequestHandler.generateAddSymbolRequest(exchange, symbol, PriceConstants.RequestType.Data.RequestTechnicalScore);
        this.webSocketManager.sendData(req, PriceConstants.SocketConnectionType.QuoteServer);
    }
}