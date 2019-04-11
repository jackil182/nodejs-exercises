const express = require('express');
const app = express();
const logger = require('morgan');

const router = require('./routes.js');

app.use(logger('tiny'));
app.use(express.json());

app.use('/', express.static('client'));
app.use('/assets/audio', express.static('assets/audio'));
app.use('/assets/video', express.static('assets/video'));


app.use('/api', router);

app.listen(4040, () => console.log('server is running on port 4040'));
