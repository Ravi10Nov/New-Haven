import { DownloadOutlined, Print } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ContextApi } from 'contexts/ContextProvider';
import { dayMonthYear } from 'helpers/Date';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Loader from 'components/Loader';
import { getImagePath } from 'services/imageService';
import { useAuth } from 'hooks/useAuth';
import { useParams } from 'react-router-dom';
import axios from 'config/axios';

import './CourseCertificate.css';
import { useReactToPrint } from 'react-to-print';

import backSealBuffer from 'assets/ID_CARD/Asset 5.png'
import frontSealBuffer from 'assets/ID_CARD/Asset 4.png'
import { base_front_url } from 'config/magic_constants';
// import html2pdf from 'html2pdf.js';

export const CourseCertificate = ({ url }) => {
  const { userId,courseId } = useParams();

  const componentRef = useRef();
  const backSeal = `${base_front_url}${backSealBuffer}`
  const frontSeal = `${base_front_url}${frontSealBuffer}`
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

   const [isLoading, setIsLoading ] = useState(false);
   const [avatarImage, setAvatarImage ] = useState(null);
   const [ userDetails, setUserDetails ] = useState(null);   
   const [ courseDetails, setCourseDetails ] = useState(null);   
   const [ courseResult, setCourseResults ] = useState(null);   


  const handleDownload = () => {
    // const content = componentRef.current; // The HTML element to convert to PDF

    // const pdfOptions = {
    //   margin: 10,
    //   filename: 'IDCard.pdf', // You can change the filename as needed
    //   image: { type: 'jpeg', quality: 0.98 },
    //   html2canvas: { scale: 2 },
    //   jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    // };

    // html2pdf().from(content).set(pdfOptions).outputPdf(pdf => {
    //   const blob = new Blob([pdf], { type: 'application/pdf' });
    //   const url = window.URL.createObjectURL(blob);

    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = pdfOptions.filename;
    //   document.body.appendChild(a);
    //   a.click();

    //   // Clean up
    //   window.URL.revokeObjectURL(url);
    //   document.body.removeChild(a);
    // });
  };

  const fetch = async () =>{
    setIsLoading(true);

    // Fetching user details
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/get-userprofile/${userId}`
    );
    console.log(response.data);
    setUserDetails(response.data);

    // Fetching course details
    response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/${courseId}`
    );
    console.log(response.data.course);
    setCourseDetails(response.data.course);
    
    // Fetching course result details
    response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/coursecompletion/fetch/${userId}/${courseId}`
    );
    console.log(response.data.courseCompletion);
    setCourseResults(response.data.courseCompletion);
    

    setIsLoading(false);
  }

  useEffect(()=>{
    fetch();
  },[])


  if(!isLoading){
  return (

          <div className='container-fluid'>
            <div className='bg-white px-3'>
              <div className='dashboardContentPanel h-auto'>
                <div className='id-card '>
                  <p className='a_d_title_clr'>Course Completion Certificate</p>
                </div>

                <div>
                  <hr />
                </div>

                <div>
                  <Button
                  onClick={handleDownload}
                    style={{
                      background: '#18498B',
                      borderRadius: '2px',
                      margin: '5px',
                      color: '#FFFFFF',
                    }}>
                    Download<DownloadOutlined></DownloadOutlined>
                  </Button>

                  <Button
                    onClick={handlePrint}
                    style={{
                      backgroundColor: '#34A853',
                      color: 'white',
                      borderRadius: '2px',
                      margin: '5px',
                    }}>
                    Print<Print></Print>
                  </Button>
                </div>

                <div className='mx-auto my-10 !w-[302px] !h-[510px] black-border ' ref={componentRef}>

                <div className="w-full h-[50%] flex flex-row black-border " >
                      <div class="w-[30%]   " >
                      <img src={userDetails?.image} className={"h-[45%] w-[90%] mx-auto mt-6"}></img>
                      <img src={`${backSeal}`} className={"h-[35%] w-[70%] mt-2 mx-2"}></img>

                      
                      </div>
                      <div class="w-[70%] flex flex-col" >
                        <h3 className='mt-1 text-center signature p-0 m-0' style={{'fontSize': '1.3rem'}}>Spirit of Truth</h3>
                        <h6 className='mt-1 text-center text-style font-light p-0 m-0 underline underline-offset-4' style={{'fontSize': '0.9rem'}}>Native American Church Minister</h6>
                        
                        {/* Course Certicate */}
                        <div className='ml-[15.5px] mt-1'>
                        <h6 className='mt-1 text-center text-style font-light p-0 m-0' style={{ fontSize: '0.9rem' }}>
                          This is to certify that{' '}
                          <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                            {userDetails?.firstname} {userDetails?.lastname}
                          </span>{' '}
                          has successfully completed the course titled{' '}
                          <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                            {courseDetails?.title}
                          </span>{' '}
                          passing the Course Test with a <span style={{ fontWeight: 'bold' }}>
                            {courseResult?.percentageScored}%
                          </span> score.
                        </h6>
                        {/* <h4 className=' text-start font-light text-style p-0 m-0' style={{'fontSize': '1.1rem'}}>{`${userDetails.firstname} ${userDetails.middlename} ${userDetails.lastname}`  }</h4>
                        <h4 className=' text-start font-light text-style p-0 m-0' style={{'fontSize': '1.1rem'}}>{userDetails.addressline1}</h4>

                        { !userDetails.addressline2 == <h4 className=' text-start font-light text-style p-0 m-0'   style={{'fontSize': '1.1rem'}}>{userDetails.addressline2}</h4> }

                        <h4 className=' text-start font-light text-style p-0 m-0' style={{'fontSize': '1.1rem'}}>{`${userDetails.city} ${userDetails.state}`}</h4>

                        <h4 className=' text-start font-light text-style p-0 m-0'  style={{'fontSize': '1.1rem'}}>{userDetails.zipcode}</h4> */}
                        </div>
                        {/* <h4 className=' text-center font-mono font-medium p-0 mb-0 mt-auto justify-self-end ml-24' style={{'fontSize': '0.9rem'}} >DOB:{dayMonthYear(userDetails.birthdate)}</h4> */}
                        {/* Course Certicate */}
                      </div>
                      
                    </div>
                    

                    <div className='"w-full p-1 min-h-[50%] black-border text-style font-normal text-black id-card-transform'>

                        <p style={{'fontSize':'0.79rem'}} className={'rotate m-0 p-0 text-black'}>
                        Certified Minister and Medicine Holder legally recognized as “Indian" under
                        the law and authorized to perform all religious ordinances and ceremonies pertaining to their assigned
                        calling, in conjunction with the usage of Plants, Animals, Stones, Feathers, and so forth which tenets
                        unite us on the Sacred Healing Way. Our religion is opposed
                        </p>

                      <img className={'!float-right h-[57px] w-16 !relative '} src={frontSeal}/>

                      <p  className='m-0 p-0 text-black' style={{'fontSize':'0.79rem'}}>
                      
                          to practices that have the potential to do
                          harm. As such the current practices of PCR swabs and mandated immunizations goes against our religious
                           beliefs.
                           </p>
                    </div>
                  
                    
                    
                    { // 'use that for vertical transfrmin: '
                     }
                  
                </div>


              </div>
            </div>
            </div>
          

  );
}
  else{
    return <Loader/>
  }

};

export default CourseCertificate;


