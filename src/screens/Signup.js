
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
// import toast, { Toaster } from "react-hot-toast";
import Loader from "components/Loader";
import { useAuth } from "hooks/useAuth";
import { Link, useHistory } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { toast, ToastContainer } from "react-toastify";
import topbar from "topbar";
import joinImg from "../assets/joinImg.png";
import NavbarComp from "../components/navbar";
import TextInput from "../components/textInput";
import "../css/AuthSignUp.css";

export default function Signup() {
  const history = useHistory();
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const [email, setEmail] = useState();
  const [agree, setAgree] = useState(false);
  const [password, setPassword] = useState();
  const [Confpassword, setConfpassword] = useState();
  const [PasswordShow, setPasswordShow] = useState(true);
  const [ConfPasswordShow, setConfPasswordShow] = useState(true);

  const [error, setError] = useState();
  const [iserror, setIsError] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [showAlert, setshowAlert] = useState(false);

  const { createUser } = useAuth();

  const handleSignUp = async () => {
    const res = await createUser(email, password);
    return res;
  };

  async function userSignup() {
    setProcessing(true);
    if (re.test(email)) {
      if (password == Confpassword) {
        try {
          const res = await handleSignUp();
          if (res.error && res.error === "Email already exists") {
            setAgree(false);
            toast.error("Email already exists!");
          } else {
            toast.success("Successfully signed up! Now you should Sign In.");
            history.push(`/Verify-Email/${email}`);
          }
          setTimeout(() => {
            setIsError(false);
            setshowAlert(true);
            setProcessing(false);
          }, 1000);
        } catch (error) {
          // debugger
          let errors = error.response.data.errors;
          let errorMessage = [];
          for (const errorKey in errors) {
            if (errorKey == "email" && errors[errorKey].kind == "unique") {
              setAgree(false);
              errorMessage.push("email aleardy exists");
            }
          }
          console.log(errorMessage);
          setIsError(true);
          for (const error of errorMessage) {
            toast.error(error);
          }

          setshowAlert(true);
          setProcessing(false);
        }
      } else {
        setIsError(true);
        setError("Passwords and Confirm Password should be the same.");
        setshowAlert(true);
        setProcessing(false);
      }
    } else {
      setIsError(true);
      setError("Please enter valid email");
      setProcessing(false);
      setshowAlert(true);
    }
  }

  useEffect(() => {
    topbar.config({
      autoRun: false,
      barThickness: 3,
      barColors: {
        0: "rgba(26,  188, 156, .9)",
        ".25": "rgba(52,  152, 219, .9)",
        ".50": "rgba(241, 196, 15,  .9)",
        ".75": "rgba(230, 126, 34,  .9)",
        "1.0": "rgba(211, 84,  0,   .9)",
      },
      shadowBlur: 10,
      shadowColor: "rgba(0,   0,   0,   .6)",
    });
    topbar.show();
    (function step() {
      setTimeout(function () {
        if (topbar.progress("+.01") < 1) step();
      }, 30);
    })();

    setTimeout(() => {
      // setLoading(false);
      topbar.hide();
    }, 3000);
  }, [isProcessing]);

  if (!isProcessing) {
    return (
      <div id="Top">
        {true && (
          <>
            {/* <Toaster position="top-right" reverseOrder={false} /> */}
            <ToastContainer></ToastContainer>
            <NavbarComp />
            <div
              className="Reg_Container"
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <div id="Register_rightPart">
                <div style={{ alignItems: "flex-start" }}>
                  <h4 id="RegSignin">Join</h4>
                  <p id="RegWelcomeline" className="p_text">
                    Please sign up to create your account.
                  </p>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label id="ControlLabel" className="text-danger">
                      Email – lowercase only
                    </Form.Label>
                    <TextInput
                      InputID="fromControlInput"
                      type="email"
                      placeholder="test@example.com"
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
                      PasswordIcon={
                        PasswordShow ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )
                      }
                      HideShow_Password={() => setPasswordShow(!PasswordShow)}
                      HandleChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label id="ControlLabel">Confirm Password</Form.Label>
                    <TextInput
                      type={ConfPasswordShow ? "password" : "text"}
                      InputID="fromControlInput"
                      placeholder="Confirm Password."
                      PasswordIcon={
                        ConfPasswordShow ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )
                      }
                      HideShow_Password={() =>
                        setConfPasswordShow(!ConfPasswordShow)
                      }
                      HandleChange={(e) => setConfpassword(e.target.value)}
                    />
                    {iserror && <Form.Text id="errorLine">{error}</Form.Text>}
                  </Form.Group>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                    }}
                  >
                    <Form.Check
                      className="reg_checkbox"
                      style={{ marginTop: 15 }}
                      type={"checkbox"}
                      id={"checkbox"}
                      onChange={() => setAgree((agree) => !agree)}
                    />{" "}
                    {console.log("aggress", agree)}
                    <span className="ms-2">
                      I agree to the Church’s{" "}
                      <HashLink className="text-blue-500" to="/TermsOfService#Top">
                        Terms of Service
                      </HashLink>
                       ,
                      <HashLink className="text-blue-500" to="/PrivacyPolicy#Top">
                      {" "}Privacy Policy{" "}
                      </HashLink>{" "}
                      {/* and{" "} */}
                      <br />
                      and{" "}
                      <HashLink className="text-blue-500" to="/WaiverOfLiability#Top">
                        Waiver of Liability{" "}
                      </HashLink>
                      .
                    </span>
                  </div>

                  <Button
                    id="Reg_SigninBtn_Big"
                    className="bg-blue-600"
                    onClick={() => userSignup()}
                    disabled={
                      agree &&
                        email &&
                        re.test(email) &&
                        password &&
                        Confpassword
                        ? false
                        : true
                    }
                    style={{
                      background:
                        email && re.test(email) && password && Confpassword
                          ? "#18498B"
                          : "#BDBDBD",
                    }}
                  >
                    {isProcessing ? (
                      <CircularProgress
                        style={{ height: "15px", width: "15px" }}
                        color="primary"
                      />
                    ) : (
                      "Join"
                    )}
                  </Button>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p id="NoAccount">Already have an account?</p>
                    <Link id="RegSignupNavigation" to={{ pathname: "/Signin" }}>
                      Login
                    </Link>
                  </div>

                  <hr style={{ border: "1px solid #C2C2C2" }} />
                  {/* <Button id='RegSocialLoginBtn'>
                    <img src={googleIcon} alt="" />
                    Sign In with Google
                  </Button> */}
                </div>
              </div>
              <div id="Register_leftPart">
                <img
                  src={joinImg}
                  style={{ borderRadius: 20, width: "80%" }}
                  alt=""
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  } else {
    return <Loader />;
  }
}
