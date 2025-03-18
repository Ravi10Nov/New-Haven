import AttachFileIcon from '@mui/icons-material/AttachFile';

import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from 'react';

import './MessageWindow.css';
import axios from "../../config/axios";
import CircularProgress from '@mui/material/CircularProgress';

import { ContextApi } from 'contexts/ContextProvider';
import { baseUrl, UPLOADS_PATH, UPLOADS_PATH_ATTACHMENTS } from 'config/magic_constants';
import { dayMonthYear } from 'helpers/Date';
import {UploadContextApi} from './UploadContext';
import { set } from 'date-fns/esm';
import { getOldRoomMessages } from 'services/chatService';







const uuidv4 = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const MAX_COUNT = 5;



const UploadingFile = ({bodyFormData,id,status,progress,deleteHandler}) =>{
  const [ isLoading, setIsLoading ] = useState(true);
  const [ uploadStatus, setUploadStatus ] = useState(status);
  const {dispatch, uploadedFiles} = useContext(UploadContextApi);
  const [ uploadedPourcentage, setUploadPercentage ] = useState(parseInt(progress));
  const [ fileName, setFileName ] = useState('');
  const [ imageId, setImageId ] = useState();
  useEffect(()=>{
    console.log(uploadedPourcentage);
  },[uploadedPourcentage])

  useEffect(()=>{
    console.log(bodyFormData,id,status,progress);
    for(const [key, value] of bodyFormData.entries()) {
      let val;
      if (value instanceof File) {
        val = value.name;
        setFileName(val);
      } else {
        val = value;
      }
      console.log(key + ': ' + val);
    }

    axios({
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      data: bodyFormData,
      url: "/media/attachments", // route name
      baseURL: `${baseUrl}`,
      onUploadProgress: progress => {
        const { total, loaded } = progress;
        const totalSizeInMB = total / 1000000;
        const loadedSizeInMB = loaded / 1000000;
        const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
        setUploadPercentage(uploadPercentage);
        console.log("total size in MB ==> ", totalSizeInMB);
        console.log("uploaded size in MB ==> ", loadedSizeInMB);
      },
      encType: "multipart/form-data",
    }).then( (result) => {
      setImageId(result.data.data._id);
      dispatch({ type: "SUCCESS", id:id, file_name:result.data.data.filename, file_id:result.data.data._id });
      setUploadStatus('success');
    }).catch((err) => {
      deleteButtonHandler();
      setUploadStatus('error');
    });
    
  },[])

  const removeImageFromDataBase = async (id) => {
    try{
    const res = await axios.delete(
      `/media/${id}`
    );
    }catch( error ){
      console.log(error);
    }
  }

  const deleteButtonHandler = async () => {
    try{
      try{
      if(uploadStatus == 'success'){
        await removeImageFromDataBase(imageId);
      }
      }catch(error){

      }finally{
        dispatch({ type: "DELETE", id:id});

      }

    }catch(error){
      console.log(error);
    }
  };
  
  return(
    <>
    <div className='pl-4'>
    <div className='flex flex-row items-center'>
    <CircularProgress className={'mr-2'} size="1rem"  variant="determinate" value={uploadedPourcentage} />

    <span className={`${uploadStatus == 'error' ? 'text-red-500' : uploadStatus == 'success' ? 'text-green-500' : ''}`}>{fileName}</span>
    { !(uploadStatus == 'success' || uploadStatus == 'error') || <span onClick={deleteButtonHandler} className='pl-2 hover:text-red-500 cursor-pointer' >x</span> }

    </div>
    </div>
    
   </>
  )
}


const AttachmentButton = () => {
  const {dispatch, uploadedFiles} = useContext(UploadContextApi);
  const [fileLimit, setFileLimit] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [showProgressBar, setProgressBarVisibility] = useState(false);






  const handleUploadFiles = files => {
      const uploaded = [...uploadedFiles];
      let limitExceeded = false;
      files.some((file) => {
          if (uploaded.findIndex((f) => f.name === file.name) === -1) {
              uploaded.push(file);
              if (uploaded.length === MAX_COUNT) setFileLimit(true);
              if (uploaded.length > MAX_COUNT) {
                  alert(`You can only add a maximum of ${MAX_COUNT} files`);
                  setFileLimit(false);
                  limitExceeded = true;
                  return true;
              }
          }
      })
      return limitExceeded;

  }
  
  const deleteHandler = (id) =>{
    dispatch({ type: "ADD", id:id});

  }


  
  const addFile = e => {
    e.preventDefault();
    setProgressBarVisibility(true);
    const demo = document.getElementById("demo");
    const bodyFormData = new FormData(demo);
    const uuid = uuidv4();
    const newState = [...uploadedFiles];
    dispatch({ type: "ADD", uuid:uuid, bodyFormData:bodyFormData});
  };


  const handleAddFile =  (e) => {
      const chosenFiles = Array.prototype.slice.call(e.target.files);
      if(!handleUploadFiles(chosenFiles)) addFile(e);
  }

  return(
    <>
      <div className="pb-2 w-full">
				{uploadedFiles.map(file => {
                 return(
                  <UploadingFile deleteHandler={deleteHandler} id={file.id} progress={file.progress} bodyFormData={file.formData} status={file.status} ></UploadingFile>
                 )

        })}
      </div>

    <form className='hidden' onChange={handleAddFile} id="demo">
        <input id='button' type="file" name="avatar" />
        <input type="submit" value="Submit" />
    </form>

    <label htmlFor='button'>
    <AttachFileIcon></AttachFileIcon>
    </label>
    </>
  )
}


export default function MessageWindow({receiverObject, socket, selectedUser, roomId }) {
    const [ messages, setMessages ] = useState([]);
    const [ newMessages, setNewMessages ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isLoadingNewMessages, setIsLoadingNewMessages ] = useState(false);
    const {authInfo} = useContext(ContextApi);
    const {dispatch } = useContext(UploadContextApi);
    const [isThereIsMoreMessages, setIsThereIsMoreMessages] = useState(true);
  useEffect(()=>{console.log('messages',messages)},[messages]);

  const getOldMessages = async () =>{
    setIsLoadingNewMessages(true)
    const response = await getOldRoomMessages(roomId,newMessages.length  + messages.length);
    const items  = response.data.data.items.reverse();
    setMessages((messages) => items.concat(messages));
    setIsThereIsMoreMessages( response.data.data.rest != 0);
    setIsLoadingNewMessages(false)
  }

  useEffect(()=>{
    if(socket){
    socket.on('message', async (response)=>{
      setMessages(response.messages.items.reverse());
      setIsThereIsMoreMessages(response.messages.items.length >= 10);
      setNewMessages([]);
      setIsLoading(false);
      console.log(response);
    })

    socket.on('new_message', async (response)=>{
      setNewMessages((messages) => { 
        console.log('new_message',response)
        const newMessagesBuffer = [...messages];
        newMessagesBuffer.push(response)
        return newMessagesBuffer;
      }
      );
    })

    }
  },[socket])

  useEffect(()=>{
    if(selectedUser){
      const data = {'receiverId':selectedUser }
      socket.emit('joinDiscussion',data);
      dispatch({'type':'INIT'})
      console.log('data emited');
      setIsLoading(true);
    }

  },[selectedUser])

  

  if(isLoading){
    return(
    <div className='h-[560px] flex items-center justify-center'>
    <CircularProgress disableShrink size={200}/>
    </div>
    )
  }
  if(selectedUser && !isLoading){
  return (
    <div className='messages h-full flex flex-col'>
      <div className='messageWindowHeader'>
        <img className='h-[36px] w-[36px]' src={`${UPLOADS_PATH}/${receiverObject.img}`} alt="" />
        <h5>{receiverObject.composed_name}</h5>
      </div>

      <div className='h-[580px] mt-2 flex flex-col-reverse overflow-scroll'>
      <div className=' mb-auto mt-2'>
        <div className='w-full'>
        <div style={{display: 'flex', justifyContent: 'center'}} hidden={!isLoadingNewMessages || !isThereIsMoreMessages}>
                 <CircularProgress disableShrink/>
       </div>
        <p onClick={getOldMessages} className='text-center hover:text-active-button cursor-pointer mb-2' hidden={isLoadingNewMessages || !isThereIsMoreMessages}> Show older </p>
        </div>
        <Messages messages={messages} authInfo={authInfo} receiverObject={receiverObject}></Messages>
        <Messages messages={newMessages} authInfo={authInfo} receiverObject={receiverObject}></Messages>

      </div>
      </div>


      <div className='messageWindowFooter mx-auto mt-auto !self-end w-full'>

        <SendMessageButton socket={socket} selectedUser={selectedUser}></SendMessageButton>
     
      </div>
    </div>
  
  )
  }
}

const Messages = ({messages,authInfo,receiverObject}) =>{
  return(
    <>
         {messages.map(message => {
              return(
              <React.Fragment key={message._id}>
              {message.sender_id == authInfo._id ?
              <>
              
              <div className={'myMessage mb-2'} >
              <img className='h-[36px] w-[36px]' src={`${UPLOADS_PATH}/${message.sender_id == authInfo._id ? authInfo.prof_pic.filename : receiverObject.img}`} alt="" />
              <div className={`chatting`}>
  
                  <p>
                    
                  {message.attachments.length == 0 || message.attachments.map((attachment) => {
                      return(
                        <>
                        <a href={`${UPLOADS_PATH_ATTACHMENTS}/${attachment.filename}`}>{attachment.filename}</a>
                        <br></br>
                        </>
                      )
                    })}
            
                  {message.message}
                  
                  </p>
              </div>
              <span className={`chatting_time`}>{dayMonthYear(message.createdAt)}</span>
            </div>
              </>
              :
              <>
                <div className='otherMessage  mb-2'>
                <span className={`chatting_time2`}>{dayMonthYear(message.createdAt)}</span>
                  <div className="others_chatting">
                  <div className={`chatting`}>

                    <p>
                    {message.attachments.length == 0 || message.attachments.map((attachment) => {
                      return(
                        <>
                        <a href={`${UPLOADS_PATH_ATTACHMENTS}/${attachment.filename}`}>{attachment.filename}</a>
                        <br></br>
                        </>
                      )
                    })}
                                       
                      {message.message}
                      </p>
                  </div>
                  </div>
                  <img className='h-[36px] w-[36px]' src={`${UPLOADS_PATH}/${message.sender_id == authInfo._id ? authInfo.prof_pic.filename : receiverObject.img}`} alt="" />
                </div>
              </>
              }
              </React.Fragment>
              )
          }) }
        
    </>
  )
}
const SendMessageButton = ({socket,selectedUser}) =>{
  const [ messageValue, setMessageValue ] = useState('');
  const {dispatch, uploadBuffer} = useContext(UploadContextApi);

  const handleKeyDown = event => {
  
      if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
      }
  };




  const sendMessage = () => {
    const data = {'message':messageValue, 'receiverId':selectedUser, 'attachments': uploadBuffer };
    
    socket.emit('sendMessage', data );
    dispatch({'type':'INIT'})
    setMessageValue('');
  }
  return(
  <form>
  <AttachmentButton></AttachmentButton>

  <input onKeyDown={handleKeyDown} value={messageValue} onChange={(e)=> setMessageValue(e.target.value) } className='w-[90%]' type="text" placeholder="Type a message..." />

  <Button onClick={sendMessage} variant='contained' className="send_btn">Send</Button>

</form>
  )
}