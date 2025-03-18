import React, {useContext,useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import {Link} from 'react-router-dom';
import { FormControl, Select, MenuItem } from '@mui/material';
import Chip from '@material-ui/core/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Loader from 'components/Loader';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import Alert from '@mui/material/Alert';
//import AddExistingCoursesModal from './AddExistingCoursesModal';
import { toast } from 'react-toastify';

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


export default function ViewGroupedCourse({url}) {

  // const {createCourse} = useCourse();
  // const {createCourse} = useContext(CourseContext);
  const {user} = useAuth();
  const { coursebundleId } = useParams();

   
    const [courses, setCourses] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUserEnrolled, setIsUserEnrolled] = useState(false);
    const [useCoursesStatus, setUserCoursesStatus] = useState(null);

    const handleEnrollUserInCourse = async (courseId,orderNo) => {

      try {
          let check=true;
          for(let i=0;i<courses.length;i++){
            if(courses[i].orderNo===orderNo) break;
            else{
              
              if (courses[i].completionStatus!=='completed'){
                // course has not been completed
                check=false;
                break;
              }
            }   
          }
          if(!check){
            alert("You must complete the previous courses as prerequisites before enrolling in this one.");
            return;
          }

          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/courses/course/enroll/${courseId}`,{userId:user?._id});
          toast.success("Successfully enrolled in Course");
          setIsUserEnrolled(!isUserEnrolled);
      } catch (error) {
          
      }
    };

  const fetch = async () =>{
    setIsLoading(true);
    console.log("bundle id:",coursebundleId);
    // Fetching courses of bundle
    const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/coursebundle/courses/${coursebundleId}`);
    console.log(response);
    
    if(response.data.success){
        const courses = response.data.courses;
        courses.sort((a, b) => a.courseNo - b.courseNo);
        console.log("courses of bundle :",courses);
        let arr=[];
        for (let i = 0; i < courses.length; i++) {
          let course=courses[i].courseId;
          console.log("course:",course);
          let completionStatus;
          // checking if user has completed the course
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/coursecompletion/fetch/${user?._id}/${course?._id}`);
          if (response.data.success) completionStatus = 'completed';
          else{
            // checking if user has enrolled in the course
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/courses/course/check-enrolled/${user?._id}/${course?._id}`);
            if(response.data.isEnrolled) completionStatus = 'enrolled';
            else completionStatus = 'not_enrolled';

          }
          let obj={
            courseDetails:courses[i].courseId,
            orderNo:courses[i].courseNo,
            completionStatus,
          }
          arr.push(obj);
        }
        console.log("aerr is :",arr);
        setCourses(arr);


    }
    setIsLoading(false);
  }


    useEffect(()=>{
      fetch();
    },[isUserEnrolled])

    if(!isLoading){
      return (
        <div style={{backgroundColor:"white"}}>

        <div className="flex justify-start items-center p-2">
          <Link to={`${url}/courses/new`}>
          <Button variant="contained" className="mb-2 mt-2" startIcon={<FastRewindIcon />}>
              Back
          </Button>
          </Link>
        </div>
        

        {/* Display courses */}
        <div className="flex flex-col items-center justify-center mt-8">
        <Typography variant="h4" className="mt-2 mb-2 w-4/5">View Courses</Typography>

        {/* Filter Course */}
        {/* <div className='w-4/5 flex justify-end mb-3'>
        <FormControl>
          <Select
            value={publishedCoursesFilter}
            onChange={handlePublishedCoursesFilter}
            displayEmpty
            inputProps={{ 'aria-label': 'Select Filter' }}
          >
            <MenuItem value="all">All Courses</MenuItem>
            <MenuItem value="published">Published Courses</MenuItem>
            <MenuItem value="draft">In Draft Courses</MenuItem>
          </Select>
        </FormControl>
        </div> */}
        {/* Filter Course */}

        <div className="flex flex-col justify-center items-center w-full">
          {courses && courses.map((course,index) => (
            <Card key={course.courseDetails?._id} className="w-[80%] rounded-xl mt-2 mb-2">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {course?.courseDetails?.title}
                </Typography>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-teal-800 text-white font-bold text-lg mt-3">
                    {course?.orderNo}
                </div>
                 
                <div className='flex justify-end my-2'>
                  <Chip label="Free" color="success" variant="outlined" className="italic mr-2" />
                 {
                  course?.completionStatus==='not_enrolled' && <Button variant="outlined" color="success" className="rounded-3xl" onClick={()=>{handleEnrollUserInCourse(course.courseDetails?._id,course.orderNo)}}>
                    Enroll in Course
                    </Button>
                 }
                 {
                  course?.completionStatus==='enrolled' && <Chip label="Enrolled" color="success" variant="outlined" className="italic mr-2" />
                 }
                 {
                  course?.completionStatus==='completed' && <Chip label="Completed" color="success" variant="outlined" className="italic mr-2" />
                 }
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
        </div>
        {/* Display courses */}

        </div>
      );
  }
  else{
    return <Loader/>
  }
}