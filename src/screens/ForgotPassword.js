import React, { useState } from "react";
import axios from "axios";
import "../css/ForgotPass.css";
import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import logo from "../assets/logo.png";
import { Link, useHistory } from "react-router-dom";
import forgotpass from "../assets/forgotpass.png";
import TextInput from "../components/textInput";
import NavbarComp from "../components/navbar";
import Loader from "components/Loader";
import { toast, ToastContainer } from "react-toastify";

import { forgetPassword } from "services/userService";
// import ReactCodeInput from 'react-verification-code-input';
import { useAuth } from "hooks/useAuth";

export default function ForgotPass() {
  const origin = window.location.origin;
  const [VerificationCode, SetVerificationCode] = useState(null);
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { sendPasswordResetMail } = useAuth();
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const handleSubmit = async () => {
    try {
      // setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/forgetpassword-email`,
        { email, origin }
      );
      // setIsLoading(false);
      toast.success("An email has been sent to reset password.");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Please enter valid email address!");
      } else if (error.response && error.response.status === 500) {
        toast.error("Failed to send email!");
      }
    }
  };

  if (!isLoading) {
    return (
      <div>
        <NavbarComp />
        <ToastContainer></ToastContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <img
            src={forgotpass}
            style={{ maxWidth: "140px", height: 140, borderRadius: 10 }}
          />
          <p id="forgotPassTxt">Forgot Password</p>
          <span id="ForgotTxt">Enter in your email to reset password.</span>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            style={{ marginTop: 20 }}
            id="AdditionalID"
          >
            <Form.Label id="ControlLabel" className="text-danger">Email – lowercase only.</Form.Label>
            <TextInput
              InputID="fromControlInput"
              type="email"
              placeholder="test@example.com"
              HandleChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button
            id="SubmitBtn"
            style={{ background: re.test(email) ? "#18498B" : "#BDBDBD" }}
            disabled={re.test(email) ? false : true}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}
