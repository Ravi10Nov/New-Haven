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
import { toast } from 'react-toastify';


// import { useQuiz } from 'hooks/useQuiz';
// import QuizContext from 'contexts/QuizContext';
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


export default function CreateQuiz({url}) {

  // const {createQuiz} = useQuiz();
  // const {createQuiz} = useContext(QuizContext);
  const {user} = useAuth();


    const [quizCreateModalOpen, setQuizCreateModalOpen] = React.useState(false);
    const [quizTitle,setQuizTitle] = React.useState("");


    const [passPercentage,setPassPercentage] = React.useState(80);
    const [quizzes, setQuizzes] = useState(null);
    const [isNewQuizCreated, setIsNewQuizCreated] = useState(false);
    const [isPublishedStatusChanged, setIsPublishedStatusChanged] = useState(false);
    const [publishedQuizFilter, setPublishedQuizFilter] = useState("all");

    const [quizUpdateModalOpen, setQuizUpdateModalOpen] = React.useState(false);
    const [quizUpdateTitle,setQuizUpdateTitle] = React.useState("");
    const [quizUpdatePassPercentage,setQuizUpdatePassPercentage] = React.useState(80);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [isQuizUpdated, setIsQuizUpdated] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const handlePublishedQuizFilter = (event) => {
      const selectedFilter = event.target.value;
      setPublishedQuizFilter(selectedFilter);
    };
  

  const handleUpdateButtonClick =(title,passPercentage,quizId) =>{
    setQuizUpdateTitle(title);
    setQuizUpdatePassPercentage(passPercentage);
    setQuizUpdateModalOpen(true);
    setSelectedQuizId(quizId);
  }

  const handlePassPercentageChange = (e) => {
    setPassPercentage(e.target.value);
  };

  const handleTitleUpdateChange =(e) =>{
    setQuizUpdateTitle(e.target.value); 
  }

  const handlePassPercentageUpdateChange =(e) =>{
    setQuizUpdatePassPercentage(e.target.value); 
  }


  const fetch = async () =>{
    setIsLoading(true);
    const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/quiz/all/?publishedStatus=${publishedQuizFilter}`
      );
    console.log(response);
    if(response.data.success) setQuizzes(response.data.quizzes);
    setIsLoading(false);
  }


    useEffect(()=>{
      fetch();
    },[isNewQuizCreated,publishedQuizFilter,isPublishedStatusChanged,isQuizUpdated])

    const handleTitleChange =(e) =>{
      setQuizTitle(e.target.value); 
    }

    const handleCreate = async () =>{
      console.log(quizTitle);
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/quiz/create`,
            {title:quizTitle,creatorId:user._id,passPercentage:passPercentage}
        );
        setIsNewQuizCreated(!isNewQuizCreated);
        setQuizCreateModalOpen(false);
    }

    const handleQuizUpdate = async () =>{
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/quiz/update/${selectedQuizId}`,
        {title:quizUpdateTitle,passPercentage:quizUpdatePassPercentage}
      );
      setIsQuizUpdated(!isQuizUpdated);
      setQuizUpdateModalOpen(false);
      console.log(response);
      if(response.data.success){
        toast.success("Quiz updated successfully");
      }

    }

    const handlePublishQuiz = async (quizId) => {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/quiz/publish/${quizId}`);
    }

    const handleUnPublishQuiz = async (quizId) => {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/quiz/unpublish/${quizId}`);
    }
    

    if(!isLoading){
      return (
        <div style={{backgroundColor:"white"}}>
          {/* Create quiz*/}
          <div className="flex items-center justify-center mt-4">
          
          <Card sx={{ minWidth: 275 }} className="w-4/5">
            <CardContent className="flex justify-between items-center">
            <Typography variant="h4" className="font-semibold">Create New Quiz</Typography>
            <Button variant="contained" color="success" onClick={() => setQuizCreateModalOpen(true)}>
              Create Quiz
            </Button>
            </CardContent>

            <Modal
              open={quizCreateModalOpen}
              onClose={()=>{setQuizCreateModalOpen(false)}}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="rounded-lg"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Enter Quiz Title
                </Typography>
                <TextField className="w-full" id="outlined-basic" label="quiz Title" variant="outlined" onChange={handleTitleChange} value={quizTitle}/>
                <TextField className="w-full mt-3" id="outlined-basic" label="Passing Percentage" type="number" variant="outlined" onChange={handlePassPercentageChange} value={passPercentage} />
                <div className="flex w-full justify-end items-center mt-3">
                  <Button style={{marginRight:'5px'}} variant="contained" onClick={handleCreate}>Create</Button>
                  <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setQuizCreateModalOpen(false)}>Close</Button>
                </div>
              </Box>
            </Modal>

          </Card>
          </div>
        {/* Create quiz*/}

        

        {/* Display quizzes */}
        <div className="flex flex-col items-center justify-center mt-8">
        <Typography variant="h4" className="mt-2 mb-2 w-4/5">View Quizzes</Typography>

        {/* Filter quiz */}
        <div className='w-4/5 flex justify-end mb-3'>
        <FormControl>
          <Select
            value={publishedQuizFilter}
            onChange={handlePublishedQuizFilter}
            displayEmpty
            inputProps={{ 'aria-label': 'Select Filter' }}
          >
            <MenuItem value="all">All Quizzes</MenuItem>
            <MenuItem value="published">Published Quizzes</MenuItem>
            <MenuItem value="draft">In Draft Quizzes</MenuItem>
          </Select>
        </FormControl>
        </div>
        {/* Filter quiz */}

        <div className="flex flex-col justify-center items-center w-full">
          {quizzes && quizzes.map(quiz => (
            <Card key={quiz._id} className="w-[80%] rounded-xl mt-2 mb-2">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {quiz.title}
                </Typography>

                  {
                    quiz.publishedStatus &&
                    <div className='flex justify-end '>
                      <Chip label="Published" color="success" variant="outlined" className="italic mr-2" />
                      <Button variant="outlined" color="success" className="rounded-3xl" onClick={()=>{
                      handleUnPublishQuiz(quiz._id);
                      setIsPublishedStatusChanged(!isPublishedStatusChanged);
                      }}>
                      Unpublish
                      </Button>
                    </div>
                  }

                  {
                    !quiz.publishedStatus &&
                    <div className='flex justify-end my-2'>
                      <Chip label="In Draft" color="success" variant="outlined" className="italic mr-2" />
                      <Button variant="outlined" color="success" className="rounded-3xl" onClick={()=>{
                        handlePublishQuiz(quiz._id);
                        setIsPublishedStatusChanged(!isPublishedStatusChanged);
                      }}>
                      Publish
                      </Button>
                    </div>
                  }

                <div className='flex justify-end my-2'>

                  
                  {/* Updating quiz */}
                  <Button variant="contained" color="success" style={{marginRight:"10px"}} onClick={() => handleUpdateButtonClick(quiz.title,quiz.passPercentage,quiz._id)}>
                    Update
                  </Button>

                  <Modal
                    open={quizUpdateModalOpen}
                    onClose={()=>{setQuizUpdateModalOpen(false)}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="rounded-lg"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Enter Quiz Title
                    </Typography>
                    <TextField className="w-full" id="outlined-basic" label="Quiz Title" variant="outlined" onChange={handleTitleUpdateChange} value={quizUpdateTitle}/>
                    <TextField className="w-full mt-3" id="outlined-basic" label="Passing Percentage" type="number" variant="outlined" onChange={handlePassPercentageUpdateChange} value={quizUpdatePassPercentage} />
                    <div className="flex w-full justify-end items-center mt-3">
                      <Button style={{marginRight:'5px'}} variant="contained" onClick={handleQuizUpdate}>Update</Button>
                      <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setQuizUpdateModalOpen(false)}>Close</Button>
                    </div>
                  </Box>
                  </Modal>
                  {/* Updating quiz */}


                  <Link to={`${url}/quizzes/details/${quiz._id}`}>
                  <Button variant="outlined" className="rounded-lg" endIcon={<SendIcon />}>
                    View quiz
                  </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        </div>
        {/* Display Quizzes */}

        </div>
      );
  }
  else{
    return <Loader/>
  }
}