import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import order from './orders/orders.reducers';

export default (history) => combineReducers({
  router: connectRouter(history),
  order
});
