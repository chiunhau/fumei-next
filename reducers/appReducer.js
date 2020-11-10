import {HYDRATE} from 'next-redux-wrapper';

const initialState = {
  test: 'HI'
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE: 
      return {...state, ...action.payload}
    case 'TEST':
      return {...state, test: action.payload}
    default:
      return state
  }
};

export default appReducer;