import React, {useContext,useState,useEffect} from 'react';
import { useParams,useHistory  } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import {Link} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { toast } from 'react-toastify';
import axios from 'config/axios';



// import { useCourse } from 'hooks/useCourse';
// import CourseContext from 'contexts/CourseContext';
import { useAuth } from 'hooks/useAuth';
import Loader from 'components/Loader';

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

export default function ModulesView({url}) {

  // const {createCourse} = useCourse();
  // const {createCourse} = useContext(CourseContext);
    const {user,getModulesofCourse} = useAuth();
    const history = useHistory();
    const { courseId } = useParams();
    const [modules, setModules] = useState(null);
    const [isLoading , setIsLoading] = useState(false);

    const handleTakeTest = async () => {

      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/coursecompletion/fetch/${user._id}/${courseId}`);
      const passingStatus = (response.data.success) ? response.data.courseCompletion.passingStatus : null;
      const NoOfAttempts = (response.data.success) ? response.data.courseCompletion.NoOfAttempts : null;

      if(passingStatus!==null && passingStatus===true){
        toast.success("You have already passed the test!",{position: "bottom-left",theme: "dark"});
        return;
      }
      // if(NoOfAttempts!==null && NoOfAttempts>=3){
      //   toast.error("You can't take the test for more than 3 times !",{position: "bottom-left",theme: "dark"});
      //   return;
      // }
      history.push(`${url}/courses/test/${courseId}`);
    };

    const fetch = async () =>{
      setIsLoading(true);
      const response = await getModulesofCourse(courseId);
      console.log(response);
      if(response.success) setModules(response.modules);
      setIsLoading(false);
    }

    useEffect(()=>{
      fetch();
    },[]);

  if(!isLoading){
    return (
      <div style={{backgroundColor:"white"}}>

        <div className="flex justify-start items-center p-2">
          <Link to={`${url}/createrequests`}>
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2">
          Go to Requests
          </button>
          </Link>
        </div>

       {/* Course Details */}
       {/* <CourseDetailView courseId={courseId}/> */}
        {/* Course Details */}

    

      {/* Display modules */}
      <div className="bg-white flex flex-col justify-center items-center mt-16 mb-8">
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Course Chapters
      </h2>

      <div className="rounded overflow-hidden shadow-lg w-4/5">
        {modules && modules.length > 0 && modules.map((module) => (
          <div key={module?._id} className="px-6 py-4 flex items-center justify-between border-b">
            <div className="font-bold text-xl mb-2">{module?.title}</div>

            <div className='flex items-center justify-end'>

            {
                        module.approvalStatus ? (
                            <div className='flex justify-end'>
                            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 italic">Approved</span>
                            </div>
                        ) : (
                            <div className='flex justify-end my-2'>
                            <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm mr-2 italic">Pending</span>
                            </div>
                        )
            }


            <Link to={`${url}/createrequests/courses/${courseId}/${module._id}/sections`}>
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
              >
                View Chapter
              </button>
              </Link>
            </div>

          </div>
        ))}
      </div>

      </div>
      {/* Display modules */}


      {/* Course Test */}
      {/* <div className='flex items-center justify-center mt-7 mb-7'>
        <div className="rounded overflow-hidden shadow-lg w-4/5">
          <div className="px-6 py-4 flex items-center justify-between border-b">
            <div className="font-bold text-xl mb-2">Course Test</div>

            <div className='flex items-center justify-end'>
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2" onClick={handleTakeTest}
              >
                Take Test
              </button>
            </div>

          </div>
        </div>
      </div> */}
      {/* Course Test */}

      </div>
    );
  }
  else{
    return <Loader/>
  }
}