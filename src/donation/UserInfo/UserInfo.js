import React, { useEffect } from "react";
import avatar from "./../../assets/avartar.png";
import "./UserInfo.css";

import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { FormErrors } from "./../../components/FormErrors";
import { Upload, Progress } from "antd";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import CourseImageUpload from "features/courses/AddEditCourseDetails/CourseImageUpload/CourseImageUpload";
import { dayMonthYear } from "helpers/Date";
const UserInfo = ({
  setFormStateOnParent,
  initialUserData,
  initImageId,
  selectedImage,
  setSelectedImage,

  isPersonalInfoValid,
  setIsPersonalInfoValid,
  isProfileSaveClicked,
}) => {
  const [values, setValues] = React.useState(initialUserData);
  // const [imageId, setImageId] = React.useState(initImageId);
  const [isLoading, setIsLoading] = React.useState(true);

  const errorClass = (error) => {
    return error.length === 0 ? "" : "has-error";
  };

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

  // const handleFileRemove = async (info) => {
  //   console.log("Inside handle file remove");
  //   setSelectedImage(null);
  // };

  useEffect(() => {
    validateField();
  }, [selectedImage]);

  const validateField = (fieldName, value) => {
    // if (values.formErrors != undefined) {
    //   let fieldValidationErrors = values.formErrors;
    //   let firstNameValid = values.firstNameValid;
    //   let passwordValid = values.passwordValid;
    //   let dateValid = values.dateValid;
    //   let lastNameValid = values.lastNameValid;
    //   let phoneNumberValid = values.phoneNumberValid;
    //   let sexValid = values.sexValid;
    //   let addressFirstLineValid = values.addressFirstLineValid;
    //   let cityValid = values.cityValid;
    //   let stateValid = values.stateValid;
    //   let zipCodeValid = values.zipCodeValid;
    //   let countryValid = values.countryValid;
    //   let imageValid = false;

    //   if (selectedImage === null) {
    //     imageValid = false;
    //     fieldValidationErrors.image = " error: Upload a picture!";
    //   } else {
    //     imageValid = true;
    //     fieldValidationErrors.image = "";
    //   }

    //   switch (fieldName) {
    //     case "zipCode":
    //       zipCodeValid = value.length > 0;
    //       fieldValidationErrors.zipCode = zipCodeValid ? "" : " is invalid";
    //       break;
    //     case "country":
    //       countryValid = value.length > 0;
    //       fieldValidationErrors.country = countryValid ? "" : "is invalid";
    //       break;

    //     case "password":
    //       passwordValid = value.length >= 6 || value == "";
    //       fieldValidationErrors.password = passwordValid ? "" : " is too short";
    //       break;
    //     case "firstName":
    //       firstNameValid = value.length > 0;
    //       fieldValidationErrors.firstName = firstNameValid
    //         ? ""
    //         : " is invalid  ";
    //       break;
    //     case "date":
    //       dateValid = value.length > 0;
    //       fieldValidationErrors.date = dateValid ? "" : " is invalid ";
    //       break;
    //     case "lastName":
    //       lastNameValid = value.length > 0;
    //       fieldValidationErrors.lastName = lastNameValid ? "" : " is invalid  ";
    //       break;
    //     case "phoneNumber:":
    //       const phoneNumberPattern = /^\d{10}$/;
    //       phoneNumberValid = phoneNumberPattern.test(value);
    //       fieldValidationErrors.phoneNumber = phoneNumberValid
    //         ? ""
    //         : " is invalid ";
    //       break;
    //     case "sex":
    //       sexValid = value.length > 0;
    //       fieldValidationErrors.sex = sexValid ? "" : " choose a sex ";

    //       break;
    //     case "addressFirstLine":
    //       addressFirstLineValid = value.length > 0;
    //       fieldValidationErrors.addressFirstLine = addressFirstLineValid
    //         ? ""
    //         : " is invalid  ";

    //       break;
    //     case "city":
    //       cityValid = value.length > 0;
    //       fieldValidationErrors.city = cityValid ? "" : " is invalid  ";

    //       break;
    //     case "state":
    //       stateValid = value.length > 0;
    //       fieldValidationErrors.state = stateValid ? "" : "is invalid  ";
    //       break;
    //     default:
    //       break;
    //   }

    //   let newObject = {
    //     formErrors: fieldValidationErrors,
    //     stateValid: stateValid,
    //     cityValid: cityValid,
    //     addressFirstLineValid: addressFirstLineValid,
    //     sexValid: sexValid,
    //     phoneNumberValid: phoneNumberValid,
    //     lastNameValid: lastNameValid,
    //     dateValid: dateValid,
    //     passwordValid: passwordValid,
    //     firstNameValid: firstNameValid,
    //     zipCodeValid: zipCodeValid,
    //     countryValid: countryValid,
    //     imageValid: imageValid,
    //   };
    //   if (fieldName) {
    //     newObject[fieldName] = value;
    //   }
    //   const final = { ...values, ...newObject };
    //   final.formValid = validateForm(final);
    //   // debugger;
    //   setValues(final);
    // }

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
        if (value.length > 0) {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            phoneNumber: {
              ...prevState.phoneNumber,
              isValid: true,
            },
          }));
        } else {
          setIsPersonalInfoValid((prevState) => ({
            ...prevState,
            phoneNumber: {
              ...prevState.phoneNumber,
              isValid: false,
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
    const final = { ...values, ...newObject };
    final.isformValid = validateForm(final);
    setValues(final);
  };

  const validateForm = (values) => {
    // return (
    //   (!values.password || values.passwordValid || values.password === "") &&
    //   values.stateValid &&
    //   values.cityValid &&
    //   values.addressFirstLineValid &&
    //   values.sexValid &&
    //   values.phoneNumberValid &&
    //   values.lastNameValid &&
    //   values.countryValid &&
    //   values.zipCodeValid &&
    //   values.dateValid &&
    //   values.lastNameValid &&
    //   values.firstNameValid &&
    //   // (!imageId || imageId.length > 0)
    //   selectedImage !== null
    // );

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

  useEffect(() => {
    setFormStateOnParent(values, selectedImage);
    setIsLoading(false);
  }, [values, selectedImage]);

  const handleChange = (prop) => (event) => {
    event.preventDefault();
    const name = prop;
    const value = event.target.value;
    validateField(name, value);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const uploadButton = (
    <div>
      {/* {isLoading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  if (!isLoading) {
    return (
      <div className="user_info_container">
        <div className="container personal_info personal_info_shadow_none">
          <h3 className="content_title">Personal Information</h3>

          <div>
            <hr />
          </div>

          <div className="row">
            <div className="col-md-3 col-sm-12 mx-auto">
              <div className=" flex flex-col gap-y-2">
                {/* <div
                className="mx-auto w-[130px] h-[130px] d-flex justify-content-center align-items-center"
                style={{
                  border: "1px solid grey",
                  "border-radius": "28%",
                  margin: "auto",
                  overflow: "hidden",
                }}
              > */}
                <Upload
                  accept="image/*"
                  onChange={handleFileChange}
                  // onRemove={handleFileRemove}
                  listType="picture-card"
                  // fileList={defaultFileList}
                  className="custom-class d-flex justify-content-center align-items-center w-1/2  "
                  // className={`   d-flex justify-content-center align-items-center w-1/2  `}
                  maxCount={1}
                >
                  <div>Picture ID (10MB Max) </div>
                </Upload>
                <p className="text-xs text-red-500">
                  Please add in a photo for your indentification card.
                </p>
              </div>
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
                      // className={errorClass(values.formErrors.firstName)}
                      value={values.firstName}
                    />
                    {/* {isProfileSaveClicked && !isPersonalInfoValid.firstName.isValid && <label htmlFor="firstName">Firtname should not be empty</label>} */}
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
                      value={values.spiritualName}
                    />
                  </div>
                </div>

                <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                  <div className="row middle_name">
                    <label htmlFor="middleName">Middle Name (Optional):</label>
                    <input
                      type="text"
                      id="middleName"
                      name="middleName"
                      placeholder="Middle Name"
                      onChange={handleChange("middleName")}
                      value={values.middleName}
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
                      // className={errorClass(values.formErrors.date)}
                      value={values.date}
                    />
                  </div>
                </div>

                <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                  <div className="row last_name">
                    <label htmlFor="lastName">Last Name :</label>
                    <input
                      type="text"
                      onChange={handleChange("lastName")}
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      // className={errorClass(values.formErrors.lastName)}
                      value={values.lastName}
                    />
                  </div>
                </div>

                <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                  <div className="row last_name">
                    <label htmlFor="password">New Password (Optional):</label>
                    <FormControl
                      variant="outlined"
                      className="my_place_pass ps-2"
                    >
                      {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
                      <FilledInput
                        id="ful_Width"
                        placeholder="New Password"
                        type={values.showPassword ? "text" : "password"}
                        onChange={handleChange("password")}
                        value={values.password}
                        endAdornment={
                          <InputAdornment position="start">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
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
                      // className={errorClass(values.formErrors.phoneNumber)}
                      value={values.phoneNumber}
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
                          // className={
                          //   "gender_input" +
                          //   " " +
                          //   errorClass(values.formErrors.sex)
                          // }
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
                          // className={
                          //   "gender_input" +
                          //   " " +
                          //   errorClass(values.formErrors.sex)
                          // }
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
                    <label htmlFor="address">Street Address Line 1 :</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Street Address"
                      onChange={handleChange("addressFirstLine")}
                      // className={errorClass(values.formErrors.addressFirstLine)}
                      value={values.addressFirstLine}
                    />
                  </div>
                </div>

                <div className="col-md-9 col-sm-12 inputs_group">
                  <div className="row address_optional">
                    <label htmlFor="address">Address Line 2 (Optional) :</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Address Line 2"
                      onChange={handleChange("addressSecondLine")}
                      value={values.addressSecondLine}
                    />
                  </div>
                </div>

                <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                  <div className="row address_optional">
                    <label htmlFor="city">City :</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="City"
                      onChange={handleChange("city")}
                      // className={errorClass(values.formErrors.city)}
                      value={values.city}
                    />
                  </div>
                </div>

                <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                  <div className="row address_optional">
                    <label htmlFor="state">State :</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="State"
                      onChange={handleChange("state")}
                      // className={errorClass(values.formErrors.state)}
                      value={values.state}
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
                      // className={errorClass(values.formErrors.zipCode)}
                      value={values.zipCode}
                    />
                    {/* {isProfileSaveClicked && !isPersonalInfoValid.zipCode.isValid && <label htmlFor="zipCode">{isPersonalInfoValid.zipCode.errorMessage}</label>} */}
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
                      // className={errorClass(values.formErrors.country)}
                      value={values.country}
                    />
                  </div>
                </div>

                <div className="col-md-9 col-sm-12 inputs_group">
                  <div className="row address_optional">
                    <label htmlFor="address">
                      <a target="_blank" href="https://drala.io/">
                        Drala Wallet Address (Optional):
                      </a>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Drala Wallet Address"
                      onChange={handleChange("dralaWalletAdress")}
                      value={values.dralaWalletAdress}
                    />
                  </div>
                </div>

                {/* <div className="panel panel-default">
                  <FormErrors
                    formErrors={values.formErrors ? values.formErrors : {}}
                  />
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default UserInfo;


// braft-editor



// import React, { useEffect } from "react";
// import avatar from "./../../assets/avartar.png";
// import "./UserInfo.css";

// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import TextField from "@mui/material/TextField";
// import { format } from 'date-fns';

// import {
//   FilledInput,
//   FormControl,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
// } from "@mui/material";
// import { FormErrors } from "./../../components/FormErrors";
// import { Upload, Progress } from "antd";

// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import CourseImageUpload from "features/courses/AddEditCourseDetails/CourseImageUpload/CourseImageUpload";
// import { dayMonthYear } from "helpers/Date";
// const UserInfo = ({
//   setFormStateOnParent,
//   initialUserData,
//   initImageId,
//   selectedImage,
//   setSelectedImage,

//   isPersonalInfoValid,
//   setIsPersonalInfoValid,
//   isProfileSaveClicked,
// }) => {
//   const [values, setValues] = React.useState(initialUserData);
//   // const [imageId, setImageId] = React.useState(initImageId);
//   const [isLoading, setIsLoading] = React.useState(true);
//   const [date, setDate] = React.useState(null);

//   const errorClass = (error) => {
//     return error.length === 0 ? "" : "has-error";
//   };

//   function convertToBase64(file) {
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload = () => {
//         resolve(fileReader.result);
//       };
//       fileReader.onerror = (error) => {
//         reject(error);
//       };
//     });
//   }

//   const handleFileChange = async (info) => {
//     const file = info.file.originFileObj;
//     const base64 = await convertToBase64(file);
//     setSelectedImage(base64);
//   };

//   // const handleFileRemove = async (info) => {
//   //   console.log("Inside handle file remove");
//   //   setSelectedImage(null);
//   // };

//   useEffect(() => {
//     validateField();
//   }, [selectedImage]);

//   const validateField = (fieldName, value) => {
//     // if (values.formErrors != undefined) {
//     //   let fieldValidationErrors = values.formErrors;
//     //   let firstNameValid = values.firstNameValid;
//     //   let passwordValid = values.passwordValid;
//     //   let dateValid = values.dateValid;
//     //   let lastNameValid = values.lastNameValid;
//     //   let phoneNumberValid = values.phoneNumberValid;
//     //   let sexValid = values.sexValid;
//     //   let addressFirstLineValid = values.addressFirstLineValid;
//     //   let cityValid = values.cityValid;
//     //   let stateValid = values.stateValid;
//     //   let zipCodeValid = values.zipCodeValid;
//     //   let countryValid = values.countryValid;
//     //   let imageValid = false;

//     //   if (selectedImage === null) {
//     //     imageValid = false;
//     //     fieldValidationErrors.image = " error: Upload a picture!";
//     //   } else {
//     //     imageValid = true;
//     //     fieldValidationErrors.image = "";
//     //   }

//     //   switch (fieldName) {
//     //     case "zipCode":
//     //       zipCodeValid = value.length > 0;
//     //       fieldValidationErrors.zipCode = zipCodeValid ? "" : " is invalid";
//     //       break;
//     //     case "country":
//     //       countryValid = value.length > 0;
//     //       fieldValidationErrors.country = countryValid ? "" : "is invalid";
//     //       break;

//     //     case "password":
//     //       passwordValid = value.length >= 6 || value == "";
//     //       fieldValidationErrors.password = passwordValid ? "" : " is too short";
//     //       break;
//     //     case "firstName":
//     //       firstNameValid = value.length > 0;
//     //       fieldValidationErrors.firstName = firstNameValid
//     //         ? ""
//     //         : " is invalid  ";
//     //       break;
//     //     case "date":
//     //       dateValid = value.length > 0;
//     //       fieldValidationErrors.date = dateValid ? "" : " is invalid ";
//     //       break;
//     //     case "lastName":
//     //       lastNameValid = value.length > 0;
//     //       fieldValidationErrors.lastName = lastNameValid ? "" : " is invalid  ";
//     //       break;
//     //     case "phoneNumber:":
//     //       const phoneNumberPattern = /^\d{10}$/;
//     //       phoneNumberValid = phoneNumberPattern.test(value);
//     //       fieldValidationErrors.phoneNumber = phoneNumberValid
//     //         ? ""
//     //         : " is invalid ";
//     //       break;
//     //     case "sex":
//     //       sexValid = value.length > 0;
//     //       fieldValidationErrors.sex = sexValid ? "" : " choose a sex ";

//     //       break;
//     //     case "addressFirstLine":
//     //       addressFirstLineValid = value.length > 0;
//     //       fieldValidationErrors.addressFirstLine = addressFirstLineValid
//     //         ? ""
//     //         : " is invalid  ";

//     //       break;
//     //     case "city":
//     //       cityValid = value.length > 0;
//     //       fieldValidationErrors.city = cityValid ? "" : " is invalid  ";

//     //       break;
//     //     case "state":
//     //       stateValid = value.length > 0;
//     //       fieldValidationErrors.state = stateValid ? "" : "is invalid  ";
//     //       break;
//     //     default:
//     //       break;
//     //   }

//     //   let newObject = {
//     //     formErrors: fieldValidationErrors,
//     //     stateValid: stateValid,
//     //     cityValid: cityValid,
//     //     addressFirstLineValid: addressFirstLineValid,
//     //     sexValid: sexValid,
//     //     phoneNumberValid: phoneNumberValid,
//     //     lastNameValid: lastNameValid,
//     //     dateValid: dateValid,
//     //     passwordValid: passwordValid,
//     //     firstNameValid: firstNameValid,
//     //     zipCodeValid: zipCodeValid,
//     //     countryValid: countryValid,
//     //     imageValid: imageValid,
//     //   };
//     //   if (fieldName) {
//     //     newObject[fieldName] = value;
//     //   }
//     //   const final = { ...values, ...newObject };
//     //   final.formValid = validateForm(final);
//     //   // debugger;
//     //   setValues(final);
//     // }

//     switch (fieldName) {
//       case "zipCode":
//         if (value.length > 0) {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             zipCode: {
//               ...prevState.zipCode,
//               isValid: true, // Change isValid to true or false as needed
//             },
//           }));
//         } else {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             zipCode: {
//               ...prevState.zipCode,
//               isValid: false, // Change isValid to true or false as needed
//             },
//           }));
//         }
//         break;

//       case "country":
//         if (value.length > 0) {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             country: {
//               ...prevState.country,
//               isValid: true, // Change isValid to true or false as needed
//             },
//           }));
//         } else {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             country: {
//               ...prevState.country,
//               isValid: false, // Change isValid to true or false as needed
//             },
//           }));
//         }
//         break;

//       case "firstName":
//         if (value.length > 0) {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             firstName: {
//               ...prevState.firstName,
//               isValid: true, // Change isValid to true or false as needed
//             },
//           }));
//         } else {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             firstName: {
//               ...prevState.firstName,
//               isValid: false, // Change isValid to true or false as needed
//             },
//           }));
//         }
//         break;

//       case "lastName":
//         if (value.length > 0) {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             lastName: {
//               ...prevState.lastName,
//               isValid: true, // Change isValid to true or false as needed
//             },
//           }));
//         } else {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             lastName: {
//               ...prevState.lastName,
//               isValid: false, // Change isValid to true or false as needed
//             },
//           }));
//         }
//         break;

//       case "date":
//         // if (value.length > 0) {
//         if (value && !isNaN(Date.parse(value))) {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             date: {
//               ...prevState.date,
//               isValid: true, // Change isValid to true or false as needed
//             },
//           }));
//         } else {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             date: {
//               ...prevState.date,
//               isValid: false, // Change isValid to true or false as needed
//             },
//           }));
//         }
//         break;

//       case "phoneNumber":
//         if (value.length > 0) {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             phoneNumber: {
//               ...prevState.phoneNumber,
//               isValid: true,
//             },
//           }));
//         } else {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             phoneNumber: {
//               ...prevState.phoneNumber,
//               isValid: false,
//             },
//           }));
//         }
//         break;

//       case "sex":
//         if (value.length > 0) {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             sex: {
//               ...prevState.sex,
//               isValid: true, // Change isValid to true or false as needed
//             },
//           }));
//         } else {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             sex: {
//               ...prevState.sex,
//               isValid: false, // Change isValid to true or false as needed
//             },
//           }));
//         }
//         break;

//       case "city":
//         if (value.length > 0) {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             city: {
//               ...prevState.city,
//               isValid: true, // Change isValid to true or false as needed
//             },
//           }));
//         } else {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             city: {
//               ...prevState.city,
//               isValid: false, // Change isValid to true or false as needed
//             },
//           }));
//         }
//         break;

//       case "state":
//         if (value.length > 0) {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             state: {
//               ...prevState.state,
//               isValid: true, // Change isValid to true or false as needed
//             },
//           }));
//         } else {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             state: {
//               ...prevState.state,
//               isValid: false, // Change isValid to true or false as needed
//             },
//           }));
//         }
//         break;

//       case "addressFirstLine":
//         if (value.length > 0) {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             addressFirstLine: {
//               ...prevState.addressFirstLine,
//               isValid: true, // Change isValid to true or false as needed
//             },
//           }));
//         } else {
//           setIsPersonalInfoValid((prevState) => ({
//             ...prevState,
//             addressFirstLine: {
//               ...prevState.addressFirstLine,
//               isValid: false, // Change isValid to true or false as needed
//             },
//           }));
//         }
//         break;

//       default:
//         break;
//     }

//     let newObject = {};
//     if (fieldName) {
//       newObject[fieldName] = value;
//     }
//     const final = { ...values, ...newObject };
//     final.isformValid = validateForm(final);
//     setValues(final);
//   };

//   const validateForm = (values) => {
//     // return (
//     //   (!values.password || values.passwordValid || values.password === "") &&
//     //   values.stateValid &&
//     //   values.cityValid &&
//     //   values.addressFirstLineValid &&
//     //   values.sexValid &&
//     //   values.phoneNumberValid &&
//     //   values.lastNameValid &&
//     //   values.countryValid &&
//     //   values.zipCodeValid &&
//     //   values.dateValid &&
//     //   values.lastNameValid &&
//     //   values.firstNameValid &&
//     //   // (!imageId || imageId.length > 0)
//     //   selectedImage !== null
//     // );

//     return (
//       isPersonalInfoValid.firstName.isValid &&
//       isPersonalInfoValid.lastName.isValid &&
//       isPersonalInfoValid.state.isValid &&
//       isPersonalInfoValid.city.isValid &&
//       isPersonalInfoValid.country.isValid &&
//       isPersonalInfoValid.zipCode.isValid &&
//       isPersonalInfoValid.sex.isValid &&
//       isPersonalInfoValid.date.isValid &&
//       isPersonalInfoValid.addressFirstLine.isValid
//     );
//   };

//   useEffect(() => {
//     setFormStateOnParent(values, selectedImage, date);
//     setIsLoading(false);
//   }, [values, selectedImage, , date]);

//   // const handleDateChange = (newDate) => {
//   //   if (isNaN(newDate) === false) {
//   //     const formattedDate = format(new Date(newDate), 'yyyy-MM-dd'); 
//   //     console.log(formattedDate); 
//   //     setDate(formattedDate);
//   //     validateField("date", formattedDate);
//   //   } else {
//   //     setDate("");
//   //     validateField("date", "");
//   //   }
//   // };

//   const handleDateChange = (newDate) => {
//     if (newDate) {
//       // Format the date as "YYYY-MM-DD"
//       const formattedDate = format(newDate, 'yyyy-MM-dd');

//       // Update state and trigger validation
//       setDate(formattedDate);
//       validateField("date", formattedDate);
//     } else {
//       // Handle empty or invalid date
//       setDate("");
//       validateField("date", "");
//     }
//   };

//   const handleChange = (prop) => (event) => {
//     event.preventDefault();
//     const name = prop;
//     const value = event.target.value;
//     validateField(name, value);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };
//   const handleClickShowPassword = () => {
//     setValues({
//       ...values,
//       showPassword: !values.showPassword,
//     });
//   };

//   // const handleDateChange = () => {
//   //   console.log("date")
//   // }

//   const uploadButton = (
//     <div>
//       {/* {isLoading ? <LoadingOutlined /> : <PlusOutlined />} */}
//       <div
//         style={{
//           marginTop: 8,
//         }}
//       >
//         Upload
//       </div>
//     </div>
//   );

//   if (!isLoading) {
//     return (
//       <div className="user_info_container">
//         <div className="container personal_info personal_info_shadow_none">
//           <h3 className="content_title">Personal Information</h3>

//           <div>
//             <hr />
//           </div>

//           <div className="row">
//             <div className="col-md-3 col-sm-12 mx-auto">
//               <div className=" flex flex-col gap-y-2">
//                 {/* <div
//                 className="mx-auto w-[130px] h-[130px] d-flex justify-content-center align-items-center"
//                 style={{
//                   border: "1px solid grey",
//                   "border-radius": "28%",
//                   margin: "auto",
//                   overflow: "hidden",
//                 }}
//               > */}
//                 <Upload
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   // onRemove={handleFileRemove}
//                   listType="picture-card"
//                   // fileList={defaultFileList}
//                   className="custom-class d-flex justify-content-center align-items-center w-1/2  "
//                   // className={`   d-flex justify-content-center align-items-center w-1/2  `}
//                   maxCount={1}
//                 >
//                   <div>Picture ID (10MB Max) </div>
//                 </Upload>
//                 <p className="text-xs text-red-500">
//                   Please add in a photo for your indentification card.
//                 </p>
//               </div>
//               {/* </div> */}
//             </div>

//             <div className="col-md-9 col-sm-12 user_form">
//               <form className="row mx-auto form_inputs">
//                 <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
//                   <div className="row first_name">
//                     <label htmlFor="firstName"> First Name :</label>
//                     <input
//                       type="text"
//                       id="firstName"
//                       name="firstName"
//                       placeholder="First Name"
//                       onChange={handleChange("firstName")}
//                       // className={errorClass(values.formErrors.firstName)}
//                       value={values.firstName}
//                     />
//                     {/* {isProfileSaveClicked && !isPersonalInfoValid.firstName.isValid && <label htmlFor="firstName">Firtname should not be empty</label>} */}
//                   </div>
//                 </div>

//                 <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
//                   <div className="row spiritual_name">
//                     <label htmlFor="spiritualName">
//                       Spiritual Name (Optional) :
//                     </label>
//                     <input
//                       type="text"
//                       id="spiritualName"
//                       name="spiritualName"
//                       placeholder="Spiritual Name"
//                       onChange={handleChange("spiritualName")}
//                       value={values.spiritualName}
//                     />
//                   </div>
//                 </div>

//                 <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
//                   <div className="row middle_name">
//                     <label htmlFor="middleName">Middle Name (Optional):</label>
//                     <input
//                       type="text"
//                       id="middleName"
//                       name="middleName"
//                       placeholder="Middle Name"
//                       onChange={handleChange("middleName")}
//                       value={values.middleName}
//                     />
//                   </div>
//                 </div>

//                 {/* <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
//                   <div className="row birth_date">
//                     <label htmlFor="birthDate">Birth Date :</label>
//                     <input
//                       type="date"
//                       id="birthDate"
//                       name="birthDate"
//                       onChange={handleChange("date")}
//                       // className={errorClass(values.formErrors.date)}
//                       value={values.date}
//                     />
//                   </div>
//                 </div> */}

//                 <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
//                   <div className="row birth_date" style={{ marginTop: "35px" }}>
//                     <LocalizationProvider dateAdapter={AdapterDateFns}>
//                       <DatePicker
//                         value={date ? new Date(date) : null}
//                         onChange={handleDateChange}
//                         renderInput={(params) => (
//                           <TextField
//                             {...params}
//                             fullWidth
//                             variant="outlined"
//                             placeholder="MM-DD-YYYY"
//                             inputProps={{
//                               ...params.inputProps,
//                               readOnly: true, // Make the input field read-only
//                             }}
//                           />
//                         )}
//                       />
//                     </LocalizationProvider>
//                     <small style={{ color: "#6c757d", marginTop: "5px" }}>
//                       Please select date from calendar
//                     </small>
//                   </div>
//                 </div>




//                 <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
//                   <div className="row last_name">
//                     <label htmlFor="lastName">Last Name :</label>
//                     <input
//                       type="text"
//                       onChange={handleChange("lastName")}
//                       id="lastName"
//                       name="lastName"
//                       placeholder="Last Name"
//                       // className={errorClass(values.formErrors.lastName)}
//                       value={values.lastName}
//                     />
//                   </div>
//                 </div>

//                 <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
//                   <div className="row last_name">
//                     <label htmlFor="password">New Password (Optional):</label>
//                     <FormControl
//                       variant="outlined"
//                       className="my_place_pass ps-2"
//                     >
//                       {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
//                       <FilledInput
//                         id="ful_Width"
//                         placeholder="New Password"
//                         type={values.showPassword ? "text" : "password"}
//                         onChange={handleChange("password")}
//                         value={values.password}
//                         endAdornment={
//                           <InputAdornment position="start">
//                             <IconButton
//                               aria-label="toggle password visibility"
//                               onClick={handleClickShowPassword}
//                               onMouseDown={handleMouseDownPassword}
//                               edge="end"
//                             >
//                               {values.showPassword ? (
//                                 <Visibility />
//                               ) : (
//                                 <VisibilityOff />
//                               )}
//                             </IconButton>
//                           </InputAdornment>
//                         }
//                         label="Password"
//                       />
//                     </FormControl>
//                   </div>
//                 </div>

//                 <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
//                   <div className="row user_phone">
//                     <label htmlFor="phone">Telephone Number :</label>
//                     <input
//                       type="text"
//                       id="phone"
//                       name="phone"
//                       placeholder="Telephone Number"
//                       onChange={handleChange("phoneNumber")}
//                       // className={errorClass(values.formErrors.phoneNumber)}
//                       value={values.phoneNumber}
//                     />
//                   </div>
//                 </div>

//                 <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
//                   <div className="row user_gender">
//                     <label htmlFor="gender">Sex :</label>

//                     <div className="row gender_button">
//                       <div className="gender_info col-md-6 col-sm-6">
//                         <input
//                           name="sex"
//                           type="radio"
//                           id="male"
//                           value="male"
//                           onChange={handleChange("sex")}
//                         // className={
//                         //   "gender_input" +
//                         //   " " +
//                         //   errorClass(values.formErrors.sex)
//                         // }
//                         />
//                         <label id="male_gender" htmlFor="gender">
//                           Male
//                         </label>
//                       </div>

//                       <div className="gender_info col-md-6 col-sm-6">
//                         <input
//                           name="sex"
//                           type="radio"
//                           id="female"
//                           value="female"
//                           onChange={handleChange("sex")}
//                         // className={
//                         //   "gender_input" +
//                         //   " " +
//                         //   errorClass(values.formErrors.sex)
//                         // }
//                         />
//                         <label id="female_gender" htmlFor="gender">
//                           Female
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="col-md-9 col-sm-12 inputs_group">
//                   <div className="row street_address">
//                     <label htmlFor="address">Street Address Line 1 :</label>
//                     <input
//                       type="text"
//                       id="address"
//                       name="address"
//                       placeholder="Street Address"
//                       onChange={handleChange("addressFirstLine")}
//                       // className={errorClass(values.formErrors.addressFirstLine)}
//                       value={values.addressFirstLine}
//                     />
//                   </div>
//                 </div>

//                 <div className="col-md-9 col-sm-12 inputs_group">
//                   <div className="row address_optional">
//                     <label htmlFor="address">Address Line 2 (Optional) :</label>
//                     <input
//                       type="text"
//                       id="address"
//                       name="address"
//                       placeholder="Address Line 2"
//                       onChange={handleChange("addressSecondLine")}
//                       value={values.addressSecondLine}
//                     />
//                   </div>
//                 </div>

//                 <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
//                   <div className="row address_optional">
//                     <label htmlFor="city">City :</label>
//                     <input
//                       type="text"
//                       id="city"
//                       name="city"
//                       placeholder="City"
//                       onChange={handleChange("city")}
//                       // className={errorClass(values.formErrors.city)}
//                       value={values.city}
//                     />
//                   </div>
//                 </div>

//                 <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
//                   <div className="row address_optional">
//                     <label htmlFor="state">State :</label>
//                     <input
//                       type="text"
//                       id="state"
//                       name="state"
//                       placeholder="State"
//                       onChange={handleChange("state")}
//                       // className={errorClass(values.formErrors.state)}
//                       value={values.state}
//                     />
//                   </div>
//                 </div>

//                 <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
//                   <div className="row last_name">
//                     <label htmlFor="zipCode">Zip Code :</label>
//                     <input
//                       type="text"
//                       id="zip_code"
//                       name="zip_code"
//                       placeholder="Zip Code"
//                       onChange={handleChange("zipCode")}
//                       // className={errorClass(values.formErrors.zipCode)}
//                       value={values.zipCode}
//                     />
//                     {/* {isProfileSaveClicked && !isPersonalInfoValid.zipCode.isValid && <label htmlFor="zipCode">{isPersonalInfoValid.zipCode.errorMessage}</label>} */}
//                   </div>
//                 </div>

//                 <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
//                   <div className="row last_name">
//                     <label htmlFor="country">Country :</label>
//                     <input
//                       type="text"
//                       id="country"
//                       name="country"
//                       placeholder="Country"
//                       onChange={handleChange("country")}
//                       // className={errorClass(values.formErrors.country)}
//                       value={values.country}
//                     />
//                   </div>
//                 </div>

//                 <div className="col-md-9 col-sm-12 inputs_group">
//                   <div className="row address_optional">
//                     <label htmlFor="address">
//                       <a target="_blank" href="https://drala.io/">
//                         Drala Wallet Address (Optional):
//                       </a>
//                     </label>
//                     <input
//                       type="text"
//                       id="address"
//                       name="address"
//                       placeholder="Drala Wallet Address"
//                       onChange={handleChange("dralaWalletAdress")}
//                       value={values.dralaWalletAdress}
//                     />
//                   </div>
//                 </div>

//                 {/* <div className="panel panel-default">
//                   <FormErrors
//                     formErrors={values.formErrors ? values.formErrors : {}}
//                   />
//                 </div> */}
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return <div>Loading...</div>;
//   }
// };

// export default UserInfo;
