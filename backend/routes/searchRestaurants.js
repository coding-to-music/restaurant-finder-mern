const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router();
const databaseFunctions = require('../db');

router.get('/', async (req, res) => {
  const {
    queryLimit,
    queryPage,
    borough,
    cuisine,
    name,
    sort,
    geoOptions,
  } = req.body;

  const aggregationPipeline = [];

  if (name && geoOptions.coordinates === [])
    aggregationPipeline.unshift({ $match: { $text: { $search: name } } });
  if (borough.length > 0)
    aggregationPipeline.unshift({ $match: { borough: { $in: borough } } });
  if (cuisine.length > 0)
    aggregationPipeline.unshift({ $match: { cuisine: { $in: cuisine } } });
  if (geoOptions.coordinates !== [])
    aggregationPipeline.unshift({
      $geoNear: {
        near: { type: 'Point', coordinates: geoOptions.coordinates },
        distanceField: 'distanceFromUser',
        spherical: true,
        maxDistance: geoOptions.maxDistance,
      },
    });

  aggregationPipeline.push({
    $addFields: {
      avgGrade: { $avg: '$grades.score' },
      numberOfGrades: { $size: '$grades' },
    },
  });

  if (sort === 'Ascending Grades')
    aggregationPipeline.push({ $sort: { avgGrade: 1 } });
  if (sort === 'Descending Grades')
    aggregationPipeline.push({ $sort: { avgGrade: -1 } });
  if (sort === 'Popularity')
    aggregationPipeline.push({ $sort: { numberOfGrades: -1 } });
  if (sort === 'Distance')
    aggregationPipeline.push({ $sort: { distanceFromUser: 1 } });

  aggregationPipeline.push(
    { $project: { grades: 0, restaurant_id: 0 } },
    { $skip: (queryPage - 1) * queryLimit },
    { $limit: queryLimit }
  );

  try {
    const restaurantCollection = databaseFunctions
      .getDatabase()
      .collection('restaurants');

    const fetchedRestaurants = await restaurantCollection
      .aggregate(aggregationPipeline)
      .toArray();

    res.status(200).json({ fetchedRestaurants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/byNeighborhood', async (req, res) => {
  const { neighborhoodId, queryLimit, queryPage, sort } = req.body;

  try {
    const database = databaseFunctions.getDatabase();

    const neighborhoodCollection = database.collection('neighborhoods');
    const restaurantCollection = database.collection('restaurants');

    const neighborhood = await neighborhoodCollection.findOne({
      _id: new ObjectID(neighborhoodId),
    });

    const aggregationPipeline = [];

    aggregationPipeline.push({
      $match: {
        'address.location': {
          $geoWithin: { $geometry: neighborhood.geometry },
        },
      },
    });

    aggregationPipeline.push({
      $addFields: {
        avgGrade: { $avg: '$grades.score' },
        numberOfGrades: { $size: '$grades' },
      },
    });

    aggregationPipeline.push({
      $project: { grades: 0, restaurant_id: 0 },
    });

    if (sort === 'gradesAscending')
      aggregationPipeline.push({ $sort: { avgGrade: 1 } });
    if (sort === 'gradesDescending')
      aggregationPipeline.push({ $sort: { avgGrade: -1 } });
    if (sort === 'popularity')
      aggregationPipeline.push({ $sort: { numberOfGrades: -1 } });

    aggregationPipeline.push(
      { $skip: (queryPage - 1) * queryLimit },
      { $limit: queryLimit }
    );

    const fetchedRestaurants = await restaurantCollection
      .aggregate(aggregationPipeline)
      .toArray();

    res.status(200).json(fetchedRestaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
