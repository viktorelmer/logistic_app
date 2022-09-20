import { INITAL_STATE_OBJ } from './const.main';
import { IReducer } from './types';


export const setReduxStateStart = (state: IReducer, key: string): IReducer => ({
  ...state,
  [key]: {...INITAL_STATE_OBJ, loading: true}
})

export const setReduxStateSuccess = (state: IReducer, payload: Object, key: string): IReducer => ({
  ...state,
  [key]: {...INITAL_STATE_OBJ, data: payload}
})

export const setReduxStateFailure = (state: IReducer, payload: Object, key: string): IReducer => ({
  ...state,
  [key]: {...INITAL_STATE_OBJ, error: payload}
})

export const setReduxState = (type: string, data?: Object | string) => ({
  type,
  data
})