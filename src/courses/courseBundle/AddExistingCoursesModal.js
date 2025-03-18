import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import { FormControl, Select, MenuItem } from "@mui/material";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@mui/material/Checkbox";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loader from "components/Loader";
import FastRewindIcon from "@mui/icons-material/FastRewind";

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

const AddExistingCoursesModal = ({
  individualCourses,
  addExistingCourseModalOpen,
  setAddExistingCourseModalOpen,
  selectedCourses,
  handleCourseSelection,
  handleAddExistingCourse,
}) => {
  return (
    <Modal
      open={addExistingCourseModalOpen}
      onClose={() => {
        setAddExistingCourseModalOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="rounded-lg"
    >
      <Box sx={{ ...style, maxHeight: "80vh", overflowY: "auto" }}>
        <Typography variant="h6" component="h2">
          Select Courses
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Title</TableCell>
                {/* <TableCell>Order No</TableCell> */}
                <TableCell>Select</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Loop through your courses and display them in the table */}
              {individualCourses &&
                individualCourses.map((course) => (
                  <TableRow key={course._id}>
                    <TableCell>{course.title}</TableCell>
                    {/* <TableCell>
                  <TextField
                    type="number"
                    value={course.orderNo}
                    onChange={(e) => handleOrderNoChange(e, course._id)}
                  />
                </TableCell> */}
                    <TableCell>
                      <Checkbox
                        checked={selectedCourses.includes(course._id)}
                        onChange={handleCourseSelection(course._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" onClick={handleAddExistingCourse}>
          Add
        </Button>
        <Button
          className="ml-2"
          variant="contained"
          onClick={() => {
            setAddExistingCourseModalOpen(false);
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default AddExistingCoursesModal;
