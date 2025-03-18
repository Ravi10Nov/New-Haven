import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Loader from "components/Loader";
import { EnhancedTable } from "components/SmartTable/SmartTable";
import axios from "config/axios";
import { PaginationComponent } from "features/courses/components/Paginitation";
import { useAuth } from "hooks/useAuth";
import { UseSearchQuery } from "hooks/useSearchQuery";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "./UserViewDetails.css";
import { format } from 'date-fns';

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const actions = ({ url, id, status }) => {
  if (status != "finished") {
    return (
      <div className="lc_flex justify-center items-center">
        <NavLink to={`${url}/users/details/${id}`}>
          <Button variant="contained" className="bt_info">
            Details
          </Button>
        </NavLink>
      </div>
    );
  }
};

const UserViewDetails = ({ url }) => {
  const [values, setValues] = useState();
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [createUserModal, setCreateUserModal] = useState(false);

  const {
    search,
    bindFormValue,
    setOrderByField,
    sortingOrder,
    setCount,
    setPage,
  } = UseSearchQuery();
  const [isLoading, setIsLoading] = useState(false);
  const { fetchProfiles } = useAuth();
  const [rows, setRows] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  // const dobRef = useRef(null);
  // const dojRef = useRef(null);

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    middlename: "",
    lastname: "",
    spiritualname: "",
    sex: "",
    addressline1: "",
    addressline2: "",
    state: "",
    city: "",
    zipcode: "",
    country: "",
    phone: "",
    birthdate: "",
    drallaWallet: "",
    joiningDate: ""
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickCalendar = (event) => {
    // Set the anchor to the clicked input field
    setAnchorEl(event.currentTarget);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }

    if (name === "confirmPassword" || name === "password") {
      if (
        name === "password" &&
        user.confirmPassword &&
        value !== user.confirmPassword
      ) {
        setPasswordError("Passwords do not match");
      } else if (name === "confirmPassword" && value !== user.password) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };

  // const handleDateChange = (name, newDate) => {
  //   if (newDate) {
  //     const formattedDate = format(newDate, "yyyy-MM-dd");
  //     setUser((prev) => ({ ...prev, [name]: formattedDate }));
  //   } else {
  //     setUser((prev) => ({ ...prev, [name]: "" }));
  //   }
  // };

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
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setSelectedImage(base64);
  };

  const handleSubmitUser = async () => {
    // Reset error states
    setPasswordError("");
    setEmailError("");

    // Validate all required fields
    if (
      !user.email ||
      !user.password ||
      !user.confirmPassword ||
      !user.firstname ||
      !user.lastname ||
      !user.sex ||
      !user.addressline1 ||
      !user.city ||
      !user.state ||
      !user.zipcode ||
      !user.country ||
      !user.phone ||
      !user.birthdate ||
      !user.joiningDate
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    // Validate email
    if (!validateEmail(user.email)) {
      setEmailError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate password
    if (user.password !== user.confirmPassword) {
      setPasswordError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    // Check for profile image
    if (!selectedImage) {
      toast.error("Please select a profile image");
      return;
    }

    try {
      setIsLoading(true);
      const userData = {
        ...user,
        image: selectedImage,
      };

      console.log(userData)

      // const formattedUserData = {
      //   ...user,
      //   birthdate: user.birthdate ? format(new Date(user.birthdate), "yyyy-MM-dd") : "",
      //   joiningDate: user.joiningDate ? format(new Date(user.joiningDate), "yyyy-MM-dd") : "",
      //   image: selectedImage,
      // };

      // console.log(formattedUserData);

      const response = await axios.post("/api/auth/create-user", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast.success("User created successfully!");
        setCreateUserModal(false);

        setUser({
          email: "",
          password: "",
          confirmPassword: "",
          firstname: "",
          middlename: "",
          lastname: "",
          spiritualname: "",
          sex: "",
          addressline1: "",
          addressline2: "",
          state: "",
          city: "",
          zipcode: "",
          country: "",
          phone: "",
          birthdate: "",
          drallaWallet: "",
          joiningDate: ""
        });
        setSelectedImage(null);
        // Refresh user list
        await initData();
      } else {
        toast.error(response.data.error || "Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred while creating the user");
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    setIsLoading(true);
    const response = await fetchProfiles();
    console.log(response);
    setRows(response.profiles);
    setTotalEntries(response.totalProfiles);
    setIsLoading(false);
  };

  const headers = [
    { label: "Last Name", id: "lastname", align: "start" },
    { label: "First Name", id: "firstname", align: "start" },
    { label: "Spiritual Name", id: "spiritualname", align: "start" },
    { label: "Email", id: "email", align: "start" },
    { label: "Joining Date", id: "joiningDate", align: "start" }
  ];

  const handleShow = (event) => {
    event.preventDefault();
    const keys = Object.keys(values);

    for (const key of keys) {
      bindFormValue(key, values[key]);
    }
  };

  const handleChange = (prop) => (event) => {
    event.preventDefault();
    const name = prop;
    const value = event.target.value;
    const newObject = {};
    newObject[name] = value;

    setValues((current) => {
      return { ...current, ...newObject };
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-100">
      <div className="container-fluid">
        <div className="flex flex-col">
          <div className="w-full flex mr-3 justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
              onClick={() => setCreateUserModal(true)}
            >
              Create User
            </button>
            <Modal
              open={createUserModal}
              onClose={() => {
                setCreateUserModal(false);
                setPasswordError("");
                setEmailError("");
                setUser({
                  email: "",
                  password: "",
                  confirmPassword: "",
                  firstname: "",
                  middlename: "",
                  lastname: "",
                  spiritualname: "",
                  sex: "",
                  addressline1: "",
                  addressline2: "",
                  state: "",
                  city: "",
                  zipcode: "",
                  country: "",
                  phone: "",
                  birthdate: "",
                  drallaWallet: "",
                  joiningDate: ""
                });
                setSelectedImage(null);
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="rounded-lg"
            >
              <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75%] md:w-2/4 h-[80vh] md:h-[90vh] bg-white border border-black shadow-md p-4 overflow-y-auto" style={{ position: "relative" , overflow: "auto"}}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Create New User
                </Typography>
                <TextField
                  className="w-full mb-4"
                  label="Email"
                  variant="outlined"
                  name="email"
                  onChange={handleUserChange}
                  value={user.email}
                  error={!!emailError}
                  helperText={emailError}
                />
                <TextField
                  className="w-full mb-4"
                  label="Password"
                  variant="outlined"
                  name="password"
                  type="password"
                  onChange={handleUserChange}
                  value={user.password}
                />
                <TextField
                  className="w-full mb-4"
                  label="Confirm Password"
                  variant="outlined"
                  name="confirmPassword"
                  type="password"
                  onChange={handleUserChange}
                  value={user.confirmPassword}
                  error={!!passwordError}
                  helperText={passwordError}
                />
                <TextField
                  className="w-full mb-4"
                  label="First Name"
                  variant="outlined"
                  name="firstname"
                  onChange={handleUserChange}
                  value={user.firstname}
                />

                <TextField
                  className="w-full mb-4"
                  label="Middle Name"
                  variant="outlined"
                  name="middlename"
                  onChange={handleUserChange}
                  value={user.middlename}
                />
                <TextField
                  className="w-full mb-4"
                  label="Last Name"
                  variant="outlined"
                  name="lastname"
                  onChange={handleUserChange}
                  value={user.lastname}
                />
                <TextField
                  className="w-full mb-4"
                  label="Spiritual Name"
                  variant="outlined"
                  name="spiritualname"
                  onChange={handleUserChange}
                  value={user.spiritualname}
                />
                <FormControl fullWidth className="mb-4">
                  <InputLabel id="sex-label">Sex</InputLabel>
                  <Select
                    labelId="sex-label"
                    value={user.sex}
                    label="Sex"
                    name="sex"
                    onChange={handleUserChange}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  className="w-full mb-4"
                  label="Address Line 1"
                  variant="outlined"
                  name="addressline1"
                  onChange={handleUserChange}
                  value={user.addressline1}
                />
                <TextField
                  className="w-full mb-4"
                  label="Address Line 2"
                  variant="outlined"
                  name="addressline2"
                  onChange={handleUserChange}
                  value={user.addressline2}
                />
                <TextField
                  className="w-full mb-4"
                  label="State"
                  variant="outlined"
                  name="state"
                  onChange={handleUserChange}
                  value={user.state}
                />
                <TextField
                  className="w-full mb-4"
                  label="City"
                  variant="outlined"
                  name="city"
                  onChange={handleUserChange}
                  value={user.city}
                />
                <TextField
                  className="w-full mb-4"
                  label="Zip Code"
                  variant="outlined"
                  name="zipcode"
                  onChange={handleUserChange}
                  value={user.zipcode}
                />
                <TextField
                  className="w-full mb-4"
                  label="Country"
                  variant="outlined"
                  name="country"
                  onChange={handleUserChange}
                  value={user.country}
                />
                <TextField
                  className="w-full mb-4"
                  label="Phone"
                  variant="outlined"
                  name="phone"
                  onChange={handleUserChange}
                  value={user.phone}
                />

                {/* <div>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Birthdate"
                      value={user.birthdate ? new Date(user.birthdate) : null}
                      onChange={(newDate) =>
                        handleUserChange({ target: { name: "birthdate", value: newDate } })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="w-full mb-1" // Adjust margin for the note
                          inputRef={dobRef}
                          inputProps={{
                            ...params.inputProps,
                            readOnly: true, // Make the input field read-only
                          }}
                          style={{ position: "relative", zIndex: 0 }}
                          onClick={handleClickCalendar}
                        />
                      )}
                      PopperProps={{
                        modifiers: [
                          {
                            name: "preventOverflow",
                            options: {
                              boundary: "viewport", // Prevents clipping issues
                            },
                          },
                          {
                            name: "offset",
                            options: {
                              offset: [0, 10], // Adjusts the calendar position 8px below the input box
                            },
                          },
                        ],
                        anchorEl: anchorEl, // Aligns the popper to the input field
                        disablePortal: true, // Keeps the calendar inside the modal
                      }}
                    />
                  </LocalizationProvider>
                  <small style={{ color: "#6c757d",marginLeft: "470px" }}>Please select date from calendar</small>
                </div>

                <div>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Joining Date"
                      value={user.joiningDate ? new Date(user.joiningDate) : null}
                      onChange={(newDate) =>
                        handleUserChange({ target: { name: "joiningDate", value: newDate } })
                      }
                      
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="w-full mb-1" // Adjust margin for the note
                          inputRef={dojRef}
                          inputProps={{
                            ...params.inputProps,
                            readOnly: true, // Make the input field read-only
                          }}
                          style={{ position: "relative", zIndex: 0 }}
                          onClick={handleClickCalendar}
                        />
                      )}
                      PopperProps={{
                        disablePortal: true, // Ensure the calendar stays inside the modal
                        modifiers: [
                          {
                            name: "preventOverflow",
                            options: {
                              boundary: "viewport", // Prevents clipping issues
                            },
                          },
                          {
                            name: "offset",
                            options: {
                              offset: [0, 10], // Adjusts positioning to appear right below
                            },
                          },
                        ],
                        anchorEl: anchorEl,
                      }}
                      
                    />
                  </LocalizationProvider>
                  <small style={{ color: "#6c757d", marginLeft: "470px"}}>Please select date from calendar</small>
                </div> */}

                <TextField
                  className="w-full mb-4"
                  label="Birth Date"
                  variant="outlined"
                  name="birthdate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleUserChange}
                  value={user.birthdate}
                  placeholder="mm-dd-yyyy"
                />

                <TextField
                  className="w-full mb-4"
                  label="Joining Date"
                  variant="outlined"
                  name="joiningDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleUserChange}
                  value={user.joiningDate}
                />

                <TextField
                  className="w-full mb-4"
                  label="Dralla Wallet"
                  variant="outlined"
                  name="drallaWallet"
                  onChange={handleUserChange}
                  value={user.drallaWallet}
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-4"
                />
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected profile"
                    className="mb-4 w-32 h-32 object-cover rounded-full"
                  />
                )}
                <div className="flex w-full justify-end items-center mb-0 m-3 ">
                  <Button
                    style={{ marginRight: "5px" }}
                    variant="contained"
                    onClick={handleSubmitUser}
                    disabled={!!passwordError || !!emailError}
                  >
                    Create User
                  </Button>
                  <Button
                    style={{ marginLeft: "5px" }}
                    variant="contained"
                    onClick={() => {
                      setCreateUserModal(false);
                      setPasswordError("");
                      setEmailError("");
                      setUser({
                        email: "",
                        password: "",
                        confirmPassword: "",
                        firstname: "",
                        middlename: "",
                        lastname: "",
                        spiritualname: "",
                        sex: "",
                        addressline1: "",
                        addressline2: "",
                        state: "",
                        city: "",
                        zipcode: "",
                        country: "",
                        phone: "",
                        birthdate: "",
                        joiningDate: ""
                      });
                      setSelectedImage(null);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </Box>
            </Modal>
          </div>
          <div className="AdminDashboardContentPanel">
            <EnhancedTable
              actions={actions}
              actionsAdditionalFields={["account_status"]}
              url={url}
              tableName={"User List"}
              headers={headers}
              startIndex={startIndex}
              endIndex={endIndex}
              defaultOrder={"lastname"}
              rows={rows}
              setOrderOnParent={(state) => {
                sortingOrder(state.order);
                setOrderByField(state.orderBy);
              }}
            />
            <PaginationComponent
              initTotalEntries={totalEntries}
              initItemsPerPageCount={10}
              startIndex={startIndex}
              endIndex={endIndex}
              setStartIndex={setStartIndex}
              setEndIndex={setEndIndex}
              initPageNumber={1}
              setParamsOnParent={({ page, itemsPerPageCount }) => {
                setPage(page);
                setCount(itemsPerPageCount);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserViewDetails;

