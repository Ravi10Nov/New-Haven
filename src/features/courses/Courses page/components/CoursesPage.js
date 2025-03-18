import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'react-bootstrap';

import { useHistory } from 'react-router';
import { UPLOADS_PATH } from 'config/magic_constants';
import { CourseCard } from './CourseCard';
import { PaginationComponent } from 'features/courses/components/Paginitation';
import { getAllCategories } from 'services/categoryService';
import { Category } from '../../../../../node_modules/@mui/icons-material/index';
import { NoResultsFound } from 'components/NoResultsFound';
import { CourseModal } from './CourseModal';
import { useQuery } from '../../../../hooks/useQuery'
// should work for diffrent operations
// go for taking the course.
// go for getting the course.

const CoursePage = ( { url, coursesType, handlerFunction } ) => {
  const [ isLoading, setIsLoading ] = useState(false);
  
  const [ items, setItems ] = useState([]);
  const [ itemsCount, setItemsCount ] = useState(5);
  const [ page, setPage ] = useState(1);
  const [ totalEntries, setTotalEntries ] = useState(0);

  const [ categories, setCategories ] = useState([]);
  const [ selectedCategory, setSelectedCategory ] = useState( null );

  const [ selectedCourse, setSelectedCourse ] = useState( null );


  const history = useHistory();

  useEffect(()=>{
      const initCategory = async () => {
        const categories = await getAllCategories();
        setCategories(categories.data.data);
      }
      initCategory();
  },[])
  useEffect( () => {
    setIsLoading(true);
    setData();
    debugger;
  },[page,itemsCount,selectedCategory])

  

  const setData = async () => {
    try{
      const response = await handlerFunction(page,itemsCount,selectedCategory);
      
      setTotalEntries(response.data.totalCount);
      setItems(response.data.data);
      setIsLoading(false);
      debugger;
    }catch(error){
      console.log(error)
    }
  }


  if(!isLoading){
  return (

          <>
          <div className='dashboardContentPanel h-auto mb-5'>
                  
            <div className='container-fluid pb-5'>
              
              <div className='inner_continue_course'>
              <div className='course_title'>
                  <h3>{ coursesType } courses</h3>
                </div>

                <div className='free_logo ler_logo_box l_dflex'>
                  {categories.map( ( category ) =>{
                    return(
                      <div className={`box ${ selectedCategory === category.category_name ? '!bg-active-button !text-white' : ''}`} onClick={ () => setSelectedCategory( ( prevCategory ) => prevCategory === category.category_name ? null : category.category_name) } >
                        <h6 className={ `box_title !text-inherit` } >{ category.category_name }</h6>
                      </div>
                    )
                  } )}
                </div>


                <>

            

                { items.length > 0 ?
                <>
                <div className='continue_cards' >
                  <Row xs={1} md={3} className='g-4'>
                    {items.map( item => {
                        return(
                        <div onClick={ () => setSelectedCourse(item._id) }>
                        <CourseCard  url={url} operation={ (coursesType == 'Completed' || coursesType == 'OnGoing') ? 'show' : 'get'} courseId={item._id} courseName={item.name} courseImage={`${UPLOADS_PATH}/${item.pictures[0].filename}`}></CourseCard>
                        </div>
                        )
                    })}
                  </Row>

                </div>
                <div className='mt-10 mb-2'>
                <PaginationComponent initTotalEntries={totalEntries} initItemsPerPageCount={itemsCount} initPageNumber={1} setParamsOnParent={({page,itemsPerPageCount}) =>{setPage(page); setItemsCount(itemsPerPageCount)} } ></PaginationComponent>
                </div>
                </>
                :
                <NoResultsFound></NoResultsFound>
                 }

                </>

              </div>
            </div>
          </div>
          {!selectedCourse || <CourseModal url={url} initCourseId={ selectedCourse } setSelectedCourseOnParent={setSelectedCourse} />}
          </>

  );
  }
};

export default CoursePage;
