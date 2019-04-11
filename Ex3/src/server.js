const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const carsRoute = require('./routes/cars/get-cars-route');

const logger = morgan('combined');

const startServer = port => {
  app.use(logger);
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.send('Aloha');
  });

  app.use('/cars', carsRoute);

  app.listen(port, err => {
    if(err) {
      console.log('oh nooo! errorrrrr!');
    }
    console.log(`server is listening on ${port}`);
  })
}

module.exports = startServer;