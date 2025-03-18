import { Pagination } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import Header from '../../../components/header';
import BreadCrumbJs from '../../../components/BreadCrumbJs';

import '../../common/styles/ListingStyles.css';
import { TiArrowUnsorted } from "react-icons/ti";
import { getDraftedCourses, deleteCourse } from '../../../services/coursesService';
import { toast } from 'react-toastify';
import { UseSearchQuery } from 'hooks/useSearchQuery';
import { EnhancedTable } from 'components/SmartTable/SmartTable';
import { PaginationComponent } from '../components/Paginitation';
import { dayMonthYear } from 'helpers/Date';



const actions = ( {url, id} ) => {


  const handleDeleteButton = async (courseId) => {
    try{

      const response = await deleteCourse(courseId);
      toast.success('course have been successfully deleted');
    }catch(error){
      toast.error(error);
    }
  }

  return(
    <>
    <div className='flex items-center justify-center'>
        <NavLink to={`${url}/courses/drafted/${id}`}> 
      <Button  variant='contained' className='bt_success mx-2'>
        Edit
      </Button>
      </NavLink>
      <Button onClick={ () => handleDeleteButton(id) } variant='contained' className='bt_danger mx-2'>
        Delete
      </Button>
      </div>
    </>
    
  )
}

const ProductTable = ({url}) => {

  const { search, bindFormValue, setOrderByField, sortingOrder, setCount, setPage } = UseSearchQuery();
  const [ orderObject, setOrderObject ] = useState( {'order': null, 'orderBy': null })
  const [ isLoading, setIsLoading ] = useState(true);

  const [ rows, setRows ] = useState([]);
  

  const [ totalEntries, setTotalEntries ] = useState(0);
  

  useEffect( () => {
    if(search){
      initData();
    }
   
  },[search])


  const initData = async () => {
    const response = await getDraftedCourses(search);
    debugger;
    setRows(response.data.data);
    setTotalEntries(response.data.totalCount);
    setIsLoading(false);
  } 

  const renderCourseStatus = (field, row) =>{
    return !row[ 'isPublished' ] ? 'Course is drafted' : 'Waiting  for admin approval to go live';
  }
  const headers = [
    {'label': 'Course Name', 'id':'name', 'align':'start'},
    { 'label': 'Course Category', 'id': 'category', 'align': 'start'},
    {'label': 'Course Created At', 'id':'createdAt', 'formattingCallback':dayMonthYear, 'align':'start'},
    {'label': 'Course Last Updated At', 'id':'updatedAt', 'formattingCallback':dayMonthYear, 'align':'start'},
    {'label': 'Course Status', 'id':'updatedAt', 'formattingCallbackV2':renderCourseStatus, 'align':'start'},


  ]




  if(!isLoading) {
  return (
    <>
    <div className='container-fluid'>
    <div className='AdminDashboardContentPanel'>
      <EnhancedTable actions={actions} url={url} tableName={'Drafted Courses'} headers={headers}  rows={rows} setOrderOnParent={ (state) => { sortingOrder(state.order); setOrderByField(state.orderBy) } } />

      <PaginationComponent  initTotalEntries={totalEntries} initItemsPerPageCount={5} initPageNumber={1} setParamsOnParent={({page,itemsPerPageCount}) =>{setPage(page); setCount(itemsPerPageCount)} } ></PaginationComponent>
    </div>
  </div>
  </>
  );
  }
};


export default function AdminSitePages({ url }) {

  return (
    <div className='App w-100'>
      <ProductTable
        url={url}
      />
    </div>
  );
}