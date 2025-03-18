import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ContextApi } from "../contexts/ContextProvider";
import StepperArea from "../donation/StepperArea/StepperArea";
import VerificationScreen from "../screens/Verification";
import NotFound from "../components/PageNotFound";
import MemberDashboard from "./MemberDashboard";
import { useAuth } from "hooks/useAuth";

const MemberProtectedRoute = () => {
  const contextApi = useContext(ContextApi);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [newEamil, setNewEmail] = useState(null);

  const { userStatus } = useAuth();

  useEffect(() => {
    if (
      typeof contextApi.authInfo.account_status !== "undefined" &&
      typeof contextApi.authInfo.email !== "undefined"
    ) {
      if (contextApi.authInfo.account_status == "completed") {
        setStatus(contextApi.authInfo.isDonated ? "donated" : "not_donated");
      } else {
        setStatus(contextApi.authInfo.account_status);
      }
    }
    setIsLoading(false);
  }, [contextApi.authInfo]);

  useEffect(() => {
    // debugger
    if (userStatus) setIsLoading(false);
  }, [userStatus]);

  const RedirectDependingOnUserState = (userStatus) => {
    let action;
    console.log(userStatus); // Log the userStatus
    switch (userStatus) {
      case "not_active":
        console.log("User status: not_active");
        action = (
          <Redirect exact to="/members/OTP" component={VerificationScreen} />
        );
        break;
      case "active":
        console.log("User status: active");
        action = (
          <Redirect to="/members/StepperArea?step=0" component={StepperArea} />
        );
        break;
      case "profile_created":
        console.log("User status: profile_created");
        action = (
          <Redirect to="/members/StepperArea?step=1" component={StepperArea} />
        );
        break;
      case "terms_agreed":
        console.log("User status: terms_agreed");
        action = (
          <Redirect to="/members/StepperArea?step=2" component={StepperArea} />
        );
        break;
      case "donation_complete":
        console.log("User status: donation_complete");
        action = (
          <Redirect to="/members/StepperArea?step=3" component={StepperArea} />
        );
        break;
      case "finished":
        console.log("User status: finished");
        action = <Redirect to="/members/dashboard" />;
        break;
      default:
        console.log("User status: default");
        action = <Redirect to="/SignIn" />;
        break;
    }
    return action;
  };

  const exposedRoutes = (userStatus) => {
    let action;
    console.log("userStatus", userStatus);
    switch (userStatus) {
      case "not_active":
        action = (
          <Route exact path="/members/OTP" component={VerificationScreen} />
        );
        break;
      case "active":
        action = <Route path="/members/StepperArea" component={StepperArea} />;
        break;
      case "profile_created":
        action = <Route path="/members/StepperArea" component={StepperArea} />;
        break;
      case "terms_agreed":
        action = <Route path="/members/StepperArea" component={StepperArea} />;
        break;
      case "donation_complete":
        action = <Route path="/members/StepperArea" component={StepperArea} />;
        break;
      case "finished":
        action = <Route path="/members" component={MemberDashboard} />;
        break;
      default:
        action = <Redirect to="/SignIn" />;
        break;
    }
    return action;
  };

  //conditional exposed routes
  const routingDependingOnUserState = (userStatus) => {
    return exposedRoutes(userStatus);
  };

  if (!isLoading) {
    return (
      <Switch>
        <Route
          exact
          path="/members"
          component={() => RedirectDependingOnUserState(userStatus)}
        />
        {routingDependingOnUserState(userStatus)}
        <Route path="*" component={NotFound} />
      </Switch>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default MemberProtectedRoute;
