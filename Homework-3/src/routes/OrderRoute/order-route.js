const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const findProducts = order => {
  const {products} = order;
  const allProductsPath = path.join(__dirname, '../../db/all-products.json');
  const allProducts = JSON.parse(fs.readFileSync(allProductsPath));
  const orderedProducts = products.map(el => allProducts.filter(x => x.id === el));
  return orderedProducts;
}

const saveOrder = order => {
  const orderedProducts = findProducts(order);
  const canBeFulfilled = orderedProducts.every(el => el.length > 0);
  if(canBeFulfilled) {
    const orderId = order.user;
    const filePath = path.join(__dirname, '../../db/orders', `${orderId}.json`);
    fs.writeFile(filePath, JSON.stringify(order), err => {
      if (err) throw err;
      console.log('order saved');
    });
    return orderedProducts;
  } else return null;
};

router.post('/', (req, res) => {
  // console.log('body', req.body)
  const order = saveOrder(req.body);
  req.body.products = order.map(el => el[0]);
  if(order) {
    res.send({status: "success", order: req.body});
  } else {
    res.send({status: "failed", order: null});
  }
});

module.exports = router;