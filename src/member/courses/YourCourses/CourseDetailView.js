import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'config/axios';
import CourseInstructorsView from './CourseInstructorsView';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import {Link} from 'react-router-dom';


const CourseDetailView = ({ courseId }) => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [assignedInstructors, setAssignedInstructors] = useState([]);
  const [courseCreator, setCourseCreator] = useState(null);
  const [instructorsViewModalOpen, setInstructorsViewModalOpen] = React.useState(false);

  const fetchAssignedInstructors = async (instructorIds) => {
    const instructorsDetails = [];
    
    try {
      for (const instructorId of instructorIds) {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/instructors/profiles/${instructorId}`
        );
  
        const instructorDetail = response.data.instructor;
        instructorsDetails.push(instructorDetail);
      }
  
      return instructorsDetails;
    } catch (error) {
      console.error("Error fetching instructor details:", error);
      return [];
    }
  };

  const getCourseCreator = async (creatorId) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/users/${creatorId}`
        );
        if(response.data.success) return response.data.user;
        return null;
    } catch (error) {
      console.error("Error fetching course creator:", error);
      return null;
    }
  };



  useEffect(() => {

    const fetchCourseDetails = async () => {
        try {
            //fetching course details
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/courses/course/${courseId}`);
            const course=response.data.course;
            setCourseDetails(course);

            //Fetching course instructors

            const assignedinstructors = await fetchAssignedInstructors(course.instructors);
            setAssignedInstructors(assignedinstructors);
            //Fetching course creator
            const creator = await getCourseCreator(course.creatorId);
            setCourseCreator(creator);
            


          } catch (error) {
            console.error("Error:", error);
            return {success:false};
          }
    };

    fetchCourseDetails();
  }, []);

  return (

    <div className="bg-white flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
      Course Details
      </h2>

      <div className="rounded overflow-hidden shadow-lg w-4/5">
        
          <div className="px-6 py-4 flex items-center justify-between border-b">
            <div className='flex flex-col items-start justify-center'>
              {courseDetails && <div className="font-bold text-xl mb-2">Course Title : {courseDetails.title}</div>}
              {courseCreator && <div className="font-bold text-xl mb-2 italic">Creator : <span className='text-green-600'>{courseCreator.email}</span></div>}
            </div>

            <div className='flex items-center justify-end'>

            <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded mr-2" onClick={() => setInstructorsViewModalOpen(true)}
              >
                View Instructors
              </button>
      
              <CourseInstructorsView 
              assignedInstructors={assignedInstructors}
              instructorsViewModalOpen={instructorsViewModalOpen}
              setInstructorsViewModalOpen={setInstructorsViewModalOpen}

              />
            </div>

          </div>
        
      </div>

    </div>

  );
};

export default CourseDetailView;
