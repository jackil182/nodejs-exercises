const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  user: process.env.DB_AUTH,
  port: process.env.PORT,
}