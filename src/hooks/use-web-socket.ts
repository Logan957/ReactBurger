import { useRef } from 'react';
import { connectionClosed, connectionError, connectionSuccess, getMessage } from '../services/reducers/slices/ws-slice';
import { useAppDispatch } from "./use-app-dispatch";
import { IOrderMessageResponse } from '../services/types/message-type';


export const useWebSocket = () => {
  const dispatch = useAppDispatch();
  const ws = useRef<WebSocket | null>(null);

  const connect = (url: string) => {
    ws.current = new WebSocket(url);

    ws.current.onopen = (e: Event) => {
      dispatch(connectionSuccess());
    };

    ws.current.onmessage = (e: MessageEvent<string>) => {
      const { data } = e;
      const parsedData: IOrderMessageResponse = JSON.parse(data);
      const { success, ...restParsedData } = parsedData;
      dispatch(getMessage(restParsedData))
    };

    ws.current.onerror = (e: Event) => {
      dispatch(connectionError(e.target));
    };

    ws.current.onclose = (e: CloseEvent) => {
      dispatch(connectionClosed());
    };
  };

  const closeWs = () => {
    ws.current?.close();
  };

  return { connect, closeWs };
};