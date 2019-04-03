const getDefault = require('./default/default');
const getCars = require('./cars/cars');

const routes = {
  'default': getDefault,
  '/cars': getCars
};

module.exports = routes;