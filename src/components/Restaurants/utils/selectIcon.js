import React from 'react';

import American from '../../../resources/images/restaurantCardsIcons/American.png';
import Bakery from '../../../resources/images/restaurantCardsIcons/Bakery.png';
import Caribbean from '../../../resources/images/restaurantCardsIcons/Caribbean.png';
import Chicken from '../../../resources/images/restaurantCardsIcons/Chicken.png';
import Chinese from '../../../resources/images/restaurantCardsIcons/Chinese.png';
import Coffee from '../../../resources/images/restaurantCardsIcons/Coffee.png';
import Delicatessen from '../../../resources/images/restaurantCardsIcons/Delicatessen.png';
import Donuts from '../../../resources/images/restaurantCardsIcons/Donuts.png';
import French from '../../../resources/images/restaurantCardsIcons/French.png';
import Hamburgers from '../../../resources/images/restaurantCardsIcons/Hamburgers.png';
import IceCream from '../../../resources/images/restaurantCardsIcons/IceCream.png';
import Indian from '../../../resources/images/restaurantCardsIcons/Indian.png';
import Italian from '../../../resources/images/restaurantCardsIcons/Italian.png';
import Japanese from '../../../resources/images/restaurantCardsIcons/Japanese.png';
import Jewish from '../../../resources/images/restaurantCardsIcons/Jewish.png';
import Latin from '../../../resources/images/restaurantCardsIcons/Latin.png';
import Mexican from '../../../resources/images/restaurantCardsIcons/Mexican.png';
import Other from '../../../resources/images/restaurantCardsIcons/Other.png';
import Pizza from '../../../resources/images/restaurantCardsIcons/Pizza.png';
import Sandwiches from '../../../resources/images/restaurantCardsIcons/Sandwiches.png';
import Spanish from '../../../resources/images/restaurantCardsIcons/Spanish.png';

export default (cuisineType) => {
  switch (cuisineType) {
    case 'American':
      return <img src={American} alt='Restaurant Type Icon' />;
    case 'Bakery':
      return <img src={Bakery} alt='Restaurant Type Icon' />;
    case 'Caribbean':
      return <img src={Caribbean} alt='Restaurant Type Icon' />;
    case 'Chicken':
      return <img src={Chicken} alt='Restaurant Type Icon' />;
    case 'Chinese':
      return <img src={Chinese} alt='Restaurant Type Icon' />;
    case 'Café/Coffee/Tea':
      return <img src={Coffee} alt='Restaurant Type Icon' />;
    case 'Delicatessen':
      return <img src={Delicatessen} alt='Restaurant Type Icon' />;
    case 'Donuts':
      return <img src={Donuts} alt='Restaurant Type Icon' />;
    case 'French':
      return <img src={French} alt='Restaurant Type Icon' />;
    case 'Hamburgers':
      return <img src={Hamburgers} alt='Restaurant Type Icon' />;
    case 'Ice Cream, Gelato, Yogurt, Ices':
      return <img src={IceCream} alt='Restaurant Type Icon' />;
    case 'Indian':
      return <img src={Indian} alt='Restaurant Type Icon' />;
    case 'Italian':
      return <img src={Italian} alt='Restaurant Type Icon' />;
    case 'Japanese':
      return <img src={Japanese} alt='Restaurant Type Icon' />;
    case 'Jewish/Kosher':
      return <img src={Jewish} alt='Restaurant Type Icon' />;
    case 'Latin (Cuban, Dominican, Puerto Rican, South & Central American)':
      return <img src={Latin} alt='Restaurant Type Icon' />;
    case 'Mexican':
      return <img src={Mexican} alt='Restaurant Type Icon' />;
    case 'Pizza':
      return <img src={Pizza} alt='Restaurant Type Icon' />;
    case 'Sandwiches':
      return <img src={Sandwiches} alt='Restaurant Type Icon' />;
    case 'Spanish':
      return <img src={Spanish} alt='Restaurant Type Icon' />;
    default:
      return <img src={Other} alt='Restaurant Type Icon' />;
  }
};
