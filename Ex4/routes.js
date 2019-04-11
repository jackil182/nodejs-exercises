const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const util = require('util');

router.get('/video', (req, res) => {
  console.log(req.body);

  res.json(req.body)
});

router.get('/audio', (req, res) => {
  res.json(req.body);
})

module.exports = router;