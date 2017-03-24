const LectureListController = require ('./controller');

const lectureListComponent = {
    bindings: {
        lectures: '=?'
    },
    controller: LectureListController,
    template: require('./template.html')
};

module.exports = lectureListComponent;