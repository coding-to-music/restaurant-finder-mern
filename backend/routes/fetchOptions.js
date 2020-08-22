const express = require('express');
const router = express.Router();
const databaseFunctions = require('../db');
const db = require('../db');

router.get('/possibleCousines', async (req, res) => {
  try {
    const restaurantsCollection = databaseFunctions
      .getDatabase()
      .collection('restaurants');
    const options = await restaurantsCollection
      .aggregate([
        { $group: { _id: '$cuisine', total: { $sum: 1 } } },
        { $sort: { total: -1 } },
      ])
      .toArray();
    res.status(200).json({ options });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/possibleBoroughs', async (req, res) => {
  try {
    const restaurantsCollection = databaseFunctions
      .getDatabase()
      .collection('restaurants');
    const options = await restaurantsCollection
      .aggregate([
        { $group: { _id: '$borough', total: { $sum: 1 } } },
        { $sort: { total: -1 } },
      ])
      .toArray();
    res.status(200).json({ options });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/possibleNeighborhoods', async (req, res) => {
  try {
    const neighborhoodsCollection = databaseFunctions
      .getDatabase()
      .collection('neighborhoods');
    const options = await neighborhoodsCollection
      .aggregate([{ $project: { geometry: 0 } }])
      .toArray();
    res.status(200).json({ options });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
