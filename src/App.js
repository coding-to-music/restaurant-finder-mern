import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Restaurants from './components/Restaurants/Restaurants';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Homepage} />
        <Route path='/restaurants' exact component={Restaurants} />
      </Switch>
    </div>
  );
}

export default App;
