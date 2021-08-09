import {
    SAVE_STOCK,
    SET_END_BULK_SYMBOL_ADDITION_STATUS,
    SET_BEGIN_BULK_SYMBOL_ADDITION_STATUS,
    GET_STOCK,
    SAVE_STOCK_BY_INDICES,
    SET_STOCK_UPDATE_STATUS,
    SAVE_CURRENT_STOCK_BY_KEY,
    SAVE_CURRENT_SECTOR_INDICES_STOCK_BY_KEY,
    SAVE_STOCK_BY_SUB_MARKET,
    SAVE_DEMO_DATA
} from '../actions/types';
import utils from '../util/utils/utils';

export const saveStock = (stockData, symbolArray) => {
    return {
        type: SAVE_STOCK,
        payload: {
            data: stockData,
            symbolArray: symbolArray,
        }
    }
};

export const saveDemoData = (stockData, symbolArray) => {
    return {
        type: SAVE_DEMO_DATA,
        payload: {
            data: stockData,
            symbolArray: symbolArray,
        }
    }
};

export const saveStockByIndices = (stockData, symbolArray) => {
    return {
        type: SAVE_STOCK_BY_INDICES,
        payload: {
            data: stockData,
            symbolArray: symbolArray
        }
    }
};

export const saveStockBySubMarket = (stockData) => {
    return {
        type: SAVE_STOCK_BY_SUB_MARKET,
        payload: {
            data: stockData,
            status: true
        }
    }
};

export const saveCurrentSectorIndicesStockByKey = (stockData) => {
    return {
        type: SAVE_CURRENT_SECTOR_INDICES_STOCK_BY_KEY,
        payload: {
            data: stockData,
        }
    }
};

export const saveCurrentStockByKey = (stockData) => {
    return {
        type: SAVE_CURRENT_STOCK_BY_KEY,
        payload: {
            data: stockData,
        }
    }
};

export const isStockUpdated = (status) => {
    return {
        type: SET_STOCK_UPDATE_STATUS,
        payload: {
            data: status
        }
    }
};

export const getStock = (stockArray, exchange, symbol) => {
    let key = utils.keyGenerator.getKey(exchange, symbol);
    let stockObj = stockArray[key];
    return {
        type: GET_STOCK,
        payload: {
            data: stockObj
        }
    }
}

export const setEndBulkSymbolAdditionStatus = () => {
    return {
        type: SET_END_BULK_SYMBOL_ADDITION_STATUS,
        payload: {
            status: false
        }
    }
}

export const setBeginBulkSymbolAdditionStatus = () => {
    return {
        type: SET_BEGIN_BULK_SYMBOL_ADDITION_STATUS,
        payload: {
            status: true
        }
    }
}