const StudentController = require('./controller.js');

const studentComponent = {
    template: require('./index.html'),
    controller: StudentController
};

module.exports = studentComponent;