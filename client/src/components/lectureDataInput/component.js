const LectureDataInputController = require ('./controller.js');

const lectureDataInputComponent = {
    bindings: {
        lecture: '=?'
    },
    controller: LectureDataInputController,
    template: require ('./template.html')
}

module.exports = lectureDataInputComponent;