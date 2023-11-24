const { readFile } = require('fs');

module.exports = function readDatabase(filePath) {
  const studentList = {};
  return new Promise((resolve, reject) => {
    readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const line = data.toString().split('\n');
        const header = line.slice(1);
        for (let i = 0; i < header.length; i += 1) {
          if (header[i]) {
            const field = header[i].toString().split(',');
            if (Object.prototype.hasOwnProperty.call(studentList, field[3])) {
              studentList[field[3]].push(field[0]);
            } else {
              studentList[field[3]] = [field[0]];
            }
          }
        }
        resolve(studentList);
      }
    });
  });
};
