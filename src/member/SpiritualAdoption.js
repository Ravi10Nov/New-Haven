import { Lock, Warning } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import spiritualImg from '../assets/modal.png';
import UserHeader from '../components/header';
import BreadCrumbJs from './../components/BreadCrumbJs';
import './member.css';

export default function SpiritualAdoption({ url }) {
  const [crumbs, setCrumbs] = useState([
    'Home',
    'Courses',
    'Introduction UI UX Designer',
  ]);

  const history = useHistory();

  const selected = crumb => {
    if (crumb === 'Courses') {
      history.push('/MemberDashboard/MemberCourses');
    } else if (crumb === 'Home') {
      history.push('/MemberDashboard');
    }
  };

  return (
    <div className='learnerCertificate'>
      <div className='row'>
        <UserHeader title='Course' role='member' url={url} />
        <BreadCrumbJs crumbs={crumbs} selected={selected} />

        <div className='courseContent'>
          <div className='col-lg-8 content '>
            <div className='inner_introduction_title'>
              <h3>Introduction UI UX Designer</h3>
            </div>
            <div className='spiritual_adoption_img'>
              <img src={spiritualImg} alt='' />
            </div>
          </div>
          <div className='col-lg-4 sidebar'>
            <div className='sidebarBox'>
              <h3>Course content</h3>
              <h5>Introduction UI and UX Designer</h5>
              <ul>
                <li>
                  sketching<br></br>
                  <div>
                    <input type='checkbox'></input>
                    <span>Intro to sketching</span>
                  </div>
                  <input type='checkbox'></input>
                  <span>Sketching UX flows</span>
                  <br></br>
                  <input type='checkbox'></input>
                  <span>Sketching tips</span>
                  <br></br>
                </li>
                <li>
                  inspiration<br></br>
                  <input type='checkbox'></input>
                  <span>how to stay inspired</span>
                  <br></br>
                  <input type='checkbox'></input>
                  <span>how to find inspiration online</span>
                  <br></br>
                </li>
                <li>
                  User flows<br></br>
                  <input type='checkbox'></input>
                  <span>what are user flows?</span>
                  <br></br>
                  <input type='checkbox'></input>
                  <span>the do 's and don't 's</span>
                  <br></br>
                </li>
              </ul>
              <div className='quizBox'>
                <Button>
                  <Lock></Lock>Quiz
                </Button>
                <label>
                  <Warning></Warning>finish the quiz to earn your certificate
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
