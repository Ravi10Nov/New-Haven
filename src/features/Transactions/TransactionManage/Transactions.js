
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import PropTypes from "prop-types";
import React,{ useState, useEffect } from "react";


import './Tab.css'

import { useRef } from "react";
import ListingCoursesTransactionsForAdmin from '../ListingCoursesTransactionsForAdmin';
import ListingDonationsTransactionsForAdmin from '../ListingDonationsTransactionsForAdmin';

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



export default function Transactions( props ) {
  const [ value, setValue ] = React.useState(0);


  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const componentRef = useRef();


  return (
    <div className="container-fluid mt-3 pb-5">
      <Box sx={{ width: "100%" }} className='bg-white pt-4'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', background: '#fff' }}>

          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab style={{ border: "1px solid #D9D9D9", margin: '0 15px' }} label="Courses Transactions" {...a11yProps(0)} />
            <Tab style={{ border: "1px solid #D9D9D9", margin: '0 15px' }} label="Direct Transactions" {...a11yProps(1)} />
          </Tabs>

        </Box>
        <TabPanel value={value} index={0} className='ps-0 bg-white'>
        <ListingCoursesTransactionsForAdmin></ListingCoursesTransactionsForAdmin>

        </TabPanel>
        <TabPanel value={value} index={1} className='ps-0 bg-white'>
        <ListingDonationsTransactionsForAdmin></ListingDonationsTransactionsForAdmin>
        </TabPanel>



      </Box>
    </div >
  );

}
