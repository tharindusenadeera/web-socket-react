import {
    TOP_STOCKS_FOR_EXCHANGE, TOP_STOCKS_FOR_SUB_MKT, TOP_STOCKS_MAP_BY_EXCHANGE
} from '../actions/types';

export const getTopStocksForExchange = (topStockData) => {
    return {
        type: TOP_STOCKS_FOR_EXCHANGE,
        payload: {
            data: topStockData
        }
    }
}

export const getTopStocksForSubMarket = (topStockData) => {
    return {
        type: TOP_STOCKS_FOR_SUB_MKT,
        payload: {
            data: topStockData
        }
    }
}

export const getTopStocksMapByExchange = (topStockData) => {
    return {
        type: TOP_STOCKS_MAP_BY_EXCHANGE,
        payload: {
            data: topStockData
        }
    }
}