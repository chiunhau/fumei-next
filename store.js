import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import {createWrapper} from 'next-redux-wrapper';
import rootReducer from './reducers/rootReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// const makeStore = context => createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk)));
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk)));
// const wrapper = createWrapper(makeStore, {debug: true})

export default store