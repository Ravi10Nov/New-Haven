import React, { useContext, useEffect, useState } from 'react';
import MessageWindow from './chat/MessageWindow';
import ChatSidebar from './chat/Sidebar';
import { getAllMessages } from 'services/chatService';
import './member.css';
import { connectSocket } from 'features/Chat/realtime/socket';
import UploadContextProvider from './chat/UploadContext';
import UploadContextProviderForAll from './chat/UploadContextForAll';





export default function Chat({ sub, url }) {
  const [ conversations, setConverSations ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ chatSocketState, setChatSocketState] = useState(null);
  const [ selectedUser, setSelectedUser ] = useState(null);
  const [ receiverObject, setReceiverObject] = useState(null);
  const [ roomId, setRoomId ] = useState(null);
  const setChatState = ( receiverObject, selectedUser,roomId) =>{
    setSelectedUser(selectedUser);
    setReceiverObject(receiverObject)
    setRoomId(roomId);
  }

  const setSocketsHandler = () => {
    chatSocketState.on('room_document_mutated', (response) => {
   

      setConverSations( (conversations) =>{

        const conversationsShallow = [...conversations];
        const mutatedItemIndex = conversations.findIndex( (item) => item._id == response._id );
        
        if(mutatedItemIndex >= 0 ){
        // copy 0 index
        const mutatedItemBuffer = conversationsShallow[0];
        // put 
        conversationsShallow[mutatedItemIndex] = mutatedItemBuffer;
        conversationsShallow[0] = response;
        return conversationsShallow;

        }else{
          return [response,...conversationsShallow]

        }

      
      
      });
    })
  }

  useEffect(()=>{
    if(chatSocketState){
      console.log('i am reached ');
      setSocketsHandler()
    }

  },[chatSocketState])
  // i should handle sockets here
  useEffect(()=>{
    const initData = async ()=> {
      const response = await getAllMessages();
      setConverSations(response.data.data);
      console.log(response.data.data);
      const socket = await connectSocket();
      setChatSocketState(socket);
      setIsLoading(false);

    }
    initData();
    return () => {
      console.log(chatSocketState);
    }
  },[]
  )

  if(!isLoading){
  return (

          
          <div className='dashboardContentPanel container-fluid h-auto'>
            <div className='row m-3 bg-white py-3 !h-[90vh]'>
              <div className='col-lg-4 chat_res_mar !h-[90vh]'>
                <UploadContextProviderForAll>
                <ChatSidebar socket={chatSocketState} setChatState={ (receiverObject, selectedUser, roomId) => setChatState(receiverObject, selectedUser, roomId) } items={conversations}></ChatSidebar>
                </UploadContextProviderForAll>
              </div>
              <div className='col-lg-8 !h-[90vh]'>
              <UploadContextProvider>
                <MessageWindow receiverObject={receiverObject} socket={chatSocketState} selectedUser={selectedUser} roomId={roomId}></MessageWindow>
              </UploadContextProvider>

              </div>
            </div>
          </div>

  );
}
}
