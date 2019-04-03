const path = require('path');
const fs = require('fs');

const getCars = (req, res) => {
  if (req.method === 'GET') {
    const filePath = path.join(__dirname, '../../db', 'cars.json');

    res.writeHead(200, { 'Content-Type': 'application/json' });

    const file = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(file.cars);
    res.write(JSON.stringify({ status: 'success', cars: file.cars }));
    res.end();
  }
};

module.exports = getCars;