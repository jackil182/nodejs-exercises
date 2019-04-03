const getRouteHandler = (router, url) => {
  const urlWithoutQuery = getUrlWithoutQuery(url);
  return router[urlWithoutQuery];
}

function getUrlWithoutQuery(url) {
  const queryStartIdx = url.lastIndexOf('/');
  const query = url.slice(queryStartIdx + 1).trim();

  if (!queryContainsNumbers(query)) {
    return url;
  }

  if(Number(query) && queryStartIdx !== -1) {
    return url.slice(0, queryStartIdx);
  }

  return url;
}

function queryContainsNumbers(query) {
  return /\d/.test(query);
}

module.exports = getRouteHandler;