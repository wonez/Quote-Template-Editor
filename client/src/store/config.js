import thunk from 'redux-thunk';
import {    
    createStore, 
    applyMiddleware, 
    combineReducers,
    compose
} from 'redux'

import auth from './reducers/authReducer'
import appState from './reducers/appStateReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth,
    appState
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store;