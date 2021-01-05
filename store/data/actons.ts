import {
  Request,
  RequestDataAction,
  ReceiveDataAction,
  REQUEST_DATA,
  RECEIVE_DATA
} from './types';


export function requestData(config: Request): RequestDataAction {
  return {
    type: REQUEST_DATA,
    payload: config
  }
}

export function receiveData(config: Request, data: any): ReceiveDataAction {
  console.log('GET Successed: ', config, ', with response: ', data);
  if (config.cb) {
    config.cb(data)
  }

  return {
    type: RECEIVE_DATA,
    payload: {
      config,
      data
    }
  }
}