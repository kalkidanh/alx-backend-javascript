const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(process.argv[2].toString()).then((studentList) => {
      const list = [];
      list.push('This is the list of our studentList');
      const key = Object.key(studentList);
      key.sort();
      for (let i = 0; i < key.length; i += 1) {
        list.push(`Number of studentList in ${key[i]}: ${studentList[key[i]].length}. List: ${studentList[key[i]].join(', ')}`);
      }
      response.status(200).send(list.join('\n'));
    }).catch(() => {
      response.status(500).send('Cannot load the database');
    });
  }

  static getAllStudentsByMajor(request, response) {
    const field = request.params.major;
    readDatabase(process.argv[2].toString()).then((studentList) => {
      if (!(field in studentList)) {
        response.status(500).send('Major parameter must be CS or SWE');
      } else {
        response.status(200).send(`List: ${studentList[field].join(', ')}`);
      }
    }).catch(() => {
      response.status(500).send('Cannot load the database');
    });
  }
}

module.exports = StudentsController;
