import { DownloadOutlined } from "@mui/icons-material";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React,{ useState, useEffect } from "react";
import Certificate from "./Certificate";
import Letter from "./Letter";
import { styled } from '@mui/material/styles';
import './Tab.css'
import { getAccomplishmentsForUser } from "../../services/userService";
import { getAccomplishments, setAccoumplishments } from "../../services/coursesService";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { dayMonthYear } from "../../helpers/Date";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Input = styled('input')({
  display: 'none',
});

export default function Accoumplishments( props ) {
  const [ value, setValue ] = React.useState(0);
  const [ certificateState, setCertificateState ] = React.useState(null);
  const [ letterState, setLetterState ] = React.useState(null);
  const [ isLoading, setIsLoading  ] = React.useState(true);
  const [ operation, setOperation ] = React.useState( props.operation );
  const { courseId } = useParams();
  const history = useHistory();
  
  console.log('component mounted')
  const validateData = () => {

    let errorInletter = false;
 
    for( let key in letterState) {
      if( letterState[key].length <= 0 ){
        errorInletter = true
      };
    }
    
    let errorInCertificate = false;
    for (let key in certificateState ){
      if( certificateState[key].length <= 0 ){
        errorInCertificate = true
      };
    }
    let errors = [];

    !errorInCertificate || errors.push( 'Make sure you fill all the fields in the certificate' );
    !errorInletter || errors.push( 'Make sure you fill all the fields on the letter' );
    
    for(let error of errors) {
      toast.error(error);
    }
    return (errors.length == 0 )
  }
  
  const handleOperationButton = async () => {
    try {
      
      if( !validateData() ) {
        return;
      }
      const data = {'certificate':{'title': certificateState.certificateTitle,'mainText': certificateState.mainText,'firstParagraph': certificateState.firstParagraph , 'secondParagraph': certificateState.secondParagraph },'letter':{'textEditor': letterState.textEditor}}
      let response;

      switch(operation){
        case 'Add':
          
          response = await setAccoumplishmentsState(courseId,data);
          toast.success("Accoumplishments been added successufly");
          history.push(`${props.url}/accoumplishments/edit`);
          break;
        case 'Edit':
          response = await setAccoumplishmentsState(courseId,data);
          toast.success("Accoumplishments been modified successufly");
          history.push(`${props.url}/accoumplishments/edit`);
          break;
        
        default:
          break;    
      }
      
    }catch(error){
      console.log(error);
    }
  }
  const initDataForEdit = async () => {
    try{
    setIsLoading(true);
    const response = await getAccomplishments(courseId);
    setCertificateState( { ...response.data.data.certificate, ...{'certificateTitle':response.data.data.certificate.title, issuedDate: 'date will be injected here',userComposedName:'User name will be injected here'} } )
    setLetterState({...response.data.data.letter, ...{ issuedDate: 'date will be injected here',userComposedName:'User name will be injected here'}})
    setIsLoading(false)
    }catch(error){
      console.log(error);
    }
  }

  const initDataForView = async () => {
    try{
    setIsLoading(true);
    const response = await getAccomplishmentsForUser(courseId);
    const data = response.data.data;

    const userComposedName = `${data.name}${data.middleName && data.middleName.length > 0 ? ' ' + data.middleName + ' ' : ''}${ data[ 'spirtual_name' ] && data[ 'spirtual_name' ].length > 0 ? ` '${data[ 'spirtual_name' ]}' ` : ''}`;
    const issuedDate = dayMonthYear(data.completionDate);
    
    setCertificateState( { ...data.accoumplishments.certificate, ...{'certificateTitle':data.accoumplishments.certificate.title, issuedDate, userComposedName} } )
    setLetterState({...data.accoumplishments.letter, ...{ issuedDate , userComposedName}})
    setIsLoading(false)
    }catch(error){
      console.log(error);
    }
  }



  const setAccoumplishmentsState = async (courseId,data) => {
    return await setAccoumplishments(courseId,data);
  }


  useEffect( ()=>{
    if( operation === 'View' ) {
      initDataForView();
      return;
    };

    if(operation === 'Add') {
      setLetterState( {
        textEditor: '',
        issuedDate: 'date will be injected here',
        userComposedName:'User name will be injected here',
      }
      );
      setCertificateState(
        {
        certificateTitle:'',
        mainText:'',
        firstParagraph:'',
        secondPragraph:'',
        issuedDate:'date will be injected here',
        userComposedName:'User name will be injected here',
      });
      setIsLoading(false);
      return;
    }


    if(operation === 'Edit') {
      initDataForEdit();
      return;
    }


  },[]
  )

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  if(!isLoading){
  return (
    <div className="container-fluid mt-3 pb-5">
      <Box sx={{ width: "100%" }} className='bg-white pt-4'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', background: '#fff' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab style={{ border: "1px solid #D9D9D9", margin: '0 15px' }} label={ `${operation == 'View' ? 'Certificate' : operation == 'Add' ? 'Add Certificate' : operation == 'Edit' ? 'Edit Certificate' : 'LOL Certificate'} `  } {...a11yProps(0)} />
            <Tab style={{ border: "1px solid #D9D9D9", margin: '0 15px' }} label={`${operation == 'View' ? 'Letter' : operation == 'Add' ? 'Add Letter' : operation == 'Edit' ? 'Edit Letter' : 'LOL Letter'} ` } {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} className='ps-0 bg-white'>
     
          <Certificate certificateState={ certificateState } operation={operation} setCertificateStateOnParent={(state) => setCertificateState(state)}> </Certificate>

        </TabPanel>
        <TabPanel value={value} index={1} className='ps-0 bg-white'>

          <Letter letterState={letterState} operation={operation} setLetterStateOnParent={ (state) => setLetterState(state) }></Letter>
        </TabPanel>

        <div className="tabButton m-auto">
        <Box textAlign='center'>
                      <label htmlFor="contained-button-file" className={"m-auto"} >
              { operation === 'View' ||
              <Button variant={'contained'} component="span" className="downloadBtn" onClick={handleOperationButton}>
                {operation === 'Add' ? 'Add accomplishments' : 'Modify accomplishments'}
              </Button>
              }
                  

            </label>
            </Box>
            </div>

      </Box>
    </div >
  );
}
}
