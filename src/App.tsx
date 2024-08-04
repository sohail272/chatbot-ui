import React from 'react';
import ChatWidget from './components/ChatWidget';
import { Helmet } from 'react-helmet';

const App: React.FC = () => {
  return (
    <div className="App">
      <Helmet>
        <title>Chat Application</title>
        <meta name="description" content="A simple chat application using FastAPI and React." />
      </Helmet>
      <main>
        <ChatWidget />
      </main>
    </div>
  );
};

export default App;
