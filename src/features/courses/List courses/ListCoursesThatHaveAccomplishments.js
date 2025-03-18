import { Pagination } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import Header from '../../../components/header';
import BreadCrumbJs from '../../../components/BreadCrumbJs';

import '../../common/styles/ListingStyles.css';
import { TiArrowUnsorted } from "react-icons/ti";
import { getCoursesThatHaveAccoumplishments } from '../../../services/coursesService';
import { EnhancedTable } from 'components/SmartTable/SmartTable';
import { PaginationComponent } from '../components/Paginitation';
import { dayMonthYear } from 'helpers/Date';
import { UseSearchQuery } from 'hooks/useSearchQuery';



const actions = ({id,url}) => {

  return(

<NavLink to={`${url}/accoumplishments/edit/${id}`}>
<Button variant='contained' className='bt_success'>
  Edit
</Button>
</NavLink>
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
    const response = await getCoursesThatHaveAccoumplishments(search);
    debugger;
    setRows(response.data.data);
    setTotalEntries(response.data.totalCount);
    setIsLoading(false);
  } 

  const renderDate = (field, row) =>{
    return dayMonthYear(row[field]);
  }
  const renderAuthorField = (field, row)=>{
    console.log('aloTest',row, field)
    return row['author'][field];
  }
  const headers = [
    { 'label': 'Course id', 'id': '_id', 'align': 'start'},
    { 'label': 'Course name', 'id':'name', 'align':'start'},
    { 'label': 'Course Category', 'id': 'category', 'align': 'start'},

    { 'label': 'Course Created Date', 'id':'createdAt','formattingCallbackV2':renderDate, 'align':'start'},
    { 'label': 'Course Last Update Date', 'id':'updatedAt','formattingCallbackV2':renderDate, 'align':'start', 'dontUseForOrder': true },
    { 'label': 'Author Email', 'id':'email','formattingCallbackV2':renderAuthorField, 'align':'start', 'dontUseForOrder': true }

  ]




  if(!isLoading) {
  return (
    <>
    <div className='container-fluid'>
    <div className='AdminDashboardContentPanel'>
      <EnhancedTable actions={actions} url={url} tableName={'Courses that have accoumplishments'} headers={headers}  rows={rows} setOrderOnParent={ (state) => { sortingOrder(state.order); setOrderByField(state.orderBy) } } />

      <PaginationComponent  initTotalEntries={totalEntries} initItemsPerPageCount={5} initPageNumber={1} setParamsOnParent={({page,itemsPerPageCount}) =>{setPage(page); setCount(itemsPerPageCount)} } ></PaginationComponent>
    </div>
  </div>
  </>
  );
  }

                        
   
}


export default function AdminSitePages({ url }) {

  return (
    <div className='App w-100'>
      <ProductTable
        url={url}
      />
    </div>
  );
}

                         
