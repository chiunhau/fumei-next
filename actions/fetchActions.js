import firebase from '../firebase';
const db = firebase.database();

const requestData = (config) => {
  console.log('Requesting: ', config)
  return {
    type: 'REQUEST_DATA',
    config
  }
}

const receiveData = (config, response) => {
  console.log('Successed: ', config, ', with response: ', response)
  return {
    type: 'RECEIVE_DATA',
    data: response,
    config
  }
}

const shouldFetchData = (state, config) => {
  const thing = state.data[config.id];

  if (!thing) {
    return true
  }
  else {
    console.log('Fetch request denied: data already exists.');
    return false
  }
}

// export const fetchData = (config) => {
//   return (dispatch, getState) => {
//     if (shouldFetchData(getState(), config)) {
//       dispatch(requestData(config))
//       return axios.get(config.url)
//         .then(response => dispatch(receiveData(config, response)))
//     }
//   }
// }

export const fetchData = (config) => {
  return (dispatch, getState) => {
    if (shouldFetchData(getState(), config)) {
      dispatch(requestData(config))
      return db.ref(config.path).once('value').then(snapshot => {
        dispatch(receiveData(config, snapshot.val()))
      })

    }
  }
}