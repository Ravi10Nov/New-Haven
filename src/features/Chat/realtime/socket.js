import io from  'socket.io-client';
import { SOCKETS_MAIN_HANDSHAKE_URI } from '../../../config/magic_constants';

const CHATS_NAMESPACE_ENDPOINT = `/chats`;

const connectionObject  = {
  withCredentials: true,
  path: SOCKETS_MAIN_HANDSHAKE_URI
};

export const connectSocket = () => { return io(CHATS_NAMESPACE_ENDPOINT || "",connectionObject) };
