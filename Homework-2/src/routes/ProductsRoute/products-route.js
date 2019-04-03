const path = require('path');
const fs = require('fs');
const url = require('url');

const productRoute = (req, res) => {
  if (req.method === 'GET') {
    const parsedUrl = url.parse(req.url, true);
    const lastPieceOfPath = getlastPieceOfPath(parsedUrl.path);
    const filePath = path.join(__dirname, '../../db', 'all-products.json');
    const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.writeHead(200, {"Content-Type": "application/json"});

    if(!lastPieceOfPath) {
      res.write(JSON.stringify({status: 'success', products: fileContent}));
    } else if (parsedUrl.search) {
      const queryParams = parsedUrl.query.categories.trim().replace(/['"]/g, '');
      const filteredProducts = filterByCategory(queryParams, fileContent);
      res.write(JSON.stringify({status: "success", products: filteredProducts}))
    } else {
      const queriedProducts = filterByQuery(lastPieceOfPath, fileContent);
      res.write(JSON.stringify({status: 'success', products: queriedProducts}))
    }

    res.end();
  }
}

function getlastPieceOfPath(path) {
  const queryStartIdx = path.lastIndexOf('/');
  if(queryStartIdx !== -1) {
    const queryParams = path.slice(queryStartIdx + 1);

    return queryParams === 'products' ? null : queryParams;
  }
}

function filterByQuery(param, arr) {
  return arr.filter(el => el.id === Number(param));
}

function filterByCategory(paramsStr, arr) {
  const paramsArr = paramsStr.split(',');

  return paramsArr.map(par => arr.filter(el => el.categories.includes(par)));
}

module.exports = productRoute;