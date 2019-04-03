const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = morgan('combined');

const productsRoute = require('./routes/ProductsRoute/products-route');
const signUpRoute = require('./routes/SignUpRoute/sign-up-route');
const orderRoute = require('./routes/OrderRoute/order-route');

const startServer = port => {
  app.use(logger);
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.send('<h1>Pizza Shop</h1>')
  });

  app.use('/products', productsRoute);
  app.use('/signup', signUpRoute);
  app.use('/orders', orderRoute);

  app.listen(port, err => {
    if(err) {
      console.log('error')
    }
    console.log('server is listening on ' + port);
  })
}

module.exports = startServer;