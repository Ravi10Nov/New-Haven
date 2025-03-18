import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Loader from 'components/Loader';
import axios from 'config/axios';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';

const ViewQuizQuestion = ({ url }) => {

    const {questionId} = useParams();

  const [questionStatement, setQuestionStatement] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuestionDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/quiz/question/${questionId}`
        );
      const { data } = response;
      console.log(data);
      setQuestionStatement(data.question.statement || '');
      const options = data.question.options || ['', '', '', ''];
      setOption1(options[0]);
      setOption2(options[1]);
      setOption3(options[2]);
      setOption4(options[3]);
      if(data.question.answer===options[0]) setAnswer('option1');
      else if(data.question.answer===options[1]) setAnswer('option2');
      else if(data.question.answer===options[2]) setAnswer('option3');
      else if(data.question.answer===options[3]) setAnswer('option4');
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching question details:', error);
    }
  };

  useEffect(() => {
    fetchQuestionDetails();
  }, []);


  const handleAnswerChange = (event, option) => {
    if (event.target.checked) {
      setAnswer(option);
    } else {
      setAnswer(null);
    }
  };


  const handleUpdate = async (event) => {
    event.preventDefault();
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
        }
        console.log(body);
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/api/quiz/question/${questionId}`,body
          );
        console.log(response);
        if(response.data.success){
          toast.success('Question details successfully updated');
        }
  };

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

        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Question Details
            </Typography>

            <Box component="form">
                <TextField className="w-full mb-4"
                label="Question Statement"
                name="questionStatement"
                value={questionStatement}
                onChange={(e)=>{setQuestionStatement(e.target.value)}} variant="standard"/>

                <TextField className="w-full mb-4"
                label="option1"
                name="option1"
                value={option1}
                onChange={(e)=>{setOption1(e.target.value)}} variant="standard"/>

                <TextField className="w-full mb-4"
                label="option2"
                name="option2"
                value={option2}
                onChange={(e)=>{setOption2(e.target.value)}} variant="standard"/>

                <TextField className="w-full mb-4"
                label="option3"
                name="option3"
                value={option3}
                onChange={(e)=>{setOption3(e.target.value)}} variant="standard"/>

                <TextField className="w-full mb-4"
                label="option4"
                name="option4"
                value={option4}
                onChange={(e)=>{setOption4(e.target.value)}} variant="standard"/>

                <div className="flex flex-col space-y-2">

                    <Typography variant="h4" gutterBottom>
                        Correct Answer
                    </Typography>

                    <div className="flex items-center">
                        <input type="checkbox" id="option1" name="option1" className="mr-2" checked={answer === 'option1'} onChange={(event) => handleAnswerChange(event,'option1')}/>
                        <label htmlFor="option1">Option 1</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="option2" name="option2" className="mr-2" checked={answer === 'option2'} onChange={(event) => handleAnswerChange(event,'option2')} />
                        <label htmlFor="option3">Option 2</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="option3" name="option3" className="mr-2" checked={answer === 'option3'} onChange={(event) => handleAnswerChange(event,'option3')} />
                        <label htmlFor="checkbox3">Option 3</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="option4" name="option4" className="mr-2" checked={answer === 'option4'} onChange={(event) => handleAnswerChange(event,'option4')} />
                        <label htmlFor="option4">Option 4</label>
                    </div>
                </div>

                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleUpdate} disabled={isValid}>
                 Update
                </button>
            </Box> 
        </Container>
    </div>
    );
  }
  else{
    return <Loader/>
  }
};

export default ViewQuizQuestion;
