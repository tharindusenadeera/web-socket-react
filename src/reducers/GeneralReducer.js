import {
    SET_EXCHANGE_META_DATA_STATUS,
    SET_EXCHANGE_SYMBOL_META_DATA_STATUS,
    IS_LOGIN_SUCCESS, SAVE_CONNECTION_SETTINGS,
    SET_ALL_WATCH_LIST_LOAD_STATUS
} from '../actions/types';

const INITIAL_STATE = {
    isExchangeMetaReady: false,
    isAllWatchListSymbolsLoaded : false,
    isExchangeSymbolMetaReady: false,
    isLoginSuccess: false,
    connectionData: {}
}

const GeneralReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_EXCHANGE_META_DATA_STATUS:
            return {
                ...state,
                isExchangeMetaReady: action.payload.data
            }
        case SET_EXCHANGE_SYMBOL_META_DATA_STATUS:
            return {
                ...state,
                isExchangeSymbolMetaReady: action.payload.data
            }
        case IS_LOGIN_SUCCESS:
            return {
                ...state,
                isLoginSuccess: action.payload.data
            }
        case SAVE_CONNECTION_SETTINGS:
            return {
                ...state,
                connectionData: action.payload.data
            }
        case SET_ALL_WATCH_LIST_LOAD_STATUS:
            return {
                ...state,
                isAllWatchListSymbolsLoaded: action.payload.data
            }
        default:
            return state
    }
}
export default GeneralReducer;