const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const filterById = (id, arr) => {
  return arr.filter(el => el.id === id);
};

const filePath = path.join(__dirname, '../../db/cars.json');
const fileData = JSON.parse(fs.readFileSync(filePath));

router.get('/', (req, res) => {
  res.send('Main cars root');
});

router.get('/about', (req, res) => {
  res.send('About cars root');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const filteredCars = filterById(id, fileData.cars);

  res.json(filteredCars);
});

module.exports = router;
