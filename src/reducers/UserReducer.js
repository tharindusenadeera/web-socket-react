import {
    SAVE_USER,
    GET_EXCHANGE_SUBSCRIPTION_FLAG
} from '../actions/types';

const INITIAL_STATE = {
    userData: {},
    subscriptionFlag: ''
}

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_USER:
            return {
                ...state,
                userData: action.payload.data
            }
        case GET_EXCHANGE_SUBSCRIPTION_FLAG:
            return {
                ...state,
                subscriptionFlag: action.payload.data
            }
        default:
            return state
    }
}
export default UserReducer;