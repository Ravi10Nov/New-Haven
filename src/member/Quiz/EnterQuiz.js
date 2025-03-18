import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Paper, 
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardActions,
  CardContent,
} from '@mui/material';
import axios from 'config/axios';
import {Link} from 'react-router-dom';
import Loader from 'components/Loader';

const EnterQuiz = ({url}) => {
  const [quiz, setQuiz] = useState();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionNo, setCurrentQuestionNo] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [resultDetails, setResultDetails] = useState({
    isQuizCompleted: false,
    noOfCorrectAnswers: 0,
    percentageScored: 0,
    isPassed:false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const {quizId} = useParams();

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/quiz/get-by-id/${quizId}`
      );
      if(res.data.success) setQuiz(res.data.quiz);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/quiz/question/all/${quizId}`
      );
      console.log(response.data.questions);
      const sortedQuestions = response.data.questions.sort(
        (a, b) => a.questionNo - b.questionNo
      );
      console.log("sorted Questions:",sortedQuestions);
      setQuestions(sortedQuestions);
      const initialSelectedOptions = Array(sortedQuestions.length).fill('');
      setSelectedOptions(initialSelectedOptions);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const handleOptionSelect = (event,option) => {
    const newSelectedOptions = [...selectedOptions];
    if(event.target.checked) newSelectedOptions[currentQuestionNo-1] = option;
    else newSelectedOptions[currentQuestionNo-1] = '';
    setSelectedOptions(newSelectedOptions);
  };

  const handleNext = () => {
    if (currentQuestionNo < questions.length) {
      setCurrentQuestionNo(currentQuestionNo + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionNo > 1) {
      setCurrentQuestionNo(currentQuestionNo - 1);
    }
  };



  const handleSubmission = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.answer) {
        correctAnswers++;
      }
    });
    const percentage = (correctAnswers / questions.length) * 100;
    let passedStatus = (Number(percentage)>=quiz?.passPercentage) ? true : false;
    console.log("passing status :",passedStatus);
    let result={
      isQuizCompleted: true,
      noOfCorrectAnswers: correctAnswers,
      percentageScored: percentage,
      isPassed: passedStatus,
    }
    console.log(result);
    setResultDetails(result);
  };

  const currentQuestion = questions[currentQuestionNo-1];

  if(!isLoading){
    return (
      <div>
        {/* Quiz */}
        <div className="w-4/5 flex items-center justify-center">
        {!resultDetails.isQuizCompleted && currentQuestion && (
          <div className="ml-5 w-[70%] border-double border-4 border-indigo-600 flex flex-col items-center justify-center">
            <Typography className="mt-3 mb-3" variant="h5">Question {currentQuestion.questionNo}</Typography>
            <Typography  className="mt-3 mb-3">{currentQuestion.statement}</Typography>

            <div className="flex flex-col space-y-2">

            {currentQuestion.options.map((option, index) => (
                  <div className="flex items-center">
                      <input type="checkbox"  name={option} className="mr-2" checked={selectedOptions[currentQuestionNo-1] === option} onChange={(event) => handleOptionSelect(event,option)}/>
                      <label htmlFor="option1">{option}</label>
                </div>
              ))}    
            </div>


              <div className="w-full flex justify-around mt-5">
              {currentQuestionNo > 1 && (
                  <Button variant="outlined" onClick={handlePrevious}>
                  Previous
                  </Button>
              )}
              {currentQuestionNo === questions.length ? (
                  <Button variant="outlined" onClick={handleSubmission} disabled={selectedOptions[currentQuestionNo - 1] === ''}>
                  Submit
                  </Button>
              ) : (
                  <Button variant="outlined" onClick={handleNext} disabled={selectedOptions[currentQuestionNo - 1] === ''}>
                  Next
                  </Button>
              )}
              </div>
          </div>
        )}
        </div>
        {/* Quiz */}

        {/* Quiz Result */}
        {resultDetails.isQuizCompleted && (
          <div className='flex justify-center items-center h-[300px]'>
            <Card className='w-[70%] h-[90%]'>
              <CardContent className="h-4/5">
                <Typography style={{fontSize: '30px'}} gutterBottom variant="h5" component="div">
                Quiz Result
                </Typography>
                <Typography style={{fontSize: '25px'}} variant="body2" color="text.secondary">
                  Score : {resultDetails?.noOfCorrectAnswers}/{questions.length}
                </Typography>
                <Typography style={{fontSize: '25px'}} variant="body2" color="text.secondary">
                Percentage Scored: {resultDetails?.percentageScored.toFixed(2)}%
                </Typography>

                {resultDetails?.isPassed ? (
                  <Typography style={{fontSize: '18px', color: 'green'}} variant="body2">
                    Congratulations! You have passed the quiz.
                  </Typography>
                ) : (
                  <Typography style={{fontSize: '18px', color: 'red'}} variant="body2">
                    Sorry, you have not passed the quiz.
                  </Typography>
                )}

              </CardContent>
              <CardActions>
                <Link to={`${url}/quizzes`}>
                <Button variant="outlined" size="small">Back to Quizzes</Button>
                </Link>
              </CardActions>
          </Card>
        </div>
        )}
        {/* Quiz Result */}

      </div>
    );
  }
  else{
    return <Loader/>
  }
};

export default EnterQuiz;
