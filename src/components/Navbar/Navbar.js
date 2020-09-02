import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

import Logo from '../../resources/images/logo.svg';
import SearchIcon from '../../resources/images/search-icon.png';
import LocationPin from '../../resources/images/location-pin.png';
import ApartmentBlock from '../../resources/images/apartment-block.png';

const Navbar = () => {
  return (
    <div className='Navbar'>
      <div className='container'>
        <a href='/' className='NavbarLogo'>
          <img src={Logo} alt='Logo' />
          <p>
            <span className='yellow'>New</span>
            <span className='teal'>York</span>
            <span className='orange'>Fooder</span>
          </p>
        </a>
        <nav>
          <NavLink to='/' exact>
            <img src={SearchIcon} alt='Search Icon' />
          </NavLink>
          <NavLink to='/byLocation' exact>
            <img src={LocationPin} alt='Location Pin Icon' />
            <p>Location</p>
          </NavLink>
          <NavLink to='/byNeighborhood' exact>
            <img src={ApartmentBlock} alt='Apartment Block Icon' />
            <p>Neighborhood</p>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
