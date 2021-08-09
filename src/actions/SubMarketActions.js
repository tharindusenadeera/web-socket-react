import {
    SAVE_SUB_MARKET,
    SAVE_SUB_MARKET_BY_EXG
} from '../actions/types';


export const saveSubMarket = (subMarketData) => {
    return {
        type: SAVE_SUB_MARKET,
        payload: {
            data: subMarketData
        }
    }
}

export const saveSubMarketByExg = (subMarketData) => {
    return {
        type: SAVE_SUB_MARKET_BY_EXG,
        payload: {
            data: subMarketData
        }
    }
}