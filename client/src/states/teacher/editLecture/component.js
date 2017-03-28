const EditLectureController = require ('./controller');

const lectureListComponent = {
    bindings: {
        lectures: '=?'
    },
    controller: EditLectureController,
    template: require('./template.html')
};

module.exports = lectureListComponent;