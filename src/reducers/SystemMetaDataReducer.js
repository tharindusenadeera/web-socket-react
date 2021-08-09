import {
    SAVE_DAY_LIGHT
} from '../actions/types';

const INITIAL_STATE = {
    systemMetaData: {},
}

const SystemMetaDataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_DAY_LIGHT:
            return {
                ...state,
                systemMetaData: action.payload.data
            }
        default:
            return state
    }
}
export default SystemMetaDataReducer;