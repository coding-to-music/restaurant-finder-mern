require('dotenv').config({ path: 'backend/.env' });
const path = require('path');
const express = require('express');
const app = express();
const databaseFunctions = require('./db');

app.use(express.json());

app.use('/api/searchRestaurants', require('./routes/searchRestaurants'));

databaseFunctions.initializeDatabase((err, database) => {
  if (err) return console.error(err);
  app.listen(process.env.PORT, () =>
    console.log(`Server is listening on PORT ${process.env.PORT}`)
  );
});
