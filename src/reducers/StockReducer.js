import {
    SAVE_STOCK,
    SET_BEGIN_BULK_SYMBOL_ADDITION_STATUS,
    SET_END_BULK_SYMBOL_ADDITION_STATUS,
    GET_STOCK,
    SAVE_STOCK_BY_INDICES,
    SET_STOCK_UPDATE_STATUS,
    SAVE_CURRENT_STOCK_BY_KEY,
    SAVE_CURRENT_SECTOR_INDICES_STOCK_BY_KEY,
    SAVE_STOCK_BY_SUB_MARKET,
} from '../actions/types';



const INITIAL_STATE = {
    indices: {
        symbols: [],
        stockData: {}
    },
    stockDataByIndices: {},
    stockDataBySubMarket: {},
    isBulkAdditionInProgress: '',
    filteredStockData: '',
    currentStock: {},
    currentSectorIndicesStock: {},
    stocks : {
        symbols: [],
        stockData: {}
    }
}

 const StockReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_STOCK:
            const oldStocksFromState = state.stocks.stockData;
            const newStock = action.payload.data;
            return {
                ...state,
                stocks: {
                    stockData: {...oldStocksFromState, ...newStock},
                    symbols:  action.payload.symbolArray  ? action.payload.symbolArray : state.stocks.symbols,
                }
            }
        case SAVE_STOCK_BY_INDICES:
            const oldIndicesFromState = state.indices.stockData;
            const newIndices = action.payload.data;
            return {
                ...state,
                indices: {
                    stockData: {...oldIndicesFromState, ...newIndices},
                    symbols:  action.payload.symbolArray  ? action.payload.symbolArray : state.stocks.symbols,
                }
            }
        case SAVE_STOCK_BY_SUB_MARKET:
            return {
                ...state,
                stockDataBySubMarket: action.payload.data
            }
        case SAVE_CURRENT_STOCK_BY_KEY:
            return {
                ...state,
                currentStock: action.payload.data,
            }
        case SAVE_CURRENT_SECTOR_INDICES_STOCK_BY_KEY:
            return {
                ...state,
                currentSectorIndicesStock: action.payload.data,
            }
        case SET_STOCK_UPDATE_STATUS:
            return {
                ...state,
                isStockUpdated: action.payload.data
            }
        case GET_STOCK:
            return {
                ...state,
                filteredStockData: action.payload.data
            }
        case SET_BEGIN_BULK_SYMBOL_ADDITION_STATUS:
            return {
                ...state,
                isBulkAdditionInProgress: action.payload.status
            }
        case SET_END_BULK_SYMBOL_ADDITION_STATUS:
            return {
                ...state,
                isBulkAdditionInProgress: action.payload.status
            }
        default:
            return state
    }
}

export default StockReducer;