import React, { useContext, useEffect, useState, Component } from "react";
import { Route, Redirect } from "react-router-dom";
// import { ContextApi } from '../contexts/ContextProvider'
import { useAuth } from "hooks/useAuth";

const PrivateRoute = (props) => {
  const { userRole } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(null);
  //const contextApi = useContext(ContextApi)
  useEffect(() => {
    // if( contextApi.authInfo.role && contextApi.authInfo.role == 'admin' ) {
    //     if(!contextApi.authInfo.new_email){
    //         setStatus('admin');
    //     }
    // }

    // console.log("Inside useEffect of admin ",userRole);
    if (userRole && userRole === "admin") {
      setStatus("admin");
    }
    setIsLoading(false);
  }, [userRole]);

  if (!isLoading) {
    if (status && status === "admin") {
      return <Route {...props} />;
    } else {
      return <Redirect to="/SignIn" />;
    }
  } else {
    return <div>Loading....</div>;
  }
};

export default PrivateRoute;
