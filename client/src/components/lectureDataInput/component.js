const LectureDataInputController = require ('./controller.js');

const lectureDataInputComponent = {
    bindings: {
        lecture: '=?',
        actionmethod: '=?'
    },
    controller: LectureDataInputController,
    template: require ('./template.html')
}

module.exports = lectureDataInputComponent;