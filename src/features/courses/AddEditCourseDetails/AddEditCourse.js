import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';

import { NavLink, useHistory, useParams, useLocation, Switch, Route, useRouteMatch} from 'react-router-dom';
import CourseImageUpload from './CourseImageUpload/CourseImageUpload';
import { toast } from 'react-toastify';

import CourseAddEditContents from '../AddEditSectionContent/CourseAddEditContents';

import { addDraftedCourseDetails, getCourseDetails, getPreRequisitesList, modifyCourseDetails } from '../../../services/coursesService';
import { getAllCategories } from '../../../services/categoryService';

import './AddEditCourse.css';





const AddEditCourse = ({ url , operation,nestedOperation, role}) => {
  const [ imageId, setImageId ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const [ name, setName ] = useState('');
  const [ price, setPrice ] = useState(0);
  const [ category, setCategory ] = useState('');
  const [ categories, setCategories ] = useState(null);
  const [ description, setDescription ] = useState('');
  const [ preRequisites, setPreRequisites ] = useState([]);
  const [ possiblePreRequisites, setPossiblePreRequisites ] = useState([]);
  const [ selectedOptions, setSelectedOptions ] = useState([]);
  const [ isCourseDrafted, setIsCourseDrafted ] = useState();
  const [ isCoursePublished, setIsCoursePublished ] = useState();
  const history = useHistory();
  let { courseId } = useParams();
  const { path } = useRouteMatch();
  const location = useLocation();
  const detailsUrl = `${path}/details`;
  useEffect(() => {

    if(isLoading){
    initCategories();

    if( operation === 'Add' ){
      initCategories();
      initPreRequisites();
      return;
    }
    if( operation === 'Edit' || operation === 'Publish' ) {
      initData();

      return;
    }
  }
    
  },[isLoading])

  const initCategories = async () =>{
      try{
      const categoriesResponse = await getAllCategories();
      setCategories(categoriesResponse.data.data);
      }catch(error){
        console.log(error);
      }
      
  }
  const initPreRequisites = async (courseId, course_name) => {
    try{
    const prerequisitesResponse = await getPreRequisitesList(courseId, course_name);
    const possiblePreRequisitesBuffer = [];
    prerequisitesResponse.data.data.forEach( course => { possiblePreRequisitesBuffer.push(
      { value: course._id, label: course.name },
    
    )})

    setPossiblePreRequisites(possiblePreRequisitesBuffer);
    setIsLoading(false);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    console.log('new id on parent', imageId)
  },[imageId])


  const initData = async (data) => {
    let initData;
    try{
    if(! data){
    const response = await getCourseDetails(courseId );
    initData = response.data.data;
    }
    if( data ){
      initData = data;
    } 
    setName(initData.name);
    setCategory(initData.category);
    setPrice(initData.price);
    setDescription(initData.description);
    console.log('new data', initData)
    setImageId(initData.pictures[0]._id);
    setIsCourseDrafted( (initData.isPublished || initData.isChangeBlocked || initData.isLive));
    const preRequisitesBuffer = initData.pre_requisites.map( preRequisite => { return { value: preRequisite.course_id, label: preRequisite.course_name } } )
    setSelectedOptions(preRequisitesBuffer);
    console.log(preRequisitesBuffer);
    console.log('zbi');
    initCategories();
    console.log('zbi2');
    initPreRequisites(initData._id, initData.name);
    console.log('zbi3');
    setIsLoading(false);
    console.log('zbi4');
    }catch(error){
      console.log(error)
      toast.error('Course have changed status');
      history.push(`${url}/courses/owned`)
    }
  }
  const setImageIdState = (id)=> {
    setImageId(id);
  }


  const handleChange = (event) => {
    console.log(event);
    const preRequisites = []
    event.forEach( (preReq) =>  {
      preRequisites.push( { 'course_id': preReq.value } )
    });
    setPreRequisites( preRequisites );
  }
  const handleNextButton = () => {
 
      history.push(`${location.pathname}/details`);
    
  }
  const operationHandler = async () =>{
    let error = false;
    if(! (name.length > 0) ){
      toast.error('please add course name')
      error = true;
    }
    if(! (imageId.length > 0) ){
      toast.error('please add an image')
      error = true;
    }
    if(! (category.length > 0)) {
      toast.error('please add a category')
      error = true;
    }
    if(! (description.length > 0)){
      toast.error('please add a description')
      error = true;
    }
    let num = Number(price)
    if( !Number.isInteger(num) ){
      toast.error('please add a correct price')
      error = true;
    }
    
    if( !error ) {

      const data = {
            "name": name,
            "category": category,
            "description": description,
            "pictures": [imageId],
            "price": price,
            "pre_requisites":preRequisites
      }
      debugger;
      switch(operation) {
        case 'Add':
          try{
            const res = await addDraftedCourseDetails(data);
            toast.success('Course have been successfully drafted');
            toast.success('Check your drafted course list to modify and publish the course');
            history.push(`${url}/courses/drafted`);

          }catch(error){
            if(error.response.status === 422 ){
              toast.error('Name of the course is already in use');
              return;
            }
            toast.error('Server side error, please refresh');
          }
          break;
        case 'Edit':
          try{
            const res = await modifyCourseDetails(courseId,data);
            initData(res.data.data)
            toast.success('Course have been successfully modified');
          }catch(error){
            if(error.response.status === 422 ){
              toast.error('Name of the course is already in use');
              return;
            }
            toast.error('Server side error, please refresh');
          }
          break;
        case 'Publish' :
          try{

            const res = await modifyCourseDetails(courseId,data);
            initData(res.data.data)
            
            toast.success('Course have been successfully modified');
          }catch(error){
            if(error.response.status === 422 ){
              toast.error('Name of the course is already in use');
              return;
            }
            toast.error('Server side error, please refresh');
          }
          break;
        default:
          break;
      }

    }
  }
  

  if(!isLoading )
  return (
    <Switch>
      <Route path={`${detailsUrl}`}>
            <CourseAddEditContents url={url} nestedOperation={nestedOperation} role={role} operation={operation} />
      </Route>

      <Route exact path={''} >

          <div className='container-fluid mt-3'>
            <div className='bg-white'>
              <div className='dashboardContentPanel h-auto'>
                <br />
                <Form className='m-3'>
                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='formHorizontalText'>
                    <Form.Label  className='course_title' column sm={2}>
                      Course Name :
                    </Form.Label>
                    <Col sm={7} style={{ paddingLeft: 0, paddingRight: '20px' }}>
                      <Form.Control
                        value={name}
                        onChange={ (event) => setName(event.target.value)}
                        type='text'
                        placeholder='Enter Courses Name'
                      />
                    </Col>
                  </Form.Group>
                  
                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='formHorizontalText'>
                    
                    <Form.Label  className='course_title' column sm={2}>
                      Price :
                    </Form.Label>
                    <Col sm={7} style={{ paddingLeft: 0, paddingRight: '20px' }}>
                      <Form.Control
                        value={parseInt(price) || 0}
                        onChange={ (event) => setPrice(event.target.value)}
                        type='text'
                        placeholder='Enter course price'
                      />
                    </Col>
                  </Form.Group>


                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='formHorizontalText'>
                    <Form.Label className='course_title' column sm={2}>
                      Category Course :
                    </Form.Label>
                    <Col sm={7} style={{ paddingLeft: 0, paddingRight: '20px' }}>
                      <Form.Select value={category} size='md' onChange={ (event) => setCategory(event.target.value)} className='ins_select_height' defaultValue="Choose Category">

                      <option  value={''}></option>


                        {categories.map((categoryBuffer,index)=>{
                          return (<option  value={categoryBuffer.category_name}>{categoryBuffer.category_name}</option>)
                        })
                        }
                    
                      </Form.Select>
                    </Col>
                  </Form.Group>



                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='floatingTextarea'>
                    <Form.Label className='course_title' column sm={2}>
                      Descriptions :
                    </Form.Label>
                    <Col sm={7} style={{ paddingLeft: 0, paddingRight: '20px' }}>
                      <Form.Control
                        value={ description }
                        as='textarea'
                        onChange={ (event) => setDescription(event.target.value)}
                        placeholder='Describe here...'
                        className='description_area'
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='formHorizontalText'>
                    <Form.Label className='course_title' column sm={2}>
                      Picture :
                    </Form.Label>
                        <div className='!w-[360px] h-[360px]'>
                        <CourseImageUpload operation={"edit"} defaultImage={ imageId } setIdOnParent={setImageIdState}/>
                        </div>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='formHorizontalText'>
                    <Form.Label  className='course_title' column sm={2}>
                      Pre requisites:
                    </Form.Label>
                    <Col sm={7} style={{ paddingLeft: 0, paddingRight: '20px' }}>
                          <Select
                          defaultValue={selectedOptions}
                          onChange={handleChange}
                          options={possiblePreRequisites}
                          isMulti={true}
                          />
                    </Col>
                  </Form.Group>


                 

                  <br />
                </Form>
              </div>
            </div>
            <div className='addCourse_buttons my-4'>
                <>
                { ( isCourseDrafted && role != 'admin' ) ||           
                  <Button variant='primary' className='add_button' onClick={operationHandler}>
                    {operation == 'Add' ? 'Draft course' : 'Edit course' }
                  </Button>
                }

                <Button onClick={ handleNextButton } disabled={ operation == 'Add' } variant='outline' className='cancel_button'>
                  Next
                </Button>{' '}
                </>
            </div>
          </div>

    </Route>
    </Switch>
  );
};

export default AddEditCourse;
