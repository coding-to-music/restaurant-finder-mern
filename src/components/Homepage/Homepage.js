import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './Homepage.css';
import './customSelects.css';

import boroughs from '../../resources/searchOptions/boroughs.json';
import cuisines from '../../resources/searchOptions/cuisines.json';
import sortBy from '../../resources/searchOptions/sortBy.json';
import limits from '../../resources/searchOptions/limits.json';

import limitLabel from '../../resources/images/labelIcons/limitLabel.png';
import cuisineLabel from '../../resources/images/labelIcons/cuisineLabel.png';
import boroughLabel from '../../resources/images/labelIcons/boroughLabel.png';
import nameLabel from '../../resources/images/labelIcons/nameLabel.png';
import sortLabel from '../../resources/images/labelIcons/sortLabel.png';

const boroughsOptions = boroughs.map((borough) => ({
  value: borough._id,
  label: borough._id,
}));

const cuisinesOptions = cuisines.map((cuisine) => ({
  value: cuisine._id,
  label: cuisine._id,
}));

const sortOptions = sortBy.map((option) => ({
  value: option._id,
  label: option._id,
}));

const limitsOptions = limits.map((option) => ({
  value: option._id,
  label: option._id,
}));

const animatedComponents = makeAnimated();

const Homepage = () => {
  const [formData, setFormData] = useState({
    name: '',
    borough: [],
    cuisine: [],
    sort: '',
    queryLimit: 30,
    queryPage: 1,
  });

  const onChangeListener = (name, value) => {
    if (value === null) value = [];

    if (Array.isArray(value)) {
      value = value.map((selectOption) => selectOption.value);
    }

    if (!Array.isArray(value) && typeof value === 'object') {
      value = value.value;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='Homepage'>
      <div className='SearchBlock'>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='formGroupRow'>
            <div className='formGroup'>
              <input
                type='text'
                name='name'
                placeholder='Eg. Hot Potato Bistro, Jewish StreetFood...'
                value={formData.restaurantName}
                onChange={(e) =>
                  onChangeListener(e.target.name, e.target.value)
                }
              />
              <label className='tealDark tealDarkShadow' htmlFor='name'>
                Restaurant Name
                <img src={nameLabel} alt='Name Icon' />
              </label>
            </div>
          </div>

          <div className='formGroupRow'>
            <div className='formGroup'>
              <Select
                isMulti
                components={animatedComponents}
                options={boroughsOptions}
                className='customSelectContainer'
                classNamePrefix='customSelect'
                name='borough'
                placeholder='Manhattan, Brooklyn...'
                onChange={(value) => onChangeListener('borough', value)}
              />
              <label>
                Borough/s <img src={boroughLabel} alt='Borough Icon' />
              </label>
            </div>
            <div className='formGroup'>
              <Select
                isMulti
                components={animatedComponents}
                options={cuisinesOptions}
                className='customSelectContainer'
                classNamePrefix='customSelect'
                name='cuisine'
                placeholder='Pizza, Italian, Burgers...'
                onChange={(value) => onChangeListener('cuisine', value)}
              />
              <label>
                Cuisines <img src={cuisineLabel} alt='Cuisine Icon' />
              </label>
            </div>
          </div>

          <div className='formGroupRow'>
            <div className='formGroup'>
              <Select
                components={animatedComponents}
                options={sortOptions}
                className='customSelectContainer'
                classNamePrefix='customSelect'
                name='sort'
                placeholder='Popularity'
                onChange={(value) => onChangeListener('sort', value)}
              />
              <label>
                Sort <img src={sortLabel} alt='Sort Icon' />
              </label>
            </div>
            <div className='formGroup'>
              <Select
                components={animatedComponents}
                options={limitsOptions}
                className='customSelectContainer'
                classNamePrefix='customSelect'
                name='queryLimit'
                placeholder='Per page'
                onChange={(value) => onChangeListener('queryLimit', value)}
              />
              <label>
                Limit <img src={limitLabel} alt='Limit Icon' />
              </label>
            </div>
          </div>

          <button type='submit'>Search</button>
        </form>
      </div>
    </div>
  );
};

export default Homepage;
