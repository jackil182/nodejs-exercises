const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, express!');
});

app.listen(10000, () => console.log(`port is listening on 10000`));


// const http = require('http');

// http.createServer((req, res) => {
//   res.writeHead(200, { "Content-type": "text/plain"});
//   res.write("hello, Node");
//   res.end();
// }).listen(10000, ()=> console.log('server listenning on 10000'));