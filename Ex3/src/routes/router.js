const getCarsRoute = require('../routes/cars/get-cars-route');
const mainRoute = require('../routes/main/main-route');

const router = {
  '/cars': getCarsRoute,
  default: mainRoute,
};

module.exports = router;