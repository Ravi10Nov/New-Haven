import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SitePagesTopics from '../SitePagesToggle/TabPanel';
import './SitePagesWelcomeSection.css';

const SitePagesWelcomeSection = ({ url }) => {

  const history = useHistory();

;

  return (


          <div className='dashboardContentPanel'>
            <br></br>
            <SitePagesTopics />
          </div>

  );
};

export default SitePagesWelcomeSection;
