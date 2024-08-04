// src/components/ChatWidget.tsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { fetchMessages, sendMessage, deleteMessage, chatbotRespond } from '../api';
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
      if (editId !== null) {
        // Send the edited message as a new message
        const response = await sendMessage(content);
        const userMessage = { ...response.data, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        const botResponse = await chatbotRespond(content);
        const botMessage = { ...botResponse.data, sender: 'system' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        setEditId(null); // Reset edit state
      } else {
        // Send a new message
        const response = await sendMessage(content);
        const userMessage = { ...response.data, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        const botResponse = await chatbotRespond(content);
        const botMessage = { ...botResponse.data, sender: 'system' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
      setInputValue(''); // Clear the input field
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
