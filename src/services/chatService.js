import axios from "../config/axios";

export const getAllMessages = async ( ) =>{
    const url = `/chats/messages/conversations`;
    try {
    const response = await axios.get(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    return response;
    }catch(error){
      throw error
    }
  }


  export const getOldRoomMessages = async (roomId,skip) =>{
    const url = `/chats/messages/${roomId}?skip=${skip}`;
    try {
    const response = await axios.get(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    return response;
    }catch(error){
      throw error
    }
  }
