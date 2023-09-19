const express = require('express');
const { argv } = require('process');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.write('This is the list of our students\n');
  fs.readFile(argv[2], 'utf8', (err, list) => {
    if (err) {
      throw Error('Cannot load the listbase');
    }
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
    res.write(`Number of students: ${result.filter((check) => check.length > 3).length}\n`);
    Object.keys(final).forEach((list) => res.write(`Number of students in ${list}: ${final[list]}. List: ${isnew.filter((n) => n[1] === list).map((n) => n[0]).join(', ')}\n`));
    res.end();
  });
});

app.listen(1245);

module.exports = app;
