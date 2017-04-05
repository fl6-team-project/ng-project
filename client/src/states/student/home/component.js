const HomeTeacherController = require ('./controller');

const homeTeacherComponent = {
    bindings: {
        lectures: '='
    },
    controller: HomeTeacherController,
    template: require('./template.html')
};

module.exports = homeTeacherComponent;