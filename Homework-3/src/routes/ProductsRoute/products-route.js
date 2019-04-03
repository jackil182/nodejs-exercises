const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

function filterById(id, arr) {
  return arr.filter(el => el.id === Number(id));
}

function filterByCategory(paramsArr, arr) {
  return paramsArr.map(par => arr.filter(el => el.categories.includes(par)));
}

const filePath = path.join(__dirname, '../../db/all-products.json');
const fileContents = JSON.parse(fs.readFileSync(filePath));

router.get('/', (req, res) => {
  if(req.query.categories) {
    const categoriesArr = req.query.categories.trim().replace(/['"]/g, '').split(',');
    const filteredProducts = filterByCategory(categoriesArr, fileContents);
    if(filteredProducts[0].length === 0) {
      res.send({status: "no products", products: []});      
    } else {
      res.send({status: "success", products: filteredProducts});
    }
  } else {
    res.send({status: "success", products: fileContents});
  };
});

router.get('/:id', (req, res) => {
  const filteredProducts = filterById(req.params.id, fileContents);
  if(filteredProducts.length === 0) {
    res.send({status: "no products", products: filteredProducts});
  } else {
    res.send({status: "success", products: filteredProducts});
  }
});

module.exports = router;