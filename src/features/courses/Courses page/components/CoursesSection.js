import React, { useState, useEffect } from 'react';
import {
  Card,
  Col,
  Row,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { CourseCard } from './CourseCard';
import { UPLOADS_PATH } from 'config/magic_constants';
import { NoResultsFound } from 'components/NoResultsFound';
import { CourseModal } from './CourseModal';

export const CourseSection = ( { sectionName, sectionItems, url } ) => { 

  const [ selectedCourse, setSelectedCourse ] = useState( null );
    return(
        <>
        <div className='course_title'>
                  <h3>{ sectionName } courses</h3>
                  <NavLink to={`${url}/courses/take/${sectionName.toLowerCase()}`} >
                  { sectionItems.length > 0 ?
                  <button className='see_more_btn'>
                    See More <i class='fa-solid fa-angle-right'></i>
                  </button>
                  : <></>
                  }
                  </NavLink>
                </div>

                { sectionItems.length > 0 ?
                 <>
                <div className='continue_cards'>
                  <Row xs={1} md={3} className='g-4'>
                    {sectionItems.map( item => {
                     
                        return(
                          <div onClick={ () => setSelectedCourse(item._id) }>
                            <CourseCard courseId={item._id} courseName={item.name} courseImage={`${UPLOADS_PATH}/${item.pictures[0].filename}`}></CourseCard>
                          </div>
                        )
                    })}
                  </Row>
                </div>
               
                {!selectedCourse || <CourseModal url={url} initCourseId={ selectedCourse } setSelectedCourseOnParent={setSelectedCourse} />}
                </>
                  :
                <div className='continue_cards !h-auto'>
                   <NoResultsFound/>
                </div>
                 }
    </>
    )
}
