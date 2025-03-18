import React, { useState } from "react";
import axios from "config/axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loader from "components/Loader";

const AssignInstructors = ({
  courseId,
  assignedInstructors,
  otherInstructors,
  isInstructorAssigned,
  setIsInstructorAssigned,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [tabValue, setTabValue] = useState(0); // 0 for Assigned, 1 for Not Assigned
  const [isLoading, setIsLoading] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: "80vh",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const assignInstructor = async (instructorId) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/instructors/assign/${courseId}`,
        { instructorId: instructorId }
      );
      // console.log("Response:", response.data);
      setIsInstructorAssigned(!isInstructorAssigned);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deassignInstructor = async (instructorId) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/instructors/deassign/${courseId}`,
        { instructorId: instructorId }
      );
      setIsInstructorAssigned(!isInstructorAssigned);
      // console.log("Response:", response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isLoading) {
    return (
      <div>
        <button
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded mr-2"
          onClick={handleModalOpen}
        >
          Edit Instructors
        </button>

        <Modal open={openModal} onClose={handleModalClose}>
          <Box sx={style}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Assigned Instructors" />
              <Tab label="Not Assigned Instructors" />
            </Tabs>
            {tabValue === 0 && (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="text-white">Name</TableCell>
                      <TableCell className="text-white">Email</TableCell>
                      <TableCell className="text-white">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assignedInstructors.map((instructor) => (
                      <TableRow key={instructor._id}>
                        <TableCell>{instructor.firstname}</TableCell>
                        <TableCell>{instructor.email}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => deassignInstructor(instructor.user)}
                          >
                            Unassign Instructor
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {tabValue === 1 && (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {otherInstructors.map((instructor) => (
                      <TableRow key={instructor._id}>
                        <TableCell>{instructor.firstname}</TableCell>
                        <TableCell>{instructor.email}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => assignInstructor(instructor.user)}
                          >
                            Assign Instructor
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <div className="flex justify-end items-center w-full mt-4">
              <button
                className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded mr-2"
                onClick={handleModalClose}
              >
                Close
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default AssignInstructors;
