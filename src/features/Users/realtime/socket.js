import io from  'socket.io-client';
import { SOCKETS_MAIN_HANDSHAKE_URI } from '../../../config/magic_constants';

const QUIZZES_NAMESPACE_ENDPOINT = `/users`;

const connectionObject  = {
  withCredentials: true,
  path: SOCKETS_MAIN_HANDSHAKE_URI
};


export const connectSocket = () => { return io(QUIZZES_NAMESPACE_ENDPOINT || "",connectionObject) };
 