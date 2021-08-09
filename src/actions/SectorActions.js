import {
    SAVE_SECTOR
} from '../actions/types';

export const saveSector = (sectorData) => {
    return {
        type: SAVE_SECTOR,
        payload: {
            data: sectorData
        }
    }
}