import type { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { IOrderMessageResponse } from '../../types/message-type';
import { TAppDispatch, TRootState } from '../../types/reducer-type';
import { connectionClosed, connectionError, connectionSuccess, getMessage } from '../slices/order-history-slice';
import { WSS_HISTORY_ORDER } from '../../constants/constant';


export const orderHistorySocketMiddleware = (): Middleware => {
  
    return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
      let socket: WebSocket | null = null;
      return next => (action: AnyAction) => {
        const { dispatch, getState } = store;
        const { user } = getState().user;
        const token = localStorage.getItem("accessToken")
        if(token?.length!>0){
        const formattedToken = token!.substring(7);
        if (socket == null && user) {
          socket = new WebSocket(`${WSS_HISTORY_ORDER}?token=${formattedToken}`);
        }}
        if (socket) {
          socket.onopen = event => {
            dispatch(connectionSuccess());
          };
  
          socket.onerror = event => {
            dispatch(connectionError(event.target));
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData: IOrderMessageResponse = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
            dispatch(getMessage(restParsedData))
          };
  
          socket.onclose = event => {
            dispatch(connectionClosed())
          }
        }
  
        next(action);
      };
    }) as Middleware;
  };