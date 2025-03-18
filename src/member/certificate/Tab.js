import React from "react";
import { saveAs } from "file-saver";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Print, DownloadOutlined } from '@mui/icons-material'
import { useReactToPrint } from "react-to-print";
import Resume from "./Print";
import LetterPrint from './LetterPrint';
import { useRef } from "react";

import Certificate from './Certificate'
import Letter from './Letter';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default function CertificateAndLetter() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const saveFile = () => {
    saveAs(
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      "example.pdf"
    );
  };

  return (
    <Box sx={{ width: '100%' }} className='p-4' >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', background: '#fff' }}>
        <br></br>
        <h4>Remember to print your certificate in landscape layout.</h4>
        <hr></hr>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab style={{ border: "1px solid #D9D9D9", margin: '0 15px' }} label="Certificate" {...a11yProps(0)} />
          <Tab style={{ border: "1px solid #D9D9D9", margin: '0 15px' }} label="Letter" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} className='ps-0 bg-white'>
        <div className='tabButton'>
          <Button className='downloadBtn' onClick={saveFile} >Download<DownloadOutlined></DownloadOutlined></Button>

          <Button className='printBtn' onClick={handlePrint} >Print<Print></Print></Button>
        </div>
        <Resume ref={componentRef} />
        <Certificate></Certificate>
      </TabPanel>
      <TabPanel value={value} index={1} className='ps-0 bg-white'>
        <div className='tabButton'>
          <Button className='downloadBtn' onClick={saveFile}>Download<DownloadOutlined></DownloadOutlined></Button>

          <Button className='printBtn' onClick={handlePrint} >Print<Print></Print></Button>
        </div>
        <LetterPrint ref={componentRef} />
        <Letter></Letter>
      </TabPanel>
    </Box>
  );
}