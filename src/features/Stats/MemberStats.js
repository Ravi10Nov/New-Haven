
import { StatsIndicator } from 'components/StatsIndicator/StatsIndicator';
import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { getStatsForMember } from 'services/userService';

export const MemberStats = () => {

    const [isLoading, setIsLoading] = useState( true );
    const [ membersStats, setMembersStats ] = useState( false );
    useEffect(()=>{
        const initData = async () =>{
            const response = await getStatsForMember();

            setMembersStats(response.data.data);
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
              <Card.Title className='timeline_title'>{membersStats.onGoingCoursesCount}</Card.Title>
              <div className='timeline_parent'>
                <h6>Courses In Progress</h6>
                <StatsIndicator indicatorValue={membersStats.onGoingndicator}></StatsIndicator>
              </div>
            </Card.Body>
          </Card>
        </Col>
            
        <Col className='timeline_parent_col dash_card_pl'>
          <Card className='timeline_card' id='time_after'>
            <Card.Body>
              <Card.Title className='timeline_title'>{membersStats.completedCoursesCount}</Card.Title>
              <div className='timeline_parent'>
                <h6>Completed Courses</h6>
                <StatsIndicator indicatorValue={membersStats.completedIndicator}></StatsIndicator>
              </div>
            </Card.Body>
          </Card>
        </Col>
  </>
)
    }

}