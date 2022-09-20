/* eslint-disable no-restricted-syntax */
import axios, { AxiosRequestHeaders } from 'axios';
import { API_URL } from './const.main';
import { httpMethods } from './enum';

class HttpClass {
  method: httpMethods;

  url: string;

  data: Object;

  constructor() {
    this.method = httpMethods.post;
    this.url = '';
    this.data = {};
  }

  setUrl(url: string) {
    this.url = API_URL + url;
    this.data = {}
    return this;
  }

  setData(data: Object) {
    this.data = data;
    return this;
  }

  setMethod(method: httpMethods) {
    this.method = method;
    return this;
  }

  unsetData() {
    this.data = [];
    return this;
  }

  async request() {
    try {

      let url = this.url;
      if (this.method === httpMethods.get) {
        url += this.serializeParams(this.data);
      }

      const headers: AxiosRequestHeaders = {
        'Content-Type': 'application/json',
      };

      const config = {
        url,
        headers,
        method: this.method,
        // data: JSON.stringify(this.data) || {},
        data: this.data || {},
      }

      const response = await axios(config);

      this.unsetData();

      return response;
    } catch ({ response }) {
      this.unsetData();
      return response;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private serializeParams(params: any) {
    if (typeof params === undefined || Object.keys(params).length <= 0) {
      return '';
    }

    let queryString = '';
    // eslint-disable-next-line guard-for-in
    for (const key in params) {
      if (queryString !== '') queryString += '&';
      queryString += `${key}=${encodeURIComponent(params[key])}`;
    }
    return `?${queryString}`;
  }
}

export const Http = new HttpClass();
