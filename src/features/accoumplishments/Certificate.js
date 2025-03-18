import React, { useEffect,useState } from "react";
import mark from '../../assets/logo.png'
import { Form,Col,Row } from "react-bootstrap";
import "./certificate.scss";

export default function Certificate({certificateState, setCertificateStateOnParent, operation}) {
  debugger;
  const [ certificateTitle, setCertificateTitle ] = useState( certificateState.certificateTitle );
  const [ mainText, setMainText ] = useState(certificateState.mainText);
  const [ firstParagraph, setFirstParagraph ] = useState( certificateState.firstParagraph );
  const [ secondParagraph, setSecondParagraph ] = useState( certificateState.secondParagraph );
  const [ issuedDate, setIssuedDate ] = useState( certificateState.issuedDate );
  const [ userComposedName, setUserComposedName ] = useState( certificateState.userComposedName );
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(()=>{
    setCertificateStateOnParent({certificateTitle,mainText,firstParagraph,secondParagraph, userComposedName})
  },[certificateTitle ,mainText ,firstParagraph ,secondParagraph , userComposedName]);
  

  

  return (
    <div className="certificate">
      { operation == 'View' || <Form className='m-3'>
                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='formHorizontalText'>

                    <Form.Label  className='course_title' column sm={2}>
                      Course title:
                    </Form.Label>
                    
                    <Col sm={7} style={{ paddingLeft: 0, paddingRight: '20px' }}>
                      <Form.Control
                        type='text'
                        value={certificateTitle}
                        onChange={(event)=>{setCertificateTitle(event.target.value)}}
                        placeholder='Course title'
                      />
                    </Col>

                  </Form.Group>
                  
                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='formHorizontalText'>
                    
                    <Form.Label  className='course_title' column sm={2}>
                      Main text
                    </Form.Label>
                    <Col sm={7} style={{ paddingLeft: 0, paddingRight: '20px' }}>
                      <Form.Control
                        type='text'
                        value={mainText}
                        onChange={(event) => setMainText(event.target.value)}
                        placeholder='Main text'
                      />
                    </Col>
                  </Form.Group>





                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='floatingTextarea'>
                    <Form.Label className='course_title' column sm={2}>
                      First paragraph :
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control
                        as='textarea'
                        placeholder='First paragraph'
                        value={firstParagraph}
                        onChange={(event)=> setFirstParagraph(event.target.value)}
                        className='description_area'
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='floatingTextarea'>
                    <Form.Label className='course_title' column sm={2}>
                      Second paragraph :
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control
                        as='textarea'
                        placeholder='Second paragraphe'
                        value={secondParagraph}
                        onChange={(event)=> setSecondParagraph(event.target.value)}
                        className='description_area'
                      />
                    </Col>
                  </Form.Group>

                  <br />
      </Form>
      }         
    <div className="mt-5">
      <div className='flex flex-col justify-center items-center shadow pt-8 pb-8'>

          <img src={mark} alt="" className="w-1/6" />

        <div style={ {'width':'1320px'} } className='text-center'>
        <h1 className="pt-3 fw-bold fst-italic" style={{ fontFamily: 'Poppins, sans-serif', fontSize:'48px' }}>{certificateTitle}</h1>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize:'16px' }}>{mainText}
        </p>


        <h2 className="pt-3" style={{ fontFamily: 'Poppins, sans-serif', fontSize:'40px' }}>{userComposedName}</h2>
        <p style={{ fontFamily: 'Poppins, sans-serif',fontSize:'16px', 'overflow-wrap': 'break-word'}} >
          {firstParagraph}
        </p>

        

        <p style={{ fontFamily: 'Poppins, sans-serif',fontSize:'16px', 'overflow-wrap': 'break-word' }}>{secondParagraph}
        </p>
        </div>

        <div className='w-[1320px] flex flex-row justify-between pt-4 '>
          <div className='w-3/7 '>
            <p className="w-full text-center pt-3 signature  text-black " style={{ fontSize:'24px'}}>Man Found Standing</p>
            <hr className="w-full mx-auto" />
            <p style={{ fontFamily: 'Poppins, sans-serif'}} className="text-black">Pricipal Medicine Chief</p>
            <p className="text-black" >Man Found Standing</p>
          </div>
          <div className='w-3/7'>
            <h3 className="pt-3 text-blac" style={{ fontFamily: 'Poppins, sans-serif' }}>Effective date: {issuedDate}</h3>
            <br></br>
            <p style={{ fontFamily: 'Poppins, sans-serif' }}>Governing Laws:UDHR(United Nations<br></br> Declareation), U.S.Constitution,NAFERA(Native American<br></br>
              Free Exercise of Religion Act,1993)
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
