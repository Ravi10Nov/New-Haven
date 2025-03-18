import { CircularProgress, Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import axios from "config/axios";
import { useAuth } from "hooks/useAuth";
import * as React from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import UserDonate from "../UserDonate/UserDonate";
import { ContextApi } from "./../../contexts/ContextProvider";
import Spiritual from "./../Spiritual/Spiritual";
import UserDonationSuccess from "./../UserDonationSuccess/UserDonationSuccess";
import UserInfo from "./../UserInfo/UserInfo";
import "./StepperArea.css";

// const steps = ['user_info', 'terms_and_conditions', 'donation', 'final_step'];
const steps = [
  [{ name: "Personal Information" }, { label: "user_info" }],
  [{ name: "Adoption" }, { label: "terms_and_conditions" }],
  [{ name: "Donation" }, { label: "donation" }],
  [{ name: "Final Step" }, { label: "final_step" }],
];

const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export default function StepperArea() {
  const history = useHistory();

  const contextApi = React.useContext(ContextApi);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [skipped, setSkipped] = React.useState(new Set());
  const [paymentStatusObject, setPaymentObjectStatus] = React.useState(null);
  const [imageId, setImageId] = React.useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const setPaymentObjectStatusState = (childPaymentStatusObject) => {
    console.log("chilpaymeenstatus object");
    setPaymentObjectStatus(childPaymentStatusObject);
  };

  const [userOrderId, setUserOrderId] = useState(null);

  const { user, createProfile, userRole, setUserStatus } = useAuth();

  //   formErrors: {
  //     email: "",
  //     password: "",
  //     firstName: "",
  //     date: "",
  //     lastName: "",
  //     phoneNumber: "",
  //     sex: "",
  //     addressFirstLine: "",
  //     zipCode: "",
  //     city: "",
  //     state: "",
  //     country: "",
  //   },

  //   password: "",
  //   email: "",
  //   firstName: "",
  //   date: "",
  //   lastName: "",
  //   phoneNumber: "",
  //   sex: "",
  //   addressFirstLine: "",
  //   city: "",
  //   state: "",
  //   zipCode: "",
  //   country: "",
  //   spiritualName: "",
  //   addressSecondLine: "",
  //   dralaWalletAdress: "",
  //   middleName: "",

  //   showPassword: false,
  //   stateValid: false,
  //   cityValid: false,
  //   addressFirstLineValid: false,
  //   sexValid: false,
  //   phoneNumberValid: false,
  //   lastNameValid: false,
  //   dateValid: false,
  //   passwordValid: false,
  //   emailValid: false,
  //   firstNameValid: false,
  //   zipCodeValid: false,
  //   countryValid: false,
  // });

  const [userDetails, setUserDetails] = React.useState({
    password: "",
    email: "",
    firstName: "",
    date: "",
    lastName: "",
    phoneNumber: "",
    sex: "",
    addressFirstLine: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    spiritualName: "",
    addressSecondLine: "",
    dralaWalletAdress: "",
    middleName: "",
    isformValid: false,
  });

  const [isPersonalInfoValid, setIsPersonalInfoValid] = useState({
    zipCode: {
      isValid: false,
      errorMessage: "Zip Code is invalid",
    },
    firstName: {
      isValid: false,
      errorMessage: "First name is invalid",
    },
    lastName: {
      isValid: false,
      errorMessage: "Last Name is invalid",
    },
    country: {
      isValid: false,
      errorMessage: "Country is invalid",
    },
    city: {
      isValid: false,
      errorMessage: "City is invalid",
    },
    state: {
      isValid: false,
      errorMessage: "State is invalid",
    },
    addressFirstLine: {
      isValid: false,
      errorMessage: "Address is invalid",
    },
    phoneNumber: {
      isValid: false,
      errorMessage: "Phone is invalid",
    },
    sex: {
      isValid: false,
      errorMessage: "Select a sex",
    },
    date: {
      isValid: false,
      errorMessage: "Date of birth is invalid",
    },
  });

  const [isAgreedOnTerms, setIsAgreedOnTerm] = React.useState(false);

  const step = parseInt(useQuery().get("step"));

  //     name: userDetails.firstName,
  //     middle_name: userDetails.middleName,
  //     last_name: userDetails.lastName,
  //     spirtual_name: userDetails.spiritualName,
  //     sex: userDetails.sex,
  //     adresse_line_1: userDetails.addressFirstLine,
  //     adresse_line_2: userDetails.addressSecondLine,
  //     state: userDetails.state,
  //     city: userDetails.city,
  //     zip_code: userDetails.zipCode,
  //     country: userDetails.country,
  //     phone_number: userDetails.phoneNumber,
  //     password: userDetails.password,
  //     email: userDetails.email,
  //     birth_date: userDetails.date,
  //     image: imageId,
  //     dralla_wallet_adress: userDetails.dralaWalletAdress,
  //   };

  //   try {
  //     setIsProcessing(true);
  //     // debugger;
  //     const response = await completeRegistration(
  //       contextApi.authInfo._id,
  //       data
  //     );
  //     contextApi.setAuthInfo(response.data.data);
  //     setIsProcessing(false);
  //     toast.success("Registration is complete");
  //   } catch (error) {
  //     console.log(error);
  //     // debugger;
  //     if (error.response.status == 422) {
  //       for (const errorMessage in error.response.data.errors) {
  //         toast.error(error.response.data.errors[errorMessage].message);
  //       }
  //       throw error;
  //     }
  //     throw error;
  //     toast.error("Server may be down re try again");
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  // const thirdStepHandler = async () => {
  //   try {
  //     // debugger;
  //     setIsProcessing(true);
  //     const response = await finishRegistration(contextApi.authInfo._id);
  //     contextApi.setAuthInfo(response.data.data);
  //     setIsProcessing(false);
  //     history.push("/members");
  //     toast.success("Registration is finished");
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   } finally {
  //     setIsProcessing(false);
  //     // debugger
  //   }
  // };

  const handleProfileSubmit = async () => {
    const response = await createProfile(userDetails, selectedImage);
    console.log("created new profile");
    if (response) return true;
    else return false;
  };

  const setUserDetailsState = (userDetails, imageId) => {
    setImageId(imageId);
    setUserDetails(userDetails);
  };

  // set if the user agreed on term and state
  const setIsAgreedOnTermState = (isAgreedOnTerms) => {
    setIsAgreedOnTerm(isAgreedOnTerms);
  };

  React.useEffect(() => {
    setActiveStep(step ? step : 0);
    setIsLoading(false);
  }, []);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;

    // debugger
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    try {
      console.log(activeStep);
      // step=0 (profile creation)
      if (activeStep == 0) {
        const isProfileCreated = await handleProfileSubmit();
        if (isProfileCreated) {
          //profile created successfully
          if (userRole === "admin") {
            history.push("/admins");
          }
          //User or Instructor
          else {
            // setUserStatus('profile_created');
            console.log("Profile created go to next");
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
          }
        } else {
          //profile creation failed
          // setActiveStep((prevActiveStep) => prevActiveStep + 1);
          // setSkipped(newSkipped);
          toast.error("Profile Creation failed!");
        }
      }

      // step=1 (terms and conditions agreement)
      if (activeStep == 1) {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/account-status/${user._id}`,
          { newStatus: "terms_agreed" }
        );
        // if(response.data.success) setUserStatus('terms_agreed');
      }
      // step=2 (making donation)
      if (activeStep == 2) {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/account-status/${user._id}`,
          { newStatus: "donation_complete" }
        );
        // if(response.data.success) setUserStatus('donation_complete');
      }
      // step=3 (completion)
      if (activeStep == 3) {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/account-status/${user._id}`,
          { newStatus: "finished" }
        );
        toast.success("Profile created successfully.Please Login!!")
        setTimeout(() => {
          if (response.data.success) setUserStatus("finished");
          // if (user.role === "user") history.push("/user-dashboard");
          if (user.role === "user") history.push("/Signin");
          else if (user.role === "instructor") history.push("/instructors");
        }, 2000)

        return;
      }
      if (activeStep !== 0) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  // React.useEffect(() => {
  //   console.log(contextApi.authInfo);
  // }, [contextApi.authInfo]);

  console.log("activestep", activeStep);

  if (!isLoading) {
    return (
      <div>
        <div id="Top">
          <div>
            <Toaster position="top-right" reverseOrder={false} />
          </div>
        </div>
        <div className="stepper_container">
          <Container sx={{ p: 0 }}>
            <Box className="stepper_content">
              <div className="stepper_spacer"></div>
              <Stepper className="Stepper" activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption"></Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label.label} {...stepProps}>
                      <StepLabel {...labelProps}>{label.name}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {false ? (
                <React.Fragment>
                  {/* step 4 component */}
                  {
                    <div>
                      <h1>Step 4</h1>
                    </div>
                  }
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {activeStep === 0 && (
                    <UserInfo
                      setFormStateOnParent={setUserDetailsState}
                      initialUserData={userDetails}
                      initImageId={imageId}
                      selectedImage={selectedImage}
                      setSelectedImage={setSelectedImage}
                      isPersonalInfoValid={isPersonalInfoValid}
                      setIsPersonalInfoValid={setIsPersonalInfoValid}
                      isProfileSaveClicked={setIsPersonalInfoValid}
                    />
                  )}

                  {activeStep === 1 && (
                    <Spiritual setStateOnParent={setIsAgreedOnTermState} />
                  )}

                  {activeStep === 2 && (
                    <UserDonate
                      handleNext={handleNext}
                      userOrderId={userOrderId}
                      setUserOrderId={setUserOrderId}
                      setPaymentStatusObjectOnParent={
                        setPaymentObjectStatusState
                      }
                    />
                  )}

                  {activeStep === 3 && (
                    <UserDonationSuccess
                      handleNext={handleNext}
                      isDonationSucceded={
                        (paymentStatusObject != null &&
                          paymentStatusObject.amount >= 50 &&
                          paymentStatusObject.status == "SUCCESS") ||
                        contextApi.authInfo.isDonated
                      }
                    />
                  )}

                  {/* {activeStep === 3 || activeStep === 2 || ( */}
                  {activeStep === 3 || (
                    <Box
                      className="stepperButtons"
                      sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                    >
                      <Button
                        style={{
                          background: "#18498B",
                          width: "156px",
                          height: "40px",
                          marginRight: "16px",
                          fontWeight: 700,
                          borderRadius: "2px",
                        }}

                        variant="contained"
                        // disabled={
                        //   (activeStep === 0 &&
                        //     (!userDetails.formValid || selectedImage===null)) ||
                        //   (activeStep === 1 && !isAgreedOnTerms) ||
                        //   (activeStep === 2 &&
                        //     paymentStatusObject !== null &&
                        //     paymentStatusObject.status != "SUCCESS")
                        // }
                        disabled={
                          (activeStep === 0 &&
                            (!isPersonalInfoValid.firstName.isValid ||
                              !isPersonalInfoValid.lastName.isValid ||
                              !isPersonalInfoValid.zipCode.isValid ||
                              !isPersonalInfoValid.city.isValid ||
                              !isPersonalInfoValid.state.isValid ||
                              !isPersonalInfoValid.country.isValid ||
                              !isPersonalInfoValid.date.isValid ||
                              !isPersonalInfoValid.sex.isValid ||
                              !isPersonalInfoValid.phoneNumber.isValid ||
                              !isPersonalInfoValid.addressFirstLine.isValid ||
                              selectedImage === null)) ||
                          (activeStep === 1 && !isAgreedOnTerms)
                          ||
                          (activeStep === 2 &&
                            // paymentStatusObject !== null &&
                            // paymentStatusObject.status != "SUCCESS"
                            userOrderId === null)
                        }
                        onClick={handleNext}
                      >
                        {isProcessing ? ( //isProcessing
                          <CircularProgress
                            style={{ height: "15px", width: "15px" }}
                            color="primary"
                          />
                        ) : activeStep === 0 ? (
                          "SAVE"
                        ) : activeStep === steps.length - 1 ? (
                          "FINISHED"
                        ) : (
                          "NEXT"
                        )}
                      </Button>
                      {/* {activeStep != 2 || (
                        <Button
                          disabled={userOrderId ? false : true}
                          style={{
                            background: "#E6F0FF",
                            width: "156px",
                            height: "40px",
                            color: "#18498B",
                            fontWeight: 700,
                            borderRadius: "2px",
                          }}
                          onClick={handleNext}
                        >
                          Skip
                        </Button>
                      )} */}

                      {activeStep == 2 || (
                        <Button
                          style={{
                            background: "#E6F0FF",
                            width: "156px",
                            height: "40px",
                            color: "#18498B",
                            fontWeight: 700,
                            borderRadius: "2px",
                          }}
                          disabled={activeStep === 0 || isProcessing}
                          onClick={handleBack}
                        //   sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                      )}
                    </Box>
                  )}



                  {/* {activeStep === 3 || activeStep !== 2 || (
                    <Box
                      className="stepperButtons"
                      sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                    >
                      <Button
                        style={{
                          background: "#18498B",
                          width: "156px",
                          height: "35px",
                          marginRight: "16px",
                          fontWeight: 700,
                          borderRadius: "2px",
                          // position:"fixed",
                          // top:"88px",
                          // right:"290px" 
                          position:"relative",
                          bottom:"240px",
                          left:"200px" 
                        }}

                        variant="contained"
                        disabled={(activeStep === 2 && userOrderId === null)}
                        onClick={handleNext}
                      >
                        {isProcessing ? ( //isProcessing
                          <CircularProgress
                            style={{ height: "15px", width: "15px" }}
                            color="primary"
                          />
                        ) : activeStep === 0 ? (
                          "SAVE"
                        ) : activeStep === steps.length - 1 ? (
                          "FINISHED"
                        ) : (
                          "NEXT"
                        )}
                      </Button>
                    </Box>
                  )} */}




                </React.Fragment>
              )}
            </Box>
          </Container>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
