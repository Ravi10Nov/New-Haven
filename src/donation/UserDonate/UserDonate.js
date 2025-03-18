import { ButtonGroup } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import * as React from "react";
import modalImg from "../../assets/modal.png";
import PaypalButtonWrapper from "../../components/paypal/PaypalButtonWrapper";
import donationBanner from "./../../assets/donationBanner.png";
import paypal from "./../../assets/payment.PNG";
import Drala_Image from "./../../assets/Drala_Image.png";
import "./UserDonate.css";
import PayPalPayment from "components/paypal/PayPalPayment";

const UserDonate = ({
  handleNext,
  setUserOrderId,
  setPaymentStatusObjectOnParent,
  userOrderId,
}) => {
  const [open, setOpen] = React.useState(false);
  const [paymentStatusObject, setPaymentObjectStatus] = React.useState(null);
  const [donationAmount, setDonationAmount] = React.useState(50);
  const [checkOut, setCheckOut] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const setPaymentStatusState = (childPaymentStatusObjectState) => {
    setPaymentObjectStatus(childPaymentStatusObjectState);
  };

  const handlePaymentAmountSelect = (amount) => {
    setDonationAmount(amount);
    setCheckOut(true);
  };

  React.useEffect(() => {
    if (setPaymentStatusObjectOnParent) {
      setPaymentStatusObjectOnParent(paymentStatusObject);
    }
  }, [paymentStatusObject]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const handlePayment = () => {};
  return (
    <div className="donation_container">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box>
            <div class="min-w-[350px] ">
              <img
                src={modalImg}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "80%",
                  height: "80%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                }}
                alt="adoption_form"
                className="object-contain w-auto "
              />
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className="container donation_content">
        <div className="inner_content">
          <div className="donation_banner">
            <img className="img-fluid" src={donationBanner} alt="" />
          </div>

          <div className="donation_detail">
            <div className="donation_title">
              <h3></h3>
            </div>

            <div className="donation_text">
              <p>
                To support the Spiritual Adoption process, we request all new
                members donate $50.00 or more at this time. If you would rather
                fill out the Spiritual Adoption Form in person or donate any
                other item or amount, please print and fill out the Adoption
                Form below. We do not have a paid clergy so all offerings go
                directly to paying the Church’s expenses and moving forward the
                Missions of the Church.{" "}
              </p>
            </div>

            <div className="donation_text">
              <h3>
                Once your donation has been made, please click on the NEXT button below.
              </h3>
            </div>

            <div className="amount_buttons">
              <button
                onClick={() => handlePaymentAmountSelect(50)}
                type="button"
                className="btn me-2 mb-3 amount_btn1"
              >
                $50.00
              </button>
              <button
                onClick={() => handlePaymentAmountSelect(75)}
                type="button"
                className="btn me-2 mb-3 amount_btn2"
              >
                $75.00
              </button>
              <button
                onClick={() => handlePaymentAmountSelect(100)}
                type="button"
                className="btn me-2 mb-3 amount_btn3"
              >
                $100.00
              </button>
              <button
                onClick={() => handlePaymentAmountSelect(125)}
                type="button"
                className="btn me-2 mb-3 amount_btn4"
              >
                $125.00
              </button>
              <button
                onClick={() => handlePaymentAmountSelect(150)}
                type="button"
                className="btn me-2 mb-3 amount_btn5"
              >
                $150.00
              </button>
              <button
                onClick={() => setDonationAmount(200)}
                type="button"
                className="btn me-2 mb-3 amount_btn6"
              >
                $200.00
              </button>
            </div>
          </div>

          <div>
            <hr />
          </div>

          <div className="payment_details">
            <div className="payment_title">
              <h2 className="">Payment Details</h2>
            </div>
            <div className="">
              <div className="flex justify-between ml-4">
                <div className="payment_img">
                  <img src={paypal} alt="" />
                </div>

                <div className="w-[18%] h-[32%] mr-40 bg-transparent border border-gray-300 rounded">
                  <img
                    src={Drala_Image}
                    alt="Drala Logo"
                    className="object-fill w-full h-auto"
                    style={{ backgroundColor: 'transparent' }}
                  />
                </div>
              </div>

              {/*<div className='paypal_title'>
              PayPal
            </div>
            */}
              <br></br>
            </div>
            <div className="payment_submit_buttons">
              <div className="flex justify-between">
                <h3 className="mt-2 mb-2">
                  Current donation amount : ${donationAmount}{" "}
                </h3>
                <h3 className="mt-2 mb-2 mr-32">
                  Current donation amount : ${donationAmount * 0.9}{" "}
                </h3>
              </div>

              {/* <div className="w-2/6 h-100 justify-center text-center align-center " ><PaypalButtonWrapper type={'donation'} id={0} initialAmount={ donationAmount } setPaymentStatusOnParent={ setPaymentStatusState }  /></div> */}

              <div className="w-full h-100 justify-center text-center align-center">
                <PayPalPayment
                  key={donationAmount}
                  type="Donation"
                  userOrderId={userOrderId}
                  setUserOrderId={setUserOrderId}
                  initialAmount={donationAmount}
                />
              </div>
            </div>
          </div>

          <div>
            <hr />
          </div>

          <div className="adoption_content">
            <h4 className="ml-6">
              <div className="  items-start flex-col gap-2">
                <div className="adoption_button   mt-0 w-3/4   items-start justify-center">
                  <button
                    onClick={handleOpen}
                    type="button"
                    className="btn me-5 adoption_btn justify-self-center align-self-center text-center"
                  >
                    Adoption Form
                  </button>
                </div>
                <span className="w-1/4">Spirit of Truth NAC</span>
                <br /> P.O. Box 2045 <br /> Ava, MO 65608 <br /> U.S.A.
              </div>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDonate;
