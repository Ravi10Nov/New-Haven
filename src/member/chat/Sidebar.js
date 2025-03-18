import SearchIcon from '@mui/icons-material/Search';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { ContextApi } from 'contexts/ContextProvider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import * as React from 'react';
import {useEffect,useState, useContext, useMemo} from 'react';

import { BsCheckCircle, BsCircle } from 'react-icons/bs';
import axios from "../../config/axios";
import TextInput from '../../components/textInput';
import './sidebar.css';
import { baseUrl, UPLOADS_PATH } from 'config/magic_constants';
import { timeSince } from 'helpers/Date';

import Badge from '@mui/material/Badge';
import { getUserListForChat } from 'services/userService';
import {UploadContextForAllApi} from './UploadContextForAll';
import CircularProgress from '@mui/material/CircularProgress';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import UserList from './SidebarUserList';

const uuidv4 = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '900px',
  width: ' 100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '16px',
  p: 3,
};
const MAX_COUNT = 5;



const UploadingFile = ({bodyFormData,id,status,progress,deleteHandler}) =>{
  const [ uploadStatus, setUploadStatus ] = useState(status);
  const {dispatch } = useContext(UploadContextForAllApi);
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
      baseURL: `${baseUrl}`, //local url
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
      console.log('success');
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
  const {dispatch, uploadedFiles} = useContext(UploadContextForAllApi);
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
    const demo = document.getElementById("sideBarButtonForAll");
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
 

    <form className='hidden' onChange={handleAddFile} id="sideBarButtonForAll">
        <input id='sidebarButton' type="file" name="avatar" />
        <input type="submit" value="Submit" />
    </form>

    <label htmlFor='sidebarButton' className='mt-2'>
    <AttachFileIcon></AttachFileIcon>
    </label>
    <div className="pt-2 w-full">
				{uploadedFiles.map(file => {
                 return(
                  <UploadingFile deleteHandler={deleteHandler} id={file.id} progress={file.progress} bodyFormData={file.formData} status={file.status} ></UploadingFile>
                 )

        })}
      </div>
    </>
  )
}


const Sidebar = React.memo(

function Sidebar({items,socket,setChatState}) {
  const contextApi = React.useContext(ContextApi);
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState(null);
  const [ usersForSendMessages, setUsersForSendMessages ] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const userForSearch = React.useRef();
  const {dispatch, uploadBuffer} = useContext(UploadContextForAllApi);

  const [ selectedUsers, setSelectedUsers ] = React.useState( new Map());
  const [ message, setMessage ] = React.useState('');
  
  const sendMessage = () =>{
    let arrayOfSelectedUsers = Array.from( new Map(selectedUsers).keys() );
    if(arrayOfSelectedUsers.length > 0 && message.length > 0 ){
      const data = {'receveirsId':arrayOfSelectedUsers,'message':message,'attachments': uploadBuffer};
      socket.emit('sendMultipleMessages', data);
      dispatch({'type':'INIT'})
      setMessage('');
      setOpen(false);

      
    }

  }
  const handleClickOnUser = ( action, userId ) =>{
    if( action == true ){
      setSelectedUsers((prev)=> new Map(prev.set(userId,'true')))
    }else{
      const newMap = new Map(selectedUsers);
      newMap.delete(userId);
      setSelectedUsers( newMap );

    }
  }
  const selectUser = (receiverObject,user_id,roomId) =>{
    setChatState(receiverObject,user_id,roomId);
  }
  
//whenever search value gets updated, we will update patience list
  React.useEffect(() => {
    if(searchValue != ''){
    const newUserList = userForSearch.current.filter(value => { 
    
    const composedName = `${value.last_name} ${value.name}`
    console.log(composedName);
    return composedName.toLowerCase().includes(searchValue.toLowerCase()) 
    
    });
    setUsersForSendMessages(newUserList);
    }else{
      setUsersForSendMessages(userForSearch.current);

    }
  }, [searchValue])
  
  const initData = async ()=>{
    const allUsers = items.map( (item) => {  
      debugger
        const targetedItemBuffer = item.users.filter( (itemBuffer) => itemBuffer.user_id != contextApi.authInfo._id.toString() )[0];
        const unseen_messages_count = item.users.filter( (itemBuffer) => itemBuffer.user_id == contextApi.authInfo._id.toString() )[0].unseen_messages_count;
        return { chat_id:item._id, user_id:targetedItemBuffer.user_id, unseen_messages_count:unseen_messages_count, id: item.last_message.sender, name: targetedItemBuffer.user_name, adresse:targetedItemBuffer.adresse, img: targetedItemBuffer.profile_pic, isSeen: unseen_messages_count > 0 ? false : true, last_message: item.last_message };
     } )

     setUsers(allUsers);
     console.log('alo')
     const response = await getUserListForChat();
     console.log(response.data.data)
     setUsersForSendMessages(response.data.data);
     userForSearch.current = response.data.data;
     setIsLoading(false)
  }
  React.useEffect(()=>{

  
    initData();

  },[])



  React.useEffect(()=>{
    initData();
  
  },[items])


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if(!isLoading){
  return (
    <>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" style={{ color: '#000000', fontWeight: 700, fontSize: '24px' }}>
              Start a Chat
            </Typography>

            <Box className="startChat_modalBox">
              <Typography className="startChat_searchName">
                To:
              </Typography>

              <Box className="startChat_searchField">
                <i class='fa-solid fa-magnifying-glass'></i>
                <input onKeyPress={(e) => (e.key === 'Enter' ? setSearchValue(e.target.value) : null)} type='text' placeholder='Search...'></input>
              </Box>
            </Box>

            <Box className="frndChat_select mb-2">
              <Typography style={{
                color: '#000', fontWeight: 700,
                fontSize: "16px"
              }}>
                All User
              </Typography>

            </Box>

            {
              usersForSendMessages.map(user => {
                return(
                  
              <Box key={user._id} className="startChat_frndList">
                <Box className="startChat_frndName">
                <img className='h-[36px] w-[36px]' style={{ marginRight: '15px' }} src={`${UPLOADS_PATH}/${user.image.filename}`} alt="" />

                    <Typography style={{ color: '#000', fontSize: "16px", fontWeight: 500 }}>{`${user.last_name} ${user.name}`}</Typography>
                </Box>
                <Box>
                  <Checkbox 
                    icon={<BsCircle />}
                    checkedIcon={<BsCheckCircle />}
                    onChange={(e) => handleClickOnUser(e.target.checked,user._id)}
                  />
                </Box>

     
              </Box>
    
                )
              }
              )
            }
                                 <Box>
                <TextField
                  id="outlined-multiline-static"
                  label="Message"
                  fullWidth={true}
                  multiline
                  rows={8}
                  onChange={(e) => setMessage(e.target.value)}
                  defaultValue="..."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment edge="end" position="end">
                        <IconButton onClick={sendMessage} edge="end" color="primary">
                            <SendIcon></SendIcon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                        <AttachmentButton></AttachmentButton>

                </Box>


          </Box>
        </Fade>
      </Modal>

      <div className='chattingmen h-full'>
        <p>Remember to be respectful to others. Any violation of our church’s rules of conduct should immediately be reported.</p>
        <div className="chat_titleBar">
          <h5>Chat</h5>
          <span onClick={handleOpen} ><i className="fas fa-pen-to-square"></i></span>
        </div>

        <UserList users={users} selectUser={selectUser} userId={contextApi.authInfo._id} ></UserList>
      
                





      </div>
    </>
  )
  }
}

);

export default Sidebar 