import {
    SAVE_DAY_LIGHT
} from '../actions/types';

export const saveSystemMetaData = (systemMetaData) => {
    return {
        type: SAVE_DAY_LIGHT,
        payload: {
            data: systemMetaData
        }
    }
}