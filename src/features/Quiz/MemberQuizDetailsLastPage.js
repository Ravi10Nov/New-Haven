import { Lock, Warning } from '@mui/icons-material';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import UserHeader from '../components/header';

const steps = ['', '', '', '', ''];

const MemberQuizDetailsLastPage = ({ url }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className='LearnerQuizDetails'>
      <div className='row'>
        <UserHeader title='Course' role='member' course={true} />
      </div>

      <div className='courseContent'>
        <div className='col-lg-8 content '>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItem: 'center',
            }}>
            <Box
              sx={{
                //   maxWidth: "375px",
                width: '100%',
                //   display: "flex",
                //   justifyContent: "center",
                //   alignItem: "center",
              }}>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton color='inherit' onClick={handleStep(index)}>
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <div>
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {/* {activeStep === 0 && <UserInfo />}
                                     {activeStep === 1 && <Spiritual />}
                                     {/* {activeStep === 0 && <LearnerQuiz />}
                                    {activeStep === 4 && <LearnerQuizLastPage />} */}

                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                      <div>
                        <div className='quiz_question'>
                          <p>
                            An interface design application that runs in the
                            browser with team-based collaborative design project
                          </p>
                        </div>

                        <div className='quiz_btn_container'>
                          <div className='quiz_btn'>
                            <span>A</span>
                            <a href='#'>True</a>
                          </div>
                          <div className='quiz_btn'>
                            <span>B</span>
                            <a href='#'>False</a>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      className='prevQuiz_button'
                      // disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}>
                      <span class='material-icons-outlined'>arrow_left</span>
                      Previous
                    </Button>
                    {/* <Box className="time_img_parent">
              <img className="time_img" src={timeImg} alt="" />
              </Box> */}

                    <Box sx={{ flex: '1 1 auto' }} />
                    {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography
                          // variant="caption"
                          sx={{
                            display: 'inline-block',
                            backgroundColor: '#18498b',
                          }}>
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button
                          className='nextQuiz_button'
                          onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1
                            ? 'Finish'
                            : 'NEXT'}{' '}
                          <span class='material-icons-outlined'>
                            arrow_right
                          </span>
                        </Button>
                      ))}
                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                      SKIP{' '}
                      <span class='material-icons-outlined'>skip_next</span>
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Box>
        </div>

        <div className='col-lg-4 sidebar'>
          <div className='sidebarBox'>
            <h3>Course content</h3>
            <h5>Introduction UI and UX Designer</h5>
            <ul>
              <li>
                sketching<br></br>
                <div>
                  <input type='checkbox'></input>
                  <span>Intro to sketching</span>
                </div>
                <input type='checkbox'></input>
                <span>Sketching UX flows</span>
                <br></br>
                <input type='checkbox'></input>
                <span>Sketching tips</span>
                <br></br>
              </li>
              <li>
                inspiration<br></br>
                <input type='checkbox'></input>
                <span>how to stay inspired</span>
                <br></br>
                <input type='checkbox'></input>
                <span>how to find inspiration online</span>
                <br></br>
              </li>
              <li>
                User flows<br></br>
                <input type='checkbox'></input>
                <span>what are user flows?</span>
                <br></br>
                <input type='checkbox'></input>
                <span>the do 's and don't 's</span>
                <br></br>
              </li>
            </ul>
            <div className='quizBox'>
              <Button>
                <Lock></Lock>Quiz
              </Button>
              <label>
                <Warning></Warning>finish the quiz to earn your certificate
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberQuizDetailsLastPage;
