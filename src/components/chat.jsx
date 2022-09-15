import React, { useContext } from 'react';
import Cam from '../img/cam.png';
import Add from '../img/add.png';
import More from '../img/more.png';
import Messages from './messages';
import Input from './input';
import { ChatContext } from '../context/chatContext';

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <div className='chatUser'>
          <img src={data.user?.photoURL} alt='' className='profileImage' />
          <span>{data.user?.displayName}</span>
        </div>
        <div className='chatIcons'>
          <img src={Cam} alt='' />
          <img src={Add} alt='' />
          <img src={More} alt='' />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
