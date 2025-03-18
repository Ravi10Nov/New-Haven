import { Lock, Warning } from '@mui/icons-material';
import { Button, Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useHistory, useParams } from 'react-router-dom';

import YouTube from '../components/YoutubeVideoPlayer';
import FadeInOut from '../components/FadeIn';
import Column from 'antd/lib/table/Column';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';

import { BsFillBrushFill, BsPatchPlus, BsPatchMinus, BsFillCaretRightFill} from "react-icons/bs";
import { approveCourseChangeRequest, disapproveCourseChangeRequest, getApproveCourseChangeRequest } from '../../../services/changesService';
import { UPLOADS_PATH } from 'config/magic_constants';
import { toast } from 'react-toastify';
const NormalimageAvatarContainer = ( {oldImage} ) =>{

  return(
      <div className={`ml-10 w-[290px] h-[260px]`} >


      <img height={'100%'} width={'100%'} className={' w-full h-full object-fill '} src={oldImage} alt="Extra large avatar"/>

      </div>
  )
}

const ChangeImageAvatarContainer = ( {oldImage,newImage} ) => {
  const [ isShowNewValue, setIsShowNewValue ] = React.useState( false );

  return(
      <div onMouseEnter={ () => setIsShowNewValue(true) } onMouseLeave={ () => setIsShowNewValue(false)} className={`ml-10 w-[290px] h-[260px] ${ isShowNewValue || 'shadow-lg' }`} >


      { isShowNewValue || <img height={'100%'} width={'100%'} className={' w-full h-full object-fill '} src={oldImage} alt="Extra large avatar"/>  }
      { !isShowNewValue || <img height={'100%'} width={'100%'} className={' w-full h-full object-fill '} src={newImage} alt="Extra large avatar"/>  }

      </div>
  )
  
}


const PreRequisitesRender = ( {title, pre_requisites} ) => {

  const [ selectedOptions, setSelectedOptions ] = useState(null);
  useEffect( () => {
    const preRequisitesBuffer = pre_requisites.map( preRequisite => { return { value: preRequisite.course_id, label: preRequisite.course_name } } )
    setSelectedOptions(preRequisitesBuffer);
    console.log(preRequisitesBuffer);
  },[])


  return(

    <div className='mx-6' style={{width: '300px'}}>
          <span>Old</span>
          <Select
          defaultValue={selectedOptions}
          options={selectedOptions}
          isMulti={true}
          />
    </div>
  )
}

const ChangedPreRequisitesRender = ( {title, old_pre_requisites, new_pre_requisites } ) => {

  const [ selectedOptions, setSelectedOptions ] = useState(null);
  const [ selectedOptions2, setSelectedOptions2 ] = useState(null); 
  const [isLoading, setIsLoading ] = useState(true);

  useEffect( () => {
    const preRequisitesBuffer = old_pre_requisites.map( preRequisite => { return { value: preRequisite.course_id, label: preRequisite.course_name } } )
    setSelectedOptions(preRequisitesBuffer);
    
    const preRequisitesBuffer2 = new_pre_requisites.map( preRequisite => { return { value: preRequisite.course_id, label: preRequisite.course_name } } )
    console.log(preRequisitesBuffer2);

    setSelectedOptions2(preRequisitesBuffer2); 
    setIsLoading(false);

  },[])

  if(!isLoading){
  return(
    <>
    <div className='mx-6' style={{width: '300px'}}>
          <span>Old</span>
          <Select
          defaultValue={selectedOptions}
          options={selectedOptions}

          isMulti={true}
          />

          
    </div>
        <div className='mx-6' style={{width: '300px'}}>
        <span>New</span>
        <Select
        options={selectedOptions2}
        defaultValue={selectedOptions2}
        
        isMulti={true}
        />
  </div>
  </>
  )
  }
}


const CreateUnitElements = ({container, object, style = {}, className, text='' }) => {
    let CreatedComponent;
    if(object.isModified) { 
        
        style.color = '#00a8a7';

        CreatedComponent = React.createElement(
            container,
            {style,className},
            `${text}${object.new}` 
          ) 
        return (
          <OverlayTrigger
          placement="top-start"
          delay={{ show: 250, hide: 400 }}
          overlay={ (props) => {
              return(
                  <Tooltip id="button-tooltip" {...props}>
                  old value: {object.old}
                  </Tooltip>
              )
          }}
          >
          {CreatedComponent}
          </OverlayTrigger>
        )
}else{
    CreatedComponent = React.createElement(
        container,
        style,
        `${text}${object}` 
      ) 
    return (
      <>
      {CreatedComponent}
      </>
    )
}
}

export default function Course({ url, operation }) {

  const [ isLoading, setIsLoading ] = useState(true);
  const [ currentContent, setCurrentContent ] = useState( null );
  const [ isContentDone, setIsContentDone ] = useState(false);
  const [ data, setData ] = useState(null);

  const history = useHistory();
  const { changeRequestId } = useParams();
  


  useEffect(()=>{
    initData()
  },[])
  useEffect(() =>{
    if(data){
      console.log(data.sections[0]);
      setContent( data.sections[ 0 ]._id, data.sections[ 0 ].contents[ 0 ].id );;
    }
  },[data])
  const initData = async () => {
    try{
    const response = await getApproveCourseChangeRequest(changeRequestId);
    setData(response.data.data.new_values);
    setIsLoading(false);
    }catch(error){
      toast.warning('This request is already treated');
      history.push(`${url}/notifications`);
    }
  }

  const setContent = async (sectionId, contentId) => {
    try{
    debugger;
    const content = data.sections.filter( ( section ) => {
      debugger;
      return section._id.toString() == sectionId 
    }
    )[ 0 ].contents.filter( ( content ) => {
      debugger;
      return content._id.toString() == contentId;
    })[ 0 ];
    debugger;
    setCurrentContent(content);
    setIsContentDone(false);
    }catch(error){
      throw (error)
    }
  }
  

  const handleContentClick = async (sectionId,contentId) => {
    try{
      debugger;
      await setContent(sectionId,contentId);

    }catch(error){
      console.log(error)
    }
  }

  const handleQuizButton = () => {
    switch (operation){
      case 'consume':
        console.log("consume");
        break;
      case 'view':
        console.log("view");
        break;  
      default:
        break;
    }
  }

  const handleVideoEnd = (isEnded) => {
    setIsContentDone(true);
  }

  const handleFinishButton = () => {
    setIsContentDone(true);
  }
  const handleApprove = async () => {
    try{
      console.log(changeRequestId);
      const response = await approveCourseChangeRequest(changeRequestId);
      toast.success('course request change have been successfully approved');
      history.push(`${url}/courses/changes`);

    }catch(error){
      toast.error(error);
    }
  }
  const handleDisapprove = async (  ) =>{

    try{

      const response = await disapproveCourseChangeRequest(changeRequestId);
      toast.success('course request change have been successfully dissaproved');
      history.push(`${url}/courses/changes`);

    }catch(error){
      toast.error(error);
    }

  }

  console.log('re-rendred');
  if(!isLoading){
    return (

      <div className='container-fluid'>
      <div className='dashboardContentPanel h-auto'>
        <div className='courseContent c_bg_all row'>
          
          <div className='col-lg-9 mt-2 ' >
            <div className=' content relative min-h-[300px]'>
            <CreateUnitElements container={'h5'} object={ currentContent.title }></CreateUnitElements> 

              { !(currentContent.type == 'video') ||

              <>
              
              { currentContent.content.isModified ? 

              <>
              <div>
                <h3>Old content :</h3>
              <div id='player' className='courseVideo'>

                {isContentDone || <YouTube YTid={currentContent.content.old.split('/')[ 4 ]} height='480' width='100%' onStateChange={handleVideoEnd}></YouTube>}
                <FadeInOut show={isContentDone} duration={250}>
                  <img height='480px' width='100%' style={{width:'100%',height:'480px','object-fit':'scale-down'}} src={require('./../../../assets/welldone.png')} alt="well done">

                  </img>
                </FadeInOut>

                <h3>New content :</h3>
                {isContentDone || <YouTube YTid={currentContent.content.new.split('/')[ 4 ]} height='480' width='100%' onStateChange={handleVideoEnd}></YouTube>}
                <FadeInOut show={isContentDone} duration={250}>
                  <img height='480px' width='100%' style={{width:'100%',height:'480px','object-fit':'scale-down'}} src={require('./../../../assets/welldone.png')} alt="well done">

                  </img>
                </FadeInOut>

              </div>
              </div>
              </>
  
              :
              <div id='player' className='courseVideo'>

                {isContentDone || <YouTube YTid={currentContent.content.split('/')[ 4 ]} height='480' width='100%' onStateChange={handleVideoEnd}></YouTube>}
                <FadeInOut show={isContentDone} duration={250}>
                  <img height='480px' width='100%' style={{width:'100%',height:'480px','object-fit':'scale-down'}} src={require('./../../../assets/welldone.png')} alt="well done">

                  </img>
                </FadeInOut>

              </div>
              }     
              </>
            }

            { !(currentContent.type == 'content') ||
              
              <>
              { currentContent.content.isModified ? 
                  <>
                  <div>
                    <h5>Old content :</h5>
                                
                   <div dangerouslySetInnerHTML={ {__html: currentContent.content.old } } className='pArea'>
                                
                   </div>
                   <div className='flex flex-col w-full absolute bottom-0 mb-8'>
                   <Button type="button" class={'justify-self-center align-self-center btn btn-primary w-1/12'} disabled={isContentDone} onClick={ handleFinishButton }> { isContentDone ? 'finished' : 'finish' } </Button>
                   </div>
                                
                   <h5>New content :</h5>
                                
                   <div dangerouslySetInnerHTML={ {__html: currentContent.content.new } } className='pArea'>
                                
                   </div>
                   <div className='flex flex-col w-full absolute bottom-0 mb-8'>
                   <Button type="button" class={'justify-self-center align-self-center btn btn-primary w-1/12'} disabled={isContentDone} onClick={ handleFinishButton }> { isContentDone ? 'finished' : 'finish' } </Button>
                   </div>
                                
                  </div>
                  </>
                  :
                  <>
                   <div dangerouslySetInnerHTML={ {__html: currentContent.content } } className='pArea'>

                   </div>
                   <div className='flex flex-col w-full absolute bottom-0 mb-8'>
                   <Button type="button" class={'justify-self-center align-self-center btn btn-primary w-1/12'} disabled={isContentDone} onClick={ handleFinishButton }> { isContentDone ? 'finished' : 'finish' } </Button>
                   </div>
                  </>
              }
              </>
 
              }
            
              
            </div>

            <div className='content flex flex-col '>
              
              <h3 className='pt-5'>Course details </h3>


                <div className='flex flex-row  items-center'>
                <h5>Description : </h5>
                <span> &nbsp; </span>
                <CreateUnitElements container={'h5'} object={data.description}></CreateUnitElements>
                </div>

                <div className='flex flex-row  items-center'>
                <h5>Price : </h5>
                <span> &nbsp; </span>
                <CreateUnitElements container={'h5'} object={data.price}></CreateUnitElements>
                </div>

                <div className='flex flex-row  items-center'>
                <h5>Category : </h5>
                <span> &nbsp; </span>
                <CreateUnitElements container={'h5'} object={data.price}></CreateUnitElements>
                </div>

                <div className=''>
                <h5>Picture: </h5>
              
                {data.pictures.isModified ? 
                  <>
                   
                    <ChangeImageAvatarContainer oldImage={`${UPLOADS_PATH}/${data.pictures.old[0].filename}`} newImage={`${UPLOADS_PATH}/${data.pictures.new[0].filename}`}></ChangeImageAvatarContainer>
                  </>
                :
                    <NormalimageAvatarContainer oldImage={`${UPLOADS_PATH}/${data.pictures[0].filename}`}></NormalimageAvatarContainer>
              }
                  
                </div>

                <div className=''>
                <h5>pre requisites: </h5>
                {data['pre_requisites'].isModified ? 
                
                  <>
                    <span> &nbsp; </span>
                <ChangedPreRequisitesRender old_pre_requisites={data['pre_requisites'].old} new_pre_requisites={data['pre_requisites'].new}></ChangedPreRequisitesRender>
                    </>
                  :
                  <>
                  <span> &nbsp; </span>
                  <PreRequisitesRender pre_requisites={data['pre_requisites']}></PreRequisitesRender>
                  </>
                }
                </div>
                
                <div className='w-full flex-row items-center justify-center my-4'>
         <Button className="!mr-2" onClick={handleApprove} variant="contained" color="info">
          Approve
        </Button>
        <Button onClick={handleDisapprove} variant="contained" color="warning">
          Disapprove
        </Button>
        </div>
              
            </div>
            
          </div>

          <div className='col-lg-3 sidebar ms-0 ' style={{'height':'100% !important' , 'max-height':'100% !important'}} >
            <div className='sidebarBox' style={{'height':'100% !important' , 'max-height':'100% !important'}}>
              <h3>Course Content</h3>
              <CreateUnitElements container={'h5'} object={data.name}></CreateUnitElements>

             
              
              
              
              
              <ul>
                {data['sections'].map( (section) => { return(
                    <li key={section._id}>


                    <div className='side_list_head' style={ {'color': ( section.operation && section.operation == 'modified' ) ? '#00a8a7' : ( section.operation == 'deleted') ? '#ff726f ' : (section.operation == 'added') ? '#00bb0d' : ''  } } >

                    <CreateUnitElements container={'span'} object={ section.title } text={'● '}></CreateUnitElements> 
                    
                    </div>

                    { section.contents.map(content => {
                        return(
                        <>
                       
                        <button onClick={() => handleContentClick(section._id,content._id )}>
                        <div className='flex flex-row ml-4 mt-2 items-center justify-center' style={ {'color': ( content.operation && content.operation == 'modified' ) ? '#00a8a7' : ( content.operation == 'deleted') ? '#ff726f ' : (content.operation == 'added') ? '#00bb0d' : <BsFillCaretRightFill className=' mr-2'></BsFillCaretRightFill>  } } >
                          
                          { (content.operation && content.operation == 'modified' ) ? <BsFillBrushFill className=' mr-2'></BsFillBrushFill> : ( content.operation == 'deleted') ? <BsPatchMinus className=' mr-2' ></BsPatchMinus> : (content.operation == 'added') ? <BsPatchPlus className=' mr-2' > </BsPatchPlus> : <BsFillCaretRightFill className=' mr-2'></BsFillCaretRightFill>} 

                          <CreateUnitElements container={'span'} object={ content.title }></CreateUnitElements> 
                          <br></br>
                        </div>
                        </button>
                        <br></br>
                        </>
                        )
                    }
                    )
                        
                }

                  </li>
                ) 
              })}
       
              </ul>
            
              

              
            </div>
          </div>

         </div>
    
        <div className='courseContent c_bg_all row'>
            
        </div>
      </div>
      </div>


    );
  }
}


