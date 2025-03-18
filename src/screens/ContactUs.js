import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { sendContact } from "services/userService";
import topbar from "topbar";
import ContactUs from "../assets/ContactUs.png";
import ContactUsSecond from "../assets/ContactUsSecond.png";
import Footer from "../components/footer";
import NavbarComp from "../components/navbar";
import "../css/Contactus.css";
import { ToastContainer, toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

export default function Home() {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [subject, setsubject] = useState("");
  const [message, setMessage] = useState("");
  const [isFormValid, settIsFormValid] = useState();
  const captchaRef = useRef(null);
  const [isLoading, setLoading] = useState(true);

  const validateForm = (name, email, phone, subject, message) => {
    if (name && email && phone && subject && message) {
      const isValid =
        name.length > 0 &&
        email.length > 0 &&
        phone.length > 0 &&
        subject.length > 0 &&
        message.length > 0 &&
        re.test(email);
      console.log(isValid);
      return isValid;
    }

    return false;
  };

  useEffect(() => {
    settIsFormValid(validateForm(name, email, phone, subject, message));
  }, [name, email, phone, subject, message]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      phone: phone,
      subject: subject,
      message: message,
      name: name,
    };

    try {
      setLoading(true);
      const captchaToken = captchaRef.current.getValue();
      captchaRef.current.reset();
      const response = await sendContact(data, captchaToken);
      console.log("response", response);
      toast.success("Your email has been sent.");
      // setLoading(false);
      setEmail("");
      setname("");
      setphone("");
      setsubject("");
      setMessage("");
    } catch {
      toast.error("There was an error try again! ");
    } finally {
      setLoading(false);
    }
  };

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
  });

  return (
    <div id="Top">
      {true && (
        <>
          <NavbarComp />
          <img
            src={ContactUs}
            style={{ height: "450px" }}
            className="CntUs"
            alt="img"
          />
          <Container
            id="ContactUs_parentDiv"
            style={{ padding: 20, paddingTop: "100px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <ToastContainer />
              {/* Contact Form */}
              <Form className="col-lg-6" id="ContactusForm">
                <div className="SendMessageTextHeader">
                  <p id="SendMessageText">Send us a message.</p>
                </div>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextName"
                >
                  <Form.Label column sm="4">
                    Your Name
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      placeholder="Your Name"
                      onChange={(e) => setname(e.target.value)}
                      value={name}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextEmail"
                >
                  <Form.Label column sm="4">
                    Your Email
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextNmuber"
                >
                  <Form.Label column sm="4">
                    Your Telephone Number
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      placeholder="Your Telephone Number"
                      onChange={(e) => setphone(e.target.value)}
                      value={phone}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextSubject"
                >
                  <Form.Label column sm="4">
                    Subject
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      placeholder="Subject"
                      onChange={(e) => setsubject(e.target.value)}
                      value={subject}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextArea"
                >
                  <Form.Label column sm="4">
                    Your Message
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      as="textarea"
                      placeholder="Enter your Message"
                      rows={3}
                      contact
                      page
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                    />
                  </Col>
                </Form.Group>

                <div className="my-3">
                  <ReCAPTCHA
                    // sitekey={process.env.RECAPTCHA_SITE_KEY}
                    sitekey="6LeZ_cYpAAAAAEhEjt2ucYuIZuUfU6HNmCKgtwPM"
                    ref={captchaRef}
                  />
                </div>

                <button
                  id="signinBtn_Big"
                  onClick={(event) => handleSubmit(event)}
                  disabled={isFormValid ? false : true}
                  style={{
                    width: "100%",
                    margin: "0 auto",
                    background: isFormValid ? "#18498B" : "#BDBDBD",
                    borderRadius: "10px",
                    padding: "10px",
                    color: "#FFFFFF",
                    border: "none",
                  }}
                >
                  Submit
                </button>
              </Form>

              <div className="col-lg-6" id="ContactUs_ImgBox">
                <img
                  src={ContactUsSecond}
                  style={{
                    width: "100%",
                    maxHeight: "540px",
                    paddingLeft: "30px",
                  }}
                  alt=""
                />
              </div>
            </div>
            <br />
            <b>Spirit of Truth N.A.C.</b>
            <br />
            <b>P.O. Box 2045</b>
            <br />
            <b>Ava, MO 65608</b>
            <br />
            <b>U.S.A.</b>
            <br />
            <br />
            <p className="p_text">
              If you desire to send in correspondence, please use the address
              above.
            </p>
          </Container>
          <Footer />
        </>
      )}
      {/* {isLoading && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, height: "90vh" }}>
                <img src={loader} style={{ width: 300 }}/>
            </div>} */}
    </div>
  );
}
