const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const saveOrder = order => {
  const orderId = order.user;
  const filePath = path.join(__dirname, '../../db/orders', `${orderId}.json`);
  fs.writeFile(filePath, JSON.stringify(order), err => {
    if (err) throw err;
    console.log('order saved');
  });
};

router.post('/', (req, res) => {
  console.log('body', req.body)
  saveOrder(req.body);
  res.send({status: "success", order: req.body});
});

module.exports = router;