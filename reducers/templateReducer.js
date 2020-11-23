const initialState = {}

const templateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_TEMPLATE':
      return {...action.payload}

    case 'CLEAR_TEMPLATE':
      return {}

    case 'REMOVE_DISH': 
      return {...state, test: action.payload}

    default:
      return state
  }
};

export default templateReducer;