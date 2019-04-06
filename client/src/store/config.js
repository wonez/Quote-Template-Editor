import thunk from 'redux-thunk';
import {    
    createStore, 
    applyMiddleware, 
    combineReducers,
    compose
} from 'redux'

import appState from './reducers/appStateReducer'
import gui from './reducers/guiReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    appState,
    gui
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store;