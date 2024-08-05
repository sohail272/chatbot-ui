import React, { useState, useEffect } from 'react';
import './App.css';
import { Helmet } from 'react-helmet';
import ChatWidget from './components/ChatWidget';
import { login } from './api';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      try {
        await login('admin', 'admin');
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication failed:', error);
      }
    };

    authenticate();
  }, []);

  return (
    <div className="App">
      <Helmet>
        <title>Chat Application</title>
        <meta name="description" content="A simple chat application using FastAPI and React." />
      </Helmet>
      <main>
        {isAuthenticated ? (
          <ChatWidget />
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
};

export default App;
