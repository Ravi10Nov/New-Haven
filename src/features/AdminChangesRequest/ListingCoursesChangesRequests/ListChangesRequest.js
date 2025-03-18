import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import '../../common/styles/ListingStyles.css';
import { approveCourseChangeRequest, disapproveCourseChangeRequest, getCoursesChangeRequests } from '../../../services/changesService';
import { toast } from 'react-toastify';
import { UseSearchQuery } from 'hooks/useSearchQuery';
import { PaginationComponent } from 'features/courses/components/Paginitation';
import { EnhancedTable } from 'components/SmartTable/SmartTable';
import { dayMonthYear } from 'helpers/Date';



const actions = ( {url, id, initDataCallBack} ) => {

  const handleApprove = async (requestId) => {
    try{

      const response = await approveCourseChangeRequest( requestId );
      toast.success('course request change have been successfully approved');
      await initDataCallBack();

    }catch(error){
      toast.error(error);
    }
  }
  const handleDisapprove = async ( requestId ) =>{

    try{

      const response = await disapproveCourseChangeRequest( requestId );
      toast.success('course request change have been successfully dissaproved');
      await initDataCallBack();

    }catch(error){
      toast.error(error);
    }

  }




  return(
    <div className='lc_flex justify-center items-center'>
    
    <Button variant='contained' className='bt_success' onClick={()=> handleApprove(id)}> Approve </Button>

    <NavLink to={`${url}/courses/changes/${id}`}>
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
    const response = await getCoursesChangeRequests(search);
    setRows(response.data.data);
    setTotalEntries(response.data.totalCount);
    setIsLoading(false);
  } 

  const renderOldValueField = (field,row)=>{
    return row['old_values'][field] 
  }
  const renderFullName = (field,row)=>{
    return row.author.last_name + ' ' + row.author.name;
  }
  const renderAuthorField = (field,row)=>{
    return row.author[field];

  }
  const renderDate = (field,row) =>{
    return dayMonthYear(row[field]);
  }
  const headers = [
    {'label': 'User id', 'id':'_id','formattingCallbackV2':renderAuthorField, 'align':'start'},
    {'label': 'Requested Date', 'id':'createdAt', 'formattingCallbackV2': renderDate, 'align':'start'},
    {'label': 'Full Name', 'id':'full_name', 'formattingCallbackV2': renderFullName, 'align':'start'},
    {'label': 'email', 'id':'email','formattingCallbackV2':renderAuthorField ,'align':'start'},
  ]






 
  if( !isLoading )
  return (
    <div className='w-100'>


          
          
          
          <div className='container-fluid'>
            <div className='AdminDashboardContentPanel'>
              <EnhancedTable actions={(props) => actions({...props, 'initDataCallBack': initData }) }  url={url} tableName={'Course change request list'} headers={headers}  rows={rows} setOrderOnParent={ (state) => { sortingOrder(state.order); setOrderByField(state.orderBy) } } />

              <PaginationComponent  initTotalEntries={totalEntries} initItemsPerPageCount={5} initPageNumber={1} setParamsOnParent={({page,itemsPerPageCount}) =>{setPage(page); setCount(itemsPerPageCount)} } ></PaginationComponent>
            </div>
          </div>
          
    </div>
  );
};

export default UserRequestChangesList;
