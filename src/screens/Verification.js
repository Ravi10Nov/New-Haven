import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import '../css/Verification.css';
import { Container, Button } from 'react-bootstrap';
import NavbarComp from '../components/navbar';
import { Link, useHistory } from 'react-router-dom';
import OTPVerification from '../assets/OTPVerification.png';
import ReactCodeInput from 'react-verification-code-input';
import useTimer from '../hooks/useTimer';
import {ContextApi} from '../contexts/ContextProvider'
import { ToastContainer } from 'react-toastify';

import { getVerificationMail, verifyAccount } from '../services/userService';
import { toast } from 'react-toastify';
export default function Verification({isForNewEmail}) {

    const contextApi = useContext(ContextApi);
    
    const [verificationCode, setverificationCode] = useState(null)
    const [isSent, setIsSent] = useState(null);
    const [isProcessing, setIsProcessing ] = useState(false);
    const { setTimer, startTimer, resetTimer, stopTimer, formatedTime } = useTimer(120);
    


    const sendOtpButtonHandler = async (isResent) => {
        try{
        const activationTokenExpirationCounter = await getVerificationMail();
        toast.warning('The 6-digit verification number has been emailed.');
        if(activationTokenExpirationCounter > 0) {
            setTimer(activationTokenExpirationCounter);
        }

        switch(isResent) {
            case false:
                startTimer();
                setIsSent(true);
                break;
            case true:
                resetTimer(120);
                setIsSent(true);
                break;
          } 

        }catch(error){
            toast.warning('Could not send verification number, try again.');

        }
    }

    const nextButtonHandler = async () => {
        try{
            setIsProcessing(true);

            if(isForNewEmail){
                history.push('/Signin');
                toast.success('You new email is verified');
            }
            
            const newAccountStatus = await verifyAccount(verificationCode);
            const oldContext = contextApi.authInfo;
            console.log('old Context ', oldContext)
            contextApi.setAuthInfo(  { ...oldContext, account_status: 'active','isAuthenticated':true  })
            debugger;
            
        }catch(error){
            toast.error("Invalid Verification Code");
            setIsProcessing(false);
        }
    }
    
    useEffect(()=>{
        if(contextApi.authInfo.account_status == 'active') {
            setIsProcessing(false)
            history.push('/members')
        }

    },[contextApi])

    
    const SendOtpNumberButton = (props) => {
        const isSent = props.isSent;
        switch(isSent){
            case null:
                return <a id="ResendOTP" onClick={() =>  sendOtpButtonHandler(false) } style={{fontSize:'18'}} >Send Verification Number</a>
                break
            case true:
                let buttonStyle = { color: 'gray',  'pointer-events': 'none', fontSize:"18" };
                return <a style={buttonStyle} id="ResendOTP" >Resend Verification Number</a>
                break;
            case false:
                return <a id="ResendOTP" onClick={() => { sendOtpButtonHandler(true) } } style={{fontSize:'18'}} >Resend Verification Number</a>
                break;
        }
        
    }

    useEffect(()=>{
    
        if( formatedTime == '00:00' ){
            setIsSent(false);
            stopTimer();
        }


    },[formatedTime])
    const handleKeyBoardSubmit = (event) => {
        if (event.key === "Enter") {
            nextButtonHandler();
        }
    }
    const history = useHistory();
    return (
        <div>
            <NavbarComp />
            <ToastContainer></ToastContainer>
            <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
                <img src={OTPVerification} style={{ maxWidth: 340, height: 220, borderRadius: 20 }} alt="" />
                <p id="verificationTxt">{isForNewEmail ? 'You changed you email in your last profile change request, now you should activate the email' : 'Verification'}</p>
                <span id="OTPTxt">Click on Send Verification Number and a verification number will be sent to your email address. Make sure you check your spam folder if you don’t see the verification email.</span>
                <div id="Timer">
                    <span id="TimerTxt">{formatedTime}</span>
                </div>
                <ReactCodeInput fields={6} autoFocus={true} fieldWidth={50} fieldHeight={60} onChange={(e) => setverificationCode(e)} onKeyDown={(e) => handleKeyBoardSubmit(e)} />
                <div className={'text-xl font-semibold'} style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
                    <SendOtpNumberButton isSent={isSent} ></SendOtpNumberButton>
                </div>
                <Button id="NextBtn" onClick={ () => nextButtonHandler() } >
                    
                {isProcessing ? ( //isProcessing
                  <CircularProgress
                    style={{ height: '15px', width: '15px' }}
                    color='primary'
                  />
                ) : (
                  <span>Next</span>
                )}
                    
                    </Button>
            </Container>
        </div>
    )
}