
import Pagination from "@mui/material/Pagination";
import React, { useEffect } from "react";
import mark from '../../assets/logo.png';
import TextEditor from '../../components/TextEditor/TextEditor';


import "./certificate.scss";
import "react-quill/dist/quill.core.css";
import 'react-quill/dist/quill.snow.css';

export default function Letter( { letterState, initTextEditor, operation, setLetterStateOnParent } ) {

  const [ textEditor, setTextEditor ] = React.useState(letterState.textEditor);
  const [ issuedDate, setIssuedDate ] = React.useState( letterState.issuedDate );
  const [ userComposedName, setUserComposedName ] = React.useState(letterState.userComposedName);


 

  useEffect(()=>{
    setLetterStateOnParent({'textEditor':textEditor,'issuedDate':letterState.issuedDate,'userComposedName':letterState.userComposedName});
  },[textEditor])

  return ( 
  
    <>

    { operation == 'View' || <div style={{'margin-bottom':'30px'}}>
    <TextEditor  initContent={textEditor} setContentStateOnParent={ (state) => {setTextEditor(state)}} ></TextEditor>
    </div>
    }

    <div className="flex flex-col A4 justify-start items-start" style={ { fontFamily: 'Poppins, sans-serif' }} >

      <div className='w-2/3 flex flex-row mt-6 mb-12 '>

        <img style={ {'height':'103px','margin-right':'50px'} }src={mark} alt="" />

        <div className="" >
          <h2>Spirit of Truth </h2>
          <h4>Native American Church </h4>
        </div>

      </div>
      <p className="mb-1 pb-0" >{issuedDate}</p>
      <p className="mb-1 pb-0" >Dear, {userComposedName}</p>
      <div>
      <div className="mt-1 w-full view ql-editor m-0 p-0 " style={{ fontSize:'15px'}} dangerouslySetInnerHTML={{ __html:textEditor }}>
      
      </div>
      </div>
      <div className='flex flex-row ' style={{'margin-top':'1px', 'margin-bottom': '5px', 'padding':'0px'}}>

          <div className='w-3/7 pt-1'>
            <p className="w-full text-center pt-2 mb-2 signature  text-black " style={{ fontSize:'24px'}}>Man Found Standing</p>
            
            <p className="text-black">Man Found Standing, president</p>
            <p className="text-black">Personal Telephone: 417-543-2729</p>
            <p className="text-black" >Man Found Standing</p>
          </div>

      </div>



    </div>
    </>
  );
}