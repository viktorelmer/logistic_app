import { INITAL_STATE_OBJ } from 'exports/const.main';
import { setReduxStateFailure, setReduxStateStart, setReduxStateSuccess } from 'exports/util';
import { IAction } from '../../exports/types';
import {
  GET_ORDERS_DATA_FAILURE,
  GET_ORDERS_DATA_KEY,
  GET_ORDERS_DATA_START, GET_ORDERS_DATA_SUCCESS, INITIAL_STATE_KEYS,
} from './orders.constants';

let INITIAL_STATE =  {}

INITIAL_STATE_KEYS.forEach((key) => {
  INITIAL_STATE[key] = INITAL_STATE_OBJ
})

export default function order(state = INITIAL_STATE, { type, data }: IAction) {
  switch (type) {
    case GET_ORDERS_DATA_START:
      return setReduxStateStart(state, GET_ORDERS_DATA_KEY);

    case GET_ORDERS_DATA_SUCCESS:
      return setReduxStateSuccess(state, data, GET_ORDERS_DATA_KEY);

    case GET_ORDERS_DATA_FAILURE:
      return setReduxStateFailure(state, data, GET_ORDERS_DATA_KEY);

    default:
      return state;
  }
}