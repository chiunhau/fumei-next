import firebase from '../firebase';
const db = firebase.database();

const requestData = (config) => {
  console.log('GET Requesting: ', config)
  return {
    type: 'REQUEST_DATA',
    config
  }
}

const requestUpdate = (config) => {
  console.log('UPDATE Requesting: ', config)
  return {
    type: 'REQUEST_UPDATE',
    config
  }
}

const requestPush = (config) => {
  console.log('PUSH Requesting: ', config)
  return {
    type: 'REQUEST_PUSH',
    config
  }
}

const requestDelete = (config) => {
  console.log('DELETE Requesting: ', config)
  return {
    type: 'REQUEST_DELETE',
    config
  }
}


const receiveData = (config, response) => {
  console.log('GET Successed: ', config, ', with response: ', response)
  if (config.cb) {
    config.cb()
  }
  return {
    type: 'RECEIVE_DATA',
    data: response,
    config
  }
}

const receiveUpdate = (config, response) => {
  console.log('UPDATE Successed: ', config, ', with response: ', response)
  if (config.cb) {
    config.cb()
  }
  return {
    type: 'RECEIVE_UPDATE',
    data: response,
    config
  }
}

const receivePush = (config, response) => {
  console.log('PUSH Successed: ', config, ', with response: ', response)
  if (config.cb) {
    config.cb(response)
  }
  return {
    type: 'RECEIVE_PUSH',
    data: response,
    config
  }
}

const receiveDelete = (config, response) => {
  console.log('DELETESuccessed: ', config, ', with response: ', response)
  if (config.cb) {
    config.cb(response)
  }
  return {
    type: 'RECEIVE_DELETE',
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
    if (config.forceFetch || shouldFetchData(getState(), config)) {
      dispatch(requestData(config))
      return db.ref(config.path).once('value').then(snapshot => {
        dispatch(receiveData(config, snapshot.val()))
      })

    }
  }
}

export const updateData = (config) => {
  return (dispatch, getState) => {
    dispatch(requestUpdate(config))
    return db.ref(config.path).set(config.data).then(snapshot => {
      dispatch(receiveUpdate(config, 'ok'))
    }).catch(e => alert(e))

  }
}

export const pushData = (config) => {
  return (dispatch, getState) => {
    dispatch(requestPush(config))
    return db.ref(config.path).push(config.data).then(res => {
      // console.log(res.path.pieces_[1])
      dispatch(receivePush(config, res))
    }).catch(e => alert(e))
  }
}

export const deleteData = (config) => {
  return (dispatch, getState) => {
    dispatch(requestDelete(config))
    return db.ref(config.path).remove().then(snapshot => {
      dispatch(receiveDelete(config, 'deleted'))
    }).catch(e => alert(e))

  }
}