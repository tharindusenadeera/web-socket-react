import PriceConstants from '../../constants/Price/PriceConstants';
import utils from '../../util/utils/utils';
import * as sharedService from '../Shared/SharedServices';
import AppConfig from '../config/AppConfig';
import PriceWidgetConfig from "../config/PriceWidgetConfig";
// import priceSettings from '../../../../config/price-settings';
// import { getDefaultSubMarket, saveSystemMetaData, saveExchangeTimeZone, setBeginBulkSymbolAdditionStatus, setEndBulkSymbolAdditionStatus, setExchangeMetaDataStatus, setExchangeSymbolMetaDataStatus, saveExchange, saveSubMarketByExg, saveStockByIndices, isStockUpdated, saveStockBySubMarket, setAllWatchListLoadStatus } from '../../../../actions';
// import reduxStore from '../../../../../utils/reduxStore'
// import Sector from "../../business-entities/sector";
// import { saveSector } from '../../../../actions/SectorActions';
// import { saveSubMarket } from '../../../../actions/SubMarketActions';
// import { saveStock } from '../../../../actions/StockActions';
// import DayLightSaving from '../../business-entities/day-light-saving';
// import { getExchangeSubscriptionFlag } from '../../../../actions/UserActions';

// TODO: [Bashitha] Refactor entire class to avoid response processing duplicate codes and to achieve better reusable and readable functions
export default (function () {

    const processExchangeMetadataResponse = function (dataObj, language, exchange) {
        // reduxStore.store.dispatch(setBeginBulkSymbolAdditionStatus())
        let priceService = sharedService.getService('price');
        let isMetaChanged = false;

        try {
            let headerArr;
            let metaData = priceService.priceMeta.metaData;
            let isSecondaryLan = sharedService.userSettings.currentLanguage !== language;
            let exgSubType = priceService.userDS.getExchangeSubscriptionFlag(exchange);

            // Process the WL section
            if (typeof dataObj.HED !== 'undefined' && typeof dataObj.DAT !== 'undefined') {

                if (dataObj.HED.WL && dataObj.DAT.WL && dataObj.HED.WL.TD && dataObj.DAT.WL.TD) {
                    headerArr = _getHeaderIndexList(dataObj.HED.WL.TD, ['EXCHANGE', 'SYMBOL', 'INSTRUMENT_TYPE', 'ISIN_CODE',
                        'SYMBOL_DESCRIPTION', 'SECTOR', 'CURRENCY', 'SHRT_DSC', 'DECIMAL_PLACES', 'CORRECTION_FACTOR',
                        'MARKET_ID', 'LOT_SIZE', 'COMPANY_CODE', 'EQUITY_SYMBOL', 'STRIKE_PRICE', 'EXP_DATE', 'AST', 'DS',
                        'TSZ', 'QTY_TICK', 'FACE_VAL', 'NUMBER_OF_PAYMENT', 'COUPON_RATE', 'ISSUE_DATE', 'INTEREST_DAY_BASIS']);

                    processExchangeWatchlist(headerArr, dataObj.DAT.WL.TD, isSecondaryLan, exgSubType);

                    metaData[exchange].DAT.WL = dataObj.DAT.WL;
                    metaData[exchange].HED.WL = dataObj.HED.WL;
                    metaData[exchange].DAT.VRS.WL = dataObj.DAT.VRS.WL;

                    isMetaChanged = true;
                }

                if (dataObj.HED.SRC && dataObj.DAT.SRC && dataObj.HED.SRC.SD && dataObj.DAT.SRC.SD) {
                    metaData[exchange].HED.SRC = metaData[exchange].HED.SRC || {};
                    metaData[exchange].DAT.SRC = metaData[exchange].DAT.SRC || {};

                    // Exchange Definition
                    headerArr = _getHeaderIndexList(dataObj.HED.SRC.SD, ['EXCHANGE', 'CURRENCY', 'LONG_DSC', 'CTRY_CODE',
                        'DECIMAL_PLACES', 'TZ_ID', 'DISP_CODE', 'DELAY_TIME', 'IS_VIR_EX', 'DCF', 'OPEN_TIME', 'CLOSE_TIME', 'OFFSET', 'TICK_SIZE']);

                    _updateExchangeMetadata('SD', dataObj, exchange, metaData);
                    var exchangeObj = processExchangeDefinition(headerArr, dataObj, isSecondaryLan, exgSubType, exchange);

                    // News providers
                    headerArr = _getHeaderIndexList(dataObj.HED.SRC.NWSP, ['ID', 'DES', 'PARNT']);
                    _updateExchangeMetadata('NWSP', dataObj, exchange, metaData);

                    if (exchangeObj && headerArr && dataObj.DAT.SRC.NWSP) {
                        processExchangeNewsProviders(exchangeObj, headerArr, dataObj.DAT.SRC.NWSP, isSecondaryLan);
                    }

                    // Broker Mapping
                    headerArr = _getHeaderIndexList(dataObj.HED.SRC.BROKERS, ['NAME', 'DESC', 'LONG_DESC']);
                    _updateExchangeMetadata('BROKERS', dataObj, exchange, metaData);

                    if (exchangeObj && headerArr && dataObj.DAT.SRC.BROKERS) {
                        processBrokerMapping(exchangeObj, headerArr, dataObj.DAT.SRC.BROKERS, isSecondaryLan);
                    }

                    // Sector Definition
                    headerArr = _getHeaderIndexList(dataObj.HED.SRC.SCTD, ['SECTOR', 'SECT_DSC']);
                    _updateExchangeMetadata('SCTD', dataObj, exchange, metaData);

                    if (exchangeObj && headerArr && dataObj.DAT.SRC.SCTD) {
                        processSectorDefinition(exchangeObj.exg, headerArr, dataObj.DAT.SRC.SCTD, isSecondaryLan);
                    }

                    // Sub Markets
                    headerArr = _getHeaderIndexList(dataObj.HED.SRC.SMD, ['MARKET_ID', 'LONG_DSC', 'DEF', 'IS_MKT_SUMMARY']);
                    _updateExchangeMetadata('SMD', dataObj, exchange, metaData);

                    if (exchangeObj && headerArr && dataObj.DAT.SRC.SMD) {
                        processExchangeSubMarkets(exchangeObj, headerArr, dataObj.DAT.SRC.SMD, isSecondaryLan);
                    }

                    // Indices
                    if (dataObj.HED.SRC && dataObj.DAT.SRC && dataObj.HED.SRC.ID && dataObj.DAT.SRC.ID) {
                        // Process the Index list
                        headerArr = _getHeaderIndexList(dataObj.HED.SRC.ID, ['EXCHANGE', 'SYMBOL', 'INSTRUMENT_TYPE', 'INDEX_TYPE',
                            'SYMBOL_DESCRIPTION', 'SECTOR', 'CURRENCY', 'SHRT_DSC', 'DECIMAL_PLACES', 'CORRECTION_FACTOR', 'DS']);

                        _updateExchangeMetadata('ID', dataObj, exchange, metaData);
                        processExchangeIndices(headerArr, dataObj.DAT.SRC.ID, isSecondaryLan, exgSubType);
                    }

                    // Process the version info and persist
                    metaData[exchange].DAT.SRC = dataObj.DAT.SRC;
                    metaData[exchange].HED.SRC = dataObj.HED.SRC;
                    metaData[exchange].DAT.VRS.SRC = dataObj.DAT.VRS.SRC;

                    isMetaChanged = true;
                }

            }
            if (isMetaChanged) {
                priceService.priceMeta.save(language);
            }
        } catch (e) {
            utils.logger.logError('Error in processing the exchange master data response : ' + e);
        }

        // if (isMetaChanged) {
        //     let exgObj = reduxStore.store.getState().exchangeStore.exchangeData;
        //     let dlsObj = new DayLightSaving(exgObj);

        //     // reduxStore.store.dispatch(saveSystemMetaData(dlsObj));
        //     reduxStore.store.dispatch(saveExchangeTimeZone(dlsObj));
        // }

        // reduxStore.store.dispatch(setEndBulkSymbolAdditionStatus());
        // reduxStore.store.dispatch(setExchangeMetaDataStatus())
        priceService.onPriceMetaReady(true); // Pass true when price meta success
    };

    const processDelayedPriceMasterInfo = function (loopArray, checkArray, exchangesWithChanges) {
        if (typeof loopArray !== 'undefined') {
            loopArray.forEach(function (exg) {
                if (exg && checkArray.indexOf(exg) < 0 && exchangesWithChanges.indexOf(exg) < 0) {
                    exchangesWithChanges[exchangesWithChanges.length] = exg;
                }
            });
        }
    };

    const processDelayedPriceMeta = function () {
        let exchangesWithChanges = [];
        let language = sharedService.userSettings.currentLanguage;

        // let userDS = reduxStore.store.getState().user.userData;

        let previousDelayedExchanges = window.appGlobal.priceUser.delayedExchanges;
        // let currentDelayedExchanges = userDS.delayedExchg;

        let previousPrevDayExchanges = window.appGlobal.priceUser.prevDayExchanges;
        // let currentPrevDayExchanges = userDS.prevDayExchg;

        // processDelayedPriceMasterInfo(currentDelayedExchanges, previousDelayedExchanges, exchangesWithChanges); // If a delayed exchange newly added
        // processDelayedPriceMasterInfo(previousDelayedExchanges, currentDelayedExchanges, exchangesWithChanges); // If a delayed exchange removed

        // processDelayedPriceMasterInfo(currentPrevDayExchanges, previousPrevDayExchanges, exchangesWithChanges); // If a Prev day exchange newly added
        // processDelayedPriceMasterInfo(previousPrevDayExchanges, currentPrevDayExchanges, exchangesWithChanges); // If a Prev day exchange removed

        if (exchangesWithChanges.length > 0) {
            Object.keys(exchangesWithChanges).forEach(function (key) {
                processExchangeMetadataResponse(sharedService.getService('price').priceMeta.getExgMetaObj(exchangesWithChanges[key]), language, exchangesWithChanges[key]);
            });
        }
    };

    const processExchangeWatchlist = function (headerArr, dataArr, isSecondaryLan, exgSubType) {
        try {
            let stockObject = {};
            let stockTempArray = [];
            let stockObjectBySubMarket = {};
            let finalStockObjectBySubMarket = {};
            let symbolKeyArray = [];
            let stockArrBySubMKT1 = [];
            let stockArrBySubMKT2 = [];
            let stockArrBySubMKT3 = [];
            let stockArrBySubMKT6 = [];
            if (!isSecondaryLan) {
                let dtArray, exchangeCode, symbolCode, instrumentType, subMarket, companyId, lDes, sDes, stockObj;
                // reduxStore.store.dispatch(isStockUpdated(false))
                Object.keys(dataArr).forEach(function (key) {
                    let tempObj = {}
                    dtArray = dataArr[key].split(utils.Constants.StringConst.Pipe);
                    exchangeCode = dtArray[headerArr.EXCHANGE];
                    symbolCode = dtArray[headerArr.SYMBOL];
                    instrumentType = parseInt(dtArray[headerArr.INSTRUMENT_TYPE], 10);
                    subMarket = dtArray[headerArr.MARKET_ID];
                    companyId = dtArray[headerArr.COMPANY_CODE];
                    // companyId = companyId ? parseInt(companyId, 10) : companyId; // Company code can be a string

                    // let userDS = reduxStore.store.getState().user.userData;
                    // reduxStore.store.dispatch(getExchangeSubscriptionFlag(exchangeCode, userDS.delayedExchg, userDS.prevDayExchg))

                    stockObj = sharedService.getService('price').stockDS.getStock(exchangeCode, symbolCode, instrumentType, subMarket);
                    // exgSubType = reduxStore.store.getState().user.subscriptionFlag;

                    let objectKey = utils.keyGenerator.getKey(exchangeCode, symbolCode);

                    let exchangeObj = sharedService.getService('price').exchangeDS.getExchange(exchangeCode);
                    lDes = utils.formatters.convertUnicodeToNativeString(dtArray[headerArr.SYMBOL_DESCRIPTION]);
                    sDes = utils.formatters.convertUnicodeToNativeString(dtArray[headerArr.SHRT_DSC]);

                    // if (exgSubType) {
                    //     lDes = [lDes, exgSubType].join(' ');
                    //     sDes = [sDes, exgSubType].join(' ');
                    // }

                    stockObj.lDes = lDes;
                    stockObj.sDes = sDes;
                    stockObj.sec = dtArray[headerArr.SECTOR];
                    stockObj.cur = dtArray[headerArr.CURRENCY];
                    stockObj.deci = dtArray[headerArr.DECIMAL_PLACES];
                    stockObj.dcf = dtArray[headerArr.CORRECTION_FACTOR];
                    stockObj.subMkt = dtArray[headerArr.MARKET_ID];
                    stockObj.lot = dtArray[headerArr.LOT_SIZE];
                    stockObj.cid = companyId;
                    stockObj.uSym = dtArray[headerArr.EQUITY_SYMBOL];
                    stockObj.stkP = dtArray[headerArr.STRIKE_PRICE];
                    stockObj.expDt = dtArray[headerArr.EXP_DATE];
                    stockObj.ast = dtArray[headerArr.AST];
                    stockObj.isin = dtArray[headerArr.ISIN_CODE];
                    stockObj.tick = dtArray[headerArr.TSZ];
                    stockObj.qtyTick = dtArray[headerArr.QTY_TICK];
                    stockObj.fVal = dtArray[headerArr.FACE_VAL];
                    stockObj.noOfPayment = dtArray[headerArr.NUMBER_OF_PAYMENT];
                    stockObj.cor = dtArray[headerArr.COUPON_RATE];
                    stockObj.issueDate = dtArray[headerArr.ISSUE_DATE];
                    stockObj.interestDayBasis = dtArray[headerArr.INTEREST_DAY_BASIS];
                    stockObj.exg = exchangeCode;
                    stockObj.sym = symbolCode;
                    stockObj.inst = instrumentType;


                    let displaySym = dtArray[headerArr.DS] ? dtArray[headerArr.DS] : symbolCode;
                    displaySym = exgSubType ? [displaySym, exgSubType].join(' ') : displaySym;
                    stockObj.dSym = displaySym;
                    stockObj.symbolObj = exchangeObj;

                    tempObj.lDes = lDes;
                    tempObj.sDes = sDes;
                    tempObj.sec = dtArray[headerArr.SECTOR];
                    tempObj.cur = dtArray[headerArr.CURRENCY];
                    tempObj.deci = dtArray[headerArr.DECIMAL_PLACES];
                    tempObj.dcf = dtArray[headerArr.CORRECTION_FACTOR];
                    tempObj.subMkt = dtArray[headerArr.MARKET_ID];
                    tempObj.lot = dtArray[headerArr.LOT_SIZE];
                    tempObj.cid = companyId;
                    tempObj.uSym = dtArray[headerArr.EQUITY_SYMBOL];
                    tempObj.stkP = dtArray[headerArr.STRIKE_PRICE];
                    tempObj.expDt = dtArray[headerArr.EXP_DATE];
                    tempObj.ast = dtArray[headerArr.AST];
                    tempObj.isin = dtArray[headerArr.ISIN_CODE];
                    tempObj.tick = dtArray[headerArr.TSZ];
                    tempObj.qtyTick = dtArray[headerArr.QTY_TICK];
                    tempObj.fVal = dtArray[headerArr.FACE_VAL];
                    tempObj.noOfPayment = dtArray[headerArr.NUMBER_OF_PAYMENT];
                    tempObj.cor = dtArray[headerArr.COUPON_RATE];
                    tempObj.issueDate = dtArray[headerArr.ISSUE_DATE];
                    tempObj.interestDayBasis = dtArray[headerArr.INTEREST_DAY_BASIS];
                    tempObj.exg = exchangeCode;
                    tempObj.sym = symbolCode;
                    tempObj.inst = instrumentType;

                    tempObj.dSym = displaySym;
                    tempObj.symbolObj = exchangeObj;
                    stockTempArray.push(tempObj)

                    if (subMarket === '1') {
                        stockArrBySubMKT1.push(tempObj);
                        stockObjectBySubMarket[1] = stockArrBySubMKT1
                    }
                    else if (subMarket === '2') {
                        stockArrBySubMKT2.push(tempObj);
                        stockObjectBySubMarket[2] = stockArrBySubMKT2
                    } else if (subMarket === '3') {
                        stockArrBySubMKT3.push(tempObj);
                        stockObjectBySubMarket[3] = stockArrBySubMKT3
                    } else if (subMarket === '6') {
                        stockArrBySubMKT6.push(tempObj);
                        stockObjectBySubMarket[6] = stockArrBySubMKT6
                    }


                    /*stockObjectBySubMarket[exchangeCode] = {
                        [subMarket] : stockTempArray
                    }*/

                    symbolKeyArray.push(objectKey);
                    stockObject[objectKey] = stockObj;

                    finalStockObjectBySubMarket[exchangeCode] = stockObjectBySubMarket
                });
                // let existingStockBySubMkt = reduxStore.store.getState().stock.stockDataBySubMarket;

                let exg = sharedService.userSettings.price.currentExchange;
                // let newStockBySubMarket = {...existingStockBySubMkt[exg], ...finalStockObjectBySubMarket[exg]}
                // let stockByExg = {[exg]: newStockBySubMarket}

                // let existingStock = reduxStore.store.getState().stock.stocks;

                // let newSymbolArray = new Set(existingStock.symbols.concat(symbolKeyArray));
                // let newWatchList = Object.assign(existingStock.stockData,stockObject )

                // // console.log('}} ', stockByExg)
                // reduxStore.store.dispatch(saveStock(newWatchList, Array.from(newSymbolArray)))
                // reduxStore.store.dispatch(saveStockBySubMarket(stockByExg))
            }
        } catch (e) {
            utils.logger.logError('Error in processing the exchange master data response : ' + e);
        }
    };

    const processExchangeDefinition = function (headerArr, dataObj, isSecondaryLan, exgSubType, exg) {
        let exchangeObj;
        let exchangeObject = {};
        try {
            if (!isSecondaryLan) {
                let dataArr, dtArray, exchangeCode = null;
                dataArr = dataObj.DAT.SRC.SD;
                Object.keys(dataArr).forEach(function (key) {

                    dtArray = dataArr[key].split(utils.Constants.StringConst.Pipe);
                    exchangeCode = dtArray[headerArr.EXCHANGE];
                    exchangeObj = sharedService.getService('price').exchangeDS.getExchange(exchangeCode);

                    exchangeObj.cur = dtArray[headerArr.CURRENCY];
                    exchangeObj.des = utils.formatters.convertUnicodeToNativeString(exgSubType ? [dtArray[headerArr.LONG_DSC], exgSubType].join(' ') : dtArray[headerArr.LONG_DSC]);
                    exchangeObj.country = dtArray[headerArr.CTRY_CODE];
                    exchangeObj.dep = parseInt(dtArray[headerArr.DECIMAL_PLACES], 10);
                    exchangeObj.delTime = parseInt(dtArray[headerArr.DELAY_TIME], 10);
                    exchangeObj.virtual = (dtArray[headerArr.IS_VIR_EX] === '1');
                    exchangeObj.dcf = parseInt(dtArray[headerArr.DCF], 10);
                    exchangeObj.openTime = dtArray[headerArr.OPEN_TIME];
                    exchangeObj.closeTime = dtArray[headerArr.CLOSE_TIME];
                    exchangeObj.tzo = _formatTimeZoneOffset(dtArray[headerArr.OFFSET]);
                    exchangeObj.tick = dtArray[headerArr.TICK_SIZE];
                    exchangeObj.tzId = dtArray[headerArr.TZ_ID];
                    exchangeObj.exg = exg;

                    let displayExg = dtArray[headerArr.DISP_CODE] ? dtArray[headerArr.DISP_CODE] : exchangeCode;
                    displayExg = exgSubType ? [displayExg, exgSubType].join(' ') : displayExg;
                    exchangeObj.de = displayExg;


                    // Return the exchange object
                    // RT = 306 request protocol supports only single market, but received as an array
                    // Therefore this function process only the first index value of the iteration
                    // If multiple objects found, skip rest of the objects as it conflicts with other properties like-
                    // -news providers, sub market etc. as they does not support multi market by protocol itself
                    // If multi market support introduces to the RT = 306 request, this function should be changed accordingly

                    exchangeObject[exchangeCode] = exchangeObj;
                    return false;
                });

                // reduxStore.store.dispatch(saveExchange(exchangeObject));
                // let stockDS = reduxStore.store.getState().stock.stocks.stockData

                // Object.keys(stockDS).forEach(function (key) {
                //     stockDS[key].symbolObj = exchangeObj;
                // });
                // reduxStore.store.dispatch(saveStock(stockDS));


            }
        } catch (e) {
            utils.logger.logError('Error in processing the exchange definition data response : ' + e);
        }

        return exchangeObj;
    };

    const processSectorDefinition = function (exchange, headerArr, dataArr, isSecondaryLan) {
        try {
            if (!isSecondaryLan) {
                let sectorArray = [];
                let customizeSectorObj = {};
                let customizeSectorArray = [];
                Object.keys(dataArr).forEach(function (key) {
                    let sectorFields = dataArr[key].split(utils.Constants.StringConst.Pipe);
                    sectorArray[key] = {
                        sec: sectorFields[headerArr.SECTOR],
                        desc: sectorFields[headerArr.SECT_DSC],
                        exg: exchange
                    };
                });

                Object.keys(sectorArray).forEach(function (key) {
                    customizeSectorObj.sec = sectorArray[key].sec;
                    customizeSectorObj.des = utils.formatters.convertUnicodeToNativeString(sectorArray[key].desc);

                    // let sectorObj = new Sector(customizeSectorObj);
                    // customizeSectorArray.push(sectorObj);
                });

                // reduxStore.store.dispatch(saveSector(customizeSectorArray));
            }
        } catch (e) {
            utils.logger.logError('Error in processing the sector definition data response : ' + e);
        }
    };

    const processExchangeIndices = function (headerArr, dataArr, isSecondaryLan, exgSubType) {
        try {
            if (!isSecondaryLan) {
                let stockObjectByIndices = {};
                let symbolArray = [];
                let dtArray, stockObj, exchangeCode, symbolCode, instrumentType, isMainIndex, mainIndex;
                let mainIndexCount = 0;
                // let existingStockObj = reduxStore.store.getState().stock.stocks.stockData;
                // reduxStore.store.dispatch(isStockUpdated(false));

                Object.keys(dataArr).forEach(function (key) {
                    dtArray = dataArr[key].split(utils.Constants.StringConst.Pipe);
                    exchangeCode = dtArray[headerArr.EXCHANGE];
                    symbolCode = dtArray[headerArr.SYMBOL];
                    instrumentType = parseInt(dtArray[headerArr.INSTRUMENT_TYPE], 10);
                    isMainIndex = (dtArray[headerArr.INDEX_TYPE] === 'IM');

                    if (isMainIndex) {
                        mainIndex = symbolCode;
                        mainIndexCount++;
                    }

                    let objectKey = utils.keyGenerator.getKey(exchangeCode, symbolCode);
                    // let indicesKey = utils.keyGenerator.getKey(objectKey, instrumentType);
                    stockObj = sharedService.getService('price').stockDS.getStock(exchangeCode, symbolCode, utils.AssetTypes.Indices);

                    stockObj.exg = exchangeCode;
                    stockObj.isMainIdx = isMainIndex;
                    stockObj.sym = symbolCode;
                    stockObj.lDes = utils.formatters.convertUnicodeToNativeString(dtArray[headerArr.SYMBOL_DESCRIPTION]);
                    stockObj.inst = instrumentType;
                    stockObj.sec = dtArray[headerArr.SECTOR];
                    stockObj.cur = dtArray[headerArr.CURRENCY];
                    stockObj.sDes = utils.formatters.convertUnicodeToNativeString(dtArray[headerArr.SHRT_DSC]);
                    stockObj.deci = dtArray[headerArr.DECIMAL_PLACES];
                    stockObj.dcf = dtArray[headerArr.CORRECTION_FACTOR];
                    stockObj.ast = 8;


                    let displaySym = dtArray[headerArr.DS] ? dtArray[headerArr.DS] : symbolCode;
                    displaySym = exgSubType ? [displaySym, exgSubType].join(' ') : displaySym;
                    stockObj.dSym = displaySym;
                    symbolArray.push(objectKey)
                    stockObjectByIndices[objectKey] = stockObj;
                });

                if (exchangeCode) {
                    let mainIdx = mainIndexCount === 1 ? mainIndex : sharedService.userSettings.price.defaultIndex;

                    if (mainIdx) {
                        // let existingExchange = reduxStore.store.getState().exchangeStore.exchangeData;
                        // let exchangeObj = existingExchange[exchangeCode];

                        // exchangeObj.mainIdx = mainIdx;
                        // existingExchange[exchangeCode] = exchangeObj;

                        // reduxStore.store.dispatch(saveExchange(existingExchange));

                        // Object.keys(stockObjectByIndices).forEach(function (key) {
                        //     stockObjectByIndices[key].symbolObj = exchangeObj;
                        // });
                    }
                }
                // const existingStock = reduxStore.store.getState().stock.stocks;
                // let newSymbolArray = new Set(existingStock.symbols.concat(symbolArray));

                // reduxStore.store.dispatch(saveStock(stockObjectByIndices, Array.from(newSymbolArray)))
                // reduxStore.store.dispatch(saveStockByIndices(stockObjectByIndices, symbolArray))

            }

        } catch (e) {
            utils.logger.logError('Error in processing the exchange indices data response : ' + e);
        }
    };

    const processExchangeNewsProviders = function (exchangeObj, headerArr, dataArr, isSecondaryLan) {
        try {
            let newsProvider;
            let newsProvArray = [];

            if (!isSecondaryLan && dataArr.length > 0) {
                Object.keys(dataArr).forEach(function (key) {
                    let newsProviderArray = dataArr[key].split(utils.Constants.StringConst.Pipe);
                    newsProvArray[newsProvArray.length] = newsProviderArray[headerArr.ID];
                    if (newsProviderArray[headerArr.PARNT] === 'MUBASHER') {
                        newsProvider = newsProviderArray[headerArr.ID];
                        return false;
                    }
                });

                newsProvider = utils.validators.isAvailable(newsProvider) ? newsProvider :
                    dataArr[0].split(utils.Constants.StringConst.Pipe)[headerArr.ID];

                exchangeObj.newsProv = newsProvider;
                exchangeObj.newsProvArray = newsProvArray;

                // reduxStore.store.dispatch(saveExchange(exchangeObj));

            }
        } catch (e) {
            utils.logger.logError('Error in processing the exchange news provider response : ' + e);
        }
    };

    const processBrokerMapping = function (exchangeObj, headerArr, dataArr, isSecondaryLan) {
        try {
            if (!isSecondaryLan && dataArr.length > 0) {
                let brokerMapping = {};

                Object.keys(dataArr).forEach(function (key) {
                    let dtArray = dataArr[key].split(utils.Constants.StringConst.Pipe);

                    brokerMapping[dtArray[headerArr.NAME]] = {
                        shortDes: dtArray[headerArr.DESC],
                        longDes: dtArray[headerArr.LONG_DESC]
                    };
                });

                exchangeObj.brokerMapping = brokerMapping;
            }
        } catch (e) {
            utils.logger.logError('Error in processing the broker mapping response : ' + e);
        }
    };

    const processExchangeSubMarkets = function (exchangeObj, headerArr, dataArr, isSecondaryLan) {
        try {
            if (!isSecondaryLan) {
                // If only one sub market available, considers as sub markets not available
                // Symbols are not tagged to the sub market in this scenario
                // Therefore symbols are not loaded in application widgets

                // Commented 'if' block to fixed issue occur in KSE setup
                // Issue : Sending MKT code as "-1"

                // if (dataArr.length > 1) {
                let allowedSubMktsByExg = _getAllowedSubMktsByExchange(exchangeObj.exg);

                let subMarketFinalObj = {}
                let subMarketFinalObjByExg = {}
                let submarketArray = [];
                Object.keys(dataArr).forEach(function (key) {
                    let dtArray = dataArr[key].split(utils.Constants.StringConst.Pipe);
                    let subMktCode = dtArray[headerArr.MARKET_ID];
                    let exchange = exchangeObj.exg;

                    let defaultSubMkt = AppConfig.customisation.defaultSubMarket[exchange];

                    if (allowedSubMktsByExg.length === 0 || allowedSubMktsByExg.contains(subMktCode)) {
                        let subMarketObj = sharedService.getService('price').subMarketDS.getSubMarket(exchange, subMktCode);
                        let objectKey = utils.keyGenerator.getKey(exchange, subMktCode);
                        // Gives priority to default sub market configured in application (price-constants)
                        // This is to avoid data issues from backend and gives correct output to users
                        // If default sub market is not configured in application, it will get from backend response

                        subMarketObj.marketId = subMktCode;
                        subMarketObj.exg = exchange;
                        subMarketObj.lDes = utils.formatters.convertUnicodeToNativeString(dtArray[headerArr.LONG_DSC]);
                        subMarketObj.def = defaultSubMkt ? subMktCode === defaultSubMkt ? '1' : '0' : dtArray[headerArr.DEF];
                        subMarketObj.isMktSummary = dtArray[headerArr.IS_MKT_SUMMARY];


                        subMarketFinalObj[objectKey] = subMarketObj;
                        // if (subMarketFinalObjByExg[exchange]) {
                            submarketArray.push(subMarketObj)
                        // }
                        subMarketFinalObjByExg[exchange] = submarketArray;
                        // subMarketArray.push(subMarketObj);
                    }
                });

                // reduxStore.store.dispatch(saveSubMarket(subMarketFinalObj));
                // reduxStore.store.dispatch(saveSubMarketByExg(subMarketFinalObjByExg));
                // }

                // This will set sub market array with zero items if market does not have sub markets
                // Market data subscription is being sent based on this logic
                // Therefore it is required not to have sub market array undefined
                let exchSub = exchangeObj.subMarketArray;



                if (!exchSub) {
                    exchangeObj.subMarketArray = sharedService.getService('price').subMarketDS.getSubMarketCollectionByExchange(exchangeObj.exg);
                    // reduxStore.store.dispatch(saveExchange(exchangeObj))
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing the exchange sub market response : ' + e);
        }
    };

    //
    // SubMarket Symbol Response
    //
    const processExchangeSymbolResponse = function (dataObj, exchange, language) {
        // reduxStore.store.dispatch(setBeginBulkSymbolAdditionStatus());
        try {
            if (dataObj.DAT && dataObj.HED) {
                let stockObject = {};
                let symbolKeyArray = [];
                let stockObjectBySubMarket = {};
                let finalStockObjectBySubMarket = {};
                let stockArrBySubMKT1 = [];
                let stockArrBySubMKT2 = [];
                let stockArrBySubMKT3 = [];
                let stockArrBySubMKT6 = [];
                let dtArray, symbolCode, exchangeCode, instrumentType, symHedIdxList, headerFields, subMarket,
                    allowedSubMktsByExg, companyId, stockObj;
                let exgSubType = sharedService.getService('price').userDS.getExchangeSubscriptionFlag(exchange);


                if (dataObj.DAT.TD) {
                    let symbolMeta = sharedService.getService('price').priceSymbolMeta.metaData;

                    // reduxStore.store.dispatch(getDefaultSubMarket(exchange))
                    // let defaultSubMkt = reduxStore.store.getState().exchangeStore.marketId;

                    // Update symbol meta data
                    headerFields = ['EXCHANGE', 'SYMBOL', 'INSTRUMENT_TYPE', 'SYMBOL_DESCRIPTION', 'SHRT_DSC',
                        'DECIMAL_PLACES', 'CURRENCY', 'COMPANY_CODE', 'ISIN_CODE', 'SECTOR', 'MARKET_ID', 'TSZ', 'DS'];
                    symHedIdxList = _getHeaderIndexList(dataObj.HED.TD, headerFields);
                    allowedSubMktsByExg = _getAllowedSubMktsByExchange(exchange);

                    // let existingStockObj = reduxStore.store.getState().stock.stocks;
                    // let existingStockBySubMkt = reduxStore.store.getState().stock.stockDataBySubMarket;
                    let dataArry = dataObj.DAT.TD;


                    Object.keys(dataArry).forEach(function (key) {
                        let tempObj = {}
                        dtArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                        subMarket = dtArray[symHedIdxList.MARKET_ID];

                        exchangeCode = dtArray[symHedIdxList.EXCHANGE];

                        // If only few sub markets allowed this will filter symbols related to those sub markets
                        // Else this will accept all the symbols for all the sub markets
                        if (allowedSubMktsByExg.length === 0 || allowedSubMktsByExg.contains(subMarket)) {
                            // Process only symbols which are not in default sub market of the exchange
                            // Default sub market symbols are processed in RT = 306 response
                            // Skip those in this processing to avoid unnecessary overhead of duplicate symbol processing
                            // This response (RT = 303) and RT = 306 response receiving order does not affect the logic as-
                            // somehow both responses should be received at client level
                            // If any response fails, it considers as error situation and sends the request again when needed
                            if (subMarket !== "") {
                                symbolCode = dtArray[symHedIdxList.SYMBOL];
                                exchangeCode = dtArray[symHedIdxList.EXCHANGE];
                                instrumentType = parseInt(dtArray[symHedIdxList.INSTRUMENT_TYPE], 10);


                                let objectKey = utils.keyGenerator.getKey(exchangeCode, symbolCode);
                                stockObj = sharedService.getService('price').stockDS.getStock(exchangeCode, symbolCode, instrumentType, subMarket);

                                stockObj.sym = symbolCode;
                                stockObj.exg = exchangeCode;
                                stockObj.inst = parseInt(dtArray[symHedIdxList.INSTRUMENT_TYPE], 10);
                                stockObj.deci = dtArray[symHedIdxList.DECIMAL_PLACES];
                                stockObj.lDes = utils.formatters.convertUnicodeToNativeString(dtArray[symHedIdxList.SYMBOL_DESCRIPTION]);
                                stockObj.sDes = utils.formatters.convertUnicodeToNativeString(dtArray[symHedIdxList.SHRT_DSC]);
                                stockObj.sec = dtArray[symHedIdxList.SECTOR];
                                stockObj.tick = dtArray[symHedIdxList.TSZ];
                                stockObj.cid = companyId;

                                tempObj.sym = symbolCode;
                                tempObj.exg = exchangeCode;
                                tempObj.inst = parseInt(dtArray[symHedIdxList.INSTRUMENT_TYPE], 10);
                                tempObj.deci = dtArray[symHedIdxList.DECIMAL_PLACES];
                                tempObj.lDes = utils.formatters.convertUnicodeToNativeString(dtArray[symHedIdxList.SYMBOL_DESCRIPTION]);
                                tempObj.sDes = utils.formatters.convertUnicodeToNativeString(dtArray[symHedIdxList.SHRT_DSC]);
                                tempObj.sec = dtArray[symHedIdxList.SECTOR];
                                tempObj.tick = dtArray[symHedIdxList.TSZ];
                                tempObj.cid = companyId;

                                companyId = dtArray[symHedIdxList.COMPANY_CODE];

                                let displaySym = dtArray[symHedIdxList.DS] ? dtArray[symHedIdxList.DS] : symbolCode;
                                displaySym = exgSubType ? [displaySym, exgSubType].join(' ') : displaySym;
                                stockObj.dSym = displaySym;
                                tempObj.dSym = displaySym;

                                if (subMarket === '1') {
                                    stockArrBySubMKT1.push(tempObj);
                                    stockObjectBySubMarket[1] = stockArrBySubMKT1
                                }
                                else if (subMarket === '2') {
                                    stockArrBySubMKT2.push(tempObj);
                                    stockObjectBySubMarket[2] = stockArrBySubMKT2
                                } else if (subMarket === '3') {
                                    stockArrBySubMKT3.push(tempObj);
                                    stockObjectBySubMarket[3] = stockArrBySubMKT3
                                } else if (subMarket === '6') {
                                    stockArrBySubMKT6.push(tempObj);
                                    stockObjectBySubMarket[6] = stockArrBySubMKT6
                                }
                                // stockObjectBySubMarket[subMarket] =stockArrBySubMKT

                                symbolKeyArray.push(objectKey)
                                // if (!existingStockObj[objectKey]) {
                                //     stockObject[objectKey] = stockObj;
                                // }else {
                                //     existingStockObj.stockData[objectKey] = stockObj;
                                // }

                                finalStockObjectBySubMarket[exchangeCode] = stockObjectBySubMarket
                            }

                        }

                    });
                    let exg = sharedService.userSettings.price.currentExchange;
                    // let newStockBySubMarket = {...existingStockBySubMkt[exg], ...finalStockObjectBySubMarket[exg]}
                    // let stockByExg = {[exg]: newStockBySubMarket}

                    // let newSymbolArray = new Set(existingStockObj.symbols.concat(symbolKeyArray));
                    // reduxStore.store.dispatch(saveStock(stockObject, Array.from(newSymbolArray)));

                    // reduxStore.store.dispatch(setAllWatchListLoadStatus());
                    // console.log('????? ', stockByExg)
                    // reduxStore.store.dispatch(saveStockBySubMarket(stockByExg));

                    symbolMeta[exchange].DAT.TD = dataObj.DAT.TD;
                    symbolMeta[exchange].HED.TD = dataObj.HED.TD;
                    symbolMeta[exchange].DAT.VRS[0] = parseInt(dataObj.DAT.VRS[0], 10);

                    sharedService.getService('price').priceSymbolMeta.save(language);
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing symbol response : ' + e);
        }
        // reduxStore.store.dispatch(setExchangeSymbolMetaDataStatus())
        // reduxStore.store.dispatch(setEndBulkSymbolAdditionStatus());
    };

    //
    // Alert Specific Requests
    //
    const processAlertHistoryResponse = function (dataObj) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                let dtArray, alertTS, alertObj, alertHedIdxList, headerFields;

                if (dataObj.DAT.HPALERT) {
                    headerFields = ['ATO', 'AST', 'TS', 'S', 'AP',
                        'ACR', 'AV', 'ATV', 'TTS', 'ACK', 'FACR', 'FATV'];
                    alertHedIdxList = _getHeaderIndexList(dataObj.HED.HPALERT, headerFields);

                    let dataArry = dataObj.DAT.HPALERT;
                    Object.keys(dataArry).forEach(function (key) {
                        dtArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                        alertTS = dtArray[alertHedIdxList.ATO];
                        alertObj = sharedService.getService('price').alertDS.getAlert(alertTS);

                        alertObj.setData({
                            sym: dtArray[alertHedIdxList.S],
                            status: dtArray[alertHedIdxList.AST],
                            tval: dtArray[alertHedIdxList.ATV],
                            tts: dtArray[alertHedIdxList.TTS]
                        });
                    });
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing symbol response : ' + e);
        }
    };

    // Gms Summary response
    const processGmsSummaryResponse = function (dataObj) {
        let reqStatus = utils.Constants.ReqStatus;

        try {
            if (dataObj.DAT && dataObj.HED) {
                let countryCode, exgCode, dtArray, instrumentType, gmsObj, symHedIdxList, headerFields, symbolDetail,
                    symbolCode, assetType, deci, exgSubType;

                if (dataObj.DAT.GMS) {
                    let userExg = sharedService.getService('price').userDS.get('allExg');

                    headerFields = ['S', 'SYMT', 'R', 'PRI', 'ISG', 'CON', 'DFNS', 'CLF', 'DES', 'DEP', 'SDES', 'PRIS', 'ALTS', 'DT'];
                    symHedIdxList = _getHeaderIndexList(dataObj.HED.GMS, headerFields);

                    let dataArray = dataObj.DAT.GMS;
                    Object.keys(dataArray).forEach(function (key) {

                        dtArray = dataArray[key].split(utils.Constants.StringConst.Pipe);
                        assetType = parseInt(dtArray[symHedIdxList.SYMT], 10);
                        countryCode = dtArray[symHedIdxList.CON].toLowerCase();
                        symbolDetail = dtArray[symHedIdxList.S].split(utils.Constants.StringConst.Tilde);
                        instrumentType = parseInt(symbolDetail[1], 10);
                        symbolCode = symbolDetail[2];
                        exgCode = symbolDetail[0];
                        deci = dtArray[symHedIdxList.DEP];
                        exgSubType = sharedService.getService('price').userDS.getExchangeSubscriptionFlag(exgCode);

                        let exchange = 'GLOBAL';
                        let sDescription = dtArray[symHedIdxList.SDES];

                        if (userExg.length > 0) {
                            Object.keys(userExg).forEach(function (key) {
                                if (symbolDetail.indexOf(userExg[key]) === 0) {
                                    exchange = userExg[key];
                                }
                            });
                        }

                        if (exgSubType) {
                            sDescription = [dtArray[symHedIdxList.SDES], exgSubType].join(' ')
                        }

                        gmsObj = sharedService.getService('price').gmsDS.getGms(exchange, symbolCode, assetType, instrumentType);

                        gmsObj.setData({
                            sym: symbolCode,
                            inst: instrumentType,
                            lDes: utils.formatters.convertUnicodeToNativeString(dtArray[symHedIdxList.DES]),
                            sDes: utils.formatters.convertUnicodeToNativeString(sDescription),
                            cCode: countryCode,
                            ast: assetType,
                            deci: deci
                        });
                    });

                    sharedService.getService('price').gmsDS.set('status', reqStatus.Success);
                }
            }
        } catch (e) {
            sharedService.getService('price').gmsDS.status = reqStatus.Failed;
            utils.logger.logError('Error in processing gms summary response : ' + e);
        }
    };

    // System Meta Data Response
    const processSystemMetaDataResponse = function (dataObj) {
        try {

            if (dataObj.DAT && dataObj.HED) {
                let tzId, sDate, eDate, dls, symHedIdxList, headerFields, dtArray;

                if (typeof dataObj.DAT.DLS_TZ !== 'undefined' && dataObj.DAT.DLS_TZ) {
                    headerFields = ['TZ_ID', 'SDATE', 'EDATE', 'DLS_OS'];
                    symHedIdxList = _getHeaderIndexList(dataObj.HED.DLS_TZ, headerFields);
                    let dataArry = dataObj.DAT.DLS_TZ;
                    Object.keys(dataArry).forEach(function (key) {
                        dtArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                        tzId = dtArray[symHedIdxList.TZ_ID];
                        sDate = dtArray[symHedIdxList.SDATE];
                        eDate = dtArray[symHedIdxList.EDATE];
                        dls = symHedIdxList.DLS_OS ? parseInt(dtArray[symHedIdxList.DLS_OS]) : 0;

                        let dlsTzObj = {
                            tzId: tzId,
                            sDate: sDate,
                            eDate: eDate,
                            dls: dls
                        };
                        // let dlsObj = new DayLightSaving(dlsTzObj);
                        // reduxStore.store.dispatch(saveSystemMetaData(dlsObj));
                    });

                    // let storedDlsObj = reduxStore.store.getState().systemMetaData.systemMetaData
                    // reduxStore.store.dispatch(saveExchangeTimeZone(storedDlsObj));
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing system meta data response : ' + e);
        }
    };

    const processSymbolValidationResponse = function (dataObj) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                let dtArray, symbolCode, exchangeCode, instrumentType, stockObj, symHedIdxList, headerFields,
                    exgSubType, lDes, sDes;

                if (dataObj.DAT.SYM) {
                    // Update symbol meta data
                    let userExg = sharedService.getService('price').userDS.get('allExg');

                    headerFields = ['E', 'S', 'INS', 'SEC', 'SDES', 'DES', 'CUR', 'DEF', 'DS', 'DEP', 'SYMC'];
                    symHedIdxList = _getHeaderIndexList(dataObj.HED.SYM, headerFields);

                    let dataArry = dataObj.DAT.SYM;
                    Object.keys(dataArry).forEach(function (key) {
                        dtArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                        symbolCode = dtArray[symHedIdxList.S];
                        exchangeCode = dtArray[symHedIdxList.E];
                        instrumentType = parseInt(dtArray[symHedIdxList.INS], 10);
                        stockObj = sharedService.getService('price').stockDS.getStock(exchangeCode, symbolCode, instrumentType);
                        exgSubType = sharedService.getService('price').userDS.getExchangeSubscriptionFlag(exchangeCode);
                        lDes = utils.formatters.convertUnicodeToNativeString(dtArray[symHedIdxList.DES]);
                        sDes = utils.formatters.convertUnicodeToNativeString(dtArray[symHedIdxList.SDES]);

                        let exchange = exchangeCode; // BUG | HTML5UA-5570 | Set exchange in the validation response if it is not in the user exchanges
                        let displaySymbol = dtArray[symHedIdxList.DS] ? dtArray[symHedIdxList.DS] : symbolCode;

                        if (userExg.length > 0) {
                            Object.keys(userExg).forEach(function (key) {
                                if (exchangeCode === dataObj[key]) {
                                    exchange = dataObj[key];
                                }
                            });
                        }

                        if (exgSubType) {
                            displaySymbol = [displaySymbol, exgSubType].join(' ');
                            lDes = [lDes, exgSubType].join(' ');
                            sDes = [sDes, exgSubType].join(' ');
                        }

                        stockObj.setData({
                            sym: symbolCode,
                            exg: exchange,
                            inst: instrumentType,
                            lDes: lDes,
                            sDes: sDes,
                            sec: dtArray[symHedIdxList.SEC],
                            dcf: dtArray[symHedIdxList.DEF],
                            cur: dtArray[symHedIdxList.CUR],
                            dSym: displaySymbol,
                            deci: dtArray[symHedIdxList.DEP],
                            cid: dtArray[symHedIdxList.SYMC]
                        });
                    });
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing symbol validation response : ' + e);
        }
    };

    const processSymbolSearchResponse = function (dataObj, searchKey, notifyFn, searchNumber) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                let dtArray, resultItem, symHedIdxList, headerFields, searchResultArray, resultArray, config;
                resultArray = dataObj.DAT.SYMS;

                if (resultArray) {
                    headerFields = ['E', 'S', 'INS', 'SDES', 'DES', 'DS', 'SYMT', 'MC', 'DEP', 'SYMC'];
                    symHedIdxList = _getHeaderIndexList(dataObj.HED.SYMS, headerFields);
                    searchResultArray = [];
                    config = PriceWidgetConfig.globalSearch.groups;

                    Object.keys(resultArray).forEach(function (key) {
                        dtArray = resultArray[key].split(utils.Constants.StringConst.Pipe);
                        // resultItem = searchResultItem.create();

                        let symbolCode = dtArray[symHedIdxList.S];
                        let exchangeCode = dtArray[symHedIdxList.E];
                        let displayExchange = dtArray[symHedIdxList.E];
                        let ast = dtArray[symHedIdxList.SYMT];
                        let exgObj = sharedService.getService('price').exchangeDS.getExchange(exchangeCode);
                        let groupingObj = config[ast] ? config[ast] : config.other;
                        let displaySymbol = dtArray[symHedIdxList.DS] ? dtArray[symHedIdxList.DS] : symbolCode;
                        let exgSubType = sharedService.getService('price').userDS.getExchangeSubscriptionFlag(exchangeCode);

                        if (exgSubType) {
                            displaySymbol = [displaySymbol, exgSubType].join(' ');
                            displayExchange = [displayExchange, exgSubType].join(' ');
                        }

                        resultItem.setData({
                            sym: symbolCode,
                            exg: exchangeCode,
                            dSym: utils.validators.isAvailable(displaySymbol) ? displaySymbol : symbolCode,
                            de: utils.validators.isAvailable(exgObj.de) ? exgObj.de : displayExchange,
                            inst: dtArray[symHedIdxList.INS],
                            ast: ast,
                            subMkt: dtArray[symHedIdxList.MC],
                            groupingObj: groupingObj,
                            lDes: utils.formatters.convertUnicodeToNativeString(dtArray[symHedIdxList.DES]),
                            sDes: utils.formatters.convertUnicodeToNativeString(dtArray[symHedIdxList.SDES]),
                            deci: dtArray[symHedIdxList.DEP],
                            cid: dtArray[symHedIdxList.SYMC]
                        });

                        searchResultArray.push(resultItem);
                    });

                    if (notifyFn instanceof Function) {
                        let isSearchResultAvailable = searchResultArray.length > 0;
                        notifyFn(isSearchResultAvailable, searchKey, searchResultArray, searchNumber);
                    }
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing symbol search response : ' + e);

            if (notifyFn instanceof Function) {
                notifyFn(false);
            }
        }
    };

    //
    // News & announcement specific response
    //
    const processAnnouncementBodyResponse = function (dataObj, reqSuccessFn, reqFailureFn) {
        try {
            if (dataObj.DAT && dataObj.DAT.ANN) {
                let dtIdxList = _getHeaderIndexList(dataObj.HED.ANN, ['ID', 'BOD']);
                let record = dataObj.DAT.ANN.split(utils.Constants.StringConst.Pipe);
                let annId = record[dtIdxList.ID];
                let body = record[dtIdxList.BOD];

                if (annId && body) {
                    sharedService.getService('price').announcementDS.getAnnouncement(annId, PriceConstants.ResponseType.Data.ResponseAnnouncement).set('bod', body);

                    if (reqSuccessFn instanceof Function) {
                        reqSuccessFn(annId);
                    }
                }
            } else {
                if (reqFailureFn instanceof Function) {
                    reqFailureFn();
                }
            }
        } catch (e) {
            if (reqFailureFn instanceof Function) {
                reqFailureFn();
            }

            utils.logger.logError('Error in processing announcement body response : ' + e);
        }
    };

    const processNewsBodyResponse = function (dataObj, reqSuccessFn, reqFailureFn) {
        try {
            if (dataObj.DAT && dataObj.DAT.NWS) {
                let dtIdxList = _getHeaderIndexList(dataObj.HED.NWS, ['ID', 'BOD']);
                let record = dataObj.DAT.NWS.split(utils.Constants.StringConst.Pipe);
                let annId = record[dtIdxList.ID];
                let body = record[dtIdxList.BOD];

                if (annId && body) {
                    sharedService.getService('price').announcementDS.getAnnouncement(annId, PriceConstants.ResponseType.Data.ResponseNews).set('bod', body);

                    if (reqSuccessFn instanceof Function) {
                        reqSuccessFn(annId);
                    }
                }
            } else {
                if (reqFailureFn instanceof Function) {
                    reqFailureFn();
                }
            }
        } catch (e) {
            if (reqFailureFn instanceof Function) {
                reqFailureFn();
            }

            utils.logger.logError('Error in processing news body response : ' + e);
        }
    };

    const processAnnouncementSearchResponse = function (dataObj, announcementCollection, reqSuccessFn, reqFailureFn) {
        try {
            let existingIdList = announcementCollection.mapBy('id');

            if (dataObj.DAT && dataObj.DAT.ANNL) {
                let annHedIdxList = _getHeaderIndexList(dataObj.HED.ANNL, ['ID', 'E', 'S', 'HED', 'DT', 'L']);

                var dataArry = dataObj.DAT.ANNL;
                Object.keys(dataArry).forEach(function (key) {
                    let dtArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                    let annId = dtArray[annHedIdxList.ID];
                    let exg = dtArray[annHedIdxList.E];
                    let sym = dtArray[annHedIdxList.S];
                    let annObj = sharedService.getService('price').announcementDS.getAnnouncement(annId, PriceConstants.ResponseType.Data.ResponseAnnouncement, sym, exg);

                    annObj.setData({
                        type: PriceConstants.ResponseType.Data.ResponseAnnouncement,
                        exg: exg,
                        sym: sym,
                        hed: dtArray[annHedIdxList.HED],
                        dt: dtArray[annHedIdxList.DT],
                        ln: dtArray[annHedIdxList.L],
                        id: annId
                    });

                    _addNewsAnnToCollection(existingIdList, annId, announcementCollection, annObj);
                });

                if (reqSuccessFn instanceof Function) {
                    if (dataObj.DAT.ANNL.length > 0) {
                        reqSuccessFn(true);
                    } else {
                        reqSuccessFn(false);
                    }
                }
            }
        } catch (e) {
            if (reqFailureFn instanceof Function) {
                reqFailureFn();
            }

            utils.logger.logError('Error in processing announcement search response : ' + e);
        }
    };

    const processNewsSearchResponse = function (dataObj, newsCollection, reqSuccessFn, reqFailureFn) {
        try {
            let existingIdList = newsCollection.mapBy('id');

            if (dataObj.DAT && dataObj.DAT.NWSL) {
                let annHedIdxList = _getHeaderIndexList(dataObj.HED.NWSL, ['ID', 'E', 'S', 'HED', 'DT', 'L']);

                let dataArry = dataObj.DAT.NWSL;
                Object.keys(dataArry).forEach(function (key) {
                    let dtArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                    let newsId = dtArray[annHedIdxList.ID];
                    let exg = dtArray[annHedIdxList.E];
                    let sym = dtArray[annHedIdxList.S];
                    let annObj = sharedService.getService('price').announcementDS.getAnnouncement(newsId, PriceConstants.ResponseType.Data.ResponseNews, sym, exg);

                    annObj.setData({
                        type: PriceConstants.ResponseType.Data.ResponseNews,
                        exg: exg,
                        sym: sym,
                        hed: dtArray[annHedIdxList.HED],
                        dt: dtArray[annHedIdxList.DT],
                        ln: dtArray[annHedIdxList.L],
                        id: newsId
                    });

                    _addNewsAnnToCollection(existingIdList, newsId, newsCollection, annObj);
                });

                if (reqSuccessFn instanceof Function) {
                    if (dataObj.DAT.NWSL.length > 0) {
                        reqSuccessFn(true);
                    } else {
                        reqSuccessFn(false);
                    }

                } else {
                    if (reqFailureFn instanceof Function) {
                        reqFailureFn();
                    }
                }
            }
        } catch (e) {
            if (reqFailureFn instanceof Function) {
                reqFailureFn();
            }

            utils.logger.logError('Error in processing news search response : ' + e);
        }
    };

    //
    // Chart specific response
    //
    const processChartResponse = function (dtObj, chartCategory, reqSuccessFn, reqFailureFn) {
        try {
            if (dtObj.DAT && dtObj.HED) {
                let sym, exg, symInfo, ohlcRecHedIdxList, pt, date, symHedIdxList, ohlcSeries;
                symHedIdxList = dtObj.HED.S.split(utils.Constants.StringConst.Comma).indicesOf(['E', 'S']);
                symInfo = dtObj.DAT.S.split(utils.Constants.StringConst.Comma);
                sym = symInfo[symHedIdxList.S];
                exg = symInfo[symHedIdxList.E];
                ohlcRecHedIdxList = dtObj.HED.HIS.split(utils.Constants.StringConst.Comma).indicesOf(
                    ['DT', 'OP', 'HIG', 'LOW', 'CLS', 'VOL', 'TOVR', 'PER', 'PBR']
                );
                ohlcSeries = sharedService.getService('price').ohlcDS.getOHLCSeries(exg, sym, chartCategory);

                // If data is already available, flush them.
                // Note: Flushing and re-generating the array is efficient than search and insertion the missing points
                if (ohlcSeries.ohlcDataPoints) {
                    ohlcSeries.ohlcDataPoints.length = 0;
                }

                // Load exchange object for obtaining the timezone
                let exgObj = sharedService.getService('price').exchangeDS.getExchange(exg);

                let dataArry = dtObj.DAT.HIS;
                Object.keys(dataArry).forEach(function (key) {
                    pt = parseInt(dataArry[key][ohlcRecHedIdxList.DT], 10) * PriceConstants.UnixTimestampByMilliSeconds;
                    date = utils.formatters.convertToUTCDate(pt, exgObj.tzo);

                    ohlcSeries.setData({
                        dt: date,
                        open: dataArry[key][ohlcRecHedIdxList.OP],
                        high: dataArry[key][ohlcRecHedIdxList.HIG],
                        low: dataArry[key][ohlcRecHedIdxList.LOW],
                        close: dataArry[key][ohlcRecHedIdxList.CLS],
                        volume: dataArry[key][ohlcRecHedIdxList.VOL],
                        turnover: dataArry[key][ohlcRecHedIdxList.TOVR],
                        per: dataArry[key][ohlcRecHedIdxList.PER],
                        pbr: dataArry[key][ohlcRecHedIdxList.PBR]
                    }, false);
                });

                if (reqSuccessFn instanceof Function && ohlcSeries.ohlcDataPoints && ohlcSeries.ohlcDataPoints.length > 0) {
                    reqSuccessFn();
                } else {
                    reqFailureFn();
                }

                sharedService.getService('price').ohlcDS.onChartDataReady(utils.keyGenerator.getKey(exg, sym));
            }
        } catch (e) {
            utils.logger.logError('Error in Intraday chart data : ' + e);
        }
    };

    const processTOPVChartResponse = function (dtObj, chartCategory, reqSuccessFn, reqFailureFn) {
        try {
            if (dtObj.DAT && dtObj.HED) {
                let sym, exg, symInfo, ohlcRecHedIdxList, pt, date, symHedIdxList, ohlcSeries;
                symHedIdxList = dtObj.HED.S.split(utils.Constants.StringConst.Comma).indicesOf(['E', 'S']);
                symInfo = dtObj.DAT.S.split(utils.Constants.StringConst.Comma);
                sym = symInfo[symHedIdxList.S];
                exg = symInfo[symHedIdxList.E];
                ohlcRecHedIdxList = dtObj.HED.HIS.split(utils.Constants.StringConst.Comma).indicesOf(
                    ['DT', 'OP', 'HIG', 'LOW', 'CLS', 'VOL', 'TOVR']
                );
                ohlcSeries = sharedService.getService('price').theoreticalChartDS.getOHLCSeries(exg, sym, chartCategory);

                // If data is already available, flush them.
                // Note: Flushing and re-generating the array is efficient than search and insertion the missing points
                if (ohlcSeries.ohlcDataPoints) {
                    ohlcSeries.ohlcDataPoints.length = 0;
                }

                // Load exchange object for obtaining the timezone
                let exgObj = sharedService.getService('price').exchangeDS.getExchange(exg);

                let dataArry = dtObj.DAT.HIS;
                Object.keys(dataArry).forEach(function (key) {
                    pt = parseInt(dataArry[key][ohlcRecHedIdxList.DT], 10) * PriceConstants.UnixTimestampByMilliSeconds;
                    date = utils.formatters.convertToUTCDate(pt, exgObj.tzo);

                    ohlcSeries.setData({
                        dt: date,
                        open: dataArry[key][ohlcRecHedIdxList.OP],
                        high: dataArry[key][ohlcRecHedIdxList.HIG],
                        low: dataArry[key][ohlcRecHedIdxList.LOW],
                        close: dataArry[key][ohlcRecHedIdxList.CLS],
                        volume: dataArry[key][ohlcRecHedIdxList.VOL],
                        turnover: dataArry[key][ohlcRecHedIdxList.TOVR]
                    }, false);
                });

                if (reqSuccessFn instanceof Function && ohlcSeries.ohlcDataPoints && ohlcSeries.ohlcDataPoints.length > 0) {
                    reqSuccessFn();
                } else {
                    reqFailureFn(dtObj.STAT ? dtObj.STAT.HIS : '');
                }

                sharedService.getService('price').theoreticalChartDS.onChartDataReady(utils.keyGenerator.getKey(exg, sym));
            }
        } catch (e) {
            utils.logger.logError('Error in Intraday chart data : ' + e);
        }
    };

    //
    // Company Profile specific response
    //
    const processCompanyProfileResponse = function (dataObj, exchange, symbol, language) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                let dtArray, cpObj, cpDataList;
                cpObj = sharedService.getService('price').companyProfileDS.getCompanyProfile(exchange, symbol, language);
                let stock = sharedService.getService('price').stockDS.getStock(exchange, symbol, language);

                if (dataObj.DAT.COMPINF.CP) {
                    cpDataList = _getHeaderIndexList(dataObj.HED.COMPINF.CP, ['LOGO', 'COMP_NAME', 'ISIN_CODE', 'ADDR_1', 'PHN',
                        'FAX', 'EMAIL', 'WEB', 'TRD_NAME', 'COMP_CURRENCY', 'COUNTRY_DESC', 'MAIN_ACTIVITY', 'COMPANY_ID']);

                    let dataArryCC = dataObj.DAT.COMPINF.CP;
                    Object.keys(dataArryCC).forEach(function (key) {
                        dtArray = dataArryCC[key].split(utils.Constants.StringConst.Pipe);

                        cpObj.setData({
                            logo: dtArray[cpDataList.LOGO],
                            compName: dtArray[cpDataList.COMP_NAME],
                            des: dtArray[cpDataList.MAIN_ACTIVITY],
                            isin: dtArray[cpDataList.ISIN_CODE],
                            addr: dtArray[cpDataList.ADDR_1],
                            phn: dtArray[cpDataList.PHN],
                            fax: dtArray[cpDataList.FAX],
                            email: dtArray[cpDataList.EMAIL],
                            web: dtArray[cpDataList.WEB],
                            trdName: dtArray[cpDataList.TRD_NAME],
                            currency: dtArray[cpDataList.COMP_CURRENCY],
                            country: dtArray[cpDataList.COUNTRY_DESC],
                            listedShr: stock.mktCap,
                            mktCap1: stock.lstShares,
                            compID: dtArray[cpDataList.COMPANY_ID]
                        });
                    });
                }

                if (dataObj.DAT.COMPINF.STK) {
                    cpDataList = _getHeaderIndexList(dataObj.HED.COMPINF.STK, ['ISIN_CODE', 'LISTING_DATE', 'MARKETCAP', 'FREE_FLOAT', 'PAR_VALUE', 'PAID_CAP', 'BBGID', 'SECTOR']);

                    let dataArryCSTK = dataObj.DAT.COMPINF.STK;
                    Object.keys(dataArryCSTK).forEach(function (key) {
                        dtArray = dataArryCSTK[key].split(utils.Constants.StringConst.Pipe);

                        cpObj.setData({
                            isin: dtArray[cpDataList.ISIN_CODE],
                            stkLstOn: dtArray[cpDataList.LISTING_DATE],
                            mktCap: dtArray[cpDataList.MARKETCAP],
                            freeFltShr: dtArray[cpDataList.FREE_FLOAT],
                            parVal: dtArray[cpDataList.PAR_VALUE],
                            paidCap: dtArray[cpDataList.PAID_CAP],
                            bbgid: dtArray[cpDataList.BBGID],
                            sector: dtArray[cpDataList.SECTOR]
                        });
                    });
                }

                if (dataObj.DAT.COMPINF.INMGT) {
                    cpDataList = _getHeaderIndexList(dataObj.HED.COMPINF.INMGT, ['INDIVIDUAL_NAME', 'DESIGNATION', 'MGT_START_DATE', 'SORT_ORDER']);

                    let cpMObj;

                    let dataArryCI = dataObj.DAT.COMPINF.INMGT;
                    Object.keys(dataArryCI).forEach(function (key) {
                        dtArray = dataArryCI[key].split(utils.Constants.StringConst.Pipe);
                        cpMObj = sharedService.getService('price').companyProfileDS.createCompanyManagement();

                        cpMObj.setData({
                            name: dtArray[cpDataList.INDIVIDUAL_NAME],
                            desig: dtArray[cpDataList.DESIGNATION],
                            date: dtArray[cpDataList.MGT_START_DATE],
                            sortOrder: dtArray[cpDataList.SORT_ORDER]
                        });

                        cpObj.compManagement.push(cpMObj);
                    });

                    let dataArryCIN = dataObj.DAT.COMPINF.INMGT;
                    Object.keys(dataArryCIN).forEach(function (key) {
                        dtArray = dataArryCIN[key].split(utils.Constants.StringConst.Pipe);
                        cpMObj = sharedService.getService('price').companyProfileDS.createCompanyManagement();

                        cpMObj.setData({
                            name: dtArray[cpDataList.INDIVIDUAL_NAME],
                            desig: dtArray[cpDataList.DESIGNATION],
                            date: dtArray[cpDataList.MGT_START_DATE],
                            sortOrder: dtArray[cpDataList.SORT_ORDER]
                        });

                        cpObj.compManagement.push(cpMObj);
                    });
                }

                if (dataObj.DAT.COMPINF.OWN_IND) {
                    cpDataList = _getHeaderIndexList(dataObj.HED.COMPINF.OWN_IND, ['INDIVIDUAL_NAME', 'OWN_PCT_IND']);
                    let cposobj;

                    let dataArryCO = dataObj.DAT.COMPINF.OWN_IND;
                    Object.keys(dataArryCO).forEach(function (key) {
                        dtArray = dataArryCO[key].split(utils.Constants.StringConst.Pipe);
                        cposobj = sharedService.getService('price').companyProfileDS.createCompanyOwners();

                        cposobj.setData({
                            ownerName: dtArray[cpDataList.INDIVIDUAL_NAME],
                            sherPrs: dtArray[cpDataList.OWN_PCT_IND]
                        });

                        cpObj.compOwners.push(cposobj);

                    });
                }

                if (dataObj.DAT.COMPINF.CPCLS) {
                    cpDataList = _getHeaderIndexList(dataObj.HED.COMPINF.CPCLS, ['SHRT_DSC', 'CLASSIFICATION_ID']);

                    let dataArryCC = dataObj.DAT.COMPINF.CPCLS;
                    Object.keys(dataArryCC).forEach(function (key) {
                        dtArray = dataArryCC[key].split(utils.Constants.StringConst.Pipe);

                        if (dtArray[cpDataList.CLASSIFICATION_ID] === 'GICSL3') {
                            cpObj.setData({
                                indGrp: dtArray[cpDataList.SHRT_DSC]
                            });
                        } else if (dtArray[cpDataList.CLASSIFICATION_ID] === 'GICSL4') {

                            cpObj.setData({
                                subInd: dtArray[cpDataList.SHRT_DSC]
                            });
                        }
                    });
                }

                if (dataObj.DAT.COMPINF.SUBS) {
                    cpDataList = _getHeaderIndexList(dataObj.HED.COMPINF.SUBS, ['SUBS_COMP_NAME', 'OWN_PCT']);
                    let cpsubobj;

                    let dataArryCS = dataObj.DAT.COMPINF.SUBS;

                    Object.keys(dataArryCS).forEach(function (key) {
                        dtArray = dataArryCS[key].split(utils.Constants.StringConst.Pipe);
                        cpsubobj = sharedService.getService('price').companyProfileDS.createCompanySubsidiaries();

                        cpsubobj.setData({
                            subsiName: dtArray[cpDataList.SUBS_COMP_NAME],
                            subsiSherPrs: dtArray[cpDataList.OWN_PCT]
                        });

                        cpObj.compSubsidiaries.push(cpsubobj);
                    });
                }

                if (dataObj.DAT.COMPINF.AUD) {
                    cpDataList = _getHeaderIndexList(dataObj.HED.COMPINF.AUD, ['AUD_COMP_NAME']);

                    let dataArryCA = dataObj.DAT.COMPINF.AUD;
                    Object.keys(dataArryCA).forEach(function (key) {
                        dtArray = dataArryCA[key].split(utils.Constants.StringConst.Pipe);

                        cpObj.setData({
                            auditor: dtArray[cpDataList.AUD_COMP_NAME]
                        });
                    });
                }
            }
        } catch (e) {
            utils.logger.logError('Error in Company Profile Data : ' + e);
        }
    };

    // TODO : [Rasika] Need to add response status processing, Error Handling
    const processTimeAndSalesBacklogResponse = function (dataObj) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                let noOfDuplicate = 0;
                let dtArray, symbolCode, exchangeCode, symInfo, trdObj, symHedIdxList, tsHedIdxList, headerFields,
                    backlogLastTrade, isFullMarket;

                if (dataObj.HED.S && dataObj.DAT.S) {
                    symHedIdxList = dataObj.HED.S.split(utils.Constants.StringConst.Pipe).indicesOf(['E', 'S']);
                    symInfo = dataObj.DAT.S.split(utils.Constants.StringConst.Pipe);
                    symbolCode = symInfo[symHedIdxList.S];
                } else if (dataObj.HED.E && dataObj.DAT.E) {
                    isFullMarket = true;
                    symHedIdxList = dataObj.HED.E.split(utils.Constants.StringConst.Pipe).indicesOf(['E']);
                    symInfo = dataObj.DAT.E.split(utils.Constants.StringConst.Pipe);
                }

                exchangeCode = symInfo[symHedIdxList.E];

                if (dataObj.DAT.TS) {
                    headerFields = ['S', 'TT', 'INS', 'LTP', 'TQ', 'CHG', 'PCHG', 'TYPE', 'SPL', 'SNO', 'VWAP', 'BUYERCODE', 'SELLERCODE'];
                    tsHedIdxList = _getHeaderIndexList(dataObj.HED.TS, headerFields);

                    // let dataArry = dataObj.DAT.TS;

                    Object.keys(dataObj).forEach(function (key) {

                        dtArray = dataObj[key].split(utils.Constants.StringConst.Pipe);

                        let sym = isFullMarket ? dtArray[tsHedIdxList.S] : symbolCode;
                        let seq = parseInt(dtArray[tsHedIdxList.SNO], 10);

                        trdObj = sharedService.getService('price').timeAndSalesDS.getBacklogTrade(exchangeCode, symbolCode, seq);

                        if (trdObj) {
                            // TODO : [Rasike] Need to use formatters after adding formatters for each type.
                            trdObj.setData({
                                sym: sym,
                                exg: exchangeCode,
                                tts: dtArray[tsHedIdxList.TT],
                                inst: dtArray[tsHedIdxList.INS],
                                trp: parseFloat(dtArray[tsHedIdxList.LTP]),
                                trq: parseInt(dtArray[tsHedIdxList.TQ], 10),
                                nChg: parseFloat(dtArray[tsHedIdxList.CHG]),
                                pctChg: parseFloat(dtArray[tsHedIdxList.PCHG]),
                                seq: seq,
                                trdType: dtArray[tsHedIdxList.TYPE],
                                vwap: parseFloat(dtArray[tsHedIdxList.VWAP]),
                                splits: parseInt(dtArray[tsHedIdxList.SPL], 10),
                                isEmpty: false,
                                buyCode: dtArray[tsHedIdxList.BUYERCODE],
                                selCode: dtArray[tsHedIdxList.SELLERCODE]
                            });

                            if (backlogLastTrade) {
                                backlogLastTrade.setTradeTick(trdObj.trp);
                            }

                            backlogLastTrade = _setLastTrade(backlogLastTrade, trdObj);
                        } else {
                            // 'trdObj' will be undefined if row was duplicated
                            noOfDuplicate++;
                        }
                    });
                }

                if (dataObj.ROW && dataObj.ROW.TS) {
                    sharedService.getService('price').timeAndSalesDS.setBacklogLength(exchangeCode, symbolCode, parseInt(dataObj.ROW.TS, 10) - noOfDuplicate);
                }

                sharedService.getService('price').timeAndSalesDS.onBacklogDataReady(exchangeCode, symbolCode);
            }
        } catch (e) {
            utils.logger.logError('Error in processing symbol validation response : ' + e);
        }
    };

    const processCalenderEventsResponse = function (dataObj) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                let dtArray, type, newsEventObj, newsHedIdxList, headerFields;

                if (dataObj.DAT.CALENDER_EVENTS) {
                    headerFields = ['TITLE', 'ID', 'URL', 'DATE'];
                    newsHedIdxList = _getHeaderIndexList(dataObj.HED.CALENDER_EVENTS, headerFields);
                    type = 'CALENDER_EVENT';

                    let dataArry = dataObj.DAT.CALENDER_EVENTS;

                    Object.keys(dataArry).forEach(function (key) {
                        dtArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                        newsEventObj = sharedService.getService('price').socialMediaDS.getNewsEvent(type);

                        newsEventObj.setData({
                            id: dtArray[newsHedIdxList.ID],
                            title: dtArray[newsHedIdxList.TITLE],
                            url: dtArray[newsHedIdxList.URL],
                            date: dtArray[newsHedIdxList.DATE]
                        });
                    });
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing calender events  response : ' + e);
        }
    };

    const processYoutubeEventsResponse = function (dataObj, callbackFn) {
        try {
            if (dataObj && dataObj.items) {
                let postObj, rawDate, date, time;
                let socialMediaDS = sharedService.getService('price').socialMediaDS;

                if (dataObj.nextPageToken) {
                    socialMediaDS.setYoutubeNextPageUrl(dataObj.nextPageToken);
                }

                let dataArry = dataObj.items;

                Object.keys(dataArry).forEach(function (key) {
                    postObj = socialMediaDS.getYoutubePost();
                    rawDate = (dataObj.items[key].snippet.publishedAt).split('T');
                    date = rawDate[0];
                    time = rawDate[1].split('.')[0];

                    postObj.setData({
                        videoId: dataObj.items[key].id.videoId,
                        imgUrl: dataObj.items[key].snippet.thumbnails.medium.url,
                        date: date + ' ' + time,
                        description: dataObj.items[key].snippet.title
                    });
                });

                if (callbackFn) {
                    callbackFn();
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing youtube events  response : ' + e);
        }
    };

    const processInstagramEventsResponse = function (data) {
        try {
            let dataObj = JSON.parse(data);

            if (dataObj && dataObj.data) {
                let postObj, date, showDate;
                let dataArry = dataObj.data;

                Object.keys(dataArry).forEach(function (key) {
                    postObj = sharedService.getService('price').socialMediaDS.getInstagramPost();
                    date = new Date(parseInt(dataObj.data[key].caption.created_time, 10) * 1000);
                    showDate = utils.formatters.formatDateToDisplayDate(date, false, '-', ':', ' ');

                    postObj.setData({
                        id: dataObj.data[key].id,
                        imgUrl: dataObj.data[key].images.standard_resolution.url,
                        postUrl: dataObj.data[key].link,
                        date: showDate,
                        description: dataObj.data[key].caption.text
                    });
                });
            }
        } catch (e) {
            utils.logger.logError('Error in processing Instagram response : ' + e);
        }
    };

    const processFacebookEventsResponse = function (dataObj, nextPageUrl, callbackFn) {
        try {
            let dataContainer;

            if (nextPageUrl) {
                dataContainer = dataObj;
            } else {
                dataContainer = dataObj.posts;
            }

            if (dataObj && dataContainer) {
                let postObj, rawDate, date, time;
                let socialMediaDS = sharedService.getService('price').socialMediaDS;

                if (dataContainer.paging.next) {
                    socialMediaDS.setFacebookNextPageUrl(dataContainer.paging.next);
                }

                let dataArry = dataContainer.data;

                Object.keys(dataArry).forEach(function (key) {
                    postObj = socialMediaDS.getFacebookPost();
                    rawDate = (dataContainer.data[key].created_time).split('T');
                    date = rawDate[0];
                    time = rawDate[1].split('+')[0];

                    postObj.setData({
                        id: dataContainer.data[key].id,
                        imgUrl: dataContainer.data[key].picture,
                        postUrl: dataContainer.data[key].permalink_url,
                        date: date + ' ' + time,
                        description: dataContainer.data[key].message
                    });
                });

                if (callbackFn) {
                    callbackFn();
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing facebook events : ' + e);
        }
    };

    const processPressReleaseResponse = function (dataObj) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                let dtArray, type, pressEventObj, newsHedIdxList, headerFields;

                if (dataObj.DAT.PRESS_RELEASE_DATA) {
                    headerFields = ['TITLE', 'ID', 'URL', 'DATE'];
                    newsHedIdxList = _getHeaderIndexList(dataObj.HED.PRESS_RELEASE_DATA, headerFields);
                    type = 'PRESS_RELEASE';

                    let dataArry = dataObj.DAT.PRESS_RELEASE_DATA;
                    Object.keys(dataArry).forEach(function (key) {
                        dtArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                        pressEventObj = sharedService.getService('price').socialMediaDS.getPressRelease(type);

                        pressEventObj.setData({
                            id: dtArray[newsHedIdxList.ID],
                            title: dtArray[newsHedIdxList.TITLE],
                            url: dtArray[newsHedIdxList.URL],
                            date: dtArray[newsHedIdxList.DATE]
                        });
                    });
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing press releases response : ' + e);
        }
    };

    const processExchangeSummaryResponse = function (dataObj, language, callback) {
        if (dataObj && dataObj.DAT && dataObj.HED && dataObj.DAT.SRC) {
            try {
                let exchangeObjects = {};
                let stockObject = {}
                let subMarkettFinalObj = {}
                let subMarkettFinalObjByExg = {}
                let priceExgMeteData = language === sharedService.userSettings.currentLanguage ?
                    sharedService.getService('price').priceExchangeMeta : sharedService.getService('price').priceExchangeMeta;
                let exgMetaData = priceExgMeteData.getExgSummaryObj();

                exgMetaData.HED = dataObj.HED;
                exgMetaData.DAT = dataObj.DAT;

                let verHeader = ['EXCHANGE', 'VRS'];
                let verHedIdxList = _getHeaderIndexList(dataObj.HED.VRS, verHeader);

                let dataArryDV = dataObj.DAT.VRS;
                Object.keys(dataArryDV).forEach(function (key) {
                    let verArray = dataArryDV[key].split(utils.Constants.StringConst.Pipe);
                    let exchangeCode = verArray[verHedIdxList.EXCHANGE];

                    exgMetaData.VRS[exchangeCode] = verArray[verHedIdxList.VRS];
                });

                priceExgMeteData.save(language);

                // let existingStockObj = reduxStore.store.getState().stock.stocks.stockData;
                // Update data stores
                if (language === sharedService.userSettings.currentLanguage) {
                    let headerFields = ['EXCHANGE', 'DISP_CODE', 'SHRT_DSC', 'LONG_DSC', 'MAIN_IDX', 'MAIN_IDX_DSC', 'DEF_SUB_MKT', 'SUB_MKT_DSC'];
                    let symHedIdxList = _getHeaderIndexList(dataObj.HED.SRC, headerFields);
                    let dataArry = dataObj.DAT.SRC;
                    // let existingSubMarkt = reduxStore.store.getState().subMarket.subMarketData;
                    // let existingSubMarktByExg = reduxStore.store.getState().subMarket.subMarketDataByExg;
                    // let existingExchange = [reduxStore.store.getState().exchangeStore.exchangeData];

                    Object.keys(dataArry).forEach(function (key) {
                        let dtArray = dataArry[key].split(utils.Constants.StringConst.Pipe);

                        let exchangeCode = dtArray[symHedIdxList.EXCHANGE];
                        let mainIndex = dtArray[symHedIdxList.MAIN_IDX];
                        // let userDS = reduxStore.store.getState().user.userData;

                        // reduxStore.store.dispatch(getExchangeSubscriptionFlag(exchangeCode, userDS.delayedExchg, userDS.prevDayExchg))
                        // let exgSubType = reduxStore.store.getState().user.subscriptionFlag;

                        let objectKey = utils.keyGenerator.getKey(exchangeCode, mainIndex);
                        let existingObj = sharedService.getService('price').exchangeDS.getExchange(exchangeCode);
                        let stockObj = sharedService.getService('price').stockDS.getStock(exchangeCode, mainIndex, utils.AssetTypes.Indices);


                        existingObj.exg = exchangeCode;
                        // existingObj.de = exgSubType ? [dtArray[symHedIdxList.DISP_CODE], exgSubType].join(' ') : dtArray[symHedIdxList.DISP_CODE];
                        // existingObj.sDes = utils.formatters.convertUnicodeToNativeString(exgSubType ? [dtArray[symHedIdxList.SHRT_DSC], exgSubType].join(' ') : dtArray[symHedIdxList.SHRT_DSC]);
                        // existingObj.des = utils.formatters.convertUnicodeToNativeString(exgSubType ? [dtArray[symHedIdxList.LONG_DSC], exgSubType].join(' ') : dtArray[symHedIdxList.LONG_DSC]);


                        if (!existingObj.mainIdx) {
                            existingObj.mainIdx = dtArray[symHedIdxList.MAIN_IDX];
                        }

                        stockObj.sym = mainIndex;
                        stockObj.sDes = utils.formatters.convertUnicodeToNativeString(dtArray[symHedIdxList.MAIN_IDX_DSC]);
                        stockObj.symbolObj = existingObj;


                        // Gives priority to default sub market configured in application (price-constants)
                        // This is to avoid data issues from backend and gives correct output to users
                        // If default sub market is not configured in application, it will get from backend response
                        let defSubMkt = AppConfig.customisation.defaultSubMarket[exchangeCode];
                        defSubMkt = defSubMkt ? defSubMkt : dtArray[symHedIdxList.DEF_SUB_MKT];

                        let subMktData = utils.formatters.convertUnicodeToNativeString(dtArray[symHedIdxList.SUB_MKT_DSC]); // B-Bonds,E-Equities,M-Mutual Funds

                        // Server returns only the separator if no sub markets available for the market
                        // Therefore checking the length to distinguish single sub market, multiple sub markets and no sub markets
                        if (subMktData.length > 1) {
                            let subMktItems = subMktData.split(utils.Constants.StringConst.Comma);

                            let allowedSubMktsByExg = _getAllowedSubMktsByExchange(exchangeCode);

                            // If only one sub market available, considers as sub markets not available
                            // Symbols are not tagged to the sub market in this scenario
                            // Therefore symbols are not loaded in application widgets

                            // Commented 'if' block to fixed issue occur in KSE setup
                            // Issue : Sending MKT code as "-1"

                            // if (subMktItems.length > 1) {
                            try {
                                Object.keys(subMktItems).forEach(function (key) {
                                    let subMktArray = subMktItems[key].split(/-(.+)?/); // Split by first occurrence of '-'; eg: 2-Nomu-Parallel Market

                                    if (allowedSubMktsByExg.length === 0 || allowedSubMktsByExg.contains(subMktArray[0])) {
                                        let subMktObj = sharedService.getService('price').subMarketDS.getSubMarket(exchangeCode, subMktArray[0]);
                                        let subMarketObjKey = utils.keyGenerator.getKey(exchangeCode, subMktArray[0]);
                                        subMktObj.marketId = subMktArray[0];
                                        subMktObj.lDes = subMktArray[1];
                                        subMktObj.def = subMktArray[0] === defSubMkt ? '1' : '0';
                                        subMktObj.exg = exchangeCode;

                                        // if (!existingSubMarkt[subMarketObjKey]) {
                                        //     subMarkettFinalObj[subMarketObjKey] = subMktObj;
                                        //     subMarkettFinalObjByExg[exchangeCode] = subMktObj;
                                        // } else {
                                        //     existingSubMarkt[subMarketObjKey] = subMktObj;
                                        //     existingSubMarktByExg[exchangeCode] = subMktObj;
                                        // }

                                    }
                                });

                                // let newSUbMkt = Object.assign({}, existingSubMarkt, subMarkettFinalObj );
                                // let newSUbMktByExg = Object.assign({}, existingSubMarktByExg, subMarkettFinalObjByExg );
                                // reduxStore.store.dispatch(saveSubMarket(newSUbMkt));
                                // reduxStore.store.dispatch(saveSubMarketByExg(newSUbMktByExg));
                            } catch (e) {
                                utils.logger.logDebug('Sub market processing failed : ' + e);
                            }
                            // }
                        }

                        // This will set sub market array with zero items if market does not have sub markets
                        // Market data subscription is being sent based on this logic
                        // Therefore it is required not to have sub market array undefined
                        if (!existingObj.subMarketArray) {
                            existingObj.subMarketArray = sharedService.getService('price').subMarketDS.getSubMarketCollectionByExchange(exchangeCode);
                        }


                        // if (!existingExchange[exchangeCode]) {
                        //     exchangeObjects[exchangeCode] = existingObj;
                        // }else {
                        //     existingStockObj[exchangeCode] = existingObj;
                        //     existingExchange[exchangeCode] = existingObj;
                        // }

                        // if (!existingStockObj[objectKey]) {
                        //     stockObject[objectKey] = stockObj;
                        // }else {
                        //     existingStockObj[objectKey] = stockObj;
                        // }
                        // console.log('sssssssssssssss>>>>>>>>>>>>> ', stockObj)
                    });



                    // let newExchangeToStore = Object.assign({}, existingExchange, exchangeObjects );
                    // reduxStore.store.dispatch(saveExchange(newExchangeToStore));

                    // let newStocksToStore = Object.assign({}, existingStockObj, stockObject );

                    // reduxStore.store.dispatch(saveStock(newStocksToStore));
                    // reduxStore.store.dispatch(isStockUpdated(true))

                }
            } catch (e) {
                utils.logger.logError('Error in processing exchange, stock and sub market response : ' + e);
            }

            sharedService.getService('price').onPriceExchangeSummaryMetaReady();

            if (callback && callback instanceof Function) {
                callback();
            }
        }
    };

    const processFairValueHistoricalPriceResponse = function (dataObj) {
        try {
            if (dataObj && dataObj.DAT && dataObj.HED) {
                // Update data stores
               let headerFields = ['SYMBOL', 'EXCHANGE', 'LANGUAGE_CODE', 'TICKER_SERIAL', 'COMPANY_ID', 'FAIR_VALUE', 'ACTUAL_VALUE', 'FV_DATE', 'FV_SOURCE_NAME', 'DOC_ID', 'FV_RATING_ID', 'FV_RATING_NAME', 'INDIVIDUAL_ID_LIST', 'FV_RATING_SCORE', 'REPORT_DATE', 'ADJUSTED_FAIR_VALUE'];
               let fvHedIdxList = _getHeaderIndexList(dataObj.HED.CDS.FRVL, headerFields);


                let dataArry = dataObj.DAT.CDS.FRVL;

                Object.keys(dataObj).forEach(function (key) {
                    let dtArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                    let symbolCode = dtArray[fvHedIdxList.SYMBOL];
                    let exchangeCode = dtArray[fvHedIdxList.EXCHANGE];
                    let companyId = dtArray[fvHedIdxList.COMPANY_ID];
                    let fvObj = sharedService.getService('price').fairValueDS.getFairValue(exchangeCode, symbolCode, companyId);

                    if (fvObj) {
                        fvObj.setData({
                            fv: parseFloat(dtArray[fvHedIdxList.FAIR_VALUE]),
                            av: parseFloat(dtArray[fvHedIdxList.ACTUAL_VALUE]),
                            date: dtArray[fvHedIdxList.FV_DATE],
                            source: utils.formatters.convertUnicodeToNativeString(dtArray[fvHedIdxList.FV_SOURCE_NAME]),
                            docId: dtArray[fvHedIdxList.DOC_ID],
                            ratingId: dtArray[fvHedIdxList.FV_RATING_ID],
                            ratingName: utils.formatters.convertUnicodeToNativeString(dtArray[fvHedIdxList.FV_RATING_NAME]),
                            individualIdList: dtArray[fvHedIdxList.INDIVIDUAL_ID_LIST],
                            ratingScore: parseInt(dtArray[fvHedIdxList.FV_RATING_SCORE], 10),
                            reportDate: dtArray[fvHedIdxList.REPORT_DATE],
                            adjustedFv: parseFloat(dtArray[fvHedIdxList.ADJUSTED_FAIR_VALUE]),
                            lnCode: dtArray[fvHedIdxList.LANGUAGE_CODE],
                            ticketSerial: dtArray[fvHedIdxList.TICKER_SERIAL]
                        });
                    }
                });
            }
        } catch (e) {
            utils.logger.logError('Error in processing fair value historical price response : ' + e);
        }
    };

    const processFairValueReportResponse = function (dataObj) {
        try {
            if (dataObj && dataObj.DAT && dataObj.HED) {
                let headerField = ['FILE_GUID'];
                let fvHedIdxList = _getHeaderIndexList(dataObj.HED.DS.FILE, headerField);
                let dtArray = dataObj.DAT.DS.FILE[0].split(utils.Constants.StringConst.Pipe);

                return dtArray[fvHedIdxList.FILE_GUID];
            }
        } catch (e) {
            utils.logger.logError('Error in processing fair value report response : ' + e);
        }
    };

    const processCorporateActionResponse = function (dataObj) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                let corporateActionArray = [];

                if (dataObj.DAT.CDS.CPAC) {
                    let headerFields = ['EXCHANGE', 'SYMBOL', 'CURRENCY', 'ANNOUNCE_DATE', 'EFFECTIVE_DATE',
                        'COMPLETION_DATE', 'DIVIDEND_AMOUNT', 'CORP_ACT_TYPE', 'ACTION_TYPE_NAME', 'SPLIT_FACTOR',
                        'ACTION_ID'];
                    let symHedIdxList = _getHeaderIndexList(dataObj.HED.CDS.CPAC, headerFields);

                    let dataArry = dataObj.DAT.CDS.CPAC;
                    Object.keys(dataArry).forEach(function (key) {
                        let dtArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                        let actionId = dtArray[symHedIdxList.ACTION_ID];
                        let symbolCode = dtArray[symHedIdxList.SYMBOL];
                        let corporateActObj = sharedService.getService('price').corporateActionDS.getCorporateAction(actionId);
                        let exDividendDateObj = utils.formatters.convertStringToDate(dtArray[symHedIdxList.EFFECTIVE_DATE]);

                        corporateActObj.setData({
                            sym: symbolCode,
                            exDividendDateObj: exDividendDateObj,
                            chg: dtArray[symHedIdxList.EXCHANGE],
                            annDate: dtArray[symHedIdxList.ANNOUNCE_DATE],
                            exdvDate: dtArray[symHedIdxList.EFFECTIVE_DATE],
                            pmntDate: dtArray[symHedIdxList.COMPLETION_DATE],
                            curr: dtArray[symHedIdxList.CURRENCY],
                            dividendAmount: dtArray[symHedIdxList.DIVIDEND_AMOUNT],
                            actionType: dtArray[symHedIdxList.CORP_ACT_TYPE],
                            actionNameUni: dtArray[symHedIdxList.ACTION_TYPE_NAME],
                            spltFctr: dtArray[symHedIdxList.SPLIT_FACTOR]
                        });

                        corporateActionArray[corporateActionArray.length] = corporateActObj;
                    });
                }

                return corporateActionArray;
            }
        } catch (e) {
            utils.logger.logError('Error in processing CorporateAction response : ' + e);
        }
    };

    const processVolumeWatcherResponse = function (dataObj) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                let dtArray, symbolCode, exchangeCode, instrumentType, stockObj, symHedIdxList, headerFields;

                if (dataObj.DAT.VW) {

                    headerFields = ['E', 'INS', 'S', 'SDES', 'LTP', 'PCHG', 'VOL', 'AV5D', 'AV7D', 'AV30D', 'AV90D', 'PAV5D', 'PAV7D', 'PAV30D', 'PAV90D'];
                    symHedIdxList = _getHeaderIndexList(dataObj.HED.VW, headerFields);

                    let dataArry = dataObj.DAT.VW;

                    Object.keys(dataArry).forEach(function (key) {
                        dtArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                        symbolCode = dtArray[symHedIdxList.S];
                        exchangeCode = dtArray[symHedIdxList.E];
                        instrumentType = parseInt(dtArray[symHedIdxList.INS], 10);
                        stockObj = sharedService.getService('price').stockDS.getStock(exchangeCode, symbolCode, instrumentType);

                        stockObj.setData({
                            av5d: parseFloat(dtArray[symHedIdxList.AV5D])
                        });
                    });
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing Volume Watcher response : ' + e);
        }
    };

    const processOptionChainResponse = function (dataObj, paramExg, paramSym, callbackFn) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                if (dataObj.DAT.OL && dataObj.HED.OL) {
                    let listHedFields = ['E', 'S', 'OPM', 'OPE', 'OW'];
                    let listHedIdxList = _getHeaderIndexList(dataObj.HED.WOL, listHedFields);
                    let periods = dataObj.DAT.WOL ? dataObj.DAT.OL.concat(dataObj.DAT.WOL) : dataObj.DAT.OL;

                    Object.keys(periods).forEach(function (key) {
                       let dataArray = periods[key].split(utils.Constants.StringConst.Pipe);
                       let trdExchange = dataArray[listHedIdxList.E];
                       let baseSymbol = dataArray[listHedIdxList.S];
                       let optPeriod = dataArray[listHedIdxList.OPM];
                       let optPeriodObj = sharedService.getService('price').optionPeriodDS.getOptionPeriod(trdExchange, baseSymbol, optPeriod);

                        optPeriodObj.setData({
                            optExg: dataArray[listHedIdxList.OPE],
                            optWeek: dataArray[listHedIdxList.OW]
                        });
                    });
                }

                _processOptionSymbolList(dataObj, paramExg, paramSym, callbackFn, 'OS');
                _processOptionSymbolList(dataObj, paramExg, paramSym, callbackFn, 'WOS');
            }
        } catch (e) {
            utils.logger.logError('Error in processing option chain response : ' + e);
        }
    };

    const processOptionListResponse = function (dataObj, paramExg, paramSym, callbackFn, responseTag) {
        try {
            _processOptionSymbolList(dataObj, paramExg, paramSym, callbackFn, responseTag);
        } catch (e) {
            utils.logger.logError('Error in processing option chain response : ' + e);
        }
    };

    const processFinancialResponse = function (dataObj, exg, sym, secondSymAdded, primarySymbol, secondarySymbol, periodType, callbackFn) {
        let financialType = ['FR', 'MR', 'IS', 'BS', 'CF'];

        try {
            if (dataObj.DAT && dataObj.HED && dataObj.STYLE) {

                Object.keys(financialType).forEach(function (key) {
                    _addFinancialRatiosToCollection(dataObj, exg, sym, financialType[key], secondSymAdded, periodType);
                });

                if (secondSymAdded) {
                    sharedService.getService('price').financialDS.getCompareSymbolCollection(exg, primarySymbol, secondarySymbol, periodType);
                }

                if (callbackFn) {
                    callbackFn();
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing financials and ratios response : ' + e);
        }
    };

    //
    // Symbol Closing Price Requests
    //
    // TODO: [Champaka] need to be refactored
    const processClosingPriceResponse = function (dataObj, callbackFn) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                let headerArray, exg, sym, priceObj;

                if (dataObj.DAT.SYM && dataObj.HED.SYM) {

                    let dataArry = dataObj.DAT.SYM;
                    Object.keys(dataArry).forEach(function (key) {

                        let subDataArry = dataArry[key].HIS;
                        Object.keys(subDataArry).forEach(function (key) {

                            headerArray = dataArry[key].S.split(utils.Constants.StringConst.Comma);
                            exg = headerArray[0];
                            sym = headerArray[1];

                            let date = new Date(subDataArry[key][0] * 1000).toISOString().slice(0, 10);

                            // if (sym === priceSettings.configs.defaultIndex) {
                            //     if (dataArry[key].HIS) {
                            //         priceObj = sharedService.getService('price').portfolioDS.getClosePrice(exg, sym);
                            //         priceObj.setData(dataArry[key].HIS);

                            //         priceObj.dateArray.pushObject(date);
                            //     }
                            // } else {
                            //     sharedService.getService('price').portfolioDS.getSymClosePrice(exg, sym, date, subDataArry[key][1]);
                            // }
                        });
                    });

                    if (callbackFn) {
                        callbackFn();
                    }
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing symbol close price response : ' + e);
        }
    };

    //
    // Book Shelf Requests
    //
    const processBookShelfResponse = function (dataObj, callback) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                let bookShelfObj, bookHedIdxList, bookArray, headerFields, bookId, bookCategory;

                if (dataObj.DAT.BOOK_SHELF_DATA) {
                    sharedService.getService('price').bookShelfDS.clearBookCollection();
                    headerFields = ['TITLE', 'ID', 'URL', 'DATE', 'CATEGORY', 'IMG'];
                    bookHedIdxList = _getHeaderIndexList(dataObj.HED.BOOK_SHELF_DATA, headerFields);

                    let dataArry = dataObj.DAT.BOOK_SHELF_DATA;
                    Object.keys(dataArry).forEach(function (key) {

                        bookArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                        bookId = bookArray[bookHedIdxList.ID];
                        bookCategory = bookArray[bookHedIdxList.CATEGORY];

                        bookShelfObj = sharedService.getService('price').bookShelfDS.getBookShelf(bookId, bookCategory);

                        bookShelfObj.setData({
                            id: bookArray[bookHedIdxList.ID],
                            title: bookArray[bookHedIdxList.TITLE],
                            url: bookArray[bookHedIdxList.URL],
                            date: bookArray[bookHedIdxList.DATE],
                            category: bookArray[bookHedIdxList.CATEGORY],
                            img: bookArray[bookHedIdxList.IMG]
                        });
                    });
                }

                if (callback && callback instanceof Function) {
                    callback();
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing book shelf response : ' + e);
        }
    };

    const processSpecialTrades = function (dataObj, callback) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                let dtArray, exchangeCode, trdObj, tsHedIdxList, headerFields;

                exchangeCode = dataObj.DAT.E;

                if (dataObj.DAT.TS) {
                    sharedService.getService('price').specialTradesDS.clearSpecialTradesCollection();
                    headerFields = ['S', 'TT', 'INS', 'LTP', 'TQ', 'CHG', 'PCHG', 'TYPE', 'SPL', 'SNO', 'VWAP', 'ETT'];
                    tsHedIdxList = _getHeaderIndexList(dataObj.HED.TS, headerFields);


                    let dataArry = dataObj.DAT.TS;
                    Object.keys(dataArry).forEach(function (key) {
                        dtArray = dataArry[key].split(utils.Constants.StringConst.Pipe);

                        let sym = dtArray[tsHedIdxList.S];
                        let seq = parseInt(dtArray[tsHedIdxList.SNO], 10);

                        trdObj = sharedService.getService('price').specialTradesDS.getSpecialTrade(sym, exchangeCode, seq);

                        if (trdObj) {
                            trdObj.setData({
                                sym: sym,
                                exg: exchangeCode,
                                tts: dtArray[tsHedIdxList.TT],
                                inst: dtArray[tsHedIdxList.INS],
                                trp: parseFloat(dtArray[tsHedIdxList.LTP]),
                                trq: parseInt(dtArray[tsHedIdxList.TQ], 10),
                                nChg: parseFloat(dtArray[tsHedIdxList.CHG]),
                                pctChg: parseFloat(dtArray[tsHedIdxList.PCHG]),
                                seq: seq,
                                trdType: dtArray[tsHedIdxList.TYPE],
                                vwap: parseFloat(dtArray[tsHedIdxList.VWAP]),
                                isEmpty: false
                            });


                            let prevTradeObj = sharedService.getService('price').specialTradesDS.getLastTrade(sym, exchangeCode);

                            if (prevTradeObj) {
                                trdObj.setTradeTick(prevTradeObj.trp);
                            }

                            sharedService.getService('price').specialTradesDS.setLastTrade(sym, exchangeCode, trdObj);
                        }
                    });
                }

                if (callback && callback instanceof Function) {
                    callback();
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing symbol validation response : ' + e);
        }
    };

    // Transaction Menu Response
    const processTransMenuResponse = function (dataObj, callback) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                let totalBuyVal = 0, totalSellVal = 0, cusGrpHedIdxList, cusGrpArray, headerFields, cusGrpEngName, date,
                    arabGrpName, buyVal, sellVal;

                if (dataObj.DAT.MSM_DATA) {
                    sharedService.getService('price').transactionMenuDS.clearCustomerGrpCollection();

                    headerFields = ['Date', 'ArabGrpName', 'EngGrpName', 'BuyVal', 'SellVal'];
                    cusGrpHedIdxList = _getHeaderIndexList(dataObj.HED.MSM_DATA, headerFields);

                    let dataArry = dataObj.DAT.MSM_DATA;

                    Object.keys(dataArry).forEach(function (key) {
                        cusGrpArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                        cusGrpEngName = cusGrpArray[cusGrpHedIdxList.EngGrpName];

                        if (cusGrpEngName !== 'NON-OMANIS') {
                            date = cusGrpArray[cusGrpHedIdxList.Date];
                            buyVal = parseInt(cusGrpArray[cusGrpHedIdxList.BuyVal]);
                            sellVal = parseInt(cusGrpArray[cusGrpHedIdxList.SellVal]);
                            arabGrpName = cusGrpArray[cusGrpHedIdxList.ArabGrpName];

                            totalBuyVal = totalBuyVal + buyVal;
                            totalSellVal = totalSellVal + sellVal;

                            sharedService.getService('price').transactionMenuDS.getCustomerGroup(cusGrpEngName, date, arabGrpName, buyVal, sellVal);
                        }
                    });

                    sharedService.getService('price').transactionMenuDS.setPercentageValues(totalBuyVal, totalSellVal);
                }

                if (callback && callback instanceof Function) {
                    callback();
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing book shelf response : ' + e);
        }
    };

    //
    // User Registration Response
    //
    const processUserRegistrationResponse = function (dataObj) {
        try {
            if (dataObj) {
                let registrationObj = sharedService.getService('price').registrationDS.getRegistration();

                if (registrationObj) {
                    registrationObj.regDetailSts = dataObj.ERRORCODE;
                    registrationObj.regDetailStsMsg = dataObj.ERRORDES;
                }
            }
        } catch (e) {
            utils.logger.logError('Error in User Registration response : ' + e);
        }
    };

    const onError = function (error) {
        utils.logger.logError('Error while MIX request/response handling: ' + error);
    };

    //
    // Private functions
    //
    const _processOptionSymbolList = function (dataObj, paramExg, paramSym, callbackFn, responseTag) {
        if (dataObj.DAT && dataObj.HED) {
            if (dataObj.DAT[responseTag] && dataObj.HED[responseTag]) {
                let entityList = [];
                let symHedFields = ['E', 'S', 'OPM', 'OPE', 'SP', 'CS', 'PS', 'NMON', 'OW'];
                let symHedIdxList = _getHeaderIndexList(dataObj.HED[responseTag], symHedFields);

                let dataArry = dataObj.DAT[responseTag];
                Object.keys(dataArry).forEach(function (key) {
                    let dataArray = dataArry[key].split(utils.Constants.StringConst.Pipe);

                    entityList[entityList.length].setData({
                        sym: dataArray[symHedIdxList.S],
                        exg: dataArray[symHedIdxList.E],
                        optPrd: dataArray[symHedIdxList.OPM],
                        strkPrc: dataArray[symHedIdxList.SP],
                        nearMon: dataArray[symHedIdxList.NMON],
                        optWeek: dataArray[symHedIdxList.OW],
                        cSym: dataArray[symHedIdxList.CS],
                        pSym: dataArray[symHedIdxList.PS],
                        optExg: dataArray[symHedIdxList.OPE]
                    });
                });

                sharedService.getService('price').optionStockDS.setOptionStockEntityList(entityList);
            }

            let defaultPeriod = sharedService.getService('price').optionStockDS.getDefaultOptionPeriod(paramExg, paramSym);
            callbackFn(defaultPeriod);
        }
    };

    const _getHeaderIndexList = function (headerObj, headerFields) {
        // eslint-disable-next-line no-extend-native
        Array.prototype.indicesOf = function (items, start) {
            let indexList = {}, arrIndex, i, count = 0;

            for (i = (start || 0); i < this.length; i++) {
                arrIndex = items.indexOf(this[i]);

                if (arrIndex !== -1) {
                    count++;
                    indexList[items[arrIndex]] = i;
                    items.splice(arrIndex, 1);
                }

                if (items.length === 0) {
                    break;
                }
            }

            indexList._count = count;

            return indexList;
        };
        return headerObj ? headerObj.split(utils.Constants.StringConst.Pipe).indicesOf(headerFields) : undefined;
    };

    const _setLastTrade = function (lastTrade, tradeObj) {
        let lastTradeObj = lastTrade;

        if (!lastTradeObj) {
            lastTradeObj = tradeObj;
        }

        if (lastTradeObj.seq >= tradeObj.seq) {
            lastTradeObj = tradeObj;
        }

        return lastTradeObj;
    };

    const _updateExchangeMetadata = function (property, dataObj, exchangeCode, metaData) {
        metaData[exchangeCode].DAT.SRC[property] = dataObj.DAT.SRC[property];
        metaData[exchangeCode].HED.SRC[property] = dataObj.HED.SRC[property];
    };

    const _formatTimeZoneOffset = function (offset) {
        // offset ex: 5, 5.0, 5.00, 5.5, 5.50, 5.3, 5.30
        let offsetFormatted = 0;

        if (utils.validators.isAvailable(offset)) {
            if (offset.indexOf(utils.Constants.StringConst.Dot) >= 0) {
                let offsetArray = offset.split(utils.Constants.StringConst.Dot);

                if (offsetArray.length === 2) {
                    let hourPart = parseInt(offsetArray[0], 10);
                    let minuteString = offsetArray[1];
                    let divider = (minuteString === '3' || minuteString === '30') ? 6 : 10; // ex: 30/60, 3/6, 50/100, 5/10, 0/10 or 00/100

                    divider = divider * Math.pow(10, minuteString.length - 1);
                    offsetFormatted = hourPart + (parseInt(minuteString, 10) / divider);
                }
            } else {
                offsetFormatted = parseInt(offset, 10); // ex: 5
            }
        }

        return offsetFormatted;
    };

    const _addNewsAnnToCollection = function (idList, id, annCollection, annObj) {
        let currentIndex = idList.indexOf(id);

        if (currentIndex >= 0) {
            annCollection[currentIndex] = annObj;
        } else {
            annCollection.pushObject(annObj);
            idList[idList.length] = id;
        }
    };

    const _addFinancialRatiosToCollection = function (dataObj, exg, sym, statement, secondSymAdded, periodType) {
        let headerList, financialHeaders, finHedIdxList, dtArray, styleArray, styleList, styleHeader, financialObj,
            year, quater;

        if (dataObj.DAT.COMPFIN.QTR[statement]) {
            headerList = dataObj.HED.COMPFIN.QTR[statement];
            financialHeaders = headerList.split(utils.Constants.StringConst.Pipe);
            styleArray = dataObj.STYLE.COMPFIN.QTR[statement].split(utils.Constants.StringConst.Pipe);
            finHedIdxList = _getHeaderIndexList(headerList, financialHeaders);


            let dataArry = dataObj.DAT.COMPFIN.QTR[statement];
            Object.keys(dataArry).forEach(function (key) {

                dtArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                year = dtArray[finHedIdxList.DUR_YEAR];
                quater = dtArray[finHedIdxList.QUARTER_REQUESTED];

                Object.keys(finHedIdxList).forEach(function (key) {
                    let periodKey = periodType === PriceConstants.MixRequest.FinancialRatios.A ? year : [year, quater].join('-');
                    let styleKey = finHedIdxList[finHedIdxList[key]];
                    let comma = utils.Constants.StringConst.Comma;

                    styleHeader = styleArray[styleKey];

                    if (styleHeader && styleHeader.indexOf(comma)) {
                        let commaIndex = styleHeader.indexOf(comma);
                        styleList = [styleHeader.substring(0, commaIndex), styleHeader.substring(commaIndex + 1)];
                    }

                    if (styleList && styleList.length > 1 && styleList[0] !== '0') {
                        if (statement === 'MR') {
                            financialObj = sharedService.getService('price').financialDS.getFinancial(exg, sym, 'FR', finHedIdxList[key], secondSymAdded, periodType);
                        } else {
                            financialObj = sharedService.getService('price').financialDS.getFinancial(exg, sym, statement, finHedIdxList[key], secondSymAdded, periodType);
                        }

                        financialObj.setData({
                            name: key,
                            [periodKey]: dtArray[key] || sharedService.userSettings.displayFormat.noValue,
                            indent: styleList[0],
                            description: styleList[1]
                        });

                        financialObj.keyArray.push(periodKey);
                        financialObj.valueArray.push(dtArray[finHedIdxList[key]]);
                    }
                });
            });

        }
    };

    const _getAllowedSubMktsByExchange = function (exchangeCode) {
        let allowedSubMarkets = AppConfig.customisation.allowedSubMarkets;
        let allowedSubMktsByExg = [];

        if (allowedSubMarkets && allowedSubMarkets[exchangeCode]) {
            allowedSubMktsByExg = allowedSubMarkets[exchangeCode];
        }

        return allowedSubMktsByExg;
    };

    // const processLoginIndexPanelResponse = function (dataObj, callBackFunc) {
    //     try {
    //         if (dataObj.DAT && dataObj.HED) {
    //             var dataArray, indexPanelHedIdxList, exchange, headerFields, symbol, lastTradePrice, change, pChange;
    //
    //             if (dataObj.DAT.SS) {
    //                 headerFields = ['E', 'S', 'LTP', 'CHG', 'PCHG'];
    //                 indexPanelHedIdxList = _getHeaderIndexList(dataObj.HED.SS, headerFields);
    //                 dataArray = dataObj.DAT.SS[0].split(utils.Constants.StringConst.Pipe);
    //
    //                 exchange = dataArray[indexPanelHedIdxList.E];
    //                 symbol = dataArray[indexPanelHedIdxList.S];
    //                 lastTradePrice = dataArray[indexPanelHedIdxList.LTP];
    //                 change = dataArray[indexPanelHedIdxList.CHG];
    //                 pChange = dataArray[indexPanelHedIdxList.PCHG];
    //
    //                 var indexData = {
    //                     exg: exchange,
    //                     sym: symbol,
    //                     ltd: lastTradePrice,
    //                     chg: change,
    //                     pchg: pChange
    //                 };
    //
    //                 var indexObj = sharedService.getService('price').stockDS.getStock(indexData.exg, indexData.sym, utils.AssetTypes.Indices);
    //
    //                 if (indexObj !== null) {
    //                     indexObj.setData(indexData);
    //                 }
    //
    //                 callBackFunc(indexData);
    //             }
    //         }
    //     } catch (e) {
    //         utils.logger.logError('Error in processing index panel data response : ' + e);
    //     }
    // };

    const processLoginIndexPanelResponse = function (dataObj, callBackFunc) {
        let priceService = sharedService.getService('price');
        try {
            if (dataObj.DAT && dataObj.HED) {
                let indexDataObj = {};
                let dataArray, indexPanelHedIdxList;

                if (dataObj.HED.SECI && dataObj.DAT.SECI && dataObj.DAT.SECI.length > 0) {
                    let indexPanelSecHedIdxList, secIndicesArray, indexObj, headerFields, change, pChange, exchange,
                        symbol, lastTradePrice, value, volume;

                    headerFields = ['E', 'S', 'NCHG', 'PCHG', 'TOVR', 'VOL', 'IDX'];
                    indexPanelSecHedIdxList = _getHeaderIndexList(dataObj.HED.SECI, headerFields);


                    let dataArry = dataObj.DAT.SECI;
                    Object.keys(dataArry).forEach(function (key) {
                        secIndicesArray = dataArry[key].split(utils.Constants.StringConst.Pipe);

                        exchange = secIndicesArray[indexPanelSecHedIdxList.E];
                        symbol = secIndicesArray[indexPanelSecHedIdxList.S];
                        lastTradePrice = secIndicesArray[indexPanelSecHedIdxList.IDX];
                        change = secIndicesArray[indexPanelSecHedIdxList.NCHG];
                        pChange = secIndicesArray[indexPanelSecHedIdxList.PCHG];
                        value = secIndicesArray[indexPanelSecHedIdxList.TOVR];
                        volume = secIndicesArray[indexPanelSecHedIdxList.VOL];

                        let indexData = {
                            exg: exchange,
                            sym: symbol,
                            ltd: lastTradePrice,
                            chg: change,
                            pchg: pChange,
                            vol: volume,
                            tovr: value
                        };

                        indexObj = sharedService.getService('price').stockDS.getStock(exchange, symbol, utils.AssetTypes.Indices);

                        if (indexObj !== null) {
                            indexObj = indexData;
                        }
                    });
                }

                if (dataObj.HED.MS && dataObj.DAT.MS && dataObj.DAT.MS.length > 0) {
                    let exchangeObj, headerFieldsMS;

                    headerFieldsMS = ['E', 'STAT', 'TIM'];
                    indexPanelHedIdxList = _getHeaderIndexList(dataObj.HED.MS, headerFieldsMS);

                    let dataArry = dataObj.DAT.MS;
                    Object.keys(dataArry).forEach(function (key) {
                        dataArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                        exchangeObj = priceService.exchangeDS.getExchange(dataArray[indexPanelHedIdxList.E]);

                        exchangeObj.setData({
                            exg: dataArray[indexPanelHedIdxList.E],
                            stat: dataArray[indexPanelHedIdxList.STAT],
                            mktDateTime: dataArray[indexPanelHedIdxList.TIM]
                        });
                    });

                }

                indexDataObj.exg = dataArray[indexPanelHedIdxList.E];
                indexDataObj.stat = dataArray[indexPanelHedIdxList.E];
                indexDataObj.mktDateTime = dataArray[indexPanelHedIdxList.E];

                callBackFunc();
            }
        } catch (e) {
            utils.logger.logError('Error in processing index panel data response : ' + e);
        }
    };

    const processInvestmentIdResponse = function (dataObj, exchange, callbackFn) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                let investorId, investorsObj, investorsHedIdxList, investorsArray, headerFields;

                if (dataObj.DAT.INVESTORS && dataObj.DAT.INVESTORS.length > 0) {
                    headerFields = ['NIN', 'TYPE', 'ID'];
                    investorsHedIdxList = _getHeaderIndexList(dataObj.HED.INVESTORS, headerFields);

                    let dataArry = dataObj.DAT.INVESTORS;
                    Object.keys(dataArry).forEach(function (key) {
                        investorsArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                        investorId = investorsArray[investorsHedIdxList.ID];
                        investorsObj = sharedService.getService('price').investorsDS.getInvestors(exchange, investorId);

                        investorsObj.setData({
                            investId: investorsArray[investorsHedIdxList.ID],
                            investKey: investorsArray[investorsHedIdxList.NIN],
                            type: investorsArray[investorsHedIdxList.TYPE]
                        });
                    });
                }

                if (callbackFn) {
                    callbackFn();
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing investors response : ' + e);
        }
    };

    const processInvestorPortfolioResponse = function (dataObj, investId, callbackFn) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                let symbol, investorsObj, portfolioHedIdxList, portfolioArray, headerFields;

                if (dataObj.DAT.INVESTORS_PORTFOLIO) {
                    headerFields = ['SYM', 'NOFS', 'MV', 'AC', 'CV', 'ENGNA', 'ARBNA', 'DSYM', 'BROENG', 'BROARB', 'BID', 'GLP', 'GL'];
                    portfolioHedIdxList = _getHeaderIndexList(dataObj.HED.INVESTORS_PORTFOLIO, headerFields);

                    let dataArry = dataObj.DAT.INVESTORS_PORTFOLIO;
                    Object.keys(dataArry).forEach(function (key) {

                        portfolioArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                        symbol = portfolioArray[portfolioHedIdxList.SYM];
                        investorsObj = sharedService.getService('price').investorsDS.getPortfolio(investId, symbol);

                        investorsObj.setData({
                            noOfShares: portfolioArray[portfolioHedIdxList.NOFS],
                            marketValue: portfolioArray[portfolioHedIdxList.MV],
                            avgCost: portfolioArray[portfolioHedIdxList.AC],
                            engName: portfolioArray[portfolioHedIdxList.ENGNA],
                            arName: portfolioArray[portfolioHedIdxList.ARBNA],
                            costValue: portfolioArray[portfolioHedIdxList.CV],
                            dSym: portfolioArray[portfolioHedIdxList.DSYM],
                            broker: portfolioArray[portfolioHedIdxList.BROENG],
                            company: portfolioArray[portfolioHedIdxList.BROENG],
                            brokerArb: portfolioArray[portfolioHedIdxList.BROARB],
                            brokerId: portfolioArray[portfolioHedIdxList.BID],
                            gainLossPerc: portfolioArray[portfolioHedIdxList.GLP],
                            gainLoss: portfolioArray[portfolioHedIdxList.GL]
                        });
                    });
                }

                if (callbackFn) {
                    callbackFn();
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing investor profile response : ' + e);
        }
    };

    const processCDVAndYTDPUrlResponse = function (dataObj, callbackFn) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                let exchange, symbol, stockObj, CDVHedIdxList, CDVArray, headerFields;

                if (dataObj.DAT.SS) {
                    headerFields = ['E', 'INS', 'S', 'LTP', 'PCP', 'CHG', 'PCHG', 'BBP', 'BBQ', 'BAP', 'BAQ', 'VOL', 'NOT', 'HIG', 'LOW', 'REFP', 'MIN', 'MAX', 'TDO', 'CIT', 'COT', 'TBQ', 'TAQ', 'MCAP', 'EPS', 'PS', 'AV5D', 'AV7D', 'LTQ', 'LTT', 'LTD', 'PER', 'TRT', 'TDC', 'VWAP', 'LTDP', 'OPI', 'SST', 'LSCT', 'SHRST', 'TOP', 'TOV', 'TCP', 'TCV', 'CVWAP', 'TWAP', 'ADJINVAL', 'YTDP'];
                    CDVHedIdxList = _getHeaderIndexList(dataObj.HED.SS, headerFields);

                    let dataArry = dataObj.DAT.SS;
                    Object.keys(dataArry).forEach(function (key) {

                        CDVArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                        exchange = CDVArray[CDVHedIdxList.E];
                        symbol = CDVArray[CDVHedIdxList.S];
                        stockObj = sharedService.getService('price').stockDS.getStock(exchange, symbol);

                        stockObj.setData({
                            cdv: CDVArray[CDVHedIdxList.VOL],
                            ytdp: CDVArray[CDVHedIdxList.YTDP]
                        });
                    });
                }
            }

            if (callbackFn) {
                callbackFn();
            }
        } catch (e) {
            utils.logger.logError('Error in processing Current Daily Volume and Beta response : ' + e);
        }
    };

    const processBetaResponse = function (dataObj, callbackFn) {
        try {
            if (dataObj.DAT && dataObj.HED && dataObj.DAT.COMP) {
                let exchange, symbol, stockObj, betaHedIdxList, betaArray, headerFields;

                if (dataObj.DAT.COMP[0]) {
                    headerFields = ['E', 'INS', 'S', 'HD52', 'LD52', 'YTDP', 'AT7D', 'AT30D', 'AV7D', 'AV30D', 'H52', 'L52', 'MCAP', 'PER', 'EPS', 'OSS', 'BT', 'MA50D', 'MA200D', 'CFR7', 'LTP', 'AV5D', 'AT5D'];
                    betaHedIdxList = _getHeaderIndexList(dataObj.HED.COMP, headerFields);

                    betaArray = (dataObj.DAT.COMP[0]).split(utils.Constants.StringConst.Pipe);
                    exchange = betaArray[betaHedIdxList.E];
                    symbol = betaArray[betaHedIdxList.S];
                    stockObj = sharedService.getService('price').stockDS.getStock(exchange, symbol);

                    stockObj.setData({
                        beta: betaArray[betaHedIdxList.BT]
                    });
                }
            }

            if (callbackFn) {
                callbackFn();
            }
        } catch (e) {
            utils.logger.logError('Error in processing Beta response : ' + e);
        }
    };

    const processFundamentalScoreResponse = function (dataObj) {
        try {
            if (dataObj.DAT && dataObj.HED) {
                let exchangeCode = dataObj.DAT.E;

                if (dataObj.DAT.SYM) {

                    let dataArry = dataObj.DAT.SYM;
                    Object.keys(dataArry).forEach(function (key) {
                        let scoreArray = dataArry[key].HIS;
                        let symbolCode = dataArry[key].S;
                        let stockObj = sharedService.getService('price').stockDS.getStock(exchangeCode, symbolCode);

                        if (stockObj && scoreArray.length > 1) {
                            stockObj.setData({
                                fs1d: scoreArray[1][1],
                                fs2d: scoreArray[0][1]
                            });
                        }
                    });

                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing Fundamental Score response : ' + e);
        }
    };

    const processTechnicalScoreResponse = function (dtObj, chartCategory, reqSuccessFn, reqFailureFn) {
        try {
            if (dtObj.DAT && dtObj.HED && dtObj.HED.HIS) {
                let signalsList = PriceWidgetConfig.techScore.techScoreConfig.signals;
                let symHedIdxList = dtObj.HED.S.split(utils.Constants.StringConst.Comma).indicesOf(['E', 'S']);
                let symInfo = dtObj.DAT.S.split(utils.Constants.StringConst.Comma);
                let priceService = sharedService.getService('price');
                let sym = symInfo[symHedIdxList.S];
                let exg = symInfo[symHedIdxList.E];
                let signalObj, dataIdxList, pt, date;

                dataIdxList = dtObj.HED.HIS.split(utils.Constants.StringConst.Comma).indicesOf(
                    ['DT', 'TECH_SCORE', 'SIG_BB', 'SIG_MACD', 'SIG_WILLR', 'SIG_CHKNMF', 'SIG_PXROC', 'SIG_PABSAR', 'SIG_CHKOSC', 'SIG_CHNOSC', 'SIG_CMDOCH', 'SIG_DEMA', 'SIG_RSI', 'SIG_FASTO', 'SIG_IMNTM', 'SIG_MOMNT', 'SIG_MF', 'SIG_MVAVG', 'SIG_PXOSC', 'SIG_QSTIC', 'SIG_RLTMNT', 'SIG_RLTSTR', 'SIG_RLTVOL', 'SIG_SLSTO', 'SIG_SMTNM', 'SIG_TEMA', 'SIG_TRIX', 'SIG_VOLOSC', 'TS_BB', 'TS_MACD', 'TS_WILLR', 'TS_CHKNMF', 'TS_PXROC', 'TS_PABSAR', 'TS_CHKOSC', 'TS_CHNOSC', 'TS_CMDOCH', 'TS_DEMA', 'TS_RSI', 'TS_FASTO', 'TS_IMNTM', 'TS_MOMNT', 'TS_MF', 'TS_MVAVG', 'TS_PXOSC', 'TS_QSTIC', 'TS_RLTMNT', 'TS_RLTSTR', 'TS_RLTVOL', 'TS_SLSTO', 'TS_SMTNM', 'TS_TEMA', 'TS_TRIX', 'TS_VOLOSC']
                );

                let techScoreSeriesObj = priceService.technicalScoreDS.getTechnicalScoreSeries(exg, sym, chartCategory);
                let techScoreObj = priceService.technicalScoreDS.getTechnicalScore(exg, sym);

                // If data is already available, flush them.
                // Note: Flushing and re-generating the array is efficient than search and insertion the missing points
                if (techScoreSeriesObj.dataPoints.length > 0) {
                    techScoreSeriesObj.dataPoints.length = 0;
                }

                // Load exchange object for obtaining the timezone
                let exgObj = priceService.exchangeDS.getExchange(exg);

                let dataArry = dtObj.DAT.HIS;
                Object.keys(dataArry).forEach(function (key) {

                    pt = parseInt(dataArry[key][dataIdxList.DT], 10) * PriceConstants.UnixTimestampByMilliSeconds;
                    date = utils.formatters.convertToUTCDate(pt, exgObj.tzo);

                    techScoreSeriesObj.dataPoints.push({
                        DT: date,
                        techScore: dataArry[key][dataIdxList.TECH_SCORE]
                    });

                    if (!techScoreObj.date || date > techScoreObj.date) {
                        techScoreObj.score = dataArry[key][dataIdxList.TECH_SCORE];
                        techScoreObj.date = date;
                    }

                    signalsList.forEach(function (signalValue) {
                        let signal = PriceConstants.TechnicalScoreConstants[signalValue];
                        let signalInd = dataArry[key][dataIdxList['SIG_' + signal]];

                        signalObj = priceService.technicalScoreDS.getSignal(exg, sym, signal);

                        if (signalInd === 'B' || signalInd === 'S') {
                            if (!signalObj.date || date > signalObj.date) {
                                signalObj.date = date.getTime();
                                signalObj.signal = signalInd;
                                signalObj.score = parseFloat(dataArry[key][dataIdxList['TS_' + signal]]);
                            }
                        } else if (signalInd === 'N' && signalObj.signal === 'N' && (!signalObj.date || date > signalObj.date)) {
                            signalObj.date = date.getTime();
                            signalObj.signal = signalInd;
                            signalObj.score = parseFloat(dataArry[key][dataIdxList['TS_' + signal]]);

                        }
                    });
                });

                if (reqSuccessFn instanceof Function && techScoreSeriesObj.dataPoints && techScoreSeriesObj.dataPoints.length > 0) {
                    reqSuccessFn();
                } else if (reqFailureFn instanceof Function) {
                    reqFailureFn();
                }

                sharedService.getService('price').technicalScoreDS.onChartDataReady(utils.keyGenerator.getKey(exg, sym));
            }
        } catch (e) {
            utils.logger.logError('Error in Technical score data response: ' + e);
        }
    };

    const processChangePasswordResponse = function (dataObj, callback) {
        try {
            if (dataObj) {
                if (callback && callback instanceof Function) {
                    callback(dataObj.ERRORCODE, dataObj.ERRORDES);
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing Change Password response : ' + e);
        }
    };

    //
    // Buyers Sellers Response
    //
    const processBuyersSellersResponse = function (dataObj, mode) {
        try {
            let buyerSellerCollection = sharedService.getService('price').buyersSellersDS.getBuyersSellersByCategory(mode);
            buyerSellerCollection.clear();

            if (dataObj.DAT && dataObj.HED) {
                let buyersSellersObj, buyerSellerHedIdxList, buyerSellerArray, headerFields, brokerCode;

                if (dataObj.DAT.BUYER || dataObj.DAT.SELLER) {
                    let dataArray = mode === 1 ? dataObj.DAT.BUYER : dataObj.DAT.SELLER;

                    headerFields = ['BCODE', 'DESC', 'VOL', 'AVG', 'VAL', 'AVGPCT'];
                    buyerSellerHedIdxList = _getHeaderIndexList(mode === 1 ? dataObj.HED.BUYER : dataObj.HED.SELLER, headerFields);

                    Object.keys(dataArray).forEach(function (key) {
                        buyerSellerArray = dataArray[key].split(utils.Constants.StringConst.Pipe);
                        brokerCode = buyerSellerArray[buyerSellerHedIdxList.BCODE];

                        buyersSellersObj = sharedService.getService('price').buyersSellersDS.getBuyersSellers(brokerCode);

                        buyersSellersObj.setData({
                            // lDes: buyerSellerArray[buyerSellerHedIdxList.DESC], // RT 306 long description is used
                            vol: parseFloat(buyerSellerArray[buyerSellerHedIdxList.VOL]),
                            avg: parseFloat(buyerSellerArray[buyerSellerHedIdxList.AVG]),
                            val: parseFloat(buyerSellerArray[buyerSellerHedIdxList.VAL]),
                            avgPct: parseFloat(buyerSellerArray[buyerSellerHedIdxList.AVGPCT])
                        });

                        buyerSellerCollection.push(buyersSellersObj);
                    });
                }
            }

            sharedService.getService('price').buyersSellersDS.addToCollection(mode, buyerSellerCollection);
        } catch (e) {
            utils.logger.logError('Error in processing sellers response : ' + e);
        }
    };

    //
    // Broker Activities Response
    //
    const processBrokerActivitiesResponse = function (dataObj, mode) {
        try {
            let brokerActivitiesCollection = sharedService.getService('price').brokerActivitiesDS.getBrokerActivitiesByCategory(mode);
            brokerActivitiesCollection.clear();

            if (dataObj.DAT && dataObj.HED) {
                let brokerActivitiesObj, brokerActivitiesHedIdxList, brokerActivitiesArray, headerFields, sym;

                if (dataObj.DAT.BUYING || dataObj.DAT.SELLING) {
                    let dataArray = mode === 1 ? dataObj.DAT.BUYING : dataObj.DAT.SELLING;

                    headerFields = ['SYMBOL', 'DESC', 'VOL', 'AVG', 'VAL', 'AVGPCT'];
                    brokerActivitiesHedIdxList = _getHeaderIndexList(mode === 1 ? dataObj.HED.BUYING : dataObj.HED.SELLING, headerFields);


                    Object.keys(dataArray).forEach(function (key) {

                        brokerActivitiesArray = dataArray[key].split(utils.Constants.StringConst.Pipe);
                        sym = brokerActivitiesArray[brokerActivitiesHedIdxList.SYMBOL];

                        brokerActivitiesObj = sharedService.getService('price').brokerActivitiesDS.getBrokerActivities(sym);

                        brokerActivitiesObj.setData({
                            symDes: brokerActivitiesArray[brokerActivitiesHedIdxList.DESC],
                            vol: parseFloat(brokerActivitiesArray[brokerActivitiesHedIdxList.VOL]),
                            avg: parseFloat(brokerActivitiesArray[brokerActivitiesHedIdxList.AVG]),
                            val: parseFloat(brokerActivitiesArray[brokerActivitiesHedIdxList.VAL]),
                            avgPct: parseFloat(brokerActivitiesArray[brokerActivitiesHedIdxList.AVGPCT])
                        });

                        brokerActivitiesCollection.push(brokerActivitiesObj);
                    });
                }
            }

            sharedService.getService('price').brokerActivitiesDS.addToCollection(mode, brokerActivitiesCollection);
        } catch (e) {
            utils.logger.logError('Error in processing broker activities response : ' + e);
        }
    };

    //
    // Broker Ranking Response
    //
    const processBrokerRankingResponse = function (dataObj) {
        try {
            let brokerRankingCollection = sharedService.getService('price').brokerRankingDS.getBrokerRankingCollection();
            brokerRankingCollection.clear();

            if (dataObj.DAT && dataObj.HED) {
                let brokerRankingObj, hedIdxList, brokerRankingArray, headerFields, bCode;

                if (dataObj.DAT.BROKERS) {
                    headerFields = ['CODE', 'NAME', 'TVAL', 'PCTVAL', 'BVAL', 'SVAL', 'NVAL', 'CVAL', 'BLVAL', 'TRADES'];
                    hedIdxList = _getHeaderIndexList(dataObj.HED.BROKERS, headerFields);

                    let dataArry = dataObj.DAT.BROKERS;
                    Object.keys(dataArry).forEach(function (key) {

                        brokerRankingArray = dataArry[key].split(utils.Constants.StringConst.Pipe);
                        bCode = brokerRankingArray[hedIdxList.CODE];

                        brokerRankingObj = sharedService.getService('price').brokerRankingDS.getBrokerRanking(bCode);

                        brokerRankingObj.setData({
                            //  lDes: brokerRankingArray[hedIdxList.NAME], // RT 306 long description is used
                            total: parseFloat(brokerRankingArray[hedIdxList.TVAL]),
                            pctVal: parseFloat(brokerRankingArray[hedIdxList.PCTVAL]),
                            buyVal: parseFloat(brokerRankingArray[hedIdxList.BVAL]),
                            sellVal: parseFloat(brokerRankingArray[hedIdxList.SVAL]),
                            netVal: parseFloat(brokerRankingArray[hedIdxList.NVAL]),
                            crossVal: parseFloat(brokerRankingArray[hedIdxList.CVAL]),
                            blockVal: parseFloat(brokerRankingArray[hedIdxList.BLVAL]),
                            trade: parseFloat(brokerRankingArray[hedIdxList.TRADES])
                        });

                        brokerRankingCollection.push(brokerRankingObj);
                    });
                }
            }

            sharedService.getService('price').brokerRankingDS.addToCollection(brokerRankingCollection);
        } catch (e) {
            utils.logger.logError('Error in processing broker ranking response : ' + e);
        }
    };

    const processForgotPasswordResponse = function (dataObj, callback) {
        try {
            if (dataObj) {
                if (callback && callback instanceof Function) {
                    callback(dataObj.ERRORCODE, dataObj.ERRORDES);
                }
            }
        } catch (e) {
            utils.logger.logError('Error in processing Forgot Password response : ' + e);
        }
    };

    return {
        processExchangeMetadataResponse: processExchangeMetadataResponse, // RT = 306
        processSymbolValidationResponse: processSymbolValidationResponse,
        processSymbolSearchResponse: processSymbolSearchResponse,
        processChartResponse: processChartResponse,
        processAnnouncementBodyResponse: processAnnouncementBodyResponse,
        processAnnouncementSearchResponse: processAnnouncementSearchResponse,
        processNewsSearchResponse: processNewsSearchResponse,
        processNewsBodyResponse: processNewsBodyResponse,
        processCompanyProfileResponse: processCompanyProfileResponse,
        processTimeAndSalesBacklogResponse: processTimeAndSalesBacklogResponse,
        processCalenderEventsResponse: processCalenderEventsResponse,
        processYoutubeEventsResponse: processYoutubeEventsResponse,
        processInstagramEventsResponse: processInstagramEventsResponse,
        processFacebookEventsResponse: processFacebookEventsResponse,
        processPressReleaseResponse: processPressReleaseResponse,
        processDelayedPriceMeta: processDelayedPriceMeta,
        processExchangeSummaryResponse: processExchangeSummaryResponse, // RT = 308
        processGmsSummaryResponse: processGmsSummaryResponse,
        processSystemMetaDataResponse: processSystemMetaDataResponse, // RT = 301
        processAlertHistoryResponse: processAlertHistoryResponse,
        processFairValueHistoricalPriceResponse: processFairValueHistoricalPriceResponse,
        processFairValueReportResponse: processFairValueReportResponse,
        processCorporateActionResponse: processCorporateActionResponse,
        processVolumeWatcherResponse: processVolumeWatcherResponse,
        processTOPVChartResponse: processTOPVChartResponse,
        processOptionChainResponse: processOptionChainResponse,
        processOptionListResponse: processOptionListResponse,
        processExchangeSymbolResponse: processExchangeSymbolResponse, // RT = 303
        processLoginIndexPanelResponse: processLoginIndexPanelResponse,
        processFinancialResponse: processFinancialResponse,
        processClosingPriceResponse: processClosingPriceResponse,
        processBookShelfResponse: processBookShelfResponse,
        processTransMenuResponse: processTransMenuResponse,
        processUserRegistrationResponse: processUserRegistrationResponse,
        processInvestmentIdResponse: processInvestmentIdResponse,
        processInvestorPortfolioResponse: processInvestorPortfolioResponse,
        processCDVAndYTDPUrlResponse: processCDVAndYTDPUrlResponse,
        processBetaResponse: processBetaResponse,
        processFundamentalScoreResponse: processFundamentalScoreResponse,
        processTechnicalScoreResponse: processTechnicalScoreResponse,
        processChangePasswordResponse: processChangePasswordResponse,
        processBuyersSellersResponse: processBuyersSellersResponse,
        processBrokerActivitiesResponse: processBrokerActivitiesResponse,
        processBrokerRankingResponse: processBrokerRankingResponse,
        processForgotPasswordResponse: processForgotPasswordResponse,
        processSpecialTrades: processSpecialTrades,
        onError: onError
    };
})();