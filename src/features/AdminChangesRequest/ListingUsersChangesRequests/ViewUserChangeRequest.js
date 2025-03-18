import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAuth } from "hooks/useAuth";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from "react-toastify";
import Loader from "components/Loader";

const fields = [
  { id: 1, label: "First Name", fieldName: "firstname" },
  { id: 2, label: "Middle Name", fieldName: "middlename" },
  { id: 3, label: "Last Name", fieldName: "lastname" },
  { id: 4, label: "Spiritual Name", fieldName: "spiritualname" },
  { id: 5, label: "Birth Date", fieldName: "birthdate" },
  { id: 6, label: "Sex", fieldName: "sex" },
  { id: 7, label: "Email", fieldName: "email" },
  { id: 8, label: "Telephone Number", fieldName: "phone" },
  { id: 9, label: "Street Address Line 1", fieldName: "addressline1" },
  { id: 10, label: "Street Address Line 2", fieldName: "addressline2" },
  { id: 11, label: "City", fieldName: "city" },
  { id: 12, label: "State", fieldName: "state" },
  { id: 13, label: "zipCode", fieldName: "zipcode" },
  { id: 14, label: "Country", fieldName: "country" },
  { id: 15, label: "Drala Wallet Address", fieldName: "dralawalletaddress" },
  { id: 16, label: "Profile Picture", fieldName: "image" },
];

const ViewUserChangeRequest = ({ url }) => {
  const history = useHistory();

  const {
    getUserEditRequest,
    approveUserEditRequest,
    disapproveUserEditRequest,
  } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let { userId } = useParams();

  const handleApproveRequest = async () => {
    console.log("Inside handle approve");
    setIsLoading(true);
    const response = await approveUserEditRequest(userId);
    console.log(response);
    if (response.success) {
      toast.success("Profile update request approved!");
    } else {
      toast.error("Some error occurred");
    }
    setIsLoading(false);
    history.push(`${url}/users/changes`);
  };

  const handleDisapproveRequest = async () => {
    console.log("Inside handle disapprove");
    setIsLoading(true);
    const response = await disapproveUserEditRequest(userId);
    console.log(response);
    if (response.success) {
      toast.success("Profile update request disapproved!");
    } else {
      toast.error("Some error occurred");
    }
    setIsLoading(false);
    history.push(`${url}/users/changes`);
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${month}/${day}/${year}`;
  }

  const fetchUserEditRequest = async () => {
    setIsLoading(true);
    const response = await getUserEditRequest(userId);
    console.log(response);
    setUserData(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserEditRequest();
  }, []);

  console.log("islaoding", isLoading);
  console.log("data", userData);

  if (!isLoading) {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "white" }}>Field</TableCell>
                <TableCell style={{ textAlign: "right", color: "white" }}>
                  Old value
                </TableCell>
                <TableCell style={{ color: "white" }} align="left">
                  New value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((field) => (
                <TableRow
                  key={field.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {field.label}
                  </TableCell>
                  {field.id === 16 && (
                    <>
                      <TableCell align="right">
                        {userData && (
                          <img
                            src={userData?.old_values[field.fieldName]}
                            alt="Old image"
                            style={{
                              maxWidth: "100px",
                              maxHeight: "100px",
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {userData && (
                          <img
                            src={userData?.new_values[field.fieldName]}
                            alt="New image"
                            style={{
                              maxWidth: "100px",
                              maxHeight: "100px",
                            }}
                          />
                        )}
                      </TableCell>
                    </>
                  )}
                  {field.id === 5 && (
                    <>
                      <TableCell align="right">
                        {userData &&
                          formatDate(userData.old_values[field.fieldName])}
                      </TableCell>
                      <TableCell align="left">
                        {userData &&
                          formatDate(userData.new_values[field.fieldName])}
                      </TableCell>
                    </>
                  )}
                  {field.id !== 5 && field.id !== 16 && (
                    <>
                      <TableCell align="right">
                        {userData?.old_values[field.fieldName]}
                      </TableCell>
                      <TableCell align="left">
                        {userData?.new_values[field.fieldName]}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="flex mt-5 justify-end p-2">
          <Button
            style={{ marginRight: "5px" }}
            variant="contained"
            color="success"
            onClick={handleApproveRequest}
          >
            APPROVE
          </Button>
          <Button
            className="ml-2"
            variant="outlined"
            color="error"
            onClick={handleDisapproveRequest}
          >
            DISAPPROVE
          </Button>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default ViewUserChangeRequest;
