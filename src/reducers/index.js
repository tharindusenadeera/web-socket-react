import { combineReducers } from 'redux';
import StockReducer from '../reducers/StockReducer';
import ExchangeReducer from '../reducers/ExchangeReducer';
import SectorReducer from '../reducers/SectorReducer';
import SubMarketReducer from '../reducers/SubMarketReducer';
import SystemMetaDataReducer from '../reducers/SystemMetaDataReducer';
import GeneralReducer from '../reducers/GeneralReducer';
import UserReducer from '../reducers/UserReducer';
import TopStockReducer from './TopStockReducer';

export default combineReducers({
    stock: StockReducer,
    exchangeStore: ExchangeReducer,
    sector: SectorReducer,
    subMarket: SubMarketReducer,
    systemMetaData: SystemMetaDataReducer,
    general: GeneralReducer,
    user: UserReducer,
    topStocks: TopStockReducer,
})