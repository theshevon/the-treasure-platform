import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux';
import thunk       from 'redux-thunk';
import userReducer from './reducers/userReducer';
import uiReducer   from './reducers/uiReducer';

const initialState = {};
const middleware   = [thunk];

const reducers = combineReducers({

    // everything that comes from the `userReducer` will be stored inside `user`
    // object inside the state, and similarly for the UI
    user : userReducer,
    UI   : uiReducer
});

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;