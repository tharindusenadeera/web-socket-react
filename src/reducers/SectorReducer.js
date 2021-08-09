import {
    SAVE_SECTOR
} from '../actions/types';

const INITIAL_STATE = {
    sectorData: {},
}

const SectorReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_SECTOR:
            return {
                ...state,
                sectorData: action.payload.data
            }
        default:
            return state
    }
}
export default SectorReducer;