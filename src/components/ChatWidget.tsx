import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWidget: React.FC = () => {
  return (
    <div className="chat-widget">
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatWidget;
