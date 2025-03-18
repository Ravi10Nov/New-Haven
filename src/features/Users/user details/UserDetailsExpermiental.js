import React, { useContext, useEffect, useState } from "react";
import "./UserDetails.css";
import { Badge, Button } from "@mui/material";
import { FormErrors } from "../../../components/FormErrors";
import CourseImageUpload from "features/courses/AddEditCourseDetails/CourseImageUpload/CourseImageUpload";
import { ContextApi } from "contexts/ContextProvider";
// import { getuserDetails } from 'services/userService';
import { updateUser } from "services/changesService";
import { toast } from "react-toastify";
import ForgotPass from "screens/CreateNewPass";
import { useAuth } from "hooks/useAuth";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, Progress } from "antd";
import Loader from "components/Loader";
import axios from "config/axios";

import { format } from 'date-fns';

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "../../../../node_modules/@mui/material/index";

const ActiveUserDetailsExperimental = () => {
  //   const [ values, setValues] = React.useState(initialUserData);
  const [fileList, setFileList] = useState([]);
  const [userData, setUserData] = useState({
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

  const contextApi = useContext(ContextApi);
  const { userDetails, createProfileUpdateRequest } = useAuth();
  const [selectedImage, setSelectedImage] = useState(userDetails?.image);
  const userId = userDetails?.user;
  const email = userDetails.email;

  // const [ isLoading, setIsLoading] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isChangeRequested, setIsChangeRequested] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const validateForm = (values) => {
    return (
      isPersonalInfoValid.firstName.isValid &&
      isPersonalInfoValid.lastName.isValid &&
      isPersonalInfoValid.state.isValid &&
      isPersonalInfoValid.city.isValid &&
      isPersonalInfoValid.country.isValid &&
      isPersonalInfoValid.zipCode.isValid &&
      isPersonalInfoValid.sex.isValid &&
      isPersonalInfoValid.date.isValid &&
      isPersonalInfoValid.addressFirstLine.isValid
    );
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "zipCode":
        if (value.length > 0) {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            zipCode: {
              ...prevState.zipCode,
              isValid: true, // Change isValid to true or false as needed
            },
          }));
        } else {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            zipCode: {
              ...prevState.zipCode,
              isValid: false, // Change isValid to true or false as needed
            },
          }));
        }
        break;

      case "country":
        if (value.length > 0) {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            country: {
              ...prevState.country,
              isValid: true, // Change isValid to true or false as needed
            },
          }));
        } else {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            country: {
              ...prevState.country,
              isValid: false, // Change isValid to true or false as needed
            },
          }));
        }
        break;

      case "firstName":
        if (value.length > 0) {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            firstName: {
              ...prevState.firstName,
              isValid: true, // Change isValid to true or false as needed
            },
          }));
        } else {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            firstName: {
              ...prevState.firstName,
              isValid: false, // Change isValid to true or false as needed
            },
          }));
        }
        break;

      case "lastName":
        if (value.length > 0) {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            lastName: {
              ...prevState.lastName,
              isValid: true, // Change isValid to true or false as needed
            },
          }));
        } else {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            lastName: {
              ...prevState.lastName,
              isValid: false, // Change isValid to true or false as needed
            },
          }));
        }
        break;

      case "date":
        if (value.length > 0) {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            date: {
              ...prevState.date,
              isValid: true, // Change isValid to true or false as needed
            },
          }));
        } else {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            date: {
              ...prevState.date,
              isValid: false, // Change isValid to true or false as needed
            },
          }));
        }
        break;

      case "phoneNumber":
        // const phoneNumberPattern = /^\d{10}$/;
        // let phoneNumberValid = phoneNumberPattern.test(value);
        let phoneNumberValid = true;
        if (phoneNumberValid) {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            phoneNumber: {
              ...prevState.phoneNumber,
              isValid: true, // Change isValid to true or false as needed
            },
          }));
        } else {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            phoneNumber: {
              ...prevState.phoneNumber,
              isValid: false, // Change isValid to true or false as needed
            },
          }));
        }
        break;

      case "sex":
        if (value.length > 0) {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            sex: {
              ...prevState.sex,
              isValid: true, // Change isValid to true or false as needed
            },
          }));
        } else {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            sex: {
              ...prevState.sex,
              isValid: false, // Change isValid to true or false as needed
            },
          }));
        }
        break;

      case "city":
        if (value.length > 0) {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            city: {
              ...prevState.city,
              isValid: true, // Change isValid to true or false as needed
            },
          }));
        } else {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            city: {
              ...prevState.city,
              isValid: false, // Change isValid to true or false as needed
            },
          }));
        }
        break;

      case "state":
        if (value.length > 0) {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            state: {
              ...prevState.state,
              isValid: true, // Change isValid to true or false as needed
            },
          }));
        } else {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            state: {
              ...prevState.state,
              isValid: false, // Change isValid to true or false as needed
            },
          }));
        }
        break;

      case "addressFirstLine":
        if (value.length > 0) {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            addressFirstLine: {
              ...prevState.addressFirstLine,
              isValid: true, // Change isValid to true or false as needed
            },
          }));
        } else {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            addressFirstLine: {
              ...prevState.addressFirstLine,
              isValid: false, // Change isValid to true or false as needed
            },
          }));
        }
        break;

      default:
        break;
    }

    let newObject = {};
    if (fieldName) {
      newObject[fieldName] = value;
    }
    const final = { ...userData, ...newObject };
    final.isformValid = validateForm(final);
    setUserData(final);
  };

  //   const errorClass = ( error ) => {
  //     return(error.length === 0 ? '' : 'has-error');
  //  }

  //  const handleFileChange = (info) => {
  //     setFileList(info.fileList);
  //   };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleFileChange = async (info) => {
    const file = info.file.originFileObj;
    const base64 = await convertToBase64(file);
    setSelectedImage(base64);
  };

  // function formatDate(inputDate) {
  //   const date = new Date(inputDate);
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //   const day = date.getDate().toString().padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // }

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getUTCFullYear(); // Use UTC year
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Use UTC month
    const day = date.getUTCDate().toString().padStart(2, "0"); // Use UTC day
    return `${year}-${month}-${day}`;
  }

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/get-userprofile/${userId}`
      );
      const profileData = response.data;

      // Update only the relevant fields in userData with the response data
      setUserData((prevData) => ({
        ...prevData, // Keep the previous state
        email: profileData.email || prevData.email,
        firstName: profileData.firstname || prevData.firstName,
        date: formatDate(profileData.birthdate) || prevData.date,
        lastName: profileData.lastname || prevData.lastName,
        phoneNumber: profileData.phone || prevData.phoneNumber,
        sex: profileData.sex || prevData.sex,
        addressFirstLine: profileData.addressline1 || prevData.addressFirstLine,
        addressSecondLine: profileData.addressline2 || prevData.addressSecondLine,
        city: profileData.city || prevData.city,
        state: profileData.state || prevData.state,
        zipCode: profileData.zipcode || prevData.zipCode,
        country: profileData.country || prevData.country,
        spiritualName: profileData.spiritualname || prevData.spiritualName,
        dralaWalletAdress: profileData.dralawalletaddress || prevData.dralaWalletAdress,
        middleName: profileData.middlename || prevData.middleName,
        isformValid: true // Assuming the form becomes valid after data is fetched
      }));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId])

  useEffect(() => {
    // if(values){
    // const newObject = {};
    // newObject.formValid = validateForm();
    // setValues(current => {
    //   return { ...current, ...newObject }
    //  });
    // }
    setFileList([
      {
        uid: "-1",
        name: "profile image",
        status: "done",
        url: userDetails?.image,
      },
    ]);
    // console.log(userDetails);

    const initialData = {
      firstName: userDetails?.firstname,
      middleName: userDetails?.middlename,
      lastName: userDetails?.lastname,
      spiritualName: userDetails?.spiritualname,
      sex: userDetails?.sex,
      addressFirstLine: userDetails?.addressline1,
      addressSecondLine: userDetails?.addressline2,
      state: userDetails?.state,
      city: userDetails?.city,
      zipCode: userDetails?.zipcode,
      country: userDetails?.country,
      phoneNumber: userDetails?.phone,
      date: formatDate(userDetails?.birthdate),
      dralaWalletAdress: userDetails?.dralawalletaddress,
      email: userDetails?.email,
    };
    console.log(initialData);
    // setUserData(initialData);
  }, []);


  const handleChange = (prop) => (event) => {
    event.preventDefault();
    //console.log("inside handle change");
    const name = prop;
    const value = event.target.value;
    // console.log(name,value);
    validateField(name, value);
  };

  const handleDateChange = (newDate) => {
    setUserData((prev) => ({
      ...prev,
      date: newDate,
    }));
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await createProfileUpdateRequest(
        // updatedUserData,
        userData,
        selectedImage
      );
      setIsLoading(false);
      console.log(response);
      if (email !== userData.email){
        toast.success("You are requesting to change your email address. Once the admin approves your request, you will need to log out and log in again with your new email address.");
      }
      if (!response.success && response.status === 403) {
        toast.error("User request change is already pending");
      } else if (response.success) {
        //console.log("Change request successfully made");
        toast.success("Change request in process");
        setIsChangeRequested(true);
      }
    } catch (error) {
      console.log("ERROR");
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // const uploadButton = (
  //   <div>
  //     {fileList.length >= 1 ? (
  //       <img src={userData?.image} alt="profile-image" style={{ width: '100%' }} />
  //     ) : (
  //       <div>
  //         {fileList.length === 0 && (
  //           <div>
  //             <LoadingOutlined />
  //             <div style={{ marginTop: 8 }}>Upload</div>
  //           </div>
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );

  if (!isLoading) {
    return (
      <div className="container-fluid mt-4 px-4">
        <div className="profilecontentPanel dashboardContentPanel">
          <br />

          <div className="profileInput">
            <div className="user_info_container">
              <div className="container personal_info personal_info_shadow_none">
                <h3 className="content_title">Personal Information</h3>

                <div>
                  <hr />
                </div>

                <div className="row">
                  <div className="col-md-3 col-sm-12 mx-auto">
                    {/* <div className='mx-auto w-[130px] h-[130px]' style={{'border':'1px solid grey', 'border-radius': '28%', 'margin': 'auto', 'overflow': 'hidden'}} >
                     */}
                    <Upload
                      accept="image/*"
                      // customRequest={uploadImage}
                      onChange={handleFileChange}
                      // onRemove={handleOnRemove}
                      listType="picture-card"
                      defaultFileList={[
                        {
                          uid: "-1",
                          name: "default-image.jpg",
                          status: "done",
                          thumbUrl: userDetails?.image,
                        },
                      ]}
                      className="custom-class d-flex justify-content-center align-items-center w-1/2  "
                      maxCount={1}
                    >
                      {/* {uploadButton} */}
                      <div>Picture ID (10MB Max)</div>
                    </Upload>

                    {/* </div> */}
                  </div>

                  <div className="col-md-9 col-sm-12 user_form">
                    <form className="row mx-auto form_inputs">
                      <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                        <div className="row first_name">
                          <label htmlFor="firstName"> First Name :</label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            onChange={handleChange("firstName")}
                            // className = { errorClass(userData.formErrors.firstName )  }
                            value={userData?.firstName}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                        <div className="row spiritual_name">
                          <label htmlFor="spiritualName">
                            Spiritual Name (Optional) :
                          </label>
                          <input
                            type="text"
                            id="spiritualName"
                            name="spiritualName"
                            placeholder="Spiritual Name"
                            onChange={handleChange("spiritualName")}
                            value={userData?.spiritualName}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                        <div className="row middle_name">
                          <label htmlFor="middleName">Middle Name :</label>
                          <input
                            type="text"
                            id="middleName"
                            name="middleName"
                            placeholder="Middle Name"
                            onChange={handleChange("middleName")}
                            value={userData?.middleName}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                        <div className="row birth_date">
                          <label htmlFor="birthDate">Birth Date :</label>
                          <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            onChange={handleChange("date")}
                            value={userData?.date}
                          //defaultValue={formatDate(userDetails?.birthdate)}
                          />
                        </div>
                      </div>

                      {/* <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                        <div className="row birth_date">
                          <label htmlFor="birthDate">Birth Date :</label>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              value={userData?.date}
                              onChange={handleDateChange}
                              renderInput={(params) => <TextField {...params} 
                              inputProps={{
                                ...params.inputProps,
                                readOnly: true, // Make the input field read-only
                              }}/>}
                            />
                          </LocalizationProvider>
                          <small style={{ color: "#6c757d", marginTop: "5px" }}>
                            Please select date from calendar
                          </small>
                        </div>
                      </div> */}

                      <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                        <div className="row last_name">
                          <label htmlFor="lastName">Last Name :</label>
                          <input
                            type="text"
                            onChange={handleChange("lastName")}
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            // className= { errorClass(userData.formErrors.lastName )  }
                            value={userData?.lastName}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                        <div className="row email">
                          <label htmlFor="email">Email :</label>
                          <input
                            onChange={handleChange("email")}
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email Address"
                            // className= { errorClass(userData.formErrors.email )  }
                            value={userData?.email}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                        <div className="row user_phone">
                          <label htmlFor="phone">Telephone Number :</label>
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Telephone Number"
                            onChange={handleChange("phoneNumber")}
                            // className= { errorClass(userData.formErrors.phoneNumber )  }
                            value={userData?.phoneNumber}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                        <div className="row user_gender">
                          <label htmlFor="gender">Sex :</label>

                          <div className="row gender_button">
                            <div className="gender_info col-md-6 col-sm-6">
                              <input
                                name="sex"
                                type="radio"
                                id="male"
                                value="male"
                                onChange={handleChange("sex")}
                                checked={userData?.sex === "male"}
                              />
                              <label id="male_gender" htmlFor="gender">
                                Male
                              </label>
                            </div>

                            <div className="gender_info col-md-6 col-sm-6">
                              <input
                                name="sex"
                                type="radio"
                                id="female"
                                value="female"
                                onChange={handleChange("sex")}
                                checked={userData?.sex === "female"}
                              />
                              <label id="female_gender" htmlFor="gender">
                                Female
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-9 col-sm-12 inputs_group">
                        <div className="row street_address">
                          <label htmlFor="address">
                            Street Address Line 1 :
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Street Address"
                            onChange={handleChange("addressFirstLine")}
                            // className= { errorClass(userData.formErrors.addressFirstLine )  }
                            value={userData?.addressFirstLine}
                          />
                        </div>
                      </div>

                      <div className="col-md-9 col-sm-12 inputs_group">
                        <div className="row address_optional">
                          <label htmlFor="address">
                            Address Line 2 (Optional) :
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Address Line 2"
                            onChange={handleChange("addressSecondLine")}
                            value={userData?.addressSecondLine}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                        <div className="row city">
                          <label htmlFor="city">City :</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="City"
                            onChange={handleChange("city")}
                            // className= { errorClass(userData.formErrors.city )  }
                            value={userData?.city}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                        <div className="row state">
                          <label htmlFor="state">State :</label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            placeholder="State"
                            onChange={handleChange("state")}
                            // className= { errorClass(userData.formErrors.state )  }
                            value={userData?.state}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                        <div className="row last_name">
                          <label htmlFor="zipCode">Zip Code :</label>
                          <input
                            type="text"
                            id="zip_code"
                            name="zip_code"
                            placeholder="Zip Code"
                            onChange={handleChange("zipCode")}
                            // className= { errorClass(userData.formErrors.zipCode )  }
                            value={userData?.zipCode}
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                        <div className="row last_name">
                          <label htmlFor="country">Country :</label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            placeholder="Country"
                            onChange={handleChange("country")}
                            // className= { errorClass(userData.formErrors.country )  }
                            value={userData?.country}
                          />
                        </div>
                      </div>

                      <div className="col-md-9 col-sm-12 inputs_group">
                        <div className="row address_optional">
                          <label htmlFor="address">
                            Drala Wallet Address (Optional) :
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Drala Wallet Address"
                            onChange={handleChange("dralaWalletAdress")}
                            value={userData?.dralaWalletAdress}
                          />
                        </div>
                      </div>

                      {/* <div className = 'panel panel-default' >
                <FormErrors formErrors={userData.formErrors ? userData.formErrors : {}} />
              </div> */}
                    </form>
                  </div>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 mb-3">
          {isChangeRequested ? (
            <Button
              disabled
              variant="contained"
              onClick={handleUpdate}
              style={{
                color: `white`,
                background: `#18498B`,
                borderRadius: "2px",
                margin: "5px",
              }}
            >
              {"A Change is already requested"}
            </Button>
          ) : (
            <Button
              // disabled = {!userData.formValid}
              variant="contained"
              onClick={handleUpdate}
              style={{
                background: `#18498B`,
                borderRadius: "2px",
                margin: "5px",
              }}
            >
              {"Change Profile"}
            </Button>
          )}

          {/* <Button
            variant="outlined"
            onClick={() => {
              initData(contextApi.authInfo._id);
              toast.success("All operations are cancelled");
            }}
            style={{
              background: "#E6F0FF",
              borderRadius: "2px",
              color: "#18498B",
              margin: "5px",
            }}
          >
            Cancel
          </Button> */}
        </div>
        {/* <div className="profilecontentPanel dashboardContentPanel">
          <ForgotPass></ForgotPass>
        </div> */}
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default ActiveUserDetailsExperimental;
