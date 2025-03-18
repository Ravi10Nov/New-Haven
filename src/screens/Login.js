import VisibilityIcon from "@mui/icons-material/Visibility";

// import { VisibilityOff, Visibility } from '@material-ui/icons'
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CircularProgress } from "@mui/material";
import React, { useContext, useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

import { Link, useHistory } from "react-router-dom";
import welcomeImg from "../assets/welcomeImg.png";
import NavbarComp from "../components/navbar";
import TextInput from "../components/textInput";
import { logIn } from "./../services/userService";

import "../css/Authentication.css";
import ReCAPTCHA from "react-google-recaptcha";
import { ContextApi } from "../contexts/ContextProvider";
import { useAuth } from "hooks/useAuth";
import Loader from "components/Loader";

export default function Login() {
  const contextApi = useContext(ContextApi);
  const history = useHistory();

  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isformValid, setIsFormValid] = useState(false);

  const [PasswordShow, setPasswordShow] = useState(true);

  const [error, setError] = useState();
  const [iserror, setIsError] = useState(false);
  const [showAlert, setshowAlert] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const captchaRef = useRef(null);

  //const history = useHistory();

  const validateForm = (password, email) => {
    return password.length > 0 && email.length > 0;
  };
  const { loginUser, userStatus, setUserStatus, userEmail, userRole } =
    useAuth();

  async function userSignin() {
    setIsProcessing(true);

    if (re.test(email)) {
      try {
        // const captchaToken = captchaRef.current.getValue();
        //captchaRef.current.reset();
        const res = await loginUser(email, password);

        // console.log("res", res);
        // const isBlocked = res?.blocked ? res.blocked : false;
        // if (isBlocked) {
        //   setIsProcessing(false);
        //   toast.error(
        //     "Your account has been blocked. Please contact Admin from our Contact page to resolve this issue."
        //   );
        //   return;
        // }
        // await loginUser(email, password);
        if (
          res.success &&
          !res.user.isUserBlocked &&
          res.user.isEmailVerified
        ) {
          setIsError(false);
          setshowAlert(true);
          setshowAlert(false);
          toast.success("Successfully logged in!");
          console.log("second");

          //Admin
          if (res.user.role === "admin") {
            if (res.user.accountStatus === "finished") {
              res.user.isTwoFactorEnabled ? history.push("/admin-2fa") : history.push("/admins");
            } else history.push("/members");
          }

          //User
          else if (res.user.role === "user") {
            if (res.user.accountStatus === "finished") {
              history.push("/user-dashboard");
            } else history.push("/members");
          }

          //Instructor
          else if (res.user.role === "instructor") {
            if (res.user.accountStatus === "finished") {
              history.push("/instructors");
            } else history.push("/members");
          }
        } else if (res.success && res.user.isUserBlocked) {
          toast.error("Your account is blocked! Please contact admin");
        } else if (res.success && !res.user.isEmailVerified) {
          toast.error(
            "Your account is not yet verified! Please go to your email and click on the CONFIRM button and Sign In from there."
          );
        } else {
          toast.error("Login failed!");
        }

        setIsProcessing(false);

        setshowAlert(true);
        setTimeout(() => {
          setshowAlert(false);
          clearTimeout();
        }, 2000);
      } catch (error) {
        let errorMessage = "";
        let errorMessageToaster;
        console.log(error);
        // switch (error.response.status) {
        //   case 422:
        //     errorMessage = error.response.message;
        //     errorMessageToaster = "Login failed! Re-check your input.";
        //     break;
        //   case 500:
        //     errorMessageToaster = "Internal server error.";
        //     break;
        //   case 0:
        //     errorMessageToaster = "Check your network settings.";
        //     break;
        //   default:
        //     errorMessageToaster = "Unknown error.";
        //     break;
        // }
        setIsProcessing(false);
        console.log(errorMessage);
        if (typeof errorMessage !== "undefined") {
          setIsError(true);
          setError(errorMessage);
        }

        toast.error(errorMessageToaster);
        setshowAlert(true);
        setTimeout(() => {
          setshowAlert(false);
          clearTimeout();
        }, 2000);
        console.log(error);
      }
    } else {
      setIsError(true);
      setError("Please enter valid email");
      toast.error("Login failed!");
      setshowAlert(true);
      setTimeout(() => {
        setshowAlert(false);
        clearTimeout();
      }, 2000);
    }
  }

  React.useEffect(() => {
    console.log(contextApi.authInfo);
  }, [contextApi.authInfo]);

  React.useEffect(() => {
    setIsFormValid(validateForm(password, email));
  }, [password, email]);

  if (!isProcessing) {
    return (
      <div id="Top">
        <ToastContainer></ToastContainer>
        <NavbarComp />

        <div className="inner_screen_login">
          <div id="SignIn_rightPart">
            <div style={{ alignItems: "flex-start" }}>
              <br />
              <h4 id="ScreenSignin">Sign In</h4>
              <br />
              <p id="SignInWelcomeline">
                Welcome Back! Please login to your account.
              </p>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label id="ControlLabel" className="text-danger">
                  {" "}
                  Email – lowercase only
                </Form.Label>
                <TextInput
                  InputID="fromControlInput"
                  type="email"
                  placeholder="test@example.com"
                  value={email}
                  HandleChange={(e) =>
                    setEmail(e.target.value.trim().toLowerCase())
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label id="ControlLabel">Password</Form.Label>
                <TextInput
                  type={PasswordShow ? "password" : "text"}
                  InputID="fromControlInput"
                  placeholder="Enter your password."
                  value={password}
                  PasswordIcon={
                    PasswordShow ? <VisibilityOffIcon /> : <VisibilityIcon />
                  }
                  HideShow_Password={() => setPasswordShow(!PasswordShow)}
                  HandleChange={(e) => setPassword(e.target.value)}
                />
                {iserror && <Form.Text id="errorLine">{error}</Form.Text>}
              </Form.Group>

              {/* <div className="my-3">
                <ReCAPTCHA
                  // sitekey={process.env.RECAPTCHA_SITE_KEY}
                  sitekey="6LfWreQoAAAAACcUWtIzDgx7LjRlRhqoEA23xkSP"
                  ref={captchaRef}
                />
              </div> */}

              <Link to={{ pathname: "/ForgotPass" }} id="lostPassword">
                Forgot Password?
              </Link>

              <div className="inner_signIn_btn">
                <Button
                  id="signInBtn_Big"
                  onClick={() => {
                    userSignin();
                  }}
                  disabled={!isformValid}
                  style={{
                    background: isformValid ? "blue" : "white",
                  }}
                >
                  {isProcessing ? ( //isProcessing
                    <CircularProgress
                      style={{ height: "15px", width: "15px" }}
                      color="primary"
                    />
                  ) : (
                    <span>Sign In</span>
                  )}
                </Button>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <p id="NoAccount">Don’t have an account ?</p>
                <Link id="SignupNavigation" to={{ pathname: "/Signup" }}>
                  Sign Up
                </Link>
              </div>

              <hr style={{ border: "1px solid #C2C2C2" }} />
              {/* <Button id='SocialLoginGoogleBtn'>
                <img src={googleIcon} alt="" />
                Sign In with Google
              </Button> */}
            </div>
          </div>
          <div id="Sign_in_leftPart">
            <img
              src={welcomeImg}
              style={{ borderRadius: 20, width: "80%" }}
              alt=""
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}

/*

      {showAlert
        ? [
          iserror ? (
            <div
              id='ShowAlertBox'
              style={{ position: 'absolute', top: 100, right: 30 }}>
              <Alert
                text='Login failed'
                Icon={cross}
                clicked={() => setshowAlert(false)}
              />
            </div>
          ) : (
            <div
              id='ShowAlertBox'
              style={{ position: 'absolute', top: 100, right: 30 }}>
              <Alert
                text='Login Successful'
                Icon={Vector}
                clicked={() => setshowAlert(false)}
              />
            </div>
          ),
        ]
        : null}
*/
