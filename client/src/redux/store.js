import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux';
import thunk       from 'redux-thunk';

import userReducer from './reducers/userReducer';

const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
    user : userReducer // everything that comes from the `userReducer` will be
                       // stored inside `user` object inside the state.
});

const store = createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;