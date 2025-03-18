import React, { useEffect, useState } from "react";
import { NavLink, Link, useHistory, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../../admin/AdminViewUserProfile/AdminViewUser.css";
import { useAuth } from "hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import axios from "config/axios";
import { Upload, Progress } from "antd";
import Loader from "components/Loader";

const TransactionUserDetailsForAdmin = ({ url }) => {
  const { userId } = useParams();
  const { fetchProfile, unblockUser, blockUser } = useAuth();
  const [user, setUser] = useState(null);
  const [userPassword, setUserPassword] = useState("");
  const [userDeleted, setUserDeleted] = useState(false);
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
  });

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

    // Ensure that the birthdate is a valid Date object
    if (name === "birthdate") {
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
  const handlePasswordChange = async () => {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/admin-change-password/${user._id}`,
      { newPassword: userPassword }
    );
  };

  const handleViewDonations = async () => {};

  const handleUpdateUserDetails = async () => {
    console.log(userInfo);
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
      date: userInfo.birthdate,
      profileImage: userInfo.image,
      dralaWalletAdress: userInfo.dralawalletaddress,
      email: userInfo.email,
      notes: userInfo.notes,
    };
    console.log(userData);
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/update-profile/${user._id}`,
      userData
    );
    console.log(response.data);

    // Updating user role
    const res = await handleUserRoleUpdate();

    // Updating password
    await handlePasswordChange();

    if (response.data.success) {
      toast.success("User Profile successfully updated");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleblockUser = async () => {
    const response = await blockUser(user._id);
    toast.success("User blocked successfully!");
  };
  const handleUnblockUser = async () => {
    const response = await unblockUser(user._id);
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
        setUserDeleted(true); // Update state after successful deletion
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

  if (!isLoading) {
    return (
      <div className="user_info_container">
        <div className="container personal_info personal_info_shadow_none">
          <h3 className="content_title">User Information</h3>

          <div>
            <hr />
          </div>

          <div className="row">
            <div className="col-md-3 col-sm-12 mx-auto">
              {/* <div className="max-w-md mx-auto bg-gray-100 p-4 rounded-lg shadow-md"> */}
              {/* <img src={userInfo?.image} alt="Profile Image" className="w-full h-auto rounded-lg"/> */}
              {/* </div> */}
              {/* <Upload
                      accept="image/*"
                      onChange={handleFileChange}
                      listType="picture-card"
                      defaultFileList={[{ uid: '-1', name: 'default-image.jpg', status: 'done', thumbUrl: userInfo?.image }]}
                      className="image-upload-grid d-flex justify-content-center align-items-center"
                      maxCount={1}
                    >
                      {uploadButton}
                      <div>Picture ID (10MB Max)</div>
                    </Upload> */}

              {/* <div className="flex items-center justify-center">
                          <label htmlFor="fileInput" className="relative cursor-pointer bg-gray-300 p-4 rounded-md">
                            {userInfo?.image ? (
                              <img src={userInfo?.image} alt="User" className="w-full h-full object-cover rounded-md" />
                            ) : (
                              <span className="text-lg font-medium text-gray-700">Upload Picture</span>
                            )}
                            <input
                              type="file"
                              id="fileInput"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </label>
                    </div> */}
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

                  <select
                    style={{ width: "70%" }}
                    id="role"
                    name="role"
                    value={userRole}
                    onChange={handleUserRoleChange}
                  >
                    <option value="user">User</option>
                    <option value="instructor">Instructor</option>
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

              <div className="col-lg-12 col-md-12 col-sm-12 inputs_group">
                <div className="row last_name">
                  <label style={{ width: "30%" }} htmlFor="country">
                    Account Status :
                  </label>
                  <span style={{ width: "70%" }}>
                    {user?.isUserBlocked ? "Blocked" : "Unblocked"}
                  </span>
                </div>
              </div>

              <Link to={`${url}/transactions/earnings`}>
                <button
                  type="button"
                  className="btn whitespace-nowrap mt-2 me-5 adoption_btn justify-self-center align-self-center text-center"
                >
                  Back
                </button>
              </Link>
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

export default TransactionUserDetailsForAdmin;
