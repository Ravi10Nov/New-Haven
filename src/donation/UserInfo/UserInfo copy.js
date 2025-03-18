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

import { Visibility, VisibilityOff } from "@mui/icons-material";
import CourseImageUpload from "features/courses/AddEditCourseDetails/CourseImageUpload/CourseImageUpload";
const UserInfo = ({ setFormStateOnParent, initialUserData, initImageId }) => {
  const [values, setValues] = React.useState(initialUserData);
  const [imageId, setImageId] = React.useState(initImageId);
  const [isLoading, setIsLoading] = React.useState(true);

  const errorClass = (error) => {
    return error.length === 0 ? "" : "has-error";
  };

  const validateField = (fieldName, value) => {
    if (values.formErrors != undefined) {
      let fieldValidationErrors = values.formErrors;
      let emailValid = values.emailValid;
      let firstNameValid = values.firstNameValid;
      let passwordValid = values.passwordValid;
      let dateValid = values.dateValid;
      let lastNameValid = values.lastNameValid;
      let phoneNumberValid = values.phoneNumberValid;
      let sexValid = values.sexValid;
      let addressFirstLineValid = values.addressFirstLineValid;
      let cityValid = values.cityValid;
      let stateValid = values.stateValid;
      let zipCodeValid = values.zipCodeValid;
      let countryValid = values.countryValid;

      switch (fieldName) {
        case "zipCode":
          zipCodeValid = value.length > 0;
          fieldValidationErrors.zipCode = zipCodeValid ? "" : " is invalid";
          break;
        case "phoneNumber":
          phoneNumberValid = value.length > 0;
          fieldValidationErrors.phoneNumber = phoneNumberValid
            ? ""
            : "is invalid";
          break;
        case "country":
          countryValid = value.length > 0;
          fieldValidationErrors.country = countryValid ? "" : "is invalid";
          break;
        case "email":
          emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          fieldValidationErrors.email = emailValid ? "" : " is invalid";
          break;
        case "password":
          passwordValid = value.length >= 6;
          fieldValidationErrors.password = passwordValid ? "" : " is too short";
          break;
        case "firstName":
          firstNameValid = value.length > 0;
          fieldValidationErrors.firstName = firstNameValid
            ? ""
            : " set a first name ";
          break;
        case "date":
          dateValid = value.length > 0;
          fieldValidationErrors.date = dateValid ? "" : " set a date ";
          break;
        case "lastName":
          lastNameValid = value.length > 0;
          fieldValidationErrors.lastName = lastNameValid
            ? ""
            : " set a last name ";
          break;
        case "phoneNumber:":
          phoneNumberValid = value.length > 0;
          fieldValidationErrors.phoneNumber = phoneNumberValid
            ? ""
            : " set a Phone number ";
          break;
        case "sex":
          sexValid = value.length > 0;
          fieldValidationErrors.sex = sexValid ? "" : " choose a sex ";

          break;
        case "addressFirstLine":
          addressFirstLineValid = value.length > 0;
          fieldValidationErrors.addressFirstLine = addressFirstLineValid
            ? ""
            : " specify a first line adresse ";

          break;
        case "city":
          cityValid = value.length > 0;
          fieldValidationErrors.city = cityValid ? "" : " specify your city ";

          break;
        case "state":
          stateValid = value.length > 0;
          fieldValidationErrors.state = stateValid
            ? ""
            : " specify your state ";
          break;
        default:
          break;
      }

      let newObject = {
        formErrors: fieldValidationErrors,
        stateValid: stateValid,
        cityValid: cityValid,
        addressFirstLineValid: addressFirstLineValid,
        sexValid: sexValid,
        phoneNumberValid: phoneNumberValid,
        lastNameValid: lastNameValid,
        dateValid: dateValid,
        passwordValid: passwordValid,
        emailValid: emailValid,
        firstNameValid: firstNameValid,
        zipCodeValid: zipCodeValid,
        countryValid: countryValid,
      };

      newObject[fieldName] = value;
      setValues((current) => {
        return { ...current, ...newObject };
      });
    }
  };

  const validateImage = () => {
    /*
    if( imageId.length <= 0 ) {
      const oldValues = { ...values };
      oldValues.formErrors.image = 'is not set';
      setValues( oldValues );
    }else{
      const oldValues = { ...values };
      delete oldValues.formErrors.image;
      setValues( oldValues );
    }
    */
  };
  const validateForm = () => {
    return (
      values.emailValid &&
      values.passwordValid &&
      values.stateValid &&
      values.cityValid &&
      values.addressFirstLineValid &&
      values.sexValid &&
      values.phoneNumberValid &&
      values.lastNameValid &&
      values.countryValid &&
      values.zipCodeValid &&
      values.dateValid &&
      values.lastNameValid &&
      values.passwordValid &&
      values.emailValid &&
      values.firstNameValid &&
      imageId.length > 0
    );
  };

  useEffect(() => {
    values.formValid = validateForm();
    setFormStateOnParent(values, imageId);
    validateImage();
    setIsLoading(false);
  }, [values]);

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
              <div
                className="mx-auto w-[130px] h-[130px]"
                style={{
                  border: "1px solid grey",
                  "border-radius": "28%",
                  margin: "auto",
                  overflow: "hidden",
                }}
              >
                <CourseImageUpload
                  setIdOnParent={(id) => setImageId(id)}
                  defaultImage={""}
                >
                  {" "}
                </CourseImageUpload>
              </div>
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
                      className={errorClass(values.formErrors.firstName)}
                      value={values.firstName}
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
                      values={values.spiritualName}
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
                      className={errorClass(values.formErrors.date)}
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
                      className={errorClass(values.formErrors.lastName)}
                      value={values.lastName}
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
                      className={errorClass(values.formErrors.email)}
                      value={values.email}
                    />
                  </div>
                </div>

                <div className="col-lg-4 col-md-12 col-sm-12 inputs_group">
                  <div className="row last_name">
                    <label htmlFor="password">Login Password :</label>
                    <FormControl
                      variant="outlined"
                      className="my_place_pass ps-2"
                    >
                      {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
                      <FilledInput
                        id="ful_Width"
                        placeholder="Enter your password"
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
                      className={errorClass(values.formErrors.phoneNumber)}
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
                          className={
                            "gender_input" +
                            " " +
                            errorClass(values.formErrors.sex)
                          }
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
                          className={
                            "gender_input" +
                            " " +
                            errorClass(values.formErrors.sex)
                          }
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
                      className={errorClass(values.formErrors.addressFirstLine)}
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
                      onChange={handleChange("addressSecondeLine")}
                      value={values.addressSecondeLine}
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
                      className={errorClass(values.formErrors.city)}
                      value={values.city}
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
                      className={errorClass(values.formErrors.state)}
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
                      className={errorClass(values.formErrors.zipCode)}
                      value={values.zipCode}
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
                      className={errorClass(values.formErrors.country)}
                      value={values.country}
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
                      value={values.dralaWalletAdress}
                    />
                  </div>
                </div>

                <div className="panel panel-default">
                  <FormErrors
                    formErrors={values.formErrors ? values.formErrors : {}}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default UserInfo;
