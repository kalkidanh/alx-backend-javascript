const http = require('http');
const fs = require('fs');
const { argv } = require('process');

function countStudents(path, stream) {
  if (fs.existsSync(path)) {
    const list = fs.readFileSync(path, 'utf8');
    const result = [];
    list.split('\n').forEach((list) => {
      result.push(list.split(','));
    });
    result.shift();
    const isnew = [];
    result.forEach((list) => isnew.push([list[0], list[3]]));
    const field = new Set();
    isnew.forEach((item) => field.add(item[1]));
    const final = {};
    field.forEach((list) => { (final[list] = 0); });
    isnew.forEach((list) => { (final[list[1]] += 1); });
    stream.write(`Number of students: ${result.length}\n`);
    const value = [];
    Object.keys(final).forEach((list) => value.push(`Number of students in ${list}: ${final[list]}. List: ${isnew.filter((n) => n[1] === list).map((n) => n[0]).join(', ')}\n`));
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < value.length; i++) {
      if (i === value.length - 1) {
        value[i] = value[i].replace(/(\r\n|\n|\r)/gm, '');
      }
      stream.write(value[i]);
    }
  } else { throw new Error('Cannot load the listbase'); }
}

const hostname = '127.0.0.1';
const port = 1245;

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  const { url } = req;
  if (url === '/') {
    res.write('Hello Holberton School!');
    res.end();
  }
  if (url === '/students') {
    res.write('This is the list of our students\n');
    try {
      countStudents(argv[2], res);
      res.end();
    } catch (err) {
      res.end(err.message);
    }
  }
});

app.listen(port, hostname);

module.exports = app;
