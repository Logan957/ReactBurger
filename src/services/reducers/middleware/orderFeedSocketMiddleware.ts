import type { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { IOrderMessageResponse } from '../../types/message-type';
import { TAppDispatch, TRootState } from '../../types/reducer-type';
import { connectionClosed, connectionError, connectionSuccess, getMessage } from '../slices/order-feed-slice';
import { WSS_FEED_ORDER} from '../../constants/constant';


export const orderFeedSocketMiddleware = (): Middleware => {
  
    return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
      let socket: WebSocket | null = null;
      return next => (action: AnyAction) => {
        const { dispatch } = store;
        if (socket == null) {
          socket = new WebSocket(`${WSS_FEED_ORDER}`);
        }
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