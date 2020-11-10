import appReducer from './appReducer';
import fetchReducer from './fetchReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    app: appReducer,
    data: fetchReducer
});

export default rootReducer;