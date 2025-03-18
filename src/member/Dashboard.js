import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import courseImg1 from '../assets/Untitled-1.png';
import courseImg2 from '../assets/Untitled-2.png';
import courseImg3 from '../assets/Untitled-3.png';
import UserHeader from '../components/header';
import './member.css';

const Dashboard = ({ sub, url }) => {
  return (
    <div>
      <div className='dashboardContent'>
        <div className='dashboardHeader'>
          <UserHeader title='Dashboard' sub='Home' role='member' url={url} />
        </div>

        <div className='dashboardContentPanel h_auto_media_learner'>
          <Row
            xs={1}
            md={2}
            className='gy-3 contentRow'
            style={{ marginTop: '26px', padding: '10px' }}>

          </Row>

          <div className='container'>
            <div className='row'>
              <div className='col'>
                <div className='inner_timeline_progress'>
                  <div className='progress_title ps-0'>
                    <h3>My Courses in Progress</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='progress_cards pt-0'>
            <Row xs={1} md={3} className='gx-4 contentRow'>
              <Col>
                <Card className='progress_all_card medium_mar_ler_none mb-sm-3'>
                  <Card.Img variant='top' src={courseImg1} />
                  <Card.Body className='p-4'>
                    <Card.Title className='card_title'>
                      Introduction UI UX Designer
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>

              <Col>
                <Card className='progress_all_card medium_mar_ler_none mb-sm-3 '>
                  <Card.Img variant='top' src={courseImg2} />
                  <Card.Body className='p-4'>
                    <Card.Title className='card_title'>
                      Constitution Course
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>

              <Col>
                <Card className='progress_all_card medium_mar_ler_none mb-5'>
                  <Card.Img variant='top' src={courseImg3} />
                  <Card.Body className='p-4'>
                    <Card.Title className='card_title'>
                      Constitution Course
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
