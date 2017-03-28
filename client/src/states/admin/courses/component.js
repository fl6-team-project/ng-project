const CoursesComponentController = require('./controller.js');

const adminCoursesComponent = {
    template: require('./index.html'),
    controller: CoursesComponentController
};

module.exports = adminCoursesComponent;
