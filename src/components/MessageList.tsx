import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './styles/MessageList.css';

interface MessageListProps {
  messages: Message[];
  onDelete: (id: number) => void;
  onEdit: (id: number, content: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, onDelete, onEdit }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom whenever messages change
  }, [messages]);
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message-container ${message.sender === 'system' ? 'system-message' : 'user-message'}`}
        >
          {message.sender === 'system' && (
            <img
              src="https://www.artisan.co/assets/ava.svg" // Bot avatar URL
              alt="Bot"
              className="avatar"
            />
          )}
          <div className="message">
            <div className="message-content">
              {message.content}
            </div>
            {message.sender === 'user' && (
              <div className="message-icons">
                <button onClick={() => onEdit(message.id, message.content)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => onDelete(message.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageList;
