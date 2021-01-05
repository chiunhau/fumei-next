import {
  REQUEST_DATA, 
  RECEIVE_DATA
} from './types';

const initialState: object = {};


const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DATA:
      return {...state}
    case RECEIVE_DATA:
      return {...state, [action.config.id]: action.data}
    default:
      return state
  }
}

export default fetchReducer