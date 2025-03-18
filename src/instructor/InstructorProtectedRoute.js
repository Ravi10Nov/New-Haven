 
import React, { useContext,useEffect,useState, Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from 'hooks/useAuth'

const InstructorPrivateRoute = (props) => {
    

  const { userRole } = useAuth();
    const [isLoading, setIsLoading ] = useState(true);
    const [status, setStatus ] = useState(null);
    useEffect(()=>{
        if( userRole && userRole === "instructor" ) {
          setStatus("instructor"); 
      }
      setIsLoading(false);

    },[userRole]
    )

    if(!isLoading){
         if(status && status == 'instructor') {
            return(<Route {...props} />)
         }else{
              console.log("Some error occured");
            return(
              
              <Redirect to="/SignIn" />
            )
          }
    }
    else{
      return <div>Loading....</div>
  }
}

export default InstructorPrivateRoute;
