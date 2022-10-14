import React from 'react';
import AppContextProvider from './store/AppContextProvider';
import Navbar from './components/Navbar';
import Questionnaire from './components/Questionnire';
import Result from './components/Results';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <Navbar/>
        <Questionnaire/>
        <Result/>
      </AppContextProvider>
    </div>
  );
}

export default App;
