/* eslint-disable implicit-arrow-linebreak */
import { httpMethods } from '../../exports/enum';
import { Http } from '../../exports/http.library';

import * as Endpoints from '../../exports/endpoints';

class OrdersHTTP {
  static getOrders = () => Http.setMethod(httpMethods.get).setUrl(Endpoints.GET_ORDERS).request();

}

export default OrdersHTTP;
