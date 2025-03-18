import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CourseInstructorsView = ({assignedInstructors,instructorsViewModalOpen,setInstructorsViewModalOpen}) => {
  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={instructorsViewModalOpen}
      onClose={() => {
        setInstructorsViewModalOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="rounded-lg"
    >
      <Box sx={{ ...style, maxHeight: '80vh', overflowY: 'auto',width: '50%' }}>
        <Typography variant="h6" component="h2">
          Course Instructors
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-white">Name</TableCell>
                <TableCell className="text-white">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
              assignedInstructors?.map((instructor,index) => (
                  <TableRow key={index}>
                    <TableCell>{instructor.firstname}</TableCell>
                    <TableCell>{instructor.email}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Button variant="contained" onClick={handleAddPrerequisiteCourses}>
          Add
              </Button>*/}
        <Button className="ml-2 mt-3" variant="contained" onClick={()=>{setInstructorsViewModalOpen(false)}}>
          Close
        </Button> 
      </Box>
        </Modal> 
  );
};

export default CourseInstructorsView;
