import { ScoreOutlined } from '@mui/icons-material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '700px',
  maxHeight: '414px',
  width: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MemberQuizModal = props => {
  const { handleOpen, handleClose, open, setOpen, retakeHandler } = props?.modalPlace;
 
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        {/* Modal One */}

        <Fade in={open}>
          <Box sx={style}>
            <div className='QuizModalTitle'>
              <Typography
                id='transition-modal-title'
                className='QuizModal_title'
                variant='h6'
                component='h2'>
                Congratulations you have completed the quiz.
              </Typography>

              <span class='material-icons-outlined'>close</span>
            </div>

            <hr />

            <div className='QuizModalDetail'>
              <Typography
                id='transition-modal-description'
                className='QuizModal_detail'
                sx={{ mt: 2 }}>
                Passing score is { props.passingScore }%
                <br></br>
                You { props.result } the exam with a total score of : { props.score }% out of 100%
                {props.result == 'passed' ? <p className=' text-success'>accoumplishments for this course are now available</p> : '' }
              </Typography>

              <Typography
                id='transition-modal-description'
                className='QuizModal_detail quiz_progress'
                sx={{ mt: 2 }}>
                <CircularProgressbar className='progress_quiz' value={props.score} />
              </Typography>
            </div>

            <div className='QuizModalButtons'>
              <Button  onClick={()=>retakeHandler()} className='quizModal_retakeButton'>RETAKE</Button>
              <Button onClick={() => handleClose() }variant='outlined' className='quizModal_finishButton'>
                Exit
              </Button>
            </div>
          </Box>
        </Fade>

      </Modal>
    </div>
  );
};

export default MemberQuizModal;
