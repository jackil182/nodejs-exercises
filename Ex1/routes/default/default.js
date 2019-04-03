const getDefault = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Module 1</h1>');
  res.end();
};

module.exports = getDefault;