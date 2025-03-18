import Button from "@mui/material/Button";
import Loader from "components/Loader";
import ConfirmationModal from "components/Modal/Modal";
import { EnhancedTable } from "components/SmartTable/SmartTable";
import axios from "config/axios";
import { PaginationComponent } from "features/courses/components/Paginitation";
import { useAuth } from "hooks/useAuth";
import { UseSearchQuery } from "hooks/useSearchQuery";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "../UserViewDetails/UserViewDetails.css";

const actions = ({
  url,
  id,
  status,
  isProfileVerified,
  setIsProfileVerified,
}) => {
  const handleClick = async () => {
    const userId = id;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/verify-profile`,
        { userId }
      );
      setIsProfileVerified(!isProfileVerified);
      console.log("well done");
      toast.success("User profile was verified");
    } catch (error) {
      console.log("coulnt verify profile", error);
    }
  };
  return (
    <>
      <Button onClick={handleClick} variant="contained" className="bt_info">
        Verify
      </Button>

      <NavLink to={`${url}/users/verification/${id}`}>
        <Button
          style={{ marginLeft: "5px" }}
          variant="contained"
          className="bt_info"
        >
          Details
        </Button>
      </NavLink>
    </>
  );
};

const AdminVerifyUser = ({ url }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [values, setValues] = useState();

  const [isProfileVerified, setIsProfileVerified] = useState(false);
  const {
    search,
    bindFormValue,
    setOrderByField,
    sortingOrder,
    setCount,
    setPage,
  } = UseSearchQuery();
  // const [ isLoading, setIsLoading ] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchProfiles } = useAuth();

  const [rows, setRows] = useState([]);

  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    initData();
  }, [isProfileVerified]);

  const initData = async () => {
    setIsLoading(true);
    // const response = await fetchProfiles();
    console.log("started");
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/unverified-profiles`
    );

    console.log("length", response.data.profiles.length);
    setRows(response.data.profiles);
    setTotalEntries(response.data.profiles.length);
    setIsLoading(false);
  };
  const token = localStorage.getItem("token");
  const removeUnverifedUser = async () => {
    console.log(rows)
    setIsLoading(true);
    try {
      const remove = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/deleteUnverfiedUsers`,
        { headers: { "auth-token": token, "Content-Type": "application/json" }, data: rows }
      );
      setIsLoading(false);
      toast.success(remove.data.message);
      if (remove.data.message = 'Unverified users removed successfully !') {
        initData();
      }
    } catch (e) {
      toast.error("Something went wrong !");
    }
  };

  const headers = [
    // {'label': 'User id', 'id':'_id', 'align':'start'},
    { label: "Last Name", id: "lastname", align: "start" },
    { label: "First Name", id: "firstname", align: "start" },
    { label: "Spiritual Name", id: "spiritualname", align: "start" },
    { label: "Email", id: "email", align: "start" },
    // {'label': 'Donation', 'id':'total_amount_donated', 'align':'start'},
    // {'label': 'Account status', 'id':'account_status', 'align':'start'},
    // {'label': 'User Type', 'id':'role', 'align':'start'},
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

  const fetchUnverfiedUsers = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/unverifed-users`
    );
    console.log("my response", response);
    setUserData(response);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-100">
      <div className="flex justify-end mr-4">
        <ConfirmationModal
          text="Are you sure you want to remove all unverified users ?"
          btnTitle="Delete Unverified Users"
          cancelBtn="Cancel"
          confirmBtn="Confirm"
          action={removeUnverifedUser}
        />

          <NavLink to={`${url}/users/unverified-emails`}>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" ,height: "42px"}}
          >
            Unverified Emails
          </Button>
          </NavLink>
      </div>

      <div className="container-fluid">
        <div className="AdminDashboardContentPanel">

          <EnhancedTable
            // actions={actions}
            actions={(props) =>
              actions({ ...props, isProfileVerified, setIsProfileVerified })
            }
            actionsAdditionalFields={["account_status"]}
            url={url}
            tableName={"User List"}
            headers={headers}
            defaultOrder={"lastname"}
            rows={rows}
            startIndex={startIndex}
            endIndex={endIndex}
            setOrderOnParent={(state) => {
              sortingOrder(state.order);
              setOrderByField(state.orderBy);
            }}
          />

          {/* <PaginationComponent
              initTotalEntries={totalEntries}
              initItemsPerPageCount={5}
              initPageNumber={1}
              setParamsOnParent={({ page, itemsPerPageCount }) => {
                setPage(page);
                setCount(itemsPerPageCount);
              }}
            /> */}
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
  );
};

export default AdminVerifyUser;
