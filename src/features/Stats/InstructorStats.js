
import { StatsIndicator } from 'components/StatsIndicator/StatsIndicator';
import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { getStatsForInstructor } from 'services/userService';

export const InstructorStats = () => {

    const [isLoading, setIsLoading] = useState( true );
    const [ instructorStats, setInstructorStats ] = useState( false );
    useEffect(()=>{
        const initData = async () =>{
            const response = await getStatsForInstructor();

            setInstructorStats(response.data.data.instructorStats);
            setIsLoading(false);
        }
        initData();
    },[])
    if(!isLoading){
    return(
        <>
          <Col className='dash_card_pr'>
          <Card className='timeline_card'>
            <Card.Body>
              <Card.Title className='timeline_title'>{instructorStats.registredCount}</Card.Title>
              <div className='timeline_parent'>
                <h6>Registred Users</h6>
                <StatsIndicator indicatorValue={instructorStats.registredIndicator}></StatsIndicator>
              </div>
            </Card.Body>
          </Card>
        </Col>
            
        <Col className='timeline_parent_col dash_card_pl'>
          <Card className='timeline_card' id='time_after'>
            <Card.Body>
              <Card.Title className='timeline_title'>{instructorStats.createdCoursesCount}</Card.Title>
              <div className='timeline_parent'>
                <h6>Created Courses</h6>
                <StatsIndicator indicatorValue={instructorStats.createdCoursesIndicator}></StatsIndicator>
              </div>
            </Card.Body>
          </Card>
        </Col>
  </>
)
    }

}