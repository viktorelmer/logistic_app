export interface IAction {
  type?: string;
  data?: any;
}

export interface IReducer {
  [key: string]: {
    loading: boolean;
    data: Object;
    error: Object | string;
  };
}

export interface IOrder {
  id: string;
  first_name: string;
  last_name: string;
}

export type TState<T> = {
  loading: boolean;
  data: T;
  error: object | string;
}