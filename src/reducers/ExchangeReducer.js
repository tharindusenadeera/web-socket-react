import {
    SAVE_EXCHANGE,
    SAVE_EXCHANGE_TIME_ZONE,
    GET_DEFAULT_SUB_MARKET, GET_CURRENT_EXCHANGE_AND_SYMBOL, SAVE_CURRENT_EXCHANGE
} from '../actions/types';

const INITIAL_STATE = {
    exchangeData: {},
    currentExchangeData: {},
    marketId: ''
}

const ExchangeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_EXCHANGE:
            return {
                ...state,
                exchangeData: action.payload.data
            }
        case SAVE_CURRENT_EXCHANGE:
            return {
                ...state,
                currentExchangeData: action.payload.data
            }
        case SAVE_EXCHANGE_TIME_ZONE:
            return {
                ...state,
                exchangeData: action.payload.data
            }
        case GET_DEFAULT_SUB_MARKET:
            return {
                ...state,
                marketId: action.payload.data
            }
        case GET_CURRENT_EXCHANGE_AND_SYMBOL:
            return {
                ...state,
                currentData: action.payload.data
            }
        default:
            return state
    }
}
export default ExchangeReducer;