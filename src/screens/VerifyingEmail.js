// import Loader from "components/Loader";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// function VerifyingEmail() {
//   const { verificationToken } = useParams();
//   const history = useHistory();
//   useEffect(async () => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/auth/verify-email/:verificationToken`,
//         { verificationToken }
//       );

//       console.log("response", response);
//       history.push("/Signin");
//     } catch (error) {
//       console.log("couldnt verify token", error);
//       toast.error("couldnt verify token");
//     }
//   });

//   return (
//     <div className=" flex items-center justify-end">
//       <Loader />
//     </div>
//   );
// }

// export default VerifyingEmail;
import VisibilityIcon from "@mui/icons-material/Visibility";

// import { VisibilityOff, Visibility } from '@material-ui/icons'
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CircularProgress } from "@mui/material";
import React, { useContext, useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

import { Link, useHistory, useParams } from "react-router-dom";
import welcomeImg from "../assets/welcomeImg.png";
import NavbarComp from "../components/navbar";
import TextInput from "../components/textInput";
import { logIn } from "./../services/userService";

import "../css/Authentication.css";
import ReCAPTCHA from "react-google-recaptcha";
import { ContextApi } from "../contexts/ContextProvider";
import { useAuth } from "hooks/useAuth";
import Loader from "components/Loader";
import axios from "config/axios";

export default function VerifyingEmail() {
  const contextApi = useContext(ContextApi);
  const history = useHistory();

  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isformValid, setIsFormValid] = useState(false);

  const { setUserEmail, setUser, setUserStatus } = useAuth();

  const loginUser = async (email, password, captchaToken) => {
    try {
      const userData = { email, password, captchaToken };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        userData
      );
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setUserEmail(response.data.user.email);
        setUser(response.data.user);

        setUserStatus("active");

        return { success: true, user: response.data.user };
      } else return { success: false };
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const [PasswordShow, setPasswordShow] = useState(true);

  const [error, setError] = useState();
  const [iserror, setIsError] = useState(false);
  const [showAlert, setshowAlert] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const captchaRef = useRef(null);
  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  //const history = useHistory();

  const validateForm = (password, email) => {
    return password.length > 0 && email.length > 0;
  };

  const handleCaptchaChange = (value) => {
    setCaptchaCompleted(true);
  };

  const { verificationToken } = useParams();
  async function userSignin() {
    setIsProcessing(true);

    if (re.test(email)) {
      try {
        const captchaToken = captchaRef.current.getValue();
        captchaRef.current.reset();

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/verify-email/${verificationToken}`
        );
        const res = await loginUser(email, password, captchaToken);
        console.log(response);

        if (
          res.success &&
          !res.user.isUserBlocked &&
          res.user.isEmailVerified
        ) {
          setIsError(false);
          setshowAlert(true);
          setshowAlert(false);
          // toast.success("Successfully logged in!");

          //Admin
          if (res.user.role === "admin") {
            if (res.user.accountStatus === "finished") {
              history.push("/admins");
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
        } else if (!response.data.user.isEmailVerified) {
          toast.error(
            "Please verify your email before logging in to your account."
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

  // React.useEffect(() => {
  //   console.log(contextApi.authInfo);
  // }, [contextApi.authInfo]);

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
                  HandleChange={(e) => setEmail(e.target.value)}
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

              <div className="my-3">
                <ReCAPTCHA
                  sitekey="6LeZ_cYpAAAAAEhEjt2ucYuIZuUfU6HNmCKgtwPM"
                  // sitekey="6LfWreQoAAAAACcUWtIzDgx7LjRlRhqoEA23xkSP"
                  ref={captchaRef}
                  onChange={handleCaptchaChange}
                />
              </div>

              <Link to={{ pathname: "/ForgotPass" }} id="lostPassword">
                Forgot Password?
              </Link>

              <div className="inner_signIn_btn">
                <Button
                  id="signInBtn_Big"
                  onClick={() => {
                    userSignin();
                  }}
                  disabled={!captchaCompleted || !isformValid}
                  style={{
                    background:
                      isformValid && captchaCompleted ? "blue" : "white",
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
