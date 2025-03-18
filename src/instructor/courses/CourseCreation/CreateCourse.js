import React, {useContext,useState,useEffect} from 'react';
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

export default function CreateCourse({url}) {

  // const {createCourse} = useCourse();
  // const {createCourse} = useContext(CourseContext);
  const {user,createCourse} = useAuth();


    const [courseCreateModalOpen, setCourseCreateModalOpen] = React.useState(false);
    const [courseTitle,setCourseTitle] = React.useState("");

    const [courseType, setCourseType] = useState('free');
    const [coursePrice, setCoursePrice] = useState(0);

    const [allCourses, SetAllCourses] = useState(null);
    const [isNewCourseCreated, setIsNewCourseCreated] = useState(false)
    const [approvedCoursesFilter, setApprovedCoursesFilter] = useState("all");

   const [courseUpdateModalOpen, setCourseUpdateModalOpen] = React.useState(false);
    const [courseUpdateTitle,setCourseUpdateTitle] = React.useState("");
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [isCourseUpdated, setIsCourseUpdated] = useState(false);

    const [isLoading, setIsLoading] = useState(false);


  const handleUpdateButtonClick =(title,courseId) =>{
    setCourseUpdateTitle(title);
    setCourseUpdateModalOpen(true);
    setSelectedCourseId(courseId);
  }

  const handleApprovedCoursesFilter = (event) => {
    const selectedFilter = event.target.value;
    setApprovedCoursesFilter(selectedFilter);
  };


  const handleTitleUpdateChange =(e) =>{
    setCourseUpdateTitle(e.target.value); 
  }

  const handleCourseTypeChange = (event) => {
    setCourseType(event.target.value);
  };

  const handleCoursePriceChange = (event) => {
    setCoursePrice(event.target.value);
  };  



  const fetch = async () =>{
    setIsLoading(true);
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/instructors/courses/${user._id}?approvalStatus=${approvedCoursesFilter}`);
    if(response.data.success) SetAllCourses(response.data.courses);
    setIsLoading(false);
  }


    useEffect(()=>{
      fetch();
    },[isNewCourseCreated,isCourseUpdated,approvedCoursesFilter])

    const handleTitleChange =(e) =>{
      setCourseTitle(e.target.value); 
    }

    const handleCreate = async () =>{
      console.log(courseTitle);
      const response = await createCourse(courseTitle,user._id,user.role,courseType,coursePrice);
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

    if(!isLoading){
      return (
        // <div style={{backgroundColor:"white"}}>
        //   {/* Create Course */}
        //   <div className="flex items-center justify-center mt-4">
        //   <Card sx={{ minWidth: 275 }} className="w-4/5">
        //     <CardContent className="flex justify-between items-center">
        //     <Typography variant="h4" className="font-semibold">Create New Course</Typography>
        //     <Button variant="contained" color="success" onClick={() => setCourseCreateModalOpen(true)}>
        //       Create Course
        //     </Button>
        //     </CardContent>

        //     <Modal
        //       open={courseCreateModalOpen}
        //       onClose={()=>{setCourseCreateModalOpen(false)}}
        //       aria-labelledby="modal-modal-title"
        //       aria-describedby="modal-modal-description"
        //       className="rounded-lg"
        //     >
        //       <Box sx={style}>
        //         <Typography id="modal-modal-title" variant="h6" component="h2">
        //           Enter Course Title
        //         </Typography>
        //         <TextField className="w-full" id="outlined-basic" label="Course Title" variant="outlined" onChange={handleTitleChange} value={courseTitle}/>
        //         <div className="flex w-full justify-end items-center mt-3">
        //           <Button style={{marginRight:'5px'}} variant="contained" onClick={handleCreate}>Create</Button>
        //           <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setCourseCreateModalOpen(false)}>Close</Button>
        //         </div>
        //       </Box>
        //     </Modal>

        //   </Card>
        //   </div>
        // {/* Create Course */}

        

        // {/* Display courses */}
        // <div className="flex flex-col items-center justify-center mt-8">
        // <Typography variant="h4" className="mt-2 mb-2 w-4/5">View Courses</Typography>

        // {/* Filter Course */}
        // <div className='w-4/5 flex justify-end mb-3'>
        // <FormControl>
        //   <Select
        //     value={approvedCoursesFilter}
        //     onChange={handleApprovedCoursesFilter}
        //     displayEmpty
        //     inputProps={{ 'aria-label': 'Select Filter' }}
        //   >
        //     <MenuItem value="all">All Courses</MenuItem>
        //     <MenuItem value="published">Published Courses</MenuItem>
        //     <MenuItem value="draft">In Draft Courses</MenuItem>
        //   </Select>
        // </FormControl>
        // </div>
        // {/* Filter Course */}

        // <div className="flex flex-col justify-center items-center w-full">
        //   {allCourses && allCourses.map(course => (
        //     <Card key={course._id} className="w-[80%] rounded-xl mt-2 mb-2">
        //       <CardContent>
        //         <Typography variant="h5" component="h2">
        //           {course.title}
        //         </Typography>
        //           {
        //             course.publishedStatus &&
        //             <div className='flex justify-end '>
        //               <Chip label="Published" color="success" variant="outlined" className="italic mr-2" />
        //             </div>
        //           }

        //           {
        //             !course.publishedStatus &&
        //             <div className='flex justify-end my-2'>
        //               <Chip label="In Draft" color="success" variant="outlined" className="italic mr-2" />
        //             </div>
        //           }
        //         <div className='flex justify-end my-2'>

                  
        //           {/* Updating Course */}
        //           {/* <Button variant="contained" color="success" style={{marginRight:"10px"}} onClick={() => handleUpdateButtonClick(course.title,course._id)}>
        //             Update
        //           </Button> */}

        //           {/* <Modal
        //             open={courseUpdateModalOpen}
        //             onClose={()=>{setCourseUpdateModalOpen(false)}}
        //             aria-labelledby="modal-modal-title"
        //             aria-describedby="modal-modal-description"
        //             className="rounded-lg"
        //         >
        //           <Box sx={style}>
        //             <Typography id="modal-modal-title" variant="h6" component="h2">
        //               Enter Course Title
        //             </Typography>
        //             <TextField className="w-full" id="outlined-basic" label="Course Title" variant="outlined" onChange={handleTitleUpdateChange} value={courseUpdateTitle}/>
        //             <div className="flex w-full justify-end items-center mt-3">
        //               <Button style={{marginRight:'5px'}} variant="contained" onClick={handleTitleUpdate}>Update</Button>
        //               <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setCourseUpdateModalOpen(false)}>Close</Button>
        //             </div>
        //           </Box>
        //           </Modal> */}
        //           {/* Updating Course */}


        //           <Link to={`${url}/courses/${course._id}/modules/create`}>
        //           <Button variant="outlined" className="rounded-lg" endIcon={<SendIcon />}>
        //             View Course
        //           </Button>
        //           </Link>
        //         </div>
        //       </CardContent>
        //     </Card>
        //   ))}
        // </div>
        // </div>
        // {/* Display courses */}

        // </div>

        <div className="bg-white flex flex-col justify-center items-center">
  
        {/* Create Course */}
        <div className="rounded overflow-hidden shadow-lg w-4/5">
            <div className="px-6 py-4 flex items-center justify-between border-b">
              <div className="font-bold text-xl mb-2">Create New Courses</div>
  
              <div className='flex items-center justify-end'>
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2" onClick={() => setCourseCreateModalOpen(true)}
                >
                  Create Course
                </button>
              </div>

              <Modal
              open={courseCreateModalOpen}
              onClose={()=>{setCourseCreateModalOpen(false)}}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="rounded-lg"
            >
              <Box sx={style}>
                {/* Course Tilte */}
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Enter Course Title
                </Typography>
                <TextField className="w-full" id="outlined-basic" label="Course Title" variant="outlined" onChange={handleTitleChange} value={courseTitle}/>
                <div className="flex flex-col w-full justify-end items-center mt-3">
                {/* Course Tilte */}

                {/* Course Type */}
                <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700">Course Type</label>
                <select
                  className="mt-1 p-2 border w-full"
                  value={courseType}
                  onChange={handleCourseTypeChange}
                >
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              {/* Course Type */}

               {/* Course Price (Render only if course type is "paid") */}
              {courseType === 'paid' && (
                <input
                  type="number"
                  className="w-full border p-2 mb-4"
                  placeholder="Course Price"
                  value={coursePrice}
                  onChange={handleCoursePriceChange}
                />
              )}
              {/* Course Price */}

                   <div className="flex w-full items-center justify-end">
                    <Button style={{marginRight:'5px'}} variant="contained" onClick={handleCreate}>Create</Button>
                    <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setCourseCreateModalOpen(false)}>Close</Button>
                  </div>
                </div>
              </Box>
            </Modal>
              
  
            </div>
        </div>
        {/* Create Course */}


        {/* Display Courses */}
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mt-7">
        View Courses
      </h2>

      {/* Filter Course */}
        <div className='w-4/5 flex justify-end mb-3'>
          <div className="relative">
            <select
              value={approvedCoursesFilter}
              onChange={handleApprovedCoursesFilter}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-gray-500"
            >
              <option value="all">All Courses</option>
              <option value="approved">Approved Courses</option>
              <option value="pending">Pending Courses</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z" />
              </svg>
            </div>
          </div>
        </div>
      {/* Filter Course */}


      <div className="rounded overflow-hidden shadow-lg w-4/5">
        {allCourses && allCourses.length > 0 && allCourses.map((course) => (
          <div key={course?._id} className="px-6 py-4 flex flex-col items-center justify-between border-b">

            {/* Row 1 */}
            <div className="px-6 py-4 flex items-center justify-between border-b w-full">

              <div className="font-bold text-xl mb-2">{course?.title}</div>

              <div className='flex items-center justify-end'>

              {
                course.approvalStatus===true && (
                  <div className='flex justify-end'>
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 italic">Approved</span>
                  </div>
                )
              }

              
              {
                course.approvalStatus===false && (
                  <div className='flex justify-end'>
                    <span className="inline-block bg-yellow-200 text-green-800 px-3 py-1 rounded-full text-sm mr-2 italic">Pending</span>
                  </div>
                )
              }

              </div>

            </div>
            {/* Row 1 */}

            {/* Row 2 */}
            <div className="px-6 py-4 flex items-center justify-end border-b w-full">


              <div className='flex items-center justify-end'>

             
              {/* Edit Course */}
              {/* <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2" onClick={() => handleUpdateButtonClick(course.title,course._id,course.courseType,course.coursePrice)}
                >
                  Edit
              </button>

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

                    Course Type
                      <div className="mb-4 w-full">
                        <label className="block text-sm font-medium text-gray-700">Course Type</label>
                        <select
                          className="mt-1 p-2 border w-full"
                          value={courseUpdateType}
                          onChange={handleTypeUpdateChange}
                        >
                          <option value="free">Free</option>
                          <option value="paid">Paid</option>
                        </select>
                      </div>
                      Course Type

                      Course Price
                      {courseUpdateType === 'paid' && (
                        <input
                          type="number"
                          className="w-full border p-2 mb-4"
                          placeholder="Course Price"
                          value={courseUpdatePrice}
                          onChange={handlePriceUpdateChange}
                        />
                      )}
                      Course Price
                    
                    <div className="flex w-full justify-end items-center mt-3">
                      <Button style={{marginRight:'5px'}} variant="contained" onClick={handleCourseUpdate}>Edit</Button>
                      <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setCourseUpdateModalOpen(false)}>Close</Button>
                    </div>
                  </Box>
              </Modal> */}
              {/* Edit Course */}


              {/* Delete Course */}
              {/* <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"  onClick={()=>handleDeleteButtonClick(course._id)}
                >
                  Delete
              </button>

              <Modal
                    open={courseDeleteModalOpen}
                    onClose={()=>{setCourseDeleteModalOpen(false)}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="rounded-lg"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure you want to delete this course?  All the associated chapters, sections, and pdf files will be deleted 
                    </Typography>
              
                    <div className="flex w-full justify-end items-center mt-3">
                      <Button style={{marginRight:'5px'}} variant="contained" onClick={handleCourseDelete}>Delete</Button>
                      <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setCourseDeleteModalOpen(false)}>Cancel</Button>
                    </div>
                  </Box>
              </Modal> */}
              {/* Delete Course */}

               {/* Adding prerequisite courses */}
               {/* <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"  onClick={() => handlePrerequisiteCoursesButtonClick(course._id,course.prerequisiteCourses)}
                >
                  Prerequisite Courses
              </button>

              <AddPrerequisiteCoursesModal 
                      totalCourses={totalCourses}
                      courseId={selectedCourseId}
                      prerequisiteCoursesModalOpen={prerequisiteCoursesModalOpen}
                      setPrerequisiteCoursesModalOpen={setPrerequisiteCoursesModalOpen}
                      prerequisiteCourses={prerequisiteCourses}
                      handleCourseSelection={handleCourseSelection}
                      handleAddPrerequisiteCourses={handleAddPrerequisiteCourses}
              /> */}

               {/* Adding prerequisite courses */}

                {/* View Course */}
              <Link to={`${url}/courses/${course._id}/modules/create`}>
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
                >
                  View Course
                </button>
              </Link>
               {/* View Course */}


              </div>



            </div>
            {/* Row 2 */}



          </div>
        ))}
      </div>

        {/* Display Courses */}
  
        </div>
      );
  }
  else{
    return <Loader/>
  }
}