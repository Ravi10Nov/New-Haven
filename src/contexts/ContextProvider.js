import React, { createContext } from "react";
import { connectSocket } from "features/Users/realtime/socket";

let socket;
export const ContextApi = createContext();

const ContextProvider = ({ children }) => {
  const [isSideBarOpen, setSidebarOpen] = React.useState(false);
  const [authInfo, setAuthInfoAuth] = React.useState({
    isAuthenticated: false,
  });
  const [notification, setNotification] = React.useState(0);
  const setAuthInfo = async (state) => {
    if (state.name && !state.isAuthenticated) {
      socket = connectSocket();
      socket.on("updated_notification", (response) => {
        console.log("updated_notification", response);
        setNotification(Number(response));
      });
      socket.emit("getNotification", "empty");

      setAuthInfoAuth({ ...state, isAuthenticated: true });
      return;
    }
    setAuthInfoAuth(state);
  };

  const destroyContext = () => {
    socket.close();
    socket = null;
    setAuthInfoAuth({ isAuthenticated: false });
    setNotification(0);
  };

  const data = {
    isSideBarOpen,
    setSidebarOpen,
    notification,
    destroyContext,
    authInfo,
    setAuthInfo,
  };
  return <ContextApi.Provider value={data}>{children}</ContextApi.Provider>;
};

export default ContextProvider;
