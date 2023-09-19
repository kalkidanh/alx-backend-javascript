const fs = require('fs');

function countStudents(path) {
  try {
    const list = fs.readFileSync(path, 'utf8');
    const res = [];
    list.split('\n').forEach((list) => {
      res.push(list.split(','));
    });
    res.shift();
    const isnew = [];
    res.forEach((list) => isnew.push([list[0], list[3]]));
    const field = new Set();
    isnew.forEach((item) => field.add(item[1]));
    const final = {};
    field.forEach((list) => { (final[list] = 0); });
    isnew.forEach((data) => { (final[list[1]] += 1); });
    console.log(`Number of students: ${res.filter((check) => check.length > 3).length}`);
    Object.keys(final).forEach((list) => console.log(`Number of students in ${list}: ${final[list]}. List: ${isnew.filter((n) => n[1] === list).map((n) => n[0]).join(', ')}`));
  } catch (E) {
    throw Error('Cannot load the database');
  }
}

module.exports = countStudents;
