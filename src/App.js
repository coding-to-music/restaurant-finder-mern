import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
