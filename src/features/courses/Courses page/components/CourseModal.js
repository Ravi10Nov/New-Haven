import React, {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import { UPLOADS_PATH } from 'config/magic_constants';
import PaypalButtonWrapper from '../../../../components/paypal/PaypalButtonWrapper';
import { getUserOnCourseOperation } from 'services/coursesService';
import { getFreeCourse } from 'services/userService';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '560px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  overflow: 'scroll',
  p: 4,
};


const OPERATIONS_ENUM = { 'PRE_REQ': 'PRE_REQUISITES_NOT_DONE', 'FREE': 'GET_FOR_FREE', 'PAID': 'GET_FOR_DONATION', 'OWNED': 'OWNED' };

const StepperComponent = ({sections}) => {
 



        return (
          <Box sx={{ width: 160, maxWidth: 400 }}>
            <Stepper orientation="vertical">
              {sections.map((section, index) => (
                <Step  active = {true} key={section.id}>
                  <StepLabel>
                    {section.title}
                  </StepLabel>
                  <StepContent>
                    <Box >
                      <div>
                        { section.contents.map( ( content ) => {
                          return(
                            
                            <Typography> {content.title} </Typography>

                          )
                        })}
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
    
               </Box>
        );
              
}

export const CourseModal = ({ url,initCourseId, setSelectedCourseOnParent }  ) => {
    const [open, setOpen ] = React.useState(true);
    const [ courseId, setCourseId ] = useState(initCourseId);

    const [ description, setDescription ] = useState( null );
    const [ sections, setSections ] = useState( null );
    const [ price, setPrice ] = useState( null );
    const [ picture, setPicture ] = useState( null );
    const [ preRequisitesState, setPreRequisitesState ] = useState( null );
    const [ operation, setOperation ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( true );
    const [ paymentStatus, setPaymentStatus ] = useState( {'status':'PENDING','amount':0} );
    const history = useHistory();
    const setPaymentStatusState = (state) => {
      setPaymentStatus( state );
    }


    useEffect( () => {
      if(paymentStatus.status == 'SUCCESS' ){
        toast.success('Your parchaused course have been added to your ongoing inventory');
        history.push(`${url}/courses/take/owned`);
      }
    } ,[paymentStatus])
    const handleGettingFreeCourse = async ( courseId ) => {
      try{
        const response = await getFreeCourse( courseId );
        toast.success('The courses is added into your ongoing courses inventory');
        history.push(`${url}/courses/take/owned`);
      }catch(error){

      }
      
    }
    const initData = async (courseId) => {
      const response = await getUserOnCourseOperation(courseId);
      const operation = response.data.data.userOnCourseOperation;
      const courseDetails = response.data.data.courseDetails;
      console.log(operation);
      setOperation( operation );
      switch(operation){
        case OPERATIONS_ENUM.PRE_REQ:
          setPreRequisitesState({'done':response.data.data.donePreRequisites,'undone':response.data.data.undonePreRequisites});
          setPrice(courseDetails.price);
          setPicture(courseDetails.pictures[ 0 ].filename );
          setDescription(courseDetails.description);
          setSections(courseDetails.sections);
          break;
        case OPERATIONS_ENUM.FREE:
          setPrice(courseDetails.price);
          setPicture(courseDetails.pictures[ 0 ].filename );
          setDescription(courseDetails.description);
          setSections(courseDetails.sections);
  
          break;
        case OPERATIONS_ENUM.PAID:
          setPrice(courseDetails.price);
          setPicture(courseDetails.pictures[ 0 ].filename );
          setDescription(courseDetails.description);
          setSections(courseDetails.sections);
          break;
        case OPERATIONS_ENUM.OWNED:
          setPicture(courseDetails.pictures[ 0 ].filename );
          setDescription(courseDetails.description);
          setSections(courseDetails.sections);
          break;
        default:
          throw new Error('Expected a correct value from OPERATIONS_ENUM');
      }
      setIsLoading(false);
      debugger;
    }
    useEffect( () => {
      initData(initCourseId);
    },[])


    
    const handleClose = () => {
        setOpen(false);
        setSelectedCourseOnParent(null);
    }
    if(!isLoading){
    return(
        <>
            <Modal
              open={open}
              sx={{'overflow':'scroll'}}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
                
              <Box sx={style}>
                  
                <div>
                <img className='m-auto w-[300px]' src={`${UPLOADS_PATH}/${picture}`}></img>

    
                <div className='w-full'>

                  <div className='flex flex-row justify-between mt-10 ' >

                       
            

                    <div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Description:
                    </Typography>
              
                    <Typography id="modal-modal-description" variant="p" component="p">
                      {description}
                    </Typography>
                    </div>
                    <div>
                    <Typography id="modal-modal-contents" variant="h6" component="h2"> Course contents: </Typography>
                    <StepperComponent sections={sections} ></StepperComponent>
                    </div>
                 

        
                  </div>
                  <div className='max-w-[70%] w-[50%] mx-auto mt-4'>

{ operation !==  OPERATIONS_ENUM.OWNED ||
<Typography  id="modal-modal-title" variant="h6" component="h2">
  Price: {price}$
</Typography>
}
{ operation !== OPERATIONS_ENUM.PRE_REQ || <Typography sx={{'margin-top':10}} id="modal-modal-title" component="h3" color="red">
  You can't get this couse unless you finish all the pre-requisites
  </Typography>
}
{

  operation !== OPERATIONS_ENUM.PAID ||
  <>
    <Typography  className='text-center' id="modal-modal-title" variant="h6" component="h2">
  Price: {price}$
</Typography>
   <div className='mt-2'>
      <PaypalButtonWrapper type={'course'} id={ courseId } setPaymentStatusOnParent={setPaymentStatusState} ></PaypalButtonWrapper>
  </div> 

</>
}
{
  operation !== OPERATIONS_ENUM.FREE || <Button variant="contained" onClick={ () => handleGettingFreeCourse(courseId)}>Get course for free </Button>
}

{
  operation !== OPERATIONS_ENUM.OWNED || <Button variant="contained" onClick={()=>{ history.push(`${url}/courses/${courseId}`)}}> Continue Course  </Button>
}

</div>
                </div>
                
                
                
                {operation !== OPERATIONS_ENUM.PRE_REQ || 
                
                <>
                  <div className='flex flex-row justify-between mt-8'>

                    <div>
                <Typography  id="modal-modal-title" variant="h6" component="h2">
                  Done pre-requisites:
                </Typography>
                <ul>
                   
                {preRequisitesState.done.map((preReq) => {
                      return(<li className=' text-green-500' >{preReq.course_name}</li>)
                    })}

                </ul>
                </div>
                <div>
                <Typography  id="modal-modal-title" variant="h6" component="h2">
                  Undone pre-requisites:
                </Typography>
                <ul>
                  {preRequisitesState.undone.map((preReq) => {
                      return(<li className=' text-red-500'>{preReq.course_name}</li>)
                    })}
                </ul>
                </div>
                </div>
                </>}
                
                </div>
                
              </Box>


            </Modal>
        </>
    )
              }

}