const http = require('http');
const url = require('url');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const router = require('./routes/routes')

const logger = morgan('combined');

const startServer = port => {

  const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url);

    const getRouteFunc = router[parsedUrl.pathname] || router.default;

    logger(req, res, () => {
      console.log(req.url);
      getRouteFunc(req, res);      
    });
  });

  server.listen(port, err => {
    if(err) {
      return console.log('something went wrong')
    }
    console.log(`server is listening on ${port}`);
  })
}

module.exports = startServer;