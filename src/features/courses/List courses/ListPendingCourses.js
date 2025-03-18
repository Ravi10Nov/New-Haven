import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { getPublishedCourses, approveCourse, deleteCourse } from '../../../services/coursesService';
import { toast } from 'react-toastify';
import { UseSearchQuery } from 'hooks/useSearchQuery';
import { EnhancedTable } from 'components/SmartTable/SmartTable';
import { PaginationComponent } from '../components/Paginitation';
import { dayMonthYear } from 'helpers/Date';



const actions = ( {url, id, initDataCallBack} ) => {



  const handleApproveCourse = async (courseId) => {
    try{
      const response = await approveCourse( courseId );
      toast.success('Course have been approved');
      initDataCallBack();
    }catch(error){
      console.log(error);
      debugger;
      if(error.response.status == 409){
        toast.error(error.response.data.message)
     
      error.response.data.errors.forEach(errorMessage => {
        toast.error(errorMessage);
      });
      }
    }
  }

  const handleDeleteButton = async (courseId) => {
    try{

      const response = await deleteCourse(courseId);
      toast.success('course have been successfully deleted');
      await initDataCallBack();
    }catch(error){
      toast.error(error);
    }
  }
  return(
        <div className='lc_flex'>
              <Button onClick={ () => handleApproveCourse(id) } variant='contained' className='bt_success'>
              Approve
            </Button>
            <NavLink to={`${url}/courses/pending/${id}`}>
            <Button variant='contained' className='bt_success'>
              View
            </Button>
            </NavLink>
            <Button onClick={ () => handleDeleteButton(id)} variant='contained' className='bt_danger'>
              Delete
            </Button>
        </div>
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
    const response = await getPublishedCourses(search);
    debugger;
    setRows(response.data.data);
    setTotalEntries(response.data.totalCount);
    setIsLoading(false);
  } 

  const renderDate = (field, row) =>{
    return dayMonthYear(row[field]);
  }
  const renderAuthorField = (field, row)=>{
    return row['author'][field];
  }

  const testFunction = (field, row ) => {
    return row.author['last_name'] + ' ' + row.author['name'];
    ;
  }
  const headers = [
    { 'label': 'Course id', 'id': '_id', 'align': 'start'},
    { 'label': 'Course name', 'id':'name', 'align':'start'},
    { 'label': 'Course Category', 'id': 'category', 'align': 'start'},
    { 'label': 'Created Date', 'id':'createdAt','formattingCallbackV2':renderDate, 'align':'start'},
    { 'label': 'Course Last Update Date', 'id':'updatedAt','formattingCallbackV2':renderDate, 'align':'start', 'dontUseForOrder': true },
    { 'label': 'Author Email', 'id':'email','formattingCallbackV2':renderAuthorField, 'align':'start', 'dontUseForOrder': true },
    { 'label': 'Author Name', 'id':'author','formattingCallbackV2':testFunction, 'align':'start', 'dontUseForOrder': true },

  ]




  if(!isLoading) {
  return (
    <>
    <div className='container-fluid'>
    <div className='AdminDashboardContentPanel'>
      <EnhancedTable actions={(props) => actions({...props, 'initDataCallBack': initData }) } actionsAdditionalFields={['quiz']} url={url} tableName={'List Of Pending Courses'} headers={headers}  rows={rows} setOrderOnParent={ (state) => { sortingOrder(state.order); setOrderByField(state.orderBy) } } />

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