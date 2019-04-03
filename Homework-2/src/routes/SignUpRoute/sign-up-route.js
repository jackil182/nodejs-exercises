const path = require('path');
const fs = require('fs');

// const querystring = require('querystring');

const signUpRoute = (req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', data => {
      body += data;
    });

    req.on('end', () => {
      const post = JSON.parse(body);
      saveUser(post);
      console.log(post);
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ status: 'success', user: body }));
    res.end();
  }
};

const saveUser = user => {
  const { username } = user;
  const filePath = path.join(
    __dirname,
    '../../src/db/users',
    username + '.json'
  );
  fs.writeFile(filePath, JSON.stringify(user), err => {
    if (err) throw err;
    console.log('SAVED!');
  });
};

module.exports = signUpRoute;
