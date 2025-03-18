import React, { useState, useEffect } from 'react';



import Box from "@mui/material/Box";

import {
  Row,
} from 'react-bootstrap';

import Typography from "@mui/material/Typography";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from "prop-types";
import CoursePage from './components/CoursesPage';
import './CoursesPagesStyles.css';
import { getCompletedCourses, getOnGoingCourses } from 'services/coursesService';
import { MemberStats } from 'features/Stats/MemberStats';



const CompletedCourses = () =>{
    return(<CoursePage></CoursePage>)
}

const OnGoingCourses = () => {
    return(<CoursePage></CoursePage>)
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  



// i should focus on showing the courses.
const OwnedCoursesPage = ({ url }) => {
    const [ value, setValue ] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

   return(
    <div className='dashboardContentPanel h-auto mb-5'>

    <div>

    <Row
      xs={1}
      md={2}
      className='gx-5 gy-3'
      style={{ marginTop: '26px', padding: '10px' }}>
        <MemberStats></MemberStats>
    </Row>
  </div>

    <div className="container-fluid mt-3 pb-5">
    <Box sx={{ width: "100%" }} className='bg-white pt-4'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', background: '#fff' }}>
        
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab style={{ border: "1px solid #D9D9D9", margin: '0 15px' }} label="Completed courses" {...a11yProps(0)} />
          <Tab style={{ border: "1px solid #D9D9D9", margin: '0 15px' }} label="On-going courses" {...a11yProps(1)} />
        </Tabs>

      </Box>
      <TabPanel value={value} index={0} className='ps-0 bg-white'>


        <CoursePage url={url} coursesType={'Completed'} handlerFunction={getCompletedCourses}> </CoursePage>

      </TabPanel>
      <TabPanel value={value} index={1} className='ps-0 bg-white'>
      <CoursePage url={url} coursesType={'OnGoing'} handlerFunction={getOnGoingCourses}> </CoursePage>

      </TabPanel>

  

    </Box>
  </div>
  </div>
   )
};

export default OwnedCoursesPage;
