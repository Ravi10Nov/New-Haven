import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material'

import TopicsDetails from './TopicsDetails';
import Picture from './Picture';
import Videos from './Videos';


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
                <Box sx={{ p: 2 }}>
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

export default function SitePagesTopics() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className="allTabs">
                    <Tab className="singleTab" label="Topics Details" {...a11yProps(0)} />
                    <Tab className="singleTab" label="Picture" {...a11yProps(1)} />
                    <Tab className="singleTab" label="Videos" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <div className='tabButton'>
                </div>
                <TopicsDetails></TopicsDetails>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className='tabButton'>
                </div>
                <Picture></Picture>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div className='tabButton'>
                </div>
                <Videos></Videos>
            </TabPanel>
        </Box>
    );
}