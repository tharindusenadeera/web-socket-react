import {
    SAVE_SUB_MARKET, SAVE_SUB_MARKET_BY_EXG
} from '../actions/types';

const INITIAL_STATE = {
    subMarketData: {},
    subMarketDataByExg: {},
}

const SubMarketReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_SUB_MARKET:
            return {
                ...state,
                subMarketData: action.payload.data
            }
        case SAVE_SUB_MARKET_BY_EXG:
            return {
                ...state,
                subMarketDataByExg: action.payload.data
            }
        default:
            return state
    }
}
export default SubMarketReducer;