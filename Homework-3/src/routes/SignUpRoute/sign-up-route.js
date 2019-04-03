const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const saveUser = user => {
  const {username} = user;
  const filePath = path.join(__dirname, '../../db/users', `${username}.json`);
  fs.writeFile(filePath, JSON.stringify(user), err => {
    if(err) throw err;
    console.log('user was saved');
  })
}

router.get('/', (req, res) => {
  res.send({status: "success", users: []})
});

router.post('/', (req, res) => {
  saveUser(req.body)
  res.send({status: "success", user: req.body});
});

module.exports = router;