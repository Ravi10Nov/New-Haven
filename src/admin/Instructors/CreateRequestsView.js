import React, {useContext,useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs'; 
import Tab from '@mui/material/Tab'; 
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import {Link} from 'react-router-dom';
import { FormControl, Select,FormLabel, MenuItem } from '@mui/material';
import Chip from '@material-ui/core/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Loader from 'components/Loader';
import {toast} from 'react-toastify';


// import { useCourse } from 'hooks/useCourse';
// import CourseContext from 'contexts/CourseContext';
import { useAuth } from 'hooks/useAuth';
import axios from 'config/axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function CreateRequestsView({url}) {

  const {user,createCourse,getCoursesByCreator,fetchAllCourses,publishCourse,unpublishCourse} = useAuth();
    
    const [isLoading, setIsLoading] = useState(false);
    const [courseCreationRequests, setCourseCreationRequests] = useState(null);
    const [moduleCreationRequests, setModuleCreationRequests] = useState(null);
    const [sectionCreationRequests, setSectionCreationRequests] = useState(null);

    const [isApproved, setIsApproved] = useState(false);


  const fetchCreateRequests = async () => {

    setIsLoading(true);
    //Fetching course creation requests
    let response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/createrequest/courses`,
            {
                headers: {
                "auth-token": localStorage.getItem("token"),
                },
            }
    );
    setCourseCreationRequests(response.data.courses);

     //Fetching module creation requests
    response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/createrequest/modules`,
            {
                headers: {
                "auth-token": localStorage.getItem("token"),
                },
            }
    );
    setModuleCreationRequests(response.data.modules);

    setIsLoading(false);
    }

    const approveCourse = async (courseId) => {
      try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/createrequest/approve/course/${courseId}`, {}, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        toast.success("Course approved successfully");
        setIsApproved(!isApproved);
      } catch (error) {
        console.error("Error approving course:", error);
        toast.error("Failed to approve course");
      }
    };
    
    const approveModule = async (moduleId) => {
      try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/createrequest/approve/module/${moduleId}`, {}, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        toast.success("Module approved successfully");
        setIsApproved(!isApproved);
      } catch (error) {
        console.error("Error approving module:", error);
        toast.error("Failed to approve module");
      }
    };
  


  useEffect(()=>{
    fetchCreateRequests();
  },[isApproved]);

    if(!isLoading){
      return (
    
        <div className="bg-white flex flex-col justify-center items-center">

        {/* Display Course Creation Requests */}
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mt-7">Course Creation Requests</h2>


      <div className="rounded overflow-hidden shadow-lg w-4/5">
        {courseCreationRequests && courseCreationRequests.length > 0 && courseCreationRequests.map((course) => (
          <div key={course?._id} className="px-6 py-4 flex flex-col items-center justify-between border-b">


            {/* Row 1 */}
            <div className="px-6 py-4 flex items-center justify-between border-b w-full">

              <div className="font-bold text-xl mb-2">{course?.title}</div>

              <div>

              <Link to={`${url}/createrequests/courses/${course?._id}/modules`}>
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2">View</button>
              </Link>

              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2" onClick={() => approveCourse(course._id)}>Approve</button>

              </div>


              {/* <div className='flex items-center justify-end'>

              {
                course.publishedStatus ? (
                  <div className='flex justify-end'>
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 italic">Published</span>
                    <button 
                      onClick={() => {
                        unpublishCourse(course._id);
                        setIsPublishedStatusChanged(!isPublishedStatusChanged);
                      }}
                      className="bg-green-500 text-white rounded-lg py-1 px-3 hover:bg-green-600 focus:outline-none"
                    >
                      Unpublish
                    </button>
                  </div>
                ) : (
                  <div className='flex justify-end my-2'>
                    <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm mr-2 italic">In Draft</span>
                    <button 
                      onClick={() => {
                        publishCourse(course._id);
                        setIsPublishedStatusChanged(!isPublishedStatusChanged);
                      }}
                      className="bg-yellow-500 text-white rounded-lg py-1 px-3 hover:bg-yellow-600 focus:outline-none"
                    >
                      Publish
                    </button>
                  </div>
                )
              }

              </div> */}

            </div>
            {/* Row 1 */}
          </div>
        ))}
      </div>

        {/* Display Course Creation Requests */}

          {/* Display Module Creation Requests */}
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mt-7">Chapter Creation Requests</h2>


        <div className="rounded overflow-hidden shadow-lg w-4/5">
            {moduleCreationRequests && moduleCreationRequests.length > 0 && moduleCreationRequests.map((module) => (
            <div key={module?._id} className="px-6 py-4 flex flex-col items-center justify-between border-b">


                {/* Row 1 */}
                <div className="px-6 py-4 flex items-center justify-between border-b w-full">

                <div className="font-bold text-xl mb-2">{module?.title}</div>

                <div>
                <Link to={`${url}/createrequests/courses/${module.courseId}/${module._id}/sections`}>
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2">View</button>
                </Link>

                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2" onClick={() => approveModule(module._id)}>Approve</button>
                </div>


                </div>
                {/* Row 1 */}
            </div>
            ))}
        </div>

        {/* Display Module Creation Requests */}
  
        </div>
      );
  }
  else{
    return <Loader/>
  }
}