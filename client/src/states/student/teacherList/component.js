const TeacherListController = require('./controller.js');

const teacherListComponent = {
    bindings: {
       persons: '='
    },
    template: require('./template.html'),
    controller: TeacherListController
};

module.exports = teacherListComponent;