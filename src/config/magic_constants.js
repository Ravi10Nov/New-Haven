export const baseUrl = process.env.REACT_APP_BACKEND_URL;
export const UPLOADS_PATH = `http://${window.location.host}/${process.env.REACT_APP_UPLOADS_URL}`;
export const UPLOADS_PATH_ATTACHMENTS = process.env.REACT_APP_ATTACHMENT_URL;
export const SOCKETS_MAIN_HANDSHAKE_URI = process.env.REACT_APP_SOCKETS_PATH;
export const base_front_url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');

//console.log({'env':process.env,baseUrl,UPLOADS_PATH,UPLOADS_PATH_ATTACHMENTS,SOCKETS_MAIN_HANDSHAKE_URI})