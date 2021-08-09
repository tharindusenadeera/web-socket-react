import {
    TOP_STOCKS_FOR_EXCHANGE, TOP_STOCKS_FOR_SUB_MKT, TOP_STOCKS_MAP_BY_EXCHANGE
} from '../actions/types';

const INITIAL_STATE = {
    topStocksMapByExgs: {},
    topStocksForExgs: {},
    topStocksForSubMkt: {},
}

const TopStockReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOP_STOCKS_FOR_SUB_MKT:
            return {
                ...state,
                topStocksForSubMkt:  action.payload.data
            }
        case TOP_STOCKS_FOR_EXCHANGE:
            return {
                ...state,
                topStocksForExgs: action.payload.data
            }
        case TOP_STOCKS_MAP_BY_EXCHANGE:
            return {
                ...state,
                topStocksMapByExgs: action.payload.data
            }
        default:
            return state;
    }
}
export default TopStockReducer;