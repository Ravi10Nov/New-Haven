import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Loader from "components/Loader";
import axios from "config/axios";
import { useAuth } from "hooks/useAuth";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "./AdminViewUser.css";
import { format } from 'date-fns';

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "../../../node_modules/@mui/material/index";

const AdminViewUser = ({ url }) => {
  const { userId } = useParams();
  const { fetchProfile, unblockUser, blockUser, fetchProfiles } = useAuth();
  const [user, setUser] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [userDeleted, setUserDeleted] = useState(false);
  const [addUserDonation, setAddUserDonation] = useState({
    amount: "",
    // userId: userId,
    orderId: uuidv4(),
    currency: "USD",
    donationDate: null,
    status: "Completed",
    purchasedItems: "Admin",
    description: "",
  });
  const [openDonationModal, setOpenDonationModal] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    spiritualname: "",
    birthdate: "",
    sex: "",
    email: "",
    phone: "",
    addressline1: "",
    addressline2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    dralawalletaddress: "",
    image: null,
    notes: "",
    joiningDate: ""
  });

  // const dobRef = useRef(userInfo.birthdate);

  const [isLoading, setIsLoading] = useState(false);

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

  const [userRole, setUserRole] = useState("");
  const [userDeleteConfirmOpen, setUserDeleteConfirmOpen] =
    React.useState(false);
  const handleOpen = () => setUserDeleteConfirmOpen(true);
  const handleClose = () => setUserDeleteConfirmOpen(false);

  const handleUserRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  const handleUserRoleUpdate = async () => {
    if (userRole === "user") {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/role/user/${user._id}`
      );
    } else if (userRole === "instructor") {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/role/instructor/${user._id}`
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setUserInfo((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));

    // Ensure that the birthdate is a valid Date object
    if (name === "birthdate" || name === "joiningDate") {
      const dateValue = new Date(value);
      if (!isNaN(dateValue.getTime())) {
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          [name]: dateValue,
        }));
      }
    } else {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        [name]: value,
      }));
    }

  };

  const handleDateChange = (newDate) => {
    // Update the ref and state
    dobRef.current = newDate;
    setUserInfo((prev) => ({
      ...prev,
      birthdate: newDate,
    }));
  };

  const handlePasswordChange = async () => {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/admin-change-password/${user._id}`,
      { newPassword: userPassword }
    );
  };

  const handleViewDonations = async () => { };

  const handleUpdateUserDetails = async () => {
    setIsLoading(true)
    const userData = {
      firstName: userInfo.firstname,
      middleName: userInfo.middlename,
      lastName: userInfo.lastname,
      spiritualName: userInfo.spiritualname,
      sex: userInfo.sex,
      addressFirstLine: userInfo.addressline1,
      addressSecondLine: userInfo.addressline2,
      state: userInfo.state,
      city: userInfo.city,
      zipCode: userInfo.zipcode,
      country: userInfo.country,
      phoneNumber: userInfo.phone,
      // date: userInfo.birthdate ? format(new Date(userInfo.birthdate), "yyyy-MM-dd") : "",
      date: userInfo.birthdate,
      profileImage: userInfo.image,
      dralaWalletAdress: userInfo.dralawalletaddress,
      email: userInfo.email,
      notes: userInfo.notes,
      // joiningDate: userInfo.joiningDate ? format(new Date(userInfo.joiningDate), "yyyy-MM-dd") : "",
      joiningDate: userInfo.joiningDate,
    };

    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/update-profile/${user._id}`,
      userData
    );

    console.log(response)

    // Updating user role
    const res = await handleUserRoleUpdate();

    // Updating password
    if (userPassword !== null && userPassword.length >= 6) {
      await handlePasswordChange();
    }
    setIsLoading(false)

    if (response.data.success) {
      toast.success("User Profile successfully updated");
    }

  };

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };

  const handleblockUser = async () => {
    const response = await blockUser(userId);
    toast.success("User blocked successfully!");
  };
  const handleUnblockUser = async () => {
    const response = await unblockUser(userId);
    toast.success("User unblocked successfully!");
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      image: base64,
    }));
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/${user._id}`
      );

      if (response.data.success) {
        toast.success("User account successfully deleted");
        setUserDeleted(true);
        setUserDeleteConfirmOpen(false);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("An error occurred while deleting your account.");
    }
  };

  useEffect(() => {
    if (userDeleted) {
      console.log("account deleted");
    }
  }, [userDeleted]);

  const fetchUserDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetchProfile(userId);
      const birthdate = response.profile.birthdate
        ? new Date(response.profile.birthdate)
        : null;
      const joiningDate = response.profile.joiningDate
        ? new Date(response.profile.joiningDate)
        : null;
      const profile = {
        firstname: response.profile.firstname,
        middlename: response.profile.middlename,
        lastname: response.profile.lastname,
        spiritualname: response.profile.spiritualname,
        birthdate: birthdate,
        sex: response.profile.sex,
        email: response.profile.email,
        phone: response.profile.phone,
        addressline1: response.profile.addressline1,
        addressline2: response.profile.addressline2,
        city: response.profile.city,
        state: response.profile.state,
        zipcode: response.profile.zipcode,
        country: response.profile.country,
        dralawalletaddress: response.profile.dralawalletaddress,
        image: response.profile.image,
        notes: response.profile.notes,
        joiningDate
      };

      setUserInfo(profile);
      setUser(response.profile.user);
      setUserRole(response.profile.user.role);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const handleAddDonations = (e) => {
    const { name, value } = e.target;

    setAddUserDonation((prev) => ({ ...prev, [name]: value }));
  };

  // function isValidDate(dateString) {
  //   // Regular expression to match mm/dd/yy format
  //   const regex = /^\d{2}\/\d{2}\/\d{2}$/;

  //   // Check if the format matches the regular expression
  //   if (!regex.test(dateString)) {
  //     return false;
  //   }

  //   // Split the date string into month, day, and year components
  //   const [monthString, dayString, yearString] = dateString.split("/");

  //   // Convert strings to numbers
  //   const month = parseInt(monthString, 10) - 1; // Months are zero-indexed
  //   const day = parseInt(dayString, 10);
  //   const year =
  //     parseInt(yearString, 10) + (yearString.length === 2 ? 2000 : 0); // Adjust year based on length (2-digit or 4-digit)

  //   // Check if the parsed values are within valid ranges
  //   if (
  //     year < 1000 ||
  //     year > 9999 ||
  //     month < 0 ||
  //     month > 11 ||
  //     day < 1 ||
  //     day > 31
  //   ) {
  //     return false;
  //   }

  //   // Array of days in each month (non-leap year)
  //   const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  //   // Handle leap years for February
  //   if (month === 1) {
  //     const isLeapYear =
  //       (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  //     if (isLeapYear) {
  //       daysInMonth[1] = 29;
  //     }
  //   }

  //   // Check if the day is valid for the given month
  //   if (day > daysInMonth[month]) {
  //     return false;
  //   }

  //   // All checks passed, the date is valid
  //   return true;
  // }

  function isValidDate(dateString) {
    // Allow both mm/dd/yy and mm/dd/yyyy formats
    const regex = /^\d{2}\/\d{2}\/(\d{2}|\d{4})$/;

    if (!regex.test(dateString)) {
        return false;
    }

    let [month, day, year] = dateString.split("/").map(Number);
    
    // Adjust 2-digit years
    if (year < 100) {
        year += 2000; // Assumes all 2-digit years are 2000+
    }

    // Validate month (1-12)
    if (month < 1 || month > 12) {
        return false;
    }

    // Validate day (1-31) based on month
    const daysInMonth = [31, (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28, 
                         31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day < 1 || day > daysInMonth[month - 1]) {
        return false;
    }

    return true;
}


  const handleAddDonationSubmit = async () => {
    try {
      if (!isValidDate(addUserDonation.donationDate)) {
        return toast.error("Please enter a valid date");
      }

      console.log("current userid", userId);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/transactions/addDonation`,
        { ...addUserDonation, userId }
      );

      console.log("dination response", response.data.transaction.userId);
      toast.success("Donation was successfully added.");
    } catch (error) {
      console.log("error in front donataion", error);
      toast.error("Could not add the donation! Please try again later.");
    } finally {
      setOpenDonationModal(false);
    }
  };

  if (!isLoading) {
    return (
      <div className="user_info_container">
        <div className="container personal_info personal_info_shadow_none">
          <h3 className="content_title">User Informationn</h3>

          <div>
            <hr />
          </div>

          <div className="row">
            <div className="col-md-3 col-sm-12 mx-auto">
              <div className="flex">
                {/* Area 1: Display the current fetched image */}
                <div className="flex-1">
                  {userInfo?.image ? (
                    <img
                      src={userInfo?.image}
                      alt="User"
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-lg font-medium text-gray-700">
                      No Image
                    </span>
                  )}
                </div>

                {/* Area 2: Allow user to select a new image */}
                <div className="flex-1 ml-4">
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer bg-gray-300 p-4 rounded-md block"
                  >
                    <span className="text-lg font-medium text-gray-700">
                      Upload New Picture
                    </span>
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-9 col-sm-12 user_form">
            <form className="flex flex-col row mx-auto form_inputs">
              <div className="col-lg-12 col-md-12 col-sm-12 inputs_group">
                <div className="flex w-full row first_name">
                  <label style={{ width: "30%" }} htmlFor="firstname">
                    {" "}
                    First Name :
                  </label>
                  <input
                    style={{ width: "70%" }}
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={userInfo?.firstname}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 inputs_group">
                <div className="row middle_name">
                  <label style={{ width: "30%" }} htmlFor="middleName">
                    Middle Name :
                  </label>
                  <input
                    style={{ width: "70%" }}
                    type="text"
                    id="middlename"
                    name="middlename"
                    value={userInfo?.middlename}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 inputs_group">
                <div className="row last_name">
                  <label style={{ width: "30%" }} htmlFor="lastName">
                    Last Name :
                  </label>
                  <input
                    style={{ width: "70%" }}
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={userInfo?.lastname}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 inputs_group">
                <div className="flex w-full row spiritual_name">
                  <label style={{ width: "30%" }} htmlFor="spiritualname">
                    Spiritual Name :
                  </label>
                  <input
                    style={{ width: "70%" }}
                    type="text"
                    id="spiritualname"
                    name="spiritualname"
                    value={userInfo?.spiritualname}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 inputs_group">
                <div className="row role">
                  <label style={{ width: "30%" }} htmlFor="role">
                    Role
                  </label>
                  {/* <input
                      style={{ width: "70%" }}
                      type="text"
                      id="role"
                      name="role"
                      value={userRole}
                      onChange={handleUserRoleChange}
                    /> */}
                  <select
                    style={{ width: "70%" }}
                    id="role"
                    name="role"
                    value={userRole}
                    onChange={handleUserRoleChange}
                  >
                    <option value="user">User</option>
                    <option value="instructor">Instructor</option>
                    {/* Add additional options as needed (e.g., "admin") */}
                  </select>
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 inputs_group">
                <div className="row birth_date">
                  <label style={{ width: "30%" }} htmlFor="birthDate">
                    Birth Date :
                  </label>
                  <input
                    style={{ width: "70%" }}
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    value={
                      userInfo?.birthdate
                        ? userInfo.birthdate.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* <div className="col-lg-12 col-md-12 col-sm-12 inputs_group">
                <div className="row birth_date">
                  <label style={{ width: "30%" }} htmlFor="birthDate">
                    Birth Date :
                  </label>
                  <div style={{ width: "50%" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={userInfo?.birthdate}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params}
                          inputProps={{
                            ...params.inputProps,
                            readOnly: true, // Make the input field read-only
                          }} />}
                      />
                    </LocalizationProvider>
                  </div>
                  <small style={{ color: "#6c757d", marginTop: "5px", display: "block", width: "50%",marginLeft: "280px" }}>
                    Please select date from calendar
                  </small>
                </div>
              </div> */}

              <div className="col-lg-12 col-md-12 col-sm-12 inputs_group">
                <div className="row user_gender">
                  <label style={{ width: "30%" }} htmlFor="sex">
                    Sex :
                  </label>
                  <div style={{ width: "70%" }}>
                    <input
                      type="radio"
                      id="male"
                      name="sex"
                      value="male"
                      checked={userInfo?.sex === "male"}
                      onChange={handleChange}
                    />
                    <label htmlFor="male" className="mr-2 ml-2">
                      Male
                    </label>

                    <input
                      type="radio"
                      id="female"
                      name="sex"
                      value="female"
                      checked={userInfo?.sex === "female"}
                      onChange={handleChange}
                    />
                    <label htmlFor="female" className="mr-2 ml-2">
                      Female
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 inputs_group">
                <div className="row last_name">
                  <label style={{ width: "30%" }} htmlFor="lastName">
                    Email :
                  </label>
                  <input
                    style={{ width: "70%" }}
                    type="text"
                    id="email"
                    name="email"
                    value={userInfo?.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 inputs_group">
                <div className="row user_phone">
                  <label style={{ width: "30%" }} htmlFor="phone">
                    Telephone Number :
                  </label>
                  <input
                    style={{ width: "70%" }}
                    type="text"
                    id="phone"
                    name="phone"
                    value={userInfo?.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-9 col-sm-12 inputs_group">
                <div className="row street_address">
                  <label style={{ width: "30%" }} htmlFor="address">
                    Street Address Line 1 :
                  </label>
                  <input
                    style={{ width: "70%" }}
                    type="text"
                    id="addressline1"
                    name="addressline1"
                    value={userInfo?.addressline1}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-9 col-sm-12 inputs_group">
                <div className="row address_optional">
                  <label style={{ width: "30%" }} htmlFor="address">
                    Address Line 2 :
                  </label>
                  <input
                    style={{ width: "70%" }}
                    type="text"
                    id="addressline2"
                    name="addressline2"
                    value={userInfo?.addressline2}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 inputs_group">
                <div className="row address_optional">
                  <label style={{ width: "30%" }} htmlFor="city">
                    City :
                  </label>
                  <input
                    style={{ width: "70%" }}
                    type="text"
                    id="city"
                    name="city"
                    value={userInfo?.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 inputs_group">
                <div className="row address_optional">
                  <label style={{ width: "30%" }} htmlFor="state">
                    State :
                  </label>
                  <input
                    style={{ width: "70%" }}
                    type="text"
                    id="state"
                    name="state"
                    value={userInfo?.state}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 inputs_group">
                <div className="row last_name">
                  <label style={{ width: "30%" }} htmlFor="zipCode">
                    Zip Code :
                  </label>
                  <input
                    style={{ width: "70%" }}
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    value={userInfo?.zipcode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 inputs_group">
                <div className="row last_name">
                  <label style={{ width: "30%" }} htmlFor="country">
                    Country :
                  </label>
                  <input
                    style={{ width: "70%" }}
                    type="text"
                    id="country"
                    name="country"
                    value={userInfo?.country}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 inputs_group">
                <div className="row last_name">
                  <label style={{ width: "30%" }} htmlFor="password">
                    Password :
                  </label>
                  <input
                    style={{ width: "70%" }}
                    type="text"
                    id="password"
                    name="password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-9 col-sm-12 inputs_group">
                <div className="row address_optional">
                  <label style={{ width: "30%" }} htmlFor="address">
                    <a target="_blank" href="https://drala.io/">
                      Drala Wallet Address :
                    </a>
                  </label>
                  <input
                    style={{ width: "70%" }}
                    type="text"
                    id="dralawalletaddress"
                    name="dralawalletaddress"
                    value={userInfo?.dralawalletaddress}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-9 col-sm-12 inputs_group w-full">
                <div className="row notes">
                  <label
                    for="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Admin Notes
                  </label>
                  <textarea
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Admin Notes"
                    id="notes"
                    name="notes"
                    value={userInfo?.notes}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 inputs_group">
                <div className="row last_name">
                  <label style={{ width: "30%" }} htmlFor="country">
                    Account Status :
                  </label>
                  <span style={{ width: "70%" }}>
                    {user?.isUserBlocked ? "Blocked" : "Unblocked"}
                  </span>
                  {user && user.isUserBlocked && (
                    <button
                      type="button"
                      className="btn mt-2 me-5 adoption_btn justify-self-center align-self-center text-center"
                      onClick={handleUnblockUser}
                    >
                      UnBlock User
                    </button>
                  )}
                  {user && !user.isUserBlocked && (
                    <button
                      type="button"
                      className="btn mt-2 me-5 adoption_btn justify-self-center align-self-center text-center"
                      onClick={handleblockUser}
                    >
                      Block User
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-start   items-center w-full">
                <button
                  type="button"
                  className="btn mt-2 me-5 whitespace-nowrap adoption_btn justify-self-center  align-self-center text-center  "
                  onClick={handleUpdateUserDetails}
                >
                  Update Details
                </button>
                <button
                  type="button"
                  className="btn mt-2 me-5 whitespace-nowrap adoption_btn justify-self-center  align-self-center text-center  "
                  onClick={() => setOpenDonationModal(true)}
                >
                  Add Donations
                </button>
                <button
                  type="button"
                  className="btn mt-2 me-5 adoption_btn   whitespace-nowrap justify-self-center  align-self-center text-center"
                  onClick={() => setUserDeleteConfirmOpen(true)}
                >
                  Delete Account
                </button>

                <Link to={`${url}/users/details/${userId}/coursedetails`}>
                  <button
                    type="button"
                    className="btn  whitespace-nowrap mt-2 me-5 adoption_btn justify-self-center  align-self-center text-center"
                  >
                    Course Details
                  </button>
                </Link>

                <Link to={`${url}/users/details/${userId}/userDonations`}>
                  <button
                    type="button"
                    className="btn whitespace-nowrap mt-2 me-5 adoption_btn justify-self-center  align-self-center text-center"
                  >
                    View Donations
                  </button>
                </Link>

                <Modal
                  open={openDonationModal}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Enter Donation Details
                    </Typography>
                    <label className="block text-sm font-medium text-gray-700">
                      Amount (USD)
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                      label="Amount"
                      name="amount"
                      onChange={(e) => handleAddDonations(e)}
                      value={addUserDonation.amount}
                    />
                    <label className="block text-sm font-medium text-gray-700">
                      Donation Date
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                      label="Donation Date"
                      name="donationDate"
                      placeholder="MM/DD/YY"
                      onChange={(e) => handleAddDonations(e)}
                      value={addUserDonation.donationDate}
                    />

                    <div className="row notes  col-sm-12 inputs_group w-full">
                      <label
                        for="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Donation description
                      </label>
                      <textarea
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Donation description (optional)"
                        id="description"
                        name="description"
                        value={userInfo?.description}
                        onChange={(e) => handleAddDonations(e)}
                      />
                    </div>

                    <div className="flex">
                      <button
                        type="button"
                        className="btn mt-2 me-5 adoption_btn justify-self-center  align-self-center text-center"
                        onClick={handleAddDonationSubmit}
                      >
                        Add Donation
                      </button>
                      <button
                        type="button"
                        className="btn mt-2 me-5 adoption_btn justify-self-center  align-self-center text-center"
                        onClick={() => setOpenDonationModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Box>
                </Modal>
                <Modal
                  open={userDeleteConfirmOpen}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Are you sure you want to delete this user's account?
                    </Typography>
                    <div className="flex">
                      <button
                        type="button"
                        className="btn mt-2 me-5 adoption_btn justify-self-center  align-self-center text-center"
                        onClick={handleDeleteAccount}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="btn mt-2 me-5 adoption_btn justify-self-center  align-self-center text-center"
                        onClick={() => setUserDeleteConfirmOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Box>
                </Modal>
              </div>
            </form>
          </div>
          {/* </div>  */}
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default AdminViewUser;
