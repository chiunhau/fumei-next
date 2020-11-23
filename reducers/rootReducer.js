import appReducer from './appReducer';
import fetchReducer from './fetchReducer';
import templateReducer from './templateReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    app: appReducer,
    data: fetchReducer,
    template: templateReducer
});

export default rootReducer;