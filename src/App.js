import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Restaurants from './components/Restaurants/Restaurants';
import RestaurantDetails from './components/RestaurantDetails/RestaurantDetails';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route path='/restaurants' exact component={Restaurants} />
        <Route path='/restaurant' component={RestaurantDetails} />
        <Route path='/' exact component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
