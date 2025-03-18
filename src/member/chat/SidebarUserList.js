import { timeSince } from "helpers/Date";
import { memo, useEffect, useState } from "react";
import Badge from '@mui/material/Badge';
import { UPLOADS_PATH } from "config/magic_constants";

import React, { Component } from 'react';
const second = 1000;
const minute = second * 60;
const hour = minute * 60 ;

class DateComponent extends Component {
  constructor(props){
    super(props);
    this.state = { time: props.time, change:false };
  }
  render(){
    return(
        <p>{timeSince(this.state.time)}</p>
    );
  }

  componentDidMount() {
    this.count = 0;
    this.setUpdateIntervale();
  }

  componentDidUpdate(prevState) {

    if(timeSince(prevState.time) !== timeSince(this.props.time)){
      this.count += 0;
      this.setState({ time: this.props.time });
      this.setUpdateIntervale();
    }
  }

  setUpdateIntervale(){

    setTimeout(function(){this.setState({ time: this.props.time });this.setUpdateIntervale();}.bind(this), this.count <= (hour) ? minute : hour );

    
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

const UserComponent = ({chat,selectUser,userId}) => {
  const [messageCount,setMessageCount] = useState(chat.unseen_messages_count);
  useEffect(()=>{
    setMessageCount(chat.unseen_messages_count);
  },[chat])
  console.log(chat);
  if(chat){
  return(
    <div onClick={ () => {selectUser({'img':chat.img,'composed_name':`${chat.name}`},chat.user_id,chat.chat_id); setMessageCount(0)}} className={`chat_friendList w-full`} style={{'backgroundColor': `${chat.isSeen ? 'white' : '#E6F0FF'}`}} >
              
    <div style={{ display: "flex" }}>
    <Badge anchorOrigin={{ horizontal: 'left', vertical: 'top' }} color="primary" overlap="circular" badgeContent={messageCount}>
      <div className='userImg my-auto'>
        <img src={`${UPLOADS_PATH}/${chat.img}`} alt="" />
      </div>
    </Badge>
      <div className='nameAndDetail'>
        <h5  className='p-0 !ml-4'>{chat.name}</h5>
        { !chat.last_message.content || <span className="p-0 my-2 !ml-4 font-medium text-xs text-blue-500"> { userId == chat.id ? `You: ${chat.last_message.content}` : `${chat.name}: ${chat.last_message.content}` } </span> }
        <p className='p-0 '>{chat.adresse}</p>
      </div>
    </div>
    {!chat.last_message.Date || <DateComponent time={chat.last_message.Date}></DateComponent>}
 </div>
  )
  }
}
const UserList = memo(
    
    function UserList({users,userId,selectUser}){

        return(
            <>

    {users.map((chat)=> {
       
            return(
              <UserComponent key={chat.chat_id} chat={chat} selectUser={selectUser} userId={userId}></UserComponent>

         )
    } 
    )
  }
  </>
        )
    }
)

export default UserList;