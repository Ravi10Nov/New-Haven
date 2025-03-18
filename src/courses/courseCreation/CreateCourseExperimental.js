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
import { FormControl, Select, MenuItem } from '@mui/material';
import Chip from '@material-ui/core/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Loader from 'components/Loader';


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

export default function CreateCourseExperimental({url}) {

  // const {createCourse} = useCourse();
  // const {createCourse} = useContext(CourseContext);
  const {user,createCourse,getCoursesByCreator,fetchAllCourses,publishCourse,unpublishCourse} = useAuth();


    const [courseCreateModalOpen, setCourseCreateModalOpen] = React.useState(false);
    const [courseTitle,setCourseTitle] = React.useState("");
    const [ownedCourses, setOwnedCourses] = useState(null);
    const [isNewCourseCreated, setIsNewCourseCreated] = useState(false);
    const [isPublishedStatusChanged, setIsPublishedStatusChanged] = useState(false);
    const [publishedCoursesFilter, setPublishedCoursesFilter] = useState("all");

    const [courseUpdateModalOpen, setCourseUpdateModalOpen] = React.useState(false);
    const [courseUpdateTitle,setCourseUpdateTitle] = React.useState("");
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [isCourseUpdated, setIsCourseUpdated] = useState(false);

    const [tabValue, setTabValue] = useState(0);  // 0 for individual and 1 for bundle
    const [isLoading, setIsLoading] = useState(false);

    const [bundles, setBundles] = useState(null);
    const [bundleCreateModalOpen, setBundleCreateModalOpen] = React.useState(false);
    const [bundleTitle,setBundleTitle] = React.useState("");
    const [isNewBundleCreated, setIsNewBundleCreated] = useState(false);
    const [publishedBundlesFilter, setPublishedBundlesFilter] = useState("all");

  const handlePublishedCoursesFilter = (event) => {
    const selectedFilter = event.target.value;
    setPublishedCoursesFilter(selectedFilter);
  };
  const handlePublishedBundlesFilter = (event) => {
    const selectedFilter = event.target.value;
    setPublishedBundlesFilter(selectedFilter);
  };

  const handleUpdateButtonClick =(title,courseId) =>{
    setCourseUpdateTitle(title);
    setCourseUpdateModalOpen(true);
    setSelectedCourseId(courseId);
  }

  const handleTitleUpdateChange =(e) =>{
    setCourseUpdateTitle(e.target.value); 
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fetchBundles = async () =>{
    const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/coursebundle/?publishedStatus=${publishedBundlesFilter}`
    );
    console.log("Bundles fetched are :",response.data.courseBundles);
    if(response.data.success){
        setBundles(response.data.courseBundles);
    }
  }

  const fetch = async () =>{
    setIsLoading(true);
    //Fectching all individual courses
    let courseType='individual';
    const response = await fetchAllCourses(publishedCoursesFilter,courseType);
    console.log(response);
    if(response.success) setOwnedCourses(response.courses);

    //Fectching all bundles
    await fetchBundles();
    setIsLoading(false);
  }


    useEffect(()=>{
      fetch();
    },[isNewCourseCreated,isNewBundleCreated,publishedCoursesFilter,isPublishedStatusChanged,isCourseUpdated,publishedBundlesFilter]);

    const handleTitleChange =(e) =>{
      setCourseTitle(e.target.value); 
    }

    const handleCreate = async () =>{
      console.log(courseTitle);
        const response = await createCourse(courseTitle,user._id,user.role);
        setIsNewCourseCreated(!isNewCourseCreated);
        if(response.success) console.log(response.course);
        setCourseCreateModalOpen(false);
    }

    const handleTitleUpdate = async () =>{
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/${selectedCourseId}`,
        {title:courseUpdateTitle}
      );
      setIsCourseUpdated(!isCourseUpdated);
      setCourseUpdateModalOpen(false);
      console.log(response);

    }

    const handleCreateBundle = async () =>{
      const bundleData = {title:bundleTitle, creatorId:user._id};
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/coursebundle/create`,
        bundleData
      );
      setIsNewBundleCreated(!isNewBundleCreated);
      setBundleCreateModalOpen(false);
    }

    const publishBundle = async (bundleId) =>{
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/coursebundle/publish/${bundleId}`);
    }
    const unpublishBundle = async (bundleId) =>{
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/coursebundle/unpublish/${bundleId}`);
    }

    if(!isLoading){
      return (
    
        <div style={{ backgroundColor: 'white' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Individual Courses" />
              <Tab label="Bundled Courses" />
            </Tabs>
        </Box>
        {tabValue === 0 && (
          // Individual Courses Tab
          <div>
            {/* Create Course */}
            <div className="flex items-center justify-center mt-4">
          <Card sx={{ minWidth: 275 }} className="w-4/5">
            <CardContent className="flex justify-between items-center">
            <Typography variant="h4" className="font-semibold">Create New Course</Typography>
            <Button variant="contained" color="success" onClick={() => setCourseCreateModalOpen(true)}>
              Create Course
            </Button>
            </CardContent>

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
                <div className="flex w-full justify-end items-center mt-3">
                  <Button style={{marginRight:'5px'}} variant="contained" onClick={handleCreate}>Create</Button>
                  <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setCourseCreateModalOpen(false)}>Close</Button>
                </div>
              </Box>
            </Modal>

          </Card>
            </div>
            {/* Create Course */}

            {/* Display Courses */}
            <div className="flex flex-col items-center justify-center mt-8">
        <Typography variant="h4" className="mt-2 mb-2 w-4/5">View Courses</Typography>

        {/* Filter Course */}
        <div className='w-4/5 flex justify-end mb-3'>
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
        </div>
        {/* Filter Course */}

        <div className="flex flex-col justify-center items-center w-full">
          {ownedCourses && ownedCourses.map(course => (
            <Card key={course._id} className="w-[80%] rounded-xl mt-2 mb-2">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {course.title}
                </Typography>
                  {
                    course.publishedStatus &&
                    <div className='flex justify-end '>
                      <Chip label="Published" color="success" variant="outlined" className="italic mr-2" />
                      <Button variant="outlined" color="success" className="rounded-3xl" onClick={()=>{
                      unpublishCourse(course._id);
                      setIsPublishedStatusChanged(!isPublishedStatusChanged);
                      }}>
                      Unpublish
                      </Button>
                    </div>
                  }

                  {
                    !course.publishedStatus &&
                    <div className='flex justify-end my-2'>
                      <Chip label="In Draft" color="success" variant="outlined" className="italic mr-2" />
                      <Button variant="outlined" color="success" className="rounded-3xl" onClick={()=>{
                        publishCourse(course._id);
                        setIsPublishedStatusChanged(!isPublishedStatusChanged);
                      }}>
                      Publish
                      </Button>
                    </div>
                  }
                <div className='flex justify-end my-2'>

                  
                  {/* Updating Course */}
                  <Button variant="contained" color="success" style={{marginRight:"10px"}} onClick={() => handleUpdateButtonClick(course.title,course._id)}>
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
                    <div className="flex w-full justify-end items-center mt-3">
                      <Button style={{marginRight:'5px'}} variant="contained" onClick={handleTitleUpdate}>Update</Button>
                      <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setCourseUpdateModalOpen(false)}>Close</Button>
                    </div>
                  </Box>
                  </Modal>
                  {/* Updating Course */}


                  <Link to={`${url}/courses/${course._id}/modules/create`}>
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
            {/* Display Courses */}
          </div>
        )}
        {tabValue === 1 && (
          // Bundles Tab
          <div>
            {/* Create Bundle */}
            <div className="flex items-center justify-center mt-4">
          <Card sx={{ minWidth: 275 }} className="w-4/5">
            <CardContent className="flex justify-between items-center">
            <Typography variant="h4" className="font-semibold">Create New Bundle</Typography>
            <Button variant="contained" color="success" onClick={() => setBundleCreateModalOpen(true)}>
              Create Bundle
            </Button>
            </CardContent>

            <Modal
              open={bundleCreateModalOpen}
              onClose={()=>{setBundleCreateModalOpen(false)}}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="rounded-lg"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Enter Bundle Title
                </Typography>
                <TextField className="w-full" id="outlined-basic" label="Bundle Title" variant="outlined" onChange={(e)=>{setBundleTitle(e.target.value); }} value={bundleTitle}/>
                <div className="flex w-full justify-end items-center mt-3">
                  <Button style={{marginRight:'5px'}} variant="contained" onClick={handleCreateBundle}>Create</Button>
                  <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setBundleCreateModalOpen(false)}>Close</Button>
                </div>
              </Box>
            </Modal>

          </Card>
            </div>
             {/* Create Bundle */}

            {/* Display Bundles */}
            <div className="flex flex-col items-center justify-center mt-8">
        <Typography variant="h4" className="mt-2 mb-2 w-4/5">View Bundles</Typography>

        {/* Filter Bundle */}
        <div className='w-4/5 flex justify-end mb-3'>
        <FormControl>
          <Select
            value={publishedBundlesFilter}
            onChange={handlePublishedBundlesFilter}
            displayEmpty
            inputProps={{ 'aria-label': 'Select Filter' }}
          >
            <MenuItem value="all">All Bundles</MenuItem>
            <MenuItem value="published">Published Bundles</MenuItem>
            <MenuItem value="draft">In Draft Bundles</MenuItem>
          </Select>
        </FormControl>
        </div>
        {/* Filter Course */}

        <div className="flex flex-col justify-center items-center w-full">
          {bundles && bundles.map(bundle => (
            <Card key={bundle._id} className="w-[80%] rounded-xl mt-2 mb-2">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {bundle.title}
                </Typography>
                  {
                    bundle.publishedStatus &&
                    <div className='flex justify-end '>
                      <Chip label="Published" color="success" variant="outlined" className="italic mr-2" />
                      <Button variant="outlined" color="success" className="rounded-3xl" onClick={()=>{
                      unpublishBundle(bundle._id);
                      setIsPublishedStatusChanged(!isPublishedStatusChanged);
                      }}>
                      Unpublish
                      </Button>
                    </div>
                  }

                  {
                    !bundle.publishedStatus &&
                    <div className='flex justify-end my-2'>
                      <Chip label="In Draft" color="success" variant="outlined" className="italic mr-2" />
                      <Button variant="outlined" color="success" className="rounded-3xl" onClick={()=>{
                        publishBundle(bundle._id);
                        setIsPublishedStatusChanged(!isPublishedStatusChanged);
                      }}>
                      Publish
                      </Button>
                    </div>
                  }
                <div className='flex justify-end my-2'>

                  
                  {/* Updating Bundle */}
                  {/* <Button variant="contained" color="success" style={{marginRight:"10px"}} onClick={() => handleUpdateButtonClick(course.title,course._id)}>
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
                    <div className="flex w-full justify-end items-center mt-3">
                      <Button style={{marginRight:'5px'}} variant="contained" onClick={handleTitleUpdate}>Update</Button>
                      <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setCourseUpdateModalOpen(false)}>Close</Button>
                    </div>
                  </Box>
                  </Modal> */}
                  {/* Updating Bundle */}


                  <Link to={`${url}/coursebundle/${bundle._id}`}>
                  <Button variant="outlined" className="rounded-lg" endIcon={<SendIcon />}>
                    View Bundle
                  </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
            </div>
            {/* Display Bundles */}
          </div>
        )}
      </div>
      );
  }
  else{
    return <Loader/>
  }
}