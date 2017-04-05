const LectureListController = require ('./controller');

const lectureListComponent = {
    bindings: {
        lectures: '=',
        feedbacks: '='
    },
    controller: LectureListController,
    template: require('./template.html')
};

module.exports = lectureListComponent;