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
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import {Link} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Loader from 'components/Loader';
import axios from 'config/axios';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function ViewQuiz({url}) {

  const {quizId} = useParams();

    const [questionCreateModalOpen, setQuestionCreateModalOpen] = React.useState(false);
    const [questions, setQuestions] = useState(null);
    const [questionStatement, setQuestionStatement] = useState(null);
    const [option1, setOption1] = useState(null);
    const [option2, setOption2] = useState(null);
    const [option3, setOption3] = useState(null);
    const [option4, setOption4] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [isNewQuestionCreated, setIsNewQuestionCreated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleAnswerChange = (event, option) => {
      if (event.target.checked) {
        setAnswer(option);
      } else {
        setAnswer(null);
      }
    };

    const fetch = async () =>{
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/quiz/question/all/${quizId}`
      );
      if(response.data.success) setQuestions(response.data.questions);
      setIsLoading(false);
    }


    useEffect(()=>{
      fetch();
    },[isNewQuestionCreated])


    const handleCreate = async () =>{
        let options=[];
        if(option1!==null) options.push(option1);
        if(option2!==null) options.push(option2);
        if(option3!==null) options.push(option3);
        if(option4!==null) options.push(option4);
        let correctAnswer;
        if(answer==="option1") correctAnswer = option1;
        else if(answer==="option2") correctAnswer = option2;
        else if(answer==="option3") correctAnswer = option3;
        else if(answer==="option4") correctAnswer = option4;
        const body={
            statement:questionStatement,
            options:options,
            answer:correctAnswer,
            quizId:quizId
        }
        console.log(body);
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/quiz/question/add`,body
          );
        setIsNewQuestionCreated(!isNewQuestionCreated);
        setQuestionCreateModalOpen(false);
    }

    const isValid = !(
      questionStatement &&
      option1 &&
      option2 &&
      option3 &&
      option4 &&
      answer
    );

  if(!isLoading){
    return (
      <div style={{backgroundColor:"white"}}>

        {/* <div className="flex justify-start items-center p-2">
          <Link to={`${url}/courses/${courseId}/modules/create`}>
          <Button variant="contained" className="mb-2 mt-2" startIcon={<FastRewindIcon />}>
              Back
          </Button>
          </Link>
        </div> */}

        {/* Add Question */}
        <div className="flex flex-col items-center justify-center mt-4">
        <Card sx={{ minWidth: 275 }} className="w-4/5">
          <CardContent className="flex justify-between items-center">
          <Typography variant="h4" className="font-semibold">Add New Question</Typography>
          <Button variant="contained" color="success" onClick={() => setQuestionCreateModalOpen(true)}>
            Add Question
          </Button>
          </CardContent>

          <Modal
            open={questionCreateModalOpen}
            onClose={()=>{setQuestionCreateModalOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="rounded-lg"
          >
            <Container sx={style} maxWidth="md">
              <Typography variant="h4" gutterBottom>
                Question Form
              </Typography>
              <Box component="form">
                <TextField
                  label="Question Statement"
                  name="questionStatement"
                  value={questionStatement}
                  onChange={(e)=>{setQuestionStatement(e.target.value)}}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Option 1"
                  name="option1"
                  value={option1}
                  onChange={(e)=>{setOption1(e.target.value)}}
                  fullWidth
                  multiline
                  margin="normal"
                />

                 <TextField
                  label="Option 2"
                  name="option2"
                  value={option2}
                  onChange={(e)=>{setOption2(e.target.value)}}
                  fullWidth
                  multiline
                  margin="normal"
                />

                <TextField
                  label="Option 3"
                  name="option3"
                  value={option3}
                  onChange={(e)=>{setOption3(e.target.value)}}
                  fullWidth
                  multiline
                  margin="normal"
                />

                <TextField
                  label="Option 4"
                  name="option4"
                  value={option4}
                  onChange={(e)=>{setOption4(e.target.value)}}
                  fullWidth
                  multiline
                  margin="normal"
                />

                 < Box>
                  <Typography variant="h5">Select Answer</Typography>
                  <Box display="flex" flexDirection="column">
                  <FormGroup>
                    <FormControlLabel control={<Checkbox 
                        color="primary" 
                        onChange={(event) => handleAnswerChange(event, 'option1')} 
                        checked={answer === 'option1'} 
                      />} label="Option 1" />
                    <FormControlLabel control={<Checkbox 
                        color="primary" 
                        onChange={(event) => handleAnswerChange(event, 'option2')} 
                        checked={answer === 'option2'} 
                      />} label="Option 2" />
                    <FormControlLabel control={<Checkbox 
                        color="primary" 
                        onChange={(event) => handleAnswerChange(event, 'option3')} 
                        checked={answer === 'option3'} 
                      />} label="Option 3" />
                    <FormControlLabel control={<Checkbox 
                        color="primary" 
                        onChange={(event) => handleAnswerChange(event, 'option4')} 
                        checked={answer === 'option4'} 
                      />} label="Option 4" />
                    
                  </FormGroup>
                  </Box>
                </Box>

                <Button disabled={isValid} variant="contained" color="primary" onClick={handleCreate}>
                  Add
                </Button>
                <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setQuestionCreateModalOpen(false)}>Close</Button>
              </Box>
            </Container>
          </Modal>

        </Card>
        </div>
      {/* Add Question */}

      {/* Display sections */}
      <div className="flex flex-col items-center justify-center mt-8">
      <Typography variant="h4" className="mt-2 mb-2 w-4/5">View Questions</Typography>

      <div className="flex flex-col justify-center items-center w-full">
        {questions && questions.map(question => (
          <Card key={question._id} className="w-[80%] rounded-xl mt-2 mb-2">
            <CardContent>
              <Typography variant="h5" component="h2">
                {question.statement}
              </Typography>
              <div className='flex justify-end '>
              <Link to={`${url}/quizzes/${quizId}/question/details/${question._id}`}>
                <Button variant="outlined" className="rounded-lg" endIcon={<SendIcon />}>
                  View Question
                </Button>
              </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      </div>
      {/* Display questions */}

      </div>
    );
  }
  else{
    return <Loader/>
  }
}