import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { getOwnedCoursesForEditing, copyCourseForEditing } from '../../../services/coursesService';

import { UPLOADS_PATH } from '../../../config/magic_constants';
import './ManageOwnedCourses.css';
import { InstructorStats } from 'features/Stats/InstructorStats';

const ManageOwnedCourses = ({ url, role }) => {
  
  const [ courses, setCourses ] = useState([]);
  const [ totalCount, setTotalCount ] = useState(0);
  const [ isLoading, setIsloading ] = useState(true);

  const history = useHistory();
  const { pathname } = useLocation();

  useEffect( () => {
    initData();
  },[]);

  const handleEditButtonOperation = async( courseId ) => {
    switch(role) {
      case 'admin':
        history.push(`${url}/courses/owned/${courseId}`)
        break;
      case 'instructor':
        const response = await copyCourseForEditing(courseId);
        debugger;
        history.push(`${url}/courses/owned/${response.data.data._id}/${courseId}`)
        break;
      default:
        console.error('No operation have been specified');
        break;
    }
    
  }
  const initData = async() => {
      try{
      const response = await getOwnedCoursesForEditing();
      setCourses(response.data.data);
      setTotalCount(response.data.totalCount);
      setIsloading(false);
      }catch(error){
        console.log(error);
      }
  } 
  if( !isLoading ){
  return (


          <div className='dashboardContentPanel'>
            <Row
              xs={1}
              md={2}
              className='gx-5 gy-3'
              style={{ marginTop: '26px', padding: '10px' }}>
           <InstructorStats></InstructorStats>
            </Row>

            <div className='container-fluid mt-3 pb-5'>
              <div className='bg-white py-3'>
                <div className='inner_timeline_progress'>
                  <div className='created_course'>
                    <h3>Created Courses</h3>
                    <NavLink to={`${url}/courses/add`}>
                    <button className='see_more_btn'>
                      Add Courses <i class='fa-solid fa-angle-right'></i>
                    </button>
                    </NavLink>
                  </div>
                </div>
                { courses.length == 0 ? <div className={ 'pl-4 text-warning'}>No courses been added </div> :
                <div className='progress_cards'>
                  <Row xs={1} md={3} className='g-4'>
                    { courses.map( course => {
                      return(

                        <Col>
                          <Card className='progress_all_card'>
                          <Card.Img style={{'height':'290px'}}  variant='top' src={`${UPLOADS_PATH}/${course.pictures[0].filename}`}/>
                          <Card.Body className='p-4 CourseCard_info'>
                            <Card.Title className='card_title'>
                              {course.name}
                            </Card.Title>
                  
                            <span onClick={() => { handleEditButtonOperation(course._id) }}>
                              {' '}
                              
                              <i className='fas fa-pen-to-square'></i>
                            </span>
                    
                          </Card.Body>
                          </Card>
                        </Col>

                      )
                    })
                    
                    }
                  </Row>
                </div>
                 }
              </div>
            </div>
          </div>

  );
  }
};

export default ManageOwnedCourses;
