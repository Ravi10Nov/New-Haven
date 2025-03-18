import { Lock, Warning } from '@mui/icons-material';
import { useSpring, animated } from "react-spring";
import { useMeasure } from "react-use";
import { Button, CircularProgress, MobileStepper } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../../components/header';
import MemberQuizModal from './MemberQuizModal';
import {connectSocket} from './realtime/sockets';

import './TakingQuiz.css'
const steps = ['', '', '', '', ''];
let socket;

const TakingQuiz = ({ data, url, quizId, courseId, setAccomplishmentsAccessibleOnParent }) => {

  const [ isLoading, setisLoading ] = React.useState(true);
  const [ currentQuestion, setCurrentquestion ] = React.useState( null );
  const [ quizLength, setQuizLength ] = React.useState(0);
  const [ selectedAnswer, setselectedAnswer ] = React.useState( null );
  const [ quizResult, setQuizResult ] = React.useState( null );

  const history = useHistory();


  const makeAccomplishmentAvailable = () => {
  setAccomplishmentsAccessibleOnParent( (parentContentState) =>  { return {...parentContentState,'is_eligible_for_certificate': true } } );
  }


  React.useEffect(()=>{
    socketConnectionInit()

  },[])

  const socketConnectionInit = () => {
    socket = connectSocket();

    startExam();

    socket.on('start', (response) => {
      setQuizLength(response.quizLength);
      getNextQuestion();
  }
  )

  socket.on('question', (response) =>{
    setCurrentquestion(response);
    setisLoading(false);
  })

  socket.on('answered', (response) => {
    getNextQuestion();
  })

  socket.on('finished', (response) => {
    setQuizResult( { 'score': response.score, 'result': response.result, 'passingScore': response.passingScore } );
    if( response.result == 'passed'){
      makeAccomplishmentAvailable();
    }
    console.log(response);
  })
  }


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  const startExam = () => {
    debugger;
    const data = { 'quiz_id': quizId, 'course_id': courseId };

    socket.emit('startExam', JSON.stringify(data));

  }
  const getNextQuestion = () => {
    debugger;
    socket.emit('getQuestion', '');   
  }
  const sendAnswer = ( answer ) => {
    socket.emit('sendAnswer', { 'answer': answer});
  };

  const handleNext = () =>{
    const answer = currentQuestion.answers[ selectedAnswer ].toString();
    sendAnswer(answer);
    setselectedAnswer(null);
  };

  const handleSkip = () => {
    sendAnswer('skip');
  };

  const retakeHandler = () => {
    setisLoading(true);
    handleClose()
    setQuizResult(null);
    setCurrentquestion(null);
    socketConnectionInit();
  }
    return (

            <>
            <h6 className='Q_head'>Quiz</h6>

              
              <Box
                  sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItem: 'center',
                  }}>
                  <Box
                  className='lerner_step_st'
                  sx={{
                  maxWidth: '550px',
                  width: '100%',
                  margin: '0 auto',
                   }}>



                  </Box>
                <>
                  { isLoading ? 
                  <>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid className='w-full' container columns={{ xs: 4, sm: 8, md: 12 }}>
                    
                    
                    
                      <div className='w-full'>
                        <div className='flex justify-center items-center !w-full min-h-[500px]' style={ {'pading': '5px', 'backgroundColor': '#4285f4' }}>
                         <CircularProgress style={{ color: "white" }} />

                        </div>
                      </div>

                      </Grid>
                    </Box>
                  </>
                  : 
                  <>
                  { !quizResult ?
                    ( 
                    <>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid className='w-full' container columns={{ xs: 4, sm: 8, md: 12 }}>

                          <MobileStepper

                            variant="progress"
                            steps={quizLength}
                            position="static"
                            activeStep={ currentQuestion.currentQuestion }
                            sx={ 
                              { 'width': '100%',
                            
                              '& .MuiMobileStepper-progress':{
                                'width': '100%'
                              }
                              }
                              }
                            />
                          <h6 className='m-auto'>{ currentQuestion.currentQuestion + 1 }/{ quizLength } </h6>

                            <div className='w-full'>
                              <div className='quiz_question !w-full' style={ {'backgroundColor': '#4285f4' }}>


                                <p className='flex justify-center items-center'>
                                 {currentQuestion.question}
                                </p>

                              </div>
                              
                              <div className='quiz_btn_container'>
                                {currentQuestion.answers.map( ( answer, index ) => {
                                  return(
                                    <>
                                    <div onClick={ () => setselectedAnswer( index ) } className={ 'quiz_btn quiz_btn_pad ' + ( index == selectedAnswer ? 'activeAnswer' : '' ) } id='activeAnswer' >
                                    <span >{ index == '0' ? 'A.' : index == '1' ? 'B.' : index == '2' ? 'C.' : 'D.' }</span>
                                    <a href="#">{ answer.toString() }</a>
                                    </div>
                                    </>

                                  )
                                } )}



                              </div>  
                            </div>
                      
                          </Grid>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
    
                        <Button
                          className='nextQuiz_button'
                          onClick={handleNext}>
                          NEXT'{' '}
                          <span class='material-icons-outlined'>
                            arrow_right
                          </span>
                        </Button>
                          
                        <Button onClick={handleSkip} sx={{ mr: 1 }}>
                          SKIP{' '}
                          <span class='material-icons-outlined'>skip_next</span>
                        </Button>
                      </Box>
                    </> 
                    ) :
                    <>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid className='w-full' container columns={{ xs: 4, sm: 8, md: 12 }}>
                            
                            <div className='w-full flex flex-col items-center'>
                              <div className='flex justify-center items-center !w-full min-h-[500px] squish-y' style={ {'pading': '5px', 'backgroundColor':'#4285f4' }}>
                                 <div className='quiz_question unsquish-y'>
                                 <p className='unsquish-y'>Quiz completed</p>

                                 </div>
                              
                              </div>
                              <Button onClick={handleOpen} style={{'margin':'auto'}} sx={{ margin: 'auto' }}>
                                  See results{' '}
                                </Button>
                            </div>

                        </Grid>
                      </Box>
                      <MemberQuizModal
                      {...quizResult}
                      modalPlace={{ handleOpen, handleClose, open, setOpen, retakeHandler }}
                      />
                    </>
                  }
                  </>
                  }
              </>
              </Box>
              </>
    )

  }

export default TakingQuiz;
