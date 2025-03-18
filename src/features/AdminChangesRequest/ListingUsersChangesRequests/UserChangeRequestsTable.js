import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "config/axios";
import { toast, ToastContainer } from "react-toastify";

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${month}/${day}/${year}`;
}

const fields = [];

export default function UserChangeRequestsTable({ requests ,initData }) {

  const handleDelateRequest = async (userId) =>{
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/changes/delete-request`,{ data: { userId } }
      );

      if (response.data.message === "successful"){
        toast.success("Chenge request deleted successfully!!");
        initData();
      }

      return { success: response.data.message, deleteRequest: response.data.deletedrequest };
    } catch (error) {
      console.error("Error:", error);
      toast.error(response.data.message);
      return { success : response.data.message };
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="text-white" align="right">
              Requested Date
            </TableCell>
            <TableCell className="text-white" align="right">
              First Name
            </TableCell>
            <TableCell className="text-white" align="right">
              Last Name
            </TableCell>
            <TableCell className="text-white" align="right">
              Spiritual Name
            </TableCell>
            <TableCell className="text-white" align="right">
              Email
            </TableCell>
            <TableCell className="text-white" align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow
              key={request.user}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
                {request.user}
              </TableCell> */}
              <TableCell align="right">
                {formatDate(request.createdAt)}
              </TableCell>
              <TableCell align="right">{request.firstname}</TableCell>
              <TableCell align="right">{request.lastname}</TableCell>
              <TableCell align="right">{request.spiritualname}</TableCell>
              <TableCell align="right">{request.email}</TableCell>
              <TableCell align="right">
                {" "}
                <NavLink to={`/admins/users/changes/${request.user}`}>
                  <Button variant="contained" sx={{ marginRight: "8px" }}>DETAILS</Button>
                </NavLink>
                <Button variant="contained" onClick = {() => handleDelateRequest(request.user)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
