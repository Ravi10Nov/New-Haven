
                      

import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import '../../common/styles/ListingStyles.css';
import { approveUserChangeRequest, disapproveUserChangeRequest, getUserChangeRequests } from '../../../services/changesService';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';

import { Col, Form, Row } from 'react-bootstrap';
import { UseSearchQuery } from 'hooks/useSearchQuery';
import { PaginationComponent } from 'features/courses/components/Paginitation';
import { EnhancedTable } from 'components/SmartTable/SmartTable';
import { dayMonthYear } from 'helpers/Date';



const actions = ( {url, id, initDataCallBack} ) => {

  const handleApprove = async (id) => {
    try{

      const response = await approveUserChangeRequest( id );
      toast.success('user profile request change have been successfully approved');
      await initDataCallBack();

    }catch(error){
      toast.error(error);
    }
  }
  const handleDisapprove = async ( id ) =>{

    try{

      const response = await disapproveUserChangeRequest( id );
      toast.success('user profile change have been successfully dissaproved');
      await initDataCallBack();

    }catch(error){
      toast.error(error);
    }

  }

  return(
  <div className='lc_flex justify-center items-center'>
    
    <Button variant='contained' className='bt_success' onClick={()=> handleApprove(id)}> Approve </Button>

    <NavLink to={`${url}/users/changes/${id}`}>
    <Button variant='contained' className='bt_warning' > View </Button>
    </NavLink>

    <Button variant='contained' className='bt_danger' onClick={()=> handleDisapprove(id)} > Dissaprove </Button>

    </div>
  )
}



const UserRequestChangesList = ({ url }) => {
  const { search, bindFormValue, setOrderByField, sortingOrder, setCount, setPage } = UseSearchQuery();
  const [ isLoading, setIsLoading ] = useState(true);

  const [ rows, setRows ] = useState([]);
  

  const [ totalEntries, setTotalEntries ] = useState(0);
  

  useEffect( () => {
    if(search){
      initData();
    }
   
  },[search])


  const initData = async () => {
    const response = await getUserChangeRequests(search);
    setRows(response.data.data);
    setTotalEntries(response.data.totalCount);
    setIsLoading(false);
  } 

  const renderOldValueField = (field,row)=>{
    return row['old_values'][field] 
  }
  const renderFullName = (field,row)=>{
    return row.old_values.last_name + ' ' + `${row.old_values.middle_name || ''}` + ' ' + row.old_values.name;
  }
  const renderDate = (field,row) =>{
    return dayMonthYear(row[field]);
  }
  const headers = [
    {'label': 'User id', 'id':'_id','formattingCallbackV2': renderOldValueField, 'align':'start'},
    {'label': 'Requested Date', 'id':'createdAt', 'formattingCallbackV2': renderDate, 'align':'start'},
    {'label': 'Full Name', 'id':'full_name', 'formattingCallbackV2': renderFullName, 'align':'start'},
    {'label': 'email', 'id':'email','formattingCallbackV2':renderOldValueField ,'align':'start'},
  ]






 
  if( !isLoading )
  return (
    <div className='w-100'>


          
          
          
          <div className='container-fluid'>
            <div className='AdminDashboardContentPanel'>
              <EnhancedTable actions={(props) => actions({...props, 'initDataCallBack': initData }) }  url={url} tableName={'User profile request change list'} headers={headers}  rows={rows} setOrderOnParent={ (state) => { sortingOrder(state.order); setOrderByField(state.orderBy) } } />

              <PaginationComponent  initTotalEntries={totalEntries} initItemsPerPageCount={5} initPageNumber={1} setParamsOnParent={({page,itemsPerPageCount}) =>{setPage(page); setCount(itemsPerPageCount)} } ></PaginationComponent>
            </div>
          </div>
          
    </div>
  );
};

export default UserRequestChangesList;
