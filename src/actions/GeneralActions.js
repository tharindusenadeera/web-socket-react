import {
    IS_LOGIN_SUCCESS,
    SET_EXCHANGE_META_DATA_STATUS,
    SET_EXCHANGE_SYMBOL_META_DATA_STATUS,
    SAVE_CONNECTION_SETTINGS,
    SET_ALL_WATCH_LIST_LOAD_STATUS
} from './types';

export const setAllWatchListLoadStatus = () => {
    return {
        type: SET_ALL_WATCH_LIST_LOAD_STATUS,
        payload: {
            data: true
        }
    }
}

export const setExchangeMetaDataStatus = () => {
    return {
        type: SET_EXCHANGE_META_DATA_STATUS,
        payload: {
            data: true
        }
    }
}

export const setExchangeSymbolMetaDataStatus = () => {
    return {
        type: SET_EXCHANGE_SYMBOL_META_DATA_STATUS,
        payload: {
            data: true
        }
    }
}

export const setLoginStatus = () => {
    return {
        type: IS_LOGIN_SUCCESS,
        payload: {
            data: true
        }
    }
}

export const saveConnectionSettings = (connectionData) => {
    return {
        type: SAVE_CONNECTION_SETTINGS,
        payload: {
            data: connectionData
        }
    }
}