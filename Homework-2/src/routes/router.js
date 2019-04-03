const mainRoute = require('./MainRoute/main-route');
const productRoute = require('./ProductsRoute/products-route');
const signUpRoute = require('./SignUpRoute/sign-up-route');

const router = {
  "main": mainRoute,
  "/products": productRoute,
  "/signup": signUpRoute,
}

module.exports = router;

