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
import AddExistingCoursesModal from './AddExistingCoursesModal';
import { ToastContainer, toast } from 'react-toastify';

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


export default function ViewBundle({url}) {

  // const {createCourse} = useCourse();
  // const {createCourse} = useContext(CourseContext);
  const {user,publishCourse,unpublishCourse} = useAuth();
  const { coursebundleId } = useParams();


    const [courseCreateModalOpen, setCourseCreateModalOpen] = React.useState(false);
    const [courseTitle,setCourseTitle] = React.useState("");
    const [orderNo,setOrderNo] = React.useState("");
    const [courses, setCourses] = useState(null);
    const [isNewCourseCreated, setIsNewCourseCreated] = useState(false);
    const [isPublishedStatusChanged, setIsPublishedStatusChanged] = useState(false);
    const [publishedCoursesFilter, setPublishedCoursesFilter] = useState("all");

    const [courseUpdateModalOpen, setCourseUpdateModalOpen] = React.useState(false);
    const [courseUpdateTitle,setCourseUpdateTitle] = React.useState("");
    const [courseUpdateOrderNo,setCourseUpdateOrderNo] = React.useState("");
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [isCourseUpdated, setIsCourseUpdated] = useState(false);

    const [individualCourses, setIndividualCourses] = useState([]);
    const [addExistingCourseModalOpen, setAddExistingCourseModalOpen] = React.useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]); // To store selected courses

    const [isLoading, setIsLoading] = useState(false);

    const handleAddExistingCourse = async () => {

      for (const courseId of selectedCourses) {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/coursebundle/courses/add/${coursebundleId}/${courseId}`
        );
      }
      setIsNewCourseCreated(!isNewCourseCreated);
      setAddExistingCourseModalOpen(false);
      toast.success("Courses added to bundle.Please update their order as required");
    };

    const handleCourseSelection = (courseId) => (event) => {
      if (event.target.checked) {
        setSelectedCourses([...selectedCourses, courseId]);
      } else {
        const updatedCourses = selectedCourses.filter((id) => id !== courseId);
        setSelectedCourses(updatedCourses);
      }
    };

  const handlePublishedCoursesFilter = (event) => {
    const selectedFilter = event.target.value;
    setPublishedCoursesFilter(selectedFilter);
  };

  const handleUpdateButtonClick =(title,orderNo,courseId) =>{
   
    setCourseUpdateTitle(title);
    setCourseUpdateOrderNo(orderNo);
    setCourseUpdateModalOpen(true);
    setSelectedCourseId(courseId);
  }


  const handleTitleUpdateChange =(e) =>{
    setCourseUpdateTitle(e.target.value); 
  }

  const fetch = async () =>{
    setIsLoading(true);
    // Fetching courses of bundle
    const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/coursebundle/courses/${coursebundleId}`);
    
    if(response.data.success){
        const courses = response.data.courses;
        courses.sort((a, b) => a.courseNo - b.courseNo);
        let arr=[];
        for (let i = 0; i < courses.length; i++) {
          let obj={
            courseDetails:courses[i].courseId,
            orderNo:courses[i].courseNo
          }
          arr.push(obj);
        }
        setCourses(arr);
    }
    // Fetching all individual courses
    let publish="all",type="individual";
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/?publishedStatus=${publish}&courseType=${type}`
    );
    if(res.data.success) setIndividualCourses(res.data.courses);
    setIsLoading(false);
  }


    useEffect(()=>{
      fetch();
    },[isNewCourseCreated,publishedCoursesFilter,isPublishedStatusChanged,isCourseUpdated])

    const handleTitleChange =(e) =>{
      setCourseTitle(e.target.value); 
    }

    const handleCreate = async () =>{
      const courseData={
        title:courseTitle, creatorId:user._id, courseType:"bundle",orderNo:orderNo
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/coursebundle/courses/create/${coursebundleId}`,courseData);
        setIsNewCourseCreated(!isNewCourseCreated);
        setCourseCreateModalOpen(false);
    }

    const handleCourseUpdate = async () =>{
      //Updating the title of the course
      let response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/${selectedCourseId}`,
        {title:courseUpdateTitle}
      );
      //Updating the order of the course
      response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/coursebundle/courses/update/${coursebundleId}/${selectedCourseId}`,
        {courseNo:courseUpdateOrderNo}
      );
      setIsCourseUpdated(!isCourseUpdated);
      setCourseUpdateModalOpen(false);

    }

    if(!isLoading){
      return (
        <div style={{backgroundColor:"white"}}>

        <div className="flex justify-start items-center p-2">
          <Link to={`${url}/courses/create`}>
          <Button variant="contained" className="mb-2 mt-2" startIcon={<FastRewindIcon />}>
              Back
          </Button>
          </Link>
        </div>

          {/* Add Course */}
          <div className="flex items-center justify-center mt-4">
          <Card sx={{ minWidth: 275 }} className="w-4/5">
            <CardContent className="flex justify-between items-center">
            <Typography variant="h4" className="font-semibold">Add Course</Typography>
            <div className="flex justify-end">
              <Button className="mx-2" variant="contained" color="success" onClick={() => setCourseCreateModalOpen(true)}>
                Create Course
              </Button>
              <Button className="mx-2" variant="contained" color="success" onClick={() => setAddExistingCourseModalOpen(true)}>
                Add Course
              </Button>
            </div>
            </CardContent>

            {/* Modal for creating Course */}
            <Modal
              open={courseCreateModalOpen}
              onClose={()=>{setCourseCreateModalOpen(false)}}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="rounded-lg"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Enter Course Title
                </Typography>
                <TextField className="w-full" id="outlined-basic" label="Course Title" variant="outlined" onChange={handleTitleChange} value={courseTitle}/>

                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Enter Order No
                </Typography>
                <TextField className="w-full" type="number" id="outlined-basic" label="Order No" variant="outlined" onChange={(e)=>{setOrderNo(e.target.value)}} value={orderNo}/>


                <div className="flex w-full justify-end items-center mt-3">
                  <Button style={{marginRight:'5px'}} variant="contained" onClick={handleCreate}>Create</Button>
                  <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setCourseCreateModalOpen(false)}>Close</Button>
                </div>
              </Box>
            </Modal>
            {/* Modal for creating Course */}

            {/* Modal for adding existing course */}
            <AddExistingCoursesModal
            individualCourses={individualCourses}
            addExistingCourseModalOpen={addExistingCourseModalOpen}
            setAddExistingCourseModalOpen={setAddExistingCourseModalOpen}
            selectedCourses={selectedCourses}
            handleCourseSelection={handleCourseSelection}
            handleAddExistingCourse={handleAddExistingCourse}
            />
            {/* Modal for adding existing course */}

          </Card>
          </div>
        {/* Add Course */}

        

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
            <Card key={course.courseDetails._id} className="w-[80%] rounded-xl mt-2 mb-2">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {course?.courseDetails?.title}
                </Typography>
                <Typography variant="h5" component="h2">
                  Order No : {course?.orderNo}
                </Typography>
                  {
                    course?.courseDetails?.publishedStatus &&
                    <div className='flex justify-end '>
                      <Chip label="Published" color="success" variant="outlined" className="italic mr-2" />
                      <Button variant="outlined" color="success" className="rounded-3xl" onClick={()=>{
                      unpublishCourse(course.courseDetails._id);
                      setIsPublishedStatusChanged(!isPublishedStatusChanged);
                      }}>
                      Unpublish
                      </Button>
                    </div>
                  }

                  {
                    !course?.courseDetails?.publishedStatus &&
                    <div className='flex justify-end my-2'>
                      <Chip label="In Draft" color="success" variant="outlined" className="italic mr-2" />
                      <Button variant="outlined" color="success" className="rounded-3xl" onClick={()=>{
                        publishCourse(course.courseDetails._id);
                        setIsPublishedStatusChanged(!isPublishedStatusChanged);
                      }}>
                      Publish
                      </Button>
                    </div>
                  }
                <div className='flex justify-end my-2'>

                  
                  {/* Updating Course */}
                  <Button variant="contained" color="success" style={{marginRight:"10px"}} onClick={() => handleUpdateButtonClick(course.courseDetails.title,course.orderNo,course.courseDetails._id)}>
                    Update
                  </Button>

                  <Modal
                    open={courseUpdateModalOpen}
                    onClose={()=>{setCourseUpdateModalOpen(false)}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="rounded-lg"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Enter Course Title
                    </Typography>
                    <TextField className="w-full" id="outlined-basic" label="Course Title" variant="outlined" onChange={handleTitleUpdateChange} value={courseUpdateTitle}/>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Enter Order No
                    </Typography>
                    <TextField className="w-full" type="number" id="outlined-basic" label="Order No" variant="outlined" onChange={(e)=>{setCourseUpdateOrderNo(e.target.value)}} value={courseUpdateOrderNo}/>

                    <div className="flex w-full justify-end items-center mt-3">
                      <Button style={{marginRight:'5px'}} variant="contained" onClick={handleCourseUpdate}>Update</Button>
                      <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setCourseUpdateModalOpen(false)}>Close</Button>
                    </div>
                  </Box>
                  </Modal>
                  {/* Updating Course */}


                  <Link to={`${url}/courses/${course.courseDetails._id}/modules/create`}>
                  <Button variant="outlined" className="rounded-lg" endIcon={<SendIcon />}>
                    View Course
                  </Button>
                  </Link>
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