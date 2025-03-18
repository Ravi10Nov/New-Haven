import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DownloadOutlined, Print } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import { useAuth } from "hooks/useAuth";
// import { dayMonthYear } from "helpers/Date";
import { base_front_url } from "config/magic_constants";
import axios from "config/axios";
import backSealBuffer from "assets/ID_CARD/Asset 5.png";
import frontSealBuffer from "assets/ID_CARD/Asset 4.png";
import { generateIDCard } from "./GenerateIDCard";
import "./AdminSettingsID.css";

export const IDcard = () => {
  const [newUserDetails, setNewUserDetails] = useState({});
  const componentRef = React.useRef();
  const backSeal = `${base_front_url}${backSealBuffer}`;
  const frontSeal = `${base_front_url}${frontSealBuffer}`;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownload = () => {
    generateIDCard(newUserDetails, backSeal, frontSeal);
  };

  const { userDetails } = useAuth();
  const email = userDetails?.email;
  const user = userDetails?.user;

  const dayMonthYear = (d) => {
    // Parse the date in UTC
    const parsedDate = new Date(d);

    // Extract the date components in UTC
    let ye = parsedDate.getUTCFullYear();
    let mo = new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' }).format(parsedDate);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit', timeZone: 'UTC' }).format(parsedDate);

    return `${da}-${mo}-${ye}`;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/get-profile`,
          { email }
        );
        setNewUserDetails(response.data.profile);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchProfile();
  }, [email]);

  return (
    <div className="container-fluid">
      <div className="bg-white px-3">
        <div className="dashboardContentPanel">
          <div className="id-card">
            <p className="a_d_title_clr">ID Card</p>
          </div>
          <div>
            <hr />
          </div>
          <div>
            <Button
              onClick={handleDownload}
              style={{
                background: "#18498B",
                borderRadius: "2px",
                margin: "5px",
                color: "#FFFFFF",
              }}
            >
              Download
              <DownloadOutlined />
            </Button>
            <Button
              onClick={handlePrint}
              style={{
                backgroundColor: "#34A853",
                color: "white",
                borderRadius: "2px",
                margin: "5px",
              }}
            >
              Print
              <Print />
            </Button>
          </div>
          <div
            className="mx-auto my-10"
            ref={componentRef}
            style={{
              width: "309.375px",
              height: "378px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              marginBottom: "20px",
            }}
          >
            {/* Front of the card */}
            <div className="w-full h-[50%] flex flex-row border-2 border-black overflow-hidden">

              <div className="h-[120%] w-[43%] flex flex-col -mt-4">
                <img
                  src={newUserDetails?.image}
                  className="mx-auto mt-6"
                  alt="User"
                  style={{
                    height: "50%",
                    width: "82%",
                    objectFit: "containr",
                    borderRadius: "5px",
                  }}
                />
                <img
                  src={backSeal}
                  className="h-[23%] w-[45%] mx-auto mt-2"
                  alt="Back Seal"
                />
              </div>

              <div className="w-[70%] flex flex-col">
                <h3
                  className="mt-1 text-left p-0 m-0"
                  style={{ fontSize: "1.2rem" }}
                >
                  Spirit of Truth
                </h3>
                <h6
                  className="mt-1 text-left text-style font-light p-0 m-0 underline underline-offset-4"
                  style={{ fontSize: "0.9rem" }}
                >
                  Native American Church
                </h6>
                <div className="!relative mt-[3px]">
                  <h4
                    className="text-start !font-extralight p-0 m-0"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {newUserDetails?.spiritualname || "\u00A0"}
                  </h4>
                  <h4
                    // className="text-start font-light text-style p-0 m-0"
                    className="text-start font-light p-0 m-0"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {`${newUserDetails?.firstname} ${newUserDetails?.middlename} ${newUserDetails?.lastname}`}
                  </h4>
                  <h4
                    className="text-start font-light p-0 m-0"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {newUserDetails?.addressline1}
                  </h4>
                  <h4
                    className="text-start font-light p-0 m-0"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {newUserDetails?.addressline2 || "\u00A0"}
                  </h4>
                  <h4
                    className="text-start font-light p-0 m-0 ml-4"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {`${newUserDetails?.city}, ${newUserDetails?.state}`}
                  </h4>
                  <h4
                    className="text-start font-light p-0 m-0 max-w-[110px] overflow-hidden"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {newUserDetails?.zipcode}
                  </h4>
                </div>
                {newUserDetails?.birthdate && (
                  <h4
                    className="text-center font-mono font-medium p-0 mb-2 mt-auto justify-self-end ml-14"
                    style={{ fontSize: "0.8rem" }}
                  >
                    DOB: {dayMonthYear(newUserDetails.birthdate)}
                  </h4>
                )}
              </div>
            </div>
            {/* Back of the card */}
            <div className="w-full rotate-180 h-[50%] border-2 border-t-0 border-black font-normal text-black overflow-visible">
              <div className="p-2" style={{ position: "relative" }}>
                <p
                  style={{ fontSize: "0.61rem" }}
                  className="rotate m-0 p-0 text-black"
                >
                  Our members are legally recognized as "Indian" under
                  U.S. Federal law and are authorized to perform all
                  religious ordinances and ceremonies associated with
                  their sacred calling. This includes the use of all plants,
                  animals, stones, feathers, and other Sacred Objects.
                  As a result of our sincerely held religious beliefs, our
                  members are exempt from practices such as PCR
                  swabs, immunizations, harmful masks, and other
                  medical "treatments" that conflict with those beliefs.
                  We expect our civil and Indigenous rights to be fully
                  respected and upheld by all peoples & governments.
                  Governing Laws: UDHR and NAFERA 1993.

                </p>
                {/* <img
                  className="!float-right h-[46px] w-13 -mt-2 !relative"
                  src={frontSeal}
                  alt="Front Seal"
                /> */}
                {/* <p
                  style={{ fontSize: "0.64rem" }}
                  className="rotate text-black"
                >
                  peoples and governments. Governing Laws: UDHR and NAFERA 1993
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDcard;
