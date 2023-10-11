import { TOrder } from "./order-type";

export interface IOrderMessageResponse {
    orders: Array<TOrder>;
    username: string;
    success: boolean;
    total: number;
    totalToday: number;
  }
  
  export interface IMessage extends Omit<IOrderMessageResponse, 'success'> {
    timestamp: number;
  }