import React, { useEffect, useState } from 'react';
import { Card, Col, Form, NavDropdown, Row, Button, Modal } from 'react-bootstrap';
import { NavLink, Switch, useHistory, useParams, Route, useRouteMatch, useLocation } from 'react-router-dom';
import {toast} from 'react-toastify';

import CourseContentEditor from '../AddEditSectionContent/CourseContentEditor/CourseContentEditor';


import { getImagePath } from '../../../services/imageService';
import { addSection, getCourseDetails,deleteSection, modifySection, deleteContent, publishCourse, validateCourseEditing } from '../../../services/coursesService';
import './CourseAddEditContents.css';


const Content = ({title, type, content, courseId, sectionId, contentId, onDeleteContent, parentUrl }) => {
  const [contentManipulation, setContentManipulation] = useState(false);
  const contentModifyingUrl = `${parentUrl}/sections/${ sectionId }/content/coursetexteditor/${contentId}`
  const videoModifyingUrl = `${parentUrl}/sections/${ sectionId }/content/coursevideoeditor/${contentId}`
  const modifyingUrl = (type === 'content') ? contentModifyingUrl : videoModifyingUrl;
 
  const onDeleteHandler = async () => {
    try{

        const response = await deleteContent(courseId,sectionId,contentId);
        onDeleteContent(contentId);
        
    } catch( error ) {
        console.log(error)
    }
  }

  return(
    <>

        <div className='pl-12 pt-2'>
        
        { !(type == 'content') ||
        <div className='dVideo' style={{ cursor: 'pointer' }} onClick={() => setContentManipulation(prevState => !prevState)}
        >
          
          <div>
          
            <p className='v_btn_al'>
              <span class='material-icons-outlined'>
                content_paste
              </span>{' '}
              {title}
            </p>
          
          </div>
        </div>
        }
        {!(type == 'video') ||
        <div
          className='dVideo d_changeName'
          style={{ cursor: 'pointer' }}
          onClick={() => setContentManipulation(prevState => !prevState)}
          >
          
              <p className='v_btn_al' >
              <span class='material-icons-outlined'>
                play_circle_filled
              </span>{' '}
              <span className='u_line'>{title}</span> </p>
          
        </div>
        }
        {contentManipulation ? 
      
        <div className='d_changeName c_c_hov_ac'>
              

                <NavLink to={modifyingUrl}>
                <p>Edit</p>
                </NavLink>
              

              <span>|</span>

              <p onClick={ onDeleteHandler } className='text-danger' >Delete</p>
              
              </div> : null}

              </div>  
              

    </>                
    )
   
}

const SectionModal = ( {title, sectionId, courseId, showModal, onClose, onChange, onAdd } ) => {
  const [ show, setShow ] = useState(null);
  const [ sectionTitle, setSectionTitle ] = useState(title ? title : '');

  const handleClose = () => { 
    onClose(false); 
    setShow(false);
  }
  const handleShow = () => setShow(true);
  
  useEffect(()=>{
    setShow(showModal);
  },[showModal])

  
  const handleEditAddButton = async () => {
    
      try{
        if(!sectionId){
          const response = await addSection( courseId, {'title':sectionTitle} );
        
          onAdd(response.data.data);
          handleClose()
        }else{
       
          const response = await modifySection(courseId,sectionId,{'title':sectionTitle})
          onChange(response.data.data);
          handleClose();
        }
      }catch(error){
        console.log(error)
      }
    
  }
  return (
    <>
      <Modal centered={true} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{ (sectionId ? 'Editing section' : 'Adding section') }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Section title</Form.Label>
              <Form.Control
                type="Section title"
                placeholder={ "Section title" }
                onChange = {( event )=> setSectionTitle(event.target.value) }
                value={ (sectionTitle) }
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={sectionTitle.length == 0 } variant="primary" onClick={handleEditAddButton}>
          { (sectionId ? 'Edit section' : 'Add section') }
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

const Section = ({ title, id, onDelete, onChange, url, courseId, contentsInit, parentUrl }) => {
  const [ sectionTitle, setSectionTitle ] = useState(title);
  const [ sectionId, setSectionId ] = useState(id);

  const [ showSectionManipulation, setShowSectionManipulation] = useState(false);
  
  const [ showSectionModal, setShowSectionModal ] = useState(false);

  const [contents, setContents] = useState(contentsInit);


  useEffect(()=>{
    setSectionTitle(title)
    setSectionId(id)
  },[title,id])

  const handleCloseModal = (modalState) => {
    setShowSectionModal(modalState)
  }

  const mutateSectionStateChange = (section) => {
    
    onChange(section)
  }

  const handleDeleteSection = async() => {
      try{
   
      await deleteSection(courseId,id);
    
      onDelete(id)
      }catch(error){
    
        console.log(error);
      }
  }
  
  const mutateContentStateDelete = (contentId) => {
      
      let array = [...contents];
      let index = array.findIndex(element => element._id == contentId);

      if (index !== -1) {
          array.splice(index, 1);
          setContents(array);
      }
  }

  return(
    <Card.Text>
    <div className=''>
      
      <div className='d_dflex'>

      <ul className='plr c_c_hov'>
        <li onClick={() => {setShowSectionManipulation(prevState => !prevState)}} className='uDfont unline '>{sectionTitle}</li>
      </ul>

      {showSectionManipulation ? 
      <>
      <SectionModal showModal={showSectionModal} onClose={handleCloseModal} onChange={mutateSectionStateChange} title={title} sectionId={id} courseId={courseId} ></SectionModal>
      <div className='d_changeName c_c_hov_ac'>
          <div style={{'height':'24px'}}>
          <NavDropdown title={'Add material'} height style={{'padding':'0px !important','margin':'0px !important','max-height':'24px !important'}}>
              <div className="uxuiDropdown_menuContent">

                    <NavLink to={`${parentUrl}/sections/${id}/content/coursevideoeditor`} >
                      <h6 className="c_c_pointer" >
                        <span class='material-icons-outlined px-2'>
                          play_circle_filled
                        </span>
                        <span>Video</span>
                      </h6>
                    </NavLink>

                    <NavLink to={`${parentUrl}/sections/${id}/content/coursetexteditor`} >
                      <h6 className="c_c_pointer" >
                          <span class='material-icons-outlined px-2'>
                            content_paste
                          </span>
                          <span>Content</span>
                      </h6>
                    </NavLink>

              </div>
          </NavDropdown>
          </div>

        <span>-</span>
       
        <p onClick={() => setShowSectionModal(true)}>Edit Modal</p>
      
        <span>-</span>
        
        <p className='text-danger' onClick={handleDeleteSection} >Delete</p>
        
      </div>
      </>
       : null}
      </div>
    {contents.map(content => 
      <Content onDeleteContent={mutateContentStateDelete} contentId={content._id} content={ content.content } title={content.title} type={content.type} courseId={courseId} sectionId={ id } parentUrl={`${parentUrl}`} ></Content>
    )}
    
    </div>
      
  </Card.Text>
  )
}

const CourseEditor = ({url, role, operation,nestedOperation}) => {

      const [courseData, setCourseData ] = useState(null);
      const [isShowSectionModal, setIsShowSectionModal ] = useState(false);
      const [imagePath,setImagePath ] = useState(null);
      const [crumbs, setCrumbs] = useState(['Home', 'Courses', 'Add Course']);
      const [sections,setSections] = useState([]);
      const [isLoading,setIsLoading] = useState(true);

      const history = useHistory();
      const { pathname } = useLocation();
      const { courseId, originalCourseId } = useParams();
      console.log("TEST");

      const mutateSectionStateAdd = (section) => {
       
        setSections(prevState => [...prevState,section])
      }
      
      const mutateSectionStateDelete = (id) => {
      
        let array = [...sections];
        let index = array.findIndex(element => element._id == id)
        if (index !== -1) {
        array.splice(index, 1);
        setSections(array);
        }
      }

      const mutateSectionStateChange = (section) =>{
      
        const newSections = sections.map(originalSection => { 
          if(originalSection._id === section._id){
            return {originalSection,...section};
          }
          return originalSection})
        setSections(newSections)  
      }
      
      const initData = async(courseId) => {
        try {
          const response = await getCourseDetails(courseId);
          const imagePath = await getImagePath( response.data.data.pictures[0][ '_id' ] );
          setCourseData(response.data.data);
          setImagePath(imagePath ? imagePath : '');
          setSections(response.data.data.sections)
          setIsLoading(false);
        }catch(error){
          console.log(error);
        }
      }
      
      const selected = crumb => {
        if (crumb === 'Courses') {
          history.push('/InstructorDashboard/AddCourse');
        } else if (crumb === 'Home') {
          history.push('/InstructorDashboard');
        }
      };
      
      const handleCloseModal = (modalStat)=>{
        setIsShowSectionModal(modalStat)
      }
      const handleRequestChangeButton = async (originalCourseId) => {
        try{
          const response = await validateCourseEditing(originalCourseId);
          toast.success('Course request change have been sent');
          history.push(`${url}/courses/owned`)
          
          initData(courseId)
        }catch(error){
          console.log(error);
          if(error.response.status == 409 ){
            toast.error(error.response.data.message)
            return
          }
          for(const errorMessage of error.response.data.errors ){
            toast.error(errorMessage);
          };
        }
      }
      const handlePublishButton = async (courseId) => {
        try{
          let response;
        switch(role){
          case 'admin':
            try{
            response = await publishCourse(courseId);
            toast.success('course is live');
            history.push(`${url}/courses/owned`);
            
            }catch( error ){
              if(error.response.status == 409 ){
                toast.error(error.response.data.message)
              }
              error.response.data.errors.forEach((error)=>{
                toast.error(error);
              })
            } finally { 
              break;
            }
            
          case 'instructor':
            try{
              response = await publishCourse(courseId);
              toast.success('course been published');
              history.push(`${url}/courses/drafted`);
              
              }catch( error ){
            
              toast.error(error.response.data.message);
              error.response.data.errors.forEach((error)=>{
                toast.error(error);
              })
              } finally { 
                break;
              }
          default:
            console.error('No operation been specified');
        }
        }catch(error){
          toast.error(error.response.data.message)
        }
      }

      useEffect(()=>{
        try{
          if(courseId && isLoading){
            initData(courseId);
          }
        }catch(error){
            console.log(error);
        }
      },[isLoading,courseData,courseId])

      if(!isLoading){
      return(

             <>
                        <SectionModal onAdd={mutateSectionStateAdd} courseId={courseId} showModal={isShowSectionModal} onClose={handleCloseModal}></SectionModal>
         

                                  
                            <div className='container-fluid mt-3'>
                              <div className='bg-white'>
                                <div className='dashboardContentPanel h-auto'>
                                  <div className='progress_cards'>
                                    <Row className='g-0 pb-2 min-h-[340px]'>
                                      <Col className='col-lg-4 col-sm-12 h-full'>
                                        <Card className='progress_all_card h-full'>
                                          <Card.Img className={'h-[320px] w-[520px]'} variant='top' src={imagePath} />
                                          <Card.Body className='p-4'>
                                            <Card.Title className='card_title'>
                                              {courseData.name}
                                            </Card.Title>
                                          </Card.Body>
                                        </Card>
                                      </Col>
                                      <Col className='col-lg-8 col-sm-12 min-h-[340px]'>
                                        <Card className='h-full' >
                                          <Card.Body style={{'height':'100% !important'}} >
                                            <Card.Title className=' hcard_title inOption_title'>
                                            Description
                                            </Card.Title>
                                            <Card.Text className="h-f">
                                            {courseData.description}
                                            </Card.Text>
                                          </Card.Body>
                                        </Card>
                                  
                                      </Col>
                                    </Row>
                                    <div className='row'>
                                      <div className='col-lg-12'>
                                        <div className='insOptionSelect f_dropdown'>
                                        <Button className="s_bgGreen h-auto py-2 ps-2" onClick={()=> setIsShowSectionModal(true)} >Add section</Button>
                                  
                                          <Button className="s_bgGreen h-auto py-2 ps-2" onClick={history.goBack} >Edit Course details</Button>
                                          { !(( nestedOperation === 'Edit' ) && (role === 'admin')) || <Button variant="warning" className="h-auto py-2 ps-2" onClick={() => handlePublishButton(courseData._id)} disabled>{'Since the current user is the admin all changes will be reflected immidiatly '}</Button>  }
                                          
                                          { !( ( nestedOperation === 'Add' ) ) || <Button className="s_bgDeepBlue h-auto py-2 ps-2" onClick={() => handlePublishButton(courseData._id)} disabled={ ( courseData.isPublished || courseData.isLive ) }> {( courseData.isPublished || courseData.isLive ) ? 'Course already published' : 'Publish Course'} </Button>  }
                                          { !( nestedOperation === 'Edit' && role === 'instructor') || <Button className="s_bgDeepBlue h-auto py-2 ps-2" onClick={()=>{handleRequestChangeButton(originalCourseId)}} disabled={courseData.isChangeBlocked} > {courseData.isChangeBlocked ? `a change is already requested` : 'Request chagne'}  </Button>  }

                                        </div>
                                      </div>
                                    </div>
                                    {<div className='row'>
                                      <div className='col-lg-12'>
                                        <Card.Body>
                                  
                                          <Card.Title className='card_title uDfont fw-bold mt-3'>
                                            {courseData.name}
                                          </Card.Title>
                                  
                                          <>
                                          {sections.map(section => {
                                            console.log(section)
                                            return <Section courseId={ courseId } url={url} key={section._id} contentsInit={section.contents} title={section.title} id={section._id} onDelete={mutateSectionStateDelete} onChange={mutateSectionStateChange} parentUrl={pathname} ></Section>
                                            })}
                                          </>
                                        </Card.Body>
                                      </div>
                                    </div>}
                                          
                                          
                                  </div>
                                          
                                </div>
                              </div>
                            </div>
                            </>

      )
      }
} 
const CourseAddEditContents = ({ url,role, operation,nestedOperation }) => {
  
  const { path } = useRouteMatch();

  console.log('Component did load');

  return (

        <Switch>
            <Route exact path={`${path}/sections/:sectionId/content/coursevideoeditor/:contentId?`}>
                <CourseContentEditor url={url} parentUrl={path} type='video' ></CourseContentEditor>

            </Route>

            <Route exact path={`${path}/sections/:sectionId/content/coursetexteditor/:contentId?`}>
                  <CourseContentEditor url={url} parentUrl={path} type='content' ></CourseContentEditor>
            </Route>

            <Route exact path=''>
                    <CourseEditor role={role} nestedOperation={nestedOperation} operation={operation} url={url}></CourseEditor>
            </Route>
          </Switch>
      

  );
}

export default CourseAddEditContents;
