// const simpleM = require('./simpleModule');
// console.log('By adding %d to 10, we get %d', simpleM.x, simpleM.addX(10));

// const user = require('./simpleModule');
// const u = new user('mango', 'ajax@poly.com');
// console.log(u);

// require('./simpleModule')(9050);

const path = require('path');
const ext = path.extname('index.html');
// console.log(ext);

// console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'));
// console.log(path.parse('/home/user/dir/file.txt'));
console.log(path.resolve('foo/bar', './baz'));
console.log(path.resolve('foo/bar', '/tmp/file/'));
console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'));