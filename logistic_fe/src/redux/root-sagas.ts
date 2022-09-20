import { fork } from 'redux-saga/effects';
import orderSaga from './orders/orders.saga';

export default function* rootSaga() {
  yield fork(orderSaga)
}
