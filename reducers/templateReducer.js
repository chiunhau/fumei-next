const initialState = {
  templateType: ''
}

const templateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST':
      return {...state, test: action.payload}
    case 'REMOVE_DISH': 
    return {...state, test: action.payload}
    default:
      return state
  }
};

export default templateReducer;