const AddLectureController = require ('./controller');

const addLectureComponent = {
    bindings: {
        lecture: '='
    },
    controller: AddLectureController,
    template: require('./template.html')
};

module.exports = addLectureComponent;