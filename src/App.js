import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import NotFound from "./components/PageNotFound";

import RiseOfMedicalScreen from "./screens/RiseOfMedical";

import "./App.css";
import { ContextApi } from "./contexts/ContextProvider";
// Donation area start

// Screen area start
import AuthorityScreen from "./screens/Authority";
import ConstitutionScreen from "./screens/Constitution";
import ContactUsScreen from "./screens/ContactUs";
import CreateNewPassScreen from "./screens/CreateNewPass";
import EthicalScreen from "./screens/Ethical";
import FAQScreen from "./screens/FAQ";
import ForgotPassScreen from "./screens/ForgotPassword";
import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import SignupScreen from "./screens/Signup";
import Terms from "./screens/Terms";
import TermsOfService from "./screens/TermsOfService";
import IRSRecognitionLetter from "screens/IRS-recognition-letter";

import MemberProtectedRoute from "member/MemberProtectedRoute";
import { useContext, useEffect, useState } from "react";
import { refreshUser } from "services/userService";
// Screen area end
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import AdminDashboard from "admin/AdminDashboard/AdminDashboard";
import InstructorDashboard from "instructor/InstructorDashboard/InstructorDashboard";
import Verification from "screens/Verification";
import Yeshua from "screens/Yeshua";
import MemberDashboard from "member/MemberDashboard";
import VerifyEmailScreen from "screens/VerifyEmailRequest";
import VerifyingEmail from "screens/VerifyingEmail";
import Prejudices from "screens/prejudices";
import Admin2FA from "screens/Admin2FA";
import Setup2FA from "screens/Setup2FA";
import WaiverOfLiability from "screens/WaiverOfLiability";
import Directory from "screens/Directory";

function App() {
  // const [isLoading , setIsLoading ] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(ContextApi);

  const loadUser = async () => {
    try {
      const response = await refreshUser();
      console.log(response);
      context.setAuthInfo(response.data.data);
      console.log("response");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    //loadUser();
  }, []);

  if (!isLoading) {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className="App">
          <Router>
            <Switch>
              {/* front end  */}
              <Route exact path="/" component={HomeScreen} />

              <Route path="/admins" component={AdminDashboard}></Route>
              <Route path="/verification">
                <Verification isForNewEmail={true}></Verification>
              </Route>
              {/*unprotected routes*/}
              <Route path="/Signup" component={SignupScreen} />
              <Route
                exact
                path="/Signin/:verificationToken"
                component={VerifyingEmail}
              />
              <Route path="/Signin" component={LoginScreen} />
              <Route path="/admin-2fa" component={Admin2FA} />
              <Route path="/setup-2fa" component={Setup2FA} />
              <Route
                path="/Verify-Email/:email"
                component={VerifyEmailScreen}
              />
              <Route exact path="/ForgotPass" component={ForgotPassScreen} />
              <Route exact path="/ContactUs" component={ContactUsScreen} />
              <Route exact path="/FAQ" component={FAQScreen} />
              <Route exact path="/directory" component={Directory} />
              <Route exact path="/user-dashboard" component={MemberDashboard} />

              <Route
                exact
                path="/CreateNewPass/:verificationToken"
                component={CreateNewPassScreen}
              />

              <Route path="/members" component={MemberProtectedRoute}></Route>

              <Route
                path="/instructors"
                component={InstructorDashboard}
              ></Route>
              <Route
                exact
                path="/RiseofMedical"
                component={RiseOfMedicalScreen}
              />

              <Route exact path="/Authority" component={AuthorityScreen} />
              <Route exact path="/Yeshua" component={Yeshua} />
              <Route exact path="/prejudices" component={Prejudices} />
              <Route
                exact
                path="/Constitution"
                component={ConstitutionScreen}
              />
              <Route exact path="/IRS" component={IRSRecognitionLetter} />
              <Route exact path="/Ethical" component={EthicalScreen} />
              <Route exact path="/Terms" component={Terms}></Route>
              <Route
                exact
                path="/PrivacyPolicy"
                component={PrivacyPolicy}
              ></Route>
              <Route
                exact
                path="/WaiverOfLiability"
                component={WaiverOfLiability}
              ></Route>
              <Route
                exact
                path="/TermsOfService"
                component={TermsOfService}
              ></Route>
              <Route exact path="/NotFound" component={NotFound}></Route>

              <Route path="*">
                <NotFound></NotFound>
              </Route>
            </Switch>
          </Router>
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
