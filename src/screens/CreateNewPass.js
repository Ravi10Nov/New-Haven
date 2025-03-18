// import VisibilityIcon from '@mui/icons-material/Visibility';
// // import { VisibilityOff, Visibility } from '@material-ui/icons'
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import React, { useState } from 'react';
// import { Container, Form } from 'react-bootstrap';
// import TextInput from '../components/textInput';
// import '../css/CreateNewPass.css';
// import { Button } from '@mui/material';
// import { PasswordRounded } from '../../node_modules/@mui/icons-material/index';
// import { toast } from 'react-toastify';
// import { changePassword } from 'services/userService';
// import { useAuth } from "hooks/useAuth";

// export default function ForgotPass() {
//   const [password, setPassword] = useState();
//   const [Confpassword, setConfpassword] = useState();

//   const [PasswordShow, setPasswordShow] = useState(true);
//   const [ConfPasswordShow, setConfPasswordShow] = useState(true);
//   const { resetPassword } = useAuth();
//   const changePasswordHandle = async () =>{
//     try{
//     const response = await changePassword({oldPassword:password,newPassword:Confpassword});
//     toast.success('Password changed successfully');
//     }catch(error){
//       console.log(error);
//       if(error.response.status == 422 ){
//         toast.error(error.response.data.message);
//       }

//     }
//   }
//   return (
//     <div>
//       <Container
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'start',
//           alignItems: 'start',
          
//           marginLeft:0,
//           marginTop: 20,
//           marginBottom:20
//         }}>
//         <span id='ForgotTxt'>Password section</span>

//         <Form.Group
//           className='mb-3'
//           controlId='formBasicPassword'
//           style={{ marginTop: 20 }}
//           id='AdditionalID'>
//           <Form.Label id='ControlLabel'>Old password</Form.Label>
//           <TextInput
//             type={PasswordShow ? 'password' : 'text'}
//             InputID='fromControlInput'
//             placeholder='Enter your password.'
//             PasswordIcon={
//               PasswordShow ? <VisibilityOffIcon /> : <VisibilityIcon />
//             }
//             HideShow_Password={() => setPasswordShow(!PasswordShow)}
//             HandleChange={e => setPassword(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group
//           className='mb-3'
//           controlId='formBasicPassword'
//           id='AdditionalID'>
//           <Form.Label id='ControlLabel'>New Password</Form.Label>
//           <TextInput
//             type={ConfPasswordShow ? 'password' : 'text'}
//             InputID='fromControlInput'
//             placeholder='Confirm Password'
//             PasswordIcon={
//               ConfPasswordShow ? <VisibilityOffIcon /> : <VisibilityIcon />
//             }
//             HideShow_Password={() => setConfPasswordShow(!ConfPasswordShow)}
//             HandleChange={e => setConfpassword(e.target.value)}
//           />
//         </Form.Group>
//         <Button 
//            variant='contained'
//            onClick={changePasswordHandle}
//            style={{
//              background: `#18498B`,
//              borderRadius: '2px',
//              margin: '5px',
//            }}
//            >Change password</Button>
//       </Container>
//     </div>
//   );
// }


import axios from 'axios';
import Loader from 'components/Loader';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import forgotpass from '../assets/forgotpass.png';
import NavbarComp from '../components/navbar';
import TextInput from '../components/textInput';
import '../css/ForgotPass.css';

// import ReactCodeInput from 'react-verification-code-input';

export default function ResetPass() {

    const {verificationToken} = useParams();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const handleResetPassword = async () =>{
        try{
            // setIsLoading(true);
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password/${verificationToken}`,
                { email, password }
            );
            console.log("response",response);
            // setIsLoading(false);
            toast.success('Password reset successfull!');
        }catch(error){
            if(error.response && (error.response.status===404 || error.response.status===401)){
                toast.error("Email not valid or not authorized!");
            }
            else if(error.response && error.response.status===500){
                toast.error("Failed to reset password!");
            }
        }
    }
    if(isLoading){
      return <Loader/>
    }
    return (
        <div>
            <NavbarComp />
            <ToastContainer></ToastContainer>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
                <img src={forgotpass} style={{ maxWidth: "140px", height: 140, borderRadius: 10 }} />
                <p id="forgotPassTxt">Reset Password</p>

    
                <Form.Group className="mb-3" controlId="formBasicEmail" style={{ marginTop: 20 }} id="AdditionalID">
                    <Form.Label id="ControlLabel">Email – lowercase only</Form.Label>
                    <TextInput InputID="fromControlInput" type="email" placeholder="test@example.com" HandleChange={(e) => setEmail(e.target.value)} />

                    <Form.Label id="ControlLabel">New Password</Form.Label>
                    <TextInput InputID="fromControlInput" type="text"  HandleChange={(e) => setPassword(e.target.value)} />

                    <Form.Label id="ControlLabel">Confirm new password</Form.Label>
                    <TextInput InputID="fromControlInput" type="text" HandleChange={(e) => setConfirmPassword(e.target.value)} />


                </Form.Group>

                <Button id="SubmitBtn" style={{ background: ((re.test(email) && password!=="" && password===confirmPassword)) ? "#18498B" : "#BDBDBD" }} disabled={(re.test(email) && password!=="" && password===confirmPassword) ? false : true} onClick={handleResetPassword}>Reset</Button>
            </div>
        </div>
    )
}