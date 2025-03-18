import React, { useState, useEffect } from 'react';
import {
  Card,
  Col,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getUserOnCourseOperation } from 'services/coursesService';


// i should not focus on the modal as i should focus for showing courses, because the model will act as unified component between all the course card.


export const CourseCard = ( { url, operation, courseId, courseName, courseImage }) => {

  return(
    <Col >
    <div>
    <Card  className='all_card'>
      <div  className={' lg:h-[261px]'} >
      <Card.Img style={{ 'object-fit': 'scale-down', 'height':'100%'}} variant='top' src={courseImage} />
      </div>
      <Card.Body className='p-4'>
        <Card.Title className='card_title'>
          {courseName}
        </Card.Title>
      </Card.Body>
    </Card>
    </div>
  </Col>
  )
}