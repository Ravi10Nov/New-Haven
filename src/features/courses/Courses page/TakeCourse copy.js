import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'react-bootstrap';
import { useHistory } from 'react-router';

import img from '../../../assets/Medicine-Wheel---12-x-12.jpg'
import AdminHeader from '../../../admin/components/AdminHeader/AdminHeader';
import BreadCrumbJs from '../../../components/BreadCrumbJs';
import './TakeCourse.css';


const TakingCourseModal = ({}) => {

      const [ showModal, setShowModal ] = useState( false );
      const [ preRequisites, setPreRequisites ] = useState( false );
      const [ modalType, setModalType ] = useState('free');

      const renderModalHeader = () => {

        switch(modalType){
          case 'free':
            return(
              <ModalHeader closeButton className='modal_title'>
                  You can get this course for free.
              </ModalHeader>
            )
          case 'paid':
            return(
              <ModalHeader closeButton className='modal_title'>
                  Please donate to activate this course.
              </ModalHeader>
            )
          case 'unAvailable':
            return(
              <ModalHeader closeButton className='modal_title'>
                  Please finish pre requisites for this course.
              </ModalHeader>
            )
          default:
            throw new Error('Modal type unspecified')
        }
        
      }
      const renderModalBody = () => {
   
        switch( modalType ) {
          case 'free':
            return(
              
                <ModalBody>
                <label className='modal_label'>Course Name</label>
                
                <input className='modal_input br_modal' placeholder='User Interaction'></input>
                { renderModalButtons() } 
                 </ModalBody>
            )
          case 'paid':
            return(
                <ModalBody>
                  <label className='modal_label'>Course Name</label>
                  <input className='modal_input br_modal' placeholder='User Interaction'></input>
                  { renderModalButtons() }
                </ModalBody>
            )
          case 'unAvailable':
            return(
                <ModalBody>
                  <label className='modal_label'>Course Name</label>
                  <input className='modal_input br_modal' placeholder='User Interaction'></input>
                  <div>{preRequisites} </div>
                  { renderModalButtons() }
                </ModalBody>
            )
          default:
              throw new Error('Modal type unspecified')
        }



      }
      const renderModalButtons = () => {

        switch( modalType ){
          case 'free':
            return (
              <div
              style={{
                display: 'flex',
                justifyContent: 'end',
                marginTop: '30px',
              }}>
                      <Button
                          color='secondary'
                          variant='contained'
                          onClick={() => {
                            setShowModal(false);
                          }}
                          id='modal_cancel_btn'>
                          Cancel
                      </Button>
                      <Button
                          color='primary'
                          variant='contained'
                          id='modal_donate_btn'>
                          Get course
                      </Button>
              </div>
            )
          case 'paid':
              return (
                <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  marginTop: '30px',
                }}>
                <Button
                  color='secondary'
                  variant='contained'
                  onClick={() => {
                    setShowModal(false);
                  }}
                  id='modal_cancel_btn'>
                  Cancel
                </Button>
                <Button
                  color='primary'
                  variant='contained'
                  id='modal_donate_btn'>
                  Donate
                </Button>
              </div>
              )
          case 'unAvailable':
              return (
                <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  marginTop: '30px',
                }}>
                <Button
                  color='secondary'
                  variant='contained'
                  onClick={() => {
                    setShowModal(false);
                  }}
                  id='modal_cancel_btn'>
                  Cancel
                </Button>
              </div>
              )
           
          default:
              throw new Error('Modal type unspecified')
        }

       
        
      }
      // handle response based on eligiblity.
      // get the course for 0$.
      // buy the course for x$.
      // should finish pre-requisites.
      useEffect( () => {

      },[])


      return(
      <Modal
        show={showModal}
        size='lg'
        onHide={() => setShowModal(false)}
        backdrop='static'
        keyboard={false}
        centered
        className='modal_one'>

        {renderModalHeader()}
        {renderModalBody()}
      </Modal>

      )
}

const TakeCourse = ({ url }) => {
  const [modal1show, setModal1Show] = useState(false);
  const [modal2show, setModal2Show] = useState(false);

  const history = useHistory();

  function recommendationClick() {
    setModal1Show(true);
  }
  function upcommingClick() {
    setModal2Show(true);
  }

  const [crumbs, setCrumbs] = useState(['Home', 'Courses', 'Add Category']);

  const selected = crumb => {
    if (crumb === 'Home') {
      history.push('/adminDashboard');
    } else if (crumb === 'Courses') {
      history.push('/adminDashboard/AddCourse');
    }
  };

  return (
    <div className='sharedDashboard'>
      {/* Modal */}




      <div className='dashboardRow'>
        {/* <div className="dashboardSidebar sidebar">
          <Sidebar></Sidebar>
        </div> */}

        <div className='dashboardContent'>
          <div className='dashboardHeader'>
            <AdminHeader title='Courses' role='Admin' url={url} />
            <BreadCrumbJs crumbs={crumbs} selected={selected} />
          </div>


          {
          // statistics 
          }
          <div className='dashboardContentPanel h-auto mb-5'>
            <div>
              <Row
                xs={1}
                md={2}
                className='gx-5 gy-3'
                style={{ marginTop: '26px', padding: '10px' }}>
                <Col>
                  <Card className='timeline_card'>
                    <Card.Body>
                      <Card.Title className='timeline_title'>2</Card.Title>
                      <div className='timeline_parent'>
                        <h6>Courses In Progress</h6>
                        <button>
                          <span class='material-icons-outlined'>timeline</span>{' '}
                          +2
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col className='timeline_parent_col'>
                  <Card className='timeline_card' id='time_after'>
                    <Card.Body>
                      <Card.Title className='timeline_title'>0</Card.Title>
                      <div className='timeline_parent'>
                        <h6>Completed Courses</h6>
                        <button id='arrow_btn'>
                          <span class='material-icons-outlined'>
                            arrow_right_alt
                          </span>{' '}
                          0
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>

            <div className='container-fluid pb-5'>
              <div className='inner_continue_course'>
                <div className='course_title'>
                  <h3>Continue Course</h3>

                  <button className='see_more_btn'>
                    See More <i class='fa-solid fa-angle-right'></i>
                  </button>

                </div>

                <div className='continue_cards'>
                  <Row xs={1} md={3} className='g-4'>
                    <Col>
                      <Card className='all_card'>
                        <Card.Img variant='top' src={img} />
                        <Card.Body className='p-4'>
                          <Card.Title className='card_title'>
                            Introduction UI UX Designer
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>

                {/* free for you */}
                <div className='free_for_title'>
                  <h3>Free For You</h3>
                  <button className='see_more_btn'>
                    See More <i class='fa-solid fa-angle-right'></i>
                  </button>
                </div>
                { /* i will use it for categorising after that
                <div className='free_logo ler_logo_box l_dflex'>
                  <div className='box'>
                    <h6 className='box_title'>User Interface</h6>
                  </div>
                  <div className='box'>
                    <h6>User Experience</h6>
                  </div>
                  <div className='box'>
                    <h6>Website Design</h6>
                  </div>
                  <div className='box'>
                    <h6>Android Development</h6>
                  </div>
                  <div className='box'>
                    <h6>User Interface</h6>
                  </div>
                  <div className='box'>
                    <h6>User Experience</h6>
                  </div>
                </div>
                */}
                <div className='continue_cards'>
                  <Row xs={1} md={3} className='g-4'>
                    <Col>
                      <Card className='all_card'>
                        <div  className={' lg:h-[261px]'} >
                        <Card.Img style={{ 'object-fit': 'scale-down', 'height':'100%'}} variant='top' src={img} />
                        </div>
                        <Card.Body className='p-4'>
                          <Card.Title className='card_title'>
                            Introduction UI UX Designer
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>

                    
                  </Row>
                </div>


                {/* Recommendation */}
                <div className='free_for_title'>
                  <h3>Recommendation</h3>

                  <button className='see_more_btn'>
                    See More <i class='fa-solid fa-angle-right'></i>
                  </button>

                </div>


                <div className='continue_cards'>
                  <Row xs={1} md={3} className='g-4'>
                    <Col>
                      <Card className='all_card' onClick={recommendationClick}>
                        <Card.Img variant='top' src={img} />
                        <Card.Body className='p-4'>
                          <Card.Title className='card_title'>
                            Introduction UI UX Designer
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>

                  </Row>
                </div>
                <div className='continue_cards' onClick={recommendationClick}>
                  <Row xs={1} md={3} className='g-4'>
                    <Col>
                      <Card className='all_card' onClick={recommendationClick}>
                        <Card.Img variant='top' src={img} />
                        <Card.Body className='p-4'>
                          <Card.Title className='card_title'>
                            Introduction UI UX Designer
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>

                {/* Upcoming Courses */}
                <div className='free_for_title'>
                  <h3>Upcoming Courses</h3>
                  <button className='see_more_btn'>
                    See More <i class='fa-solid fa-angle-right'></i>
                  </button>
                </div>
              
                <div className='continue_cards'>
                  <Row xs={1} md={3} className='g-4'>
                    <Col>
                      <Card className='all_card' onClick={upcommingClick}>
                        <Card.Img variant='top' src={img} />
                        <Card.Body className='p-4'>
                          <Card.Title className='card_title'>
                            Introduction UI UX Designer
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>

                  </Row>
                </div>
                <div className='continue_cards'>
                  <Row xs={1} md={3} className='g-4'>
                    <Col>
                      <Card className='all_card' onClick={upcommingClick}>
                        <Card.Img variant='top' src={img} />
                        <Card.Body className='p-4'>
                          <Card.Title className='card_title'>
                            Introduction UI UX Designer
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>

              
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeCourse;
