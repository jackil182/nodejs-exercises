const path = require('path');
const fs = require('fs');
const url = require('url');

const getId = path => {
  const lastIdx = path.lastIndexOf('/');
  if (lastIdx !== -1) {
    const id = path.slice(lastIdx + 1);

    return id !== 'cars' ? id : null;
  }
}

const filterById = (id, arr) => {
  return arr.filter(el => el.id === id);
}

const filterMultipleId = (queryString, arr) => {
  const queryArr = queryString.split(',');

  return arr.filter(car => queryArr.includes(car.id));
}

const getCarsRoute = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const id = getId(parsedUrl.path);
  const filePath = path.join(__dirname, '../../db/cars.json');
  const fileData = JSON.parse(fs.readFileSync(filePath));
  res.writeHead(200, {"Content-Type": "application/json"});

  if (!id) {
    res.write(JSON.stringify({ status: "success", cars: fileData.cars }))
  } else if (parsedUrl.search) {
    const queryParams = parsedUrl.query.id.trim().replace(/['"]/g, '');

    const filterMultiple = filterMultipleId(queryParams, fileData.cars);
    res.write(JSON.stringify({status: "success", cars: filterMultiple}));
  } else {
    const filteredCars = filterById(id, fileData.cars);
    res.write(JSON.stringify({status: "success", cars: filteredCars}))
  }

  res.end();
}

module.exports = getCarsRoute;