export const ADD_DISH = 'ADD_DISH'
export const REMOVE_DISH = 'REMOVE_DISH'

export const addDish = (cat_id, dish_id) => {
  return {
    type: ADD_DISH,
    paylod: {
      cat_id,
      dish_id
    }
  }
}

export const removeDish = () => {
  return {
    type: REMOVE_DISH,
    paylod: {

    }
  }
}