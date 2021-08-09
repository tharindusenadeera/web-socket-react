import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import ReduxThunk from 'redux-thunk'
import rootReducer from '../../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

/* ------------- Redux Configuration ------------- */
const middleware = []
const enhancers = []

/* ------------- ReduxThunk Middleware ------------- */
middleware.push(ReduxThunk)

function noop() { }

if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger')
    const logger = createLogger({ collapsed: true, duration: true, diff: true })
    middleware.push(logger)
} else {
    console.log = noop;
    console.warn = noop;
    console.error = noop;
}

/* ------------- Assemble Middleware ------------- */
// const middlewareEnhancer = applyMiddleware(...middleware)
// enhancers.push(middlewareEnhancer)

const persistConfig = {
    key: 'REDUX_OFFLINE_STORE',
    storage,
    whitelist: [],
    // blacklist:[]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer,composeWithDevTools(compose(...enhancers)))
const persistor = persistStore(store)
const storeWithPersistor = { store, persistor }

export default storeWithPersistor;