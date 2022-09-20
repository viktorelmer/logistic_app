
import { setReduxState } from 'exports/util';
import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_ORDERS_DATA_FAILURE, GET_ORDERS_DATA_START, GET_ORDERS_DATA_SUCCESS } from './orders.constants';
import OrdersHTTP from './orders.service';

function* getOrdersStart(payload: any) {
  try {
    const getProfessionalResponse = yield call(OrdersHTTP.getOrders);
  
    yield put(setReduxState(GET_ORDERS_DATA_SUCCESS, getProfessionalResponse.data));
  } catch (error) {
    yield put(setReduxState(GET_ORDERS_DATA_FAILURE, error));
  }
}


export default function* orderSaga() {
  yield* [
    takeEvery(GET_ORDERS_DATA_START, getOrdersStart)
  ]
}