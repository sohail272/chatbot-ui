import React, { useState, useEffect } from 'react';
import Header from './Header';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { fetchMessages, sendMessage, deleteMessage } from '../api';
import { Message } from '../types';
import './styles/ChatWidget.css';

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    fetchMessages().then((response) => setMessages(response.data));
  }, []);

  const handleSendMessage = async (content: string) => {
    try {
      // Send the message and receive both user and system messages
      const response = await sendMessage(content);
      const newMessages = response.data.map((msg: Message) => ({
        ...msg,
        sender: msg.sender,
      }));
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);

      setInputValue('');
      setEditId(null);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleDeleteMessage = async (id: number) => {
    try {
      await deleteMessage(id);
      setMessages(messages.filter((message) => message.id !== id));
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const handleEditMessage = (id: number, content: string) => {
    setEditId(id);
    setInputValue(content); // Set the input field to the message content
  };

  return (
    <div className="chat-widget">
      <Header />
      <MessageList
        messages={messages}
        onDelete={handleDeleteMessage}
        onEdit={handleEditMessage}
      />
      <MessageInput
        onSend={handleSendMessage}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </div>
  );
};

export default ChatWidget;
