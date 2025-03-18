import * as React from "react";
import payment from "../../assets/payment.PNG";
import Drala_Image from "../../assets/Drala_Image.png"

import PaypalButtonWrapper from "../../components/paypal/PaypalButtonWrapper";
import "./UserDonate.css";
import PayPalPayment from "components/paypal/PayPalPayment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DonationPage = ({ setPaymentStatusObjectOnParent }) => {
  const [paymentStatusObject, setPaymentObjectStatus] = React.useState(null);
  const [donationAmount, setDonationAmount] = React.useState(50);

  const setPaymentStatusState = (childPaymentStatusObjectState) => {
    setPaymentObjectStatus(childPaymentStatusObjectState);
  };

  React.useEffect(() => {
    if (setPaymentStatusObjectOnParent) {
      setPaymentStatusObjectOnParent(paymentStatusObject);
    }
  }, [paymentStatusObject]);
  return (
    <>
      <div className="dashboardContent">
        <div className="dashboardContentPanel donationSendContent ex_mar_all_24">
          <div>
            <p id="paragraphStyle" className="p_text p-2">
              {" "}
              Unlike other religious organizations that use donated tithes and
              offerings to support their paid clergy, the Spirit of Truth Native
              American Church does not have a paid clergy. All tithes and
              offerings are used to support the missions of the church. To
              assist us, some training courses will ask for a donation before
              you gain access. If you donate by mail or in other ways and want
              access to courses that require donations, please contact us with
              your request.
            </p>
          </div>

          <div className="content_title">
            <h5>Request for Donation</h5>
          </div>
          <div className="amount_buttons">
            <button
              onClick={() => setDonationAmount(50)}
              type="button"
              className="btn me-2 mb-3 amount_btn1"
            >
              $50.00
            </button>
            <button
              onClick={() => setDonationAmount(75)}
              type="button"
              className="btn me-2 mb-3 amount_btn2"
            >
              $75.00
            </button>
            <button
              onClick={() => setDonationAmount(100)}
              type="button"
              className="btn me-2 mb-3 amount_btn3"
            >
              $100.00
            </button>
            <button
              onClick={() => setDonationAmount(125)}
              type="button"
              className="btn me-2 mb-3 amount_btn4"
            >
              $125.00
            </button>
            <button
              onClick={() => setDonationAmount(150)}
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

          <div>
            <hr style={{ margin: "60px 0 30px 0" }} />
          </div>

          <div className="payment_detail cus_font_payment">
            <h2>Payment Details</h2>
          </div>

          <div className="flex justify-between">
            <div className="paymentImg">
              <img src={payment} alt="" />
            </div>

            <div className="w-[14%] h-[32%] mr-40 bg-transparent border border-gray-300 rounded">
              <img
                src={Drala_Image}
                alt="Drala Logo"
                className="object-fill w-full h-auto"
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
          </div>



          <div>
            <div className="payment_submit_buttons">
              <div className="flex justify-between">
                <h3 className="mt-2 mb-2">
                  Current donation amount : ${donationAmount}{" "}
                </h3>
                <h3 className="mt-2 mb-2 mr-32 flex flex-col">
                  Current donation amount : ${donationAmount *0.9}{" "}
                </h3>
              </div>

              <div className="w-full h-100 justify-center text-center align-center ">
                <PayPalPayment key={donationAmount} type="Donation" initialAmount={donationAmount}/>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 ms-3">
          <p id="paragraphStyle" className="p_text">
            {" "}
            If you desire to send correspondence, please use the address below.
          </p>

          <p className="p_text">
            Spirit of Truth N.A.C.<br></br>
            P.O. Box 2045<br></br>
            Ava, MO 65608-2045<br></br>
            U.S.A.
          </p>
        </div>
      </div>
    </>
  );
};

export default DonationPage;
