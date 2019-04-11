const http = require('http');
const url = require('url');
const morgan = require('morgan');

const router = require('./routes/router');
const getRouteHandler = require('./helpers/get-route-handler');

const logger = morgan('combined');

const startServer = port => {

  const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url);
    const routerFunc = getRouteHandler(router, parsedUrl.pathname) || router.default;

    logger(req, res, () => {
      routerFunc(req, res);
    })
  });

  server.listen(port, err => {
    if(err) {
      console.log('oh nooo! errorrrrr!');
    }
    console.log(`server is listening on ${port}`);
  })
}

module.exports = startServer;