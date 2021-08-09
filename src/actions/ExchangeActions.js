import {
    SAVE_EXCHANGE,
    SAVE_EXCHANGE_TIME_ZONE,
    GET_DEFAULT_SUB_MARKET, GET_CURRENT_EXCHANGE_AND_SYMBOL, SAVE_CURRENT_EXCHANGE
} from './types';
import utils from '../util/utils/utils';
import reduxStore from '../util/store/reduxStore';

export const saveExchange = (exchangeData) => {
    return {
        type: SAVE_EXCHANGE,
        payload: {
            data: exchangeData
        }
    }
}

export const saveCurrentExchange = (exchangeData) => {
    return {
        type: SAVE_CURRENT_EXCHANGE,
        payload: {
            data: exchangeData
        }
    }
}



export const saveExchangeTimeZone = (dlsObject) => {
    let exchangeData = reduxStore.store.getState().exchangeStore.exchangeData;

    if (dlsObject) {
        let currentDate = new Date();
        let cDate = utils.formatters.formatDateToDisplayDate(currentDate, true);
        let sDate = dlsObject.sDate;
        let eDate = dlsObject.eDate;
        let dls = dlsObject.dls;

        if (cDate >= sDate && cDate <= eDate) {
            Object.keys(exchangeData).forEach(function (key) {
                let tzo = exchangeData[key].tzo;

                tzo = tzo + dls;
                exchangeData[key].tzo = tzo;
            });
            return {
                type: SAVE_EXCHANGE_TIME_ZONE,
                payload: {
                    data: exchangeData,
                    status: true
                }
            }
        } else {
            return {
                type: SAVE_EXCHANGE_TIME_ZONE,
                payload: {
                    data: exchangeData,
                    status: false
                }
            }
        }
    } else {
        return {
            type: SAVE_EXCHANGE_TIME_ZONE,
            payload: {
                data: exchangeData,
                status: false
            }
        }
    }
}

export const getDefaultSubMarket = (exchange) => {
    let defSubMkt;
    let store = reduxStore.store.getState().exchangeStore.exchangeData;

    let exchangeObj = Object.keys(store).length > 0 && store[exchange] ? store[exchange] : null;
    let subMarkets = exchangeObj !== null ? exchangeObj.subMarketArray : null;

    if (subMarkets) {

        subMarkets.forEach(function (key, item) {
            if (item && key.def === utils.Constants.Yes) {
                defSubMkt = key;
                return false;
            }
        });
    }

    if (defSubMkt) {
        return {
            type: GET_DEFAULT_SUB_MARKET,
            payload: {
                data: defSubMkt.marketId
            }
        }
    } else {
        if (subMarkets && subMarkets.length > 0) {
            return {
                type: GET_DEFAULT_SUB_MARKET,
                payload: {
                    data: subMarkets[0].marketId
                }
            }
        } else {
            return {
                type: GET_DEFAULT_SUB_MARKET,
                payload: {
                    data: -1
                }
            }
        }
    }
}

export const getCurrentExchangeAndSymbol = (exg, sym) => {
    return {
        type: GET_CURRENT_EXCHANGE_AND_SYMBOL,
        payload: {
            data: {
                exg: exg,
                sym: sym
            }
        }
    }
}