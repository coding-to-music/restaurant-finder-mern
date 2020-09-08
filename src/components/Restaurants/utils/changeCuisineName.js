export default (cuisineName) => {
  switch (cuisineName) {
    case 'Latin (Cuban, Dominican, Puerto Rican, South & Central American)':
      return 'Latin';
    case 'Bottled beverages, including water, sodas, juices, etc.':
      return 'Bottled beverages';
    case 'Ice Cream, Gelato, Yogurt, Ices':
      return 'Ice Creams';
    default:
      return cuisineName;
  }
};
