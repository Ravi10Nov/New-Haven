
import Button from '@mui/material/Button';
import { EnhancedTable } from 'components/SmartTable/SmartTable';
import { PaginationComponent } from 'features/courses/components/Paginitation';
import { InstructorStats } from 'features/Stats/InstructorStats';
import { MemberStats } from 'features/Stats/MemberStats';
import { timeSince } from 'helpers/Date';
import { UseSearchQuery } from 'hooks/useSearchQuery';
import  React,{ useState, useEffect} from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { getEnrolledMembersForInstructor } from 'services/userService';
import './DashboardInstructor.css';


const actions = ( {url, id, learner_object} ) => {
  console.log(learner_object);
  return(
  <div className='lc_flex justify-center items-center'>
  <NavLink to={`${url}/users/${learner_object._id}`}>
  <Button variant='contained' className='bt_info'>
    Details
  </Button>
  </NavLink>
</div>
  )
}


const EnrolledMembersTable = ({ url }) => {
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
    const response = await getEnrolledMembersForInstructor(search);
    debugger;
    setRows(response.data.data);
    setTotalEntries(response.data.totalCount);
    setIsLoading(false);
  } 


  const renderLearnerField = (field, row) =>{
    if(field == 'status'){
      return row['learner_object'][field] ? 'Active' : 'InActive'
    }
    if( field == 'last_logout_date' ){
      return row['learner_object'][field] ? timeSince(row['learner_object'][field]) : 'Currently active'
    }
    return row['learner_object'][field];
  }

  const renderCourseField = (field, row) =>{
    return row['course_object'][field];
  }


  const headers = [

    // learner_object
    {'label': 'Course Name', 'id':'name', 'formattingCallbackV2':renderCourseField , 'align':'start'},

    {'label': 'Name', 'id':'last_name', 'formattingCallbackV2':renderLearnerField, 'align':'start'},
    {'label': 'Email', 'id':'email', 'formattingCallbackV2':renderLearnerField, 'align':'start'},
    {'label': 'User Type', 'formattingCallbackV2':renderLearnerField, 'id': 'role' },

    // object direcly
    {'label': 'Donation', 'id': 'amount' },

    // learner_object
    {'label': 'Last Active Date', 'id': 'last_logout_date', 'formattingCallbackV2':renderLearnerField },
    {'label': 'Status', 'id': 'status',  'formattingCallbackV2':renderLearnerField  },


  ]


 





 
  if( !isLoading )
  return (
    <div className='w-100'>
 
 
          
          <div className='container-fluid'>
            <div className='AdminDashboardContentPanel'>
              <EnhancedTable actions={actions} actionsAdditionalFields={['learner_object']} url={url} headers={headers}  rows={rows} setOrderOnParent={ (state) => { sortingOrder(state.order); setOrderByField(state.orderBy) } } />

              <PaginationComponent  initTotalEntries={totalEntries} initItemsPerPageCount={5} initPageNumber={1} setParamsOnParent={({page,itemsPerPageCount}) =>{setPage(page); setCount(itemsPerPageCount)} } ></PaginationComponent>
            </div>
          </div>
    </div>
  );
};


const DashboardInstructor = ({ url }) => {

  return (

      <>
        <div className='dashboardContentPanel h-auto'>
          <Row
            xs={1}
            md={4}
            className='gx-5 gy-3'
            style={{ marginTop: '26px', padding: '16px' }}>
           <InstructorStats></InstructorStats>
           <MemberStats></MemberStats>
  
          </Row>
        </div>

        <div className='donationHistorycontentPanel mx-3  mb-5'>
          <div className='content_title'>
            <h5>Enrolled Member</h5>
          </div>
          <EnrolledMembersTable url={url}></EnrolledMembersTable>

        </div>
        </>
  );



};

export default DashboardInstructor;
