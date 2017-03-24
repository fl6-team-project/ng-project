const LectureRowItemController = require ('./controller.js');

const LectureRowItemComponent = {
    bindings: {
        lecture: '=?'
    },
    controller: LectureRowItemController,
    template: require ('./template.html')
}

module.exports = LectureRowItemComponent;