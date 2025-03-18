import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { NavLink, useHistory,useParams } from 'react-router-dom';
import Button from '@mui/material/Button';


import CourseEditor from './CourseEditor' 

import { addContent, getContent, modifyContent } from '../../../../services/coursesService';
import './CourseContentEditor.css';
import { ErrorScreen } from 'components/ErrorScreen';
import { toast } from 'react-toastify';

const youtubeRegex = new RegExp(`^(https?\:\/\/)?(www\.youtube\.com\/embed)\/.+$`);

const VideoShow = ({src}) => {
  const [srcState,setSrcState ] = useState(src);
  useEffect(()=>{setSrcState(src)},[src])

  return(
    <>
    { youtubeRegex.test(src) ? 
    <object width="100%" height="580px" data={src} title="YouTube video player" ></object> :
    <ErrorScreen width="100%" height="580px" ></ErrorScreen>
   }
  </>
  )
}

const CourseContentEditor = ({ url, parentUrl, type }) => {

  const [ crumbs, setCrumbs] = useState(['Home', 'Courses', 'Add Course']);
  const [ content, setContent ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isProcessing, setIsProcessing ] = useState(false);
  const { courseId, sectionId, contentId  } = useParams();
  const history = useHistory();
  const operationType = contentId ? 'edit' : 'add';

  useEffect(() => {
    switch(operationType){
        case 'edit':
          initData(courseId,sectionId,contentId);
          break;
        case 'add':
          setIsLoading(false);
          break;
        default:
          setIsLoading(false);  
    }
  },[operationType])
  

  const initData = async ( courseId, sectionId, contentId ) => {
      const response = await getContent( courseId ,sectionId , contentId );
      setTitle(response.data.data.title);
      setContent(response.data.data.content)
      setIsLoading(false);
  }

  const mutateContentState = (content) =>{
    setContent(content);
  }

  const validateForm = ( content, title ) => {
      let errors = []

      if(content.length === 0 ){
        errors.push('add some content');
      }

      if(title.length === 0 ){
        errors.push('add a title');
      } 

      if( type == 'video'){
        if( !youtubeRegex.test(content) ){
          errors.push('content should be a youtube video');
        }
        
      }


      return errors
  }

  const onAddEditHandler = async () => {

      const errors = validateForm( content, title );
    
      if( errors.length > 0 ) {
        for(const error of errors){
          toast.error(error);
        }
        return;
      }

      const data = { 'title': title, 'content': content, 'type': type };
      switch( operationType ) {
        case 'add':
          addContentHandler(courseId, sectionId , data)
          break;
        case 'edit':
          modifyContentHandler(courseId, sectionId, contentId, data)
          break;
        default:
          break;
      }

  }

  const addContentHandler = async ( courseId, sectionId, data ) => {
      debugger
      try {

        const response = await addContent( courseId, sectionId, data );
        
        history.goBack();

      } catch(error) {
        console.log( error )
      }

  }

  const modifyContentHandler = async ( courseId, sectionId, contentId, data ) => {
      try{

        const response = await modifyContent( courseId, sectionId, contentId, data );
        
        history.goBack();

      }catch( error ) {

        console.log( error )

      }
  }

  const selected = crumb => {
    if (crumb === 'Courses') {
      history.push('/InstructorDashboard/AddCourse');
    } else if (crumb === 'Home') {
      history.push('/InstructorDashboard');
    }
  };

  if(!isLoading){
    
  return (
  

      
          <div className='container-fluid mt-3'>

            { !(type == 'content') ||
            <>
            <div className='dashboardContentPanel h-auto'>
              <br />

              <Form className='bg-white pt-5 px-3'>
                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='formHorizontalText'>
                  <Form.Label className='course_title' column sm={2}>
                    Name :
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type='text' placeholder='Name' value={title} onChange={(event) => setTitle(event.target.value)} />
                  </Col>
                </Form.Group>
                <br />
              </Form>
            </div>

            <div className='contentPanel mt-4'>
              <br />
              <div className='welcome_text'>
                <CourseEditor initContent={content} setContentStateOnParent={mutateContentState} ></CourseEditor>
              </div>
          
              <br />
            </div>
            </>
            }

            { !(type == 'video') ||
           
            <div className='bg-white'>
              <div className='dashboardContentPanel h-auto'>
                <br />

                <Form className='m-3'>
                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='formHorizontalText'>
                    <Form.Label className='course_title' column sm={2}>
                      Material Name :
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control type='text' placeholder='Video Name' value={title} onChange={(event)=>{setTitle(event.target.value)}}/>
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='formHorizontalText'>
                    <Form.Label column sm={2}></Form.Label>
                    <Col sm={10}>
                      <div class='search_video'>
                        <i class='fa-solid fa-magnifying-glass'></i>
                          <Form.Control
                          type='text'
                          placeholder='paste a URL link.'
                          value={content}
                          onChange={(event)=> {setContent(event.target.value)} }
                          />
                      </div>
                    </Col>
                   
                   

                  </Form.Group>

                  <br />
                </Form>

                <div className='courseVideo c_v_c_width'>
                <VideoShow src={content}/>
              </div>
              </div>
            </div>
            }
          

            <div className='videoCourse_buttons my-4'>
              
                <Button onClick={onAddEditHandler}  variant='contained' className='submit_button'>
                  { contentId ? 'Edit content' : 'Add content' }
                </Button>{' '}
            
             
                <Button onClick={history.goBack} variant='contained' className='back_button'>
                  Back
                </Button>{' '}
           
            </div>
            
          </div>


    
  );
  
 
};
}
export default CourseContentEditor;
