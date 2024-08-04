import React from 'react';
import './styles/Header.css';

const Header: React.FC = () => (
  <div className="chat-header">
    <img src="https://www.artisan.co/assets/ava.svg" alt="Ava" />
    <div className="header-content">
      <h3>Hey👋, I'm Ava</h3>
      <p>Ask me anything or pick a place to start</p>
    </div>
  </div>
);

export default Header;
