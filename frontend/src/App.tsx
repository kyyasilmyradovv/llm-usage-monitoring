import React, { useState } from 'react';
import ChatForm from './components/ChatForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState<'chat' | 'dashboard'>('chat');

  return (
    <div className="App">
      <header className="App-header">
        <h1>LLM Usage Monitoring Service by Overmind</h1>
        <nav>
          <button
            className={activeView === 'chat' ? 'active' : ''}
            onClick={() => setActiveView('chat')}
          >
            Chat
          </button>
          <button
            className={activeView === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveView('dashboard')}
          >
            Dashboard
          </button>
        </nav>
      </header>

      <main>{activeView === 'chat' ? <ChatForm /> : <Dashboard />}</main>
    </div>
  );
}

export default App;
