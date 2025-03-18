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


export default function ViewQuizzes({url}) {
  const {user} = useAuth();
    
    const [quizzes, setQuizzes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

  const fetch = async () =>{
    setIsLoading(true);
    const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/quiz/all/?publishedStatus=published`
      );
    console.log(response);
    if(response.data.success) setQuizzes(response.data.quizzes);
    setIsLoading(false);
  }

    useEffect(()=>{
      fetch();
    },[])

   
    if(!isLoading){
      return (
        <div style={{backgroundColor:"white"}}>
          
        {/* Display quizzes */}
        <div className="flex flex-col items-center justify-center mt-8">
        <Typography variant="h4" className="mt-2 mb-2 w-4/5">View Quizzes</Typography>

        {/* Filter quiz */}
        {/* <div className='w-4/5 flex justify-end mb-3'>
        <FormControl>
          <Select
            value={publishedQuizsFilter}
            onChange={handlePublishedQuizsFilter}
            displayEmpty
            inputProps={{ 'aria-label': 'Select Filter' }}
          >
            <MenuItem value="all">All Quizs</MenuItem>
            <MenuItem value="published">Published Quizs</MenuItem>
            <MenuItem value="draft">In Draft Quizs</MenuItem>
          </Select>
        </FormControl>
        </div> */}
        {/* Filter quiz */}

        <div className="flex flex-col justify-center items-center w-full">
          {quizzes && quizzes.map(quiz => (
            <Card key={quiz._id} className="w-[80%] rounded-xl mt-2 mb-2">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {quiz.title}
                </Typography>

                  {/* {
                    quiz.publishedStatus &&
                    <div className='flex justify-end '>
                      <Chip label="Published" color="success" variant="outlined" className="italic mr-2" />
                      <Button variant="outlined" color="success" className="rounded-3xl" onClick={()=>{
                      unpublishQuiz(quiz._id);
                      setIsPublishedStatusChanged(!isPublishedStatusChanged);
                      }}>
                      Unpublish
                      </Button>
                    </div>
                  } */}

                  {/* {
                    !quiz.publishedStatus &&
                    <div className='flex justify-end my-2'>
                      <Chip label="In Draft" color="success" variant="outlined" className="italic mr-2" />
                      <Button variant="outlined" color="success" className="rounded-3xl" onClick={()=>{
                        publishQuiz(quiz._id);
                        setIsPublishedStatusChanged(!isPublishedStatusChanged);
                      }}>
                      Publish
                      </Button>
                    </div>
                  } */}

                <div className='flex justify-end my-2'>
                  <Link to={`${url}/quizzes/${quiz._id}`}>
                  <Button variant="outlined" className="rounded-lg" endIcon={<SendIcon />}>
                    Start Quiz
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