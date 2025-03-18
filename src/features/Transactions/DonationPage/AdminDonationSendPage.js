import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import payment from "../../assets/payment.PNG";
import AdminHeader from "../../../admin/components/AdminHeader/AdminHeader";

export default function AdminDonationSendPage({ url }) {
  const history = useHistory();

  return (
    <div className="sharedDashboard">
      <div className="dashboardRow">
        <div className="dashboardContent">
          <div className="dashboardContentPanel donationSendContent ex_mar_all_24">
            <div>
              <p id="paragraphStyle" className="p_text p-2">
                {" "}
                Unlike other religious organizations that use donated tithes and
                offerings to support their paid clergy, the Spirit of Truth
                Native American Church does not have a paid clergy. All tithes
                and offerings are used to support the missions of the church. To
                assist us, some training courses will ask for a donation before
                you gain access. If you donate by mail or in other ways and want
                access to courses that require donations, please contact us with
                your request.
              </p>
            </div>

            <div className="content_title">
              <h5>Request for Donation</h5>
            </div>

            <div className="payment_buttons_group">
              <Button className="payment_btn1" variant="outlined">
                $50.00
              </Button>
              <Button className="payment_btn2" variant="outlined">
                $75.00
              </Button>
              <Button className="payment_btn3" variant="outlined">
                $100.00
              </Button>
              <Button className="payment_btn4" variant="outlined">
                $125.00
              </Button>
              <Button className="payment_btn5" variant="outlined">
                $150.00
              </Button>
            </div>

            <div>
              <hr style={{ margin: "60px 0 30px 0" }} />
            </div>

            <div className="payment_detail cus_font_payment">
              <h2>Payment Details</h2>
            </div>

            <div className="paymentImg">
              <img src={payment} alt="" />
            </div>

            <div>
              <Button className="submit_button" variant="contained">
                Submit
              </Button>
              <Button variant="outlined" className="back_button">
                Back
              </Button>
            </div>
          </div>

          <div className="p-3 ms-3">
            <p id="paragraphStyle" className="p_text">
              {" "}
              If you desire to send correspondence, please use the address
              below.
            </p>

            <p className="p_text">
              Spirit of Truth N.A.C.<br></br>
              P.O. Box 2045<br></br>
              Ava, MO 65608-2045<br></br>
              U.S.A.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
