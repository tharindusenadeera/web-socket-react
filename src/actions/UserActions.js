import {
    SAVE_USER,
    GET_EXCHANGE_SUBSCRIPTION_FLAG
} from '../actions/types';
import utils from '../../ua-kernal/utils/utils';

export const saveUser = (userData) => {
    return {
        type: SAVE_USER,
        payload: {
            data: userData
        }
    }
}

export const getExchangeSubscriptionFlag = (exchangeCode, delayedExchg, prevDayExchg) => {
    if (typeof delayedExchg !== 'undefined' && delayedExchg.indexOf(exchangeCode) >= 0) {
        return {
            type: GET_EXCHANGE_SUBSCRIPTION_FLAG,
            payload: {
                data: utils.Constants.Delayed
            }
        }
    } else if (typeof delayedExchg !== 'undefined' && prevDayExchg.indexOf(exchangeCode) >= 0) {
        return {
            type: GET_EXCHANGE_SUBSCRIPTION_FLAG,
            payload: {
                data: utils.Constants.PreviousDayData
            }
        }
    } else {
        return {
            type: GET_EXCHANGE_SUBSCRIPTION_FLAG,
            payload: {
                data: ''
            }
        }
    }
}