export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';

export interface Request {
  path: string,
  id: string,
  forceFetch?: boolean,
  cb?: (data: any) => void
}

export interface Receive {
  config: Request,
  data: any
}

export interface RequestDataAction {
  type: typeof REQUEST_DATA,
  payload: Request
}

export interface ReceiveDataAction {
  type: typeof RECEIVE_DATA,
  payload: Receive
}
