const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan')
const birdsRoute = require('./routes/birds-route');

const startServer = port => {
  app.use(logger('combined'));
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.send('Aloha!');
  });

  app.use('/birds', birdsRoute);

  app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
  })

}

module.exports = startServer;