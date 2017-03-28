function LectureRowItemController($state) {
    let self = this;

    self.runEdit = function (lecture) {
        $state.go('teacher.editLecture', {lecture: lecture });
    }
}
LectureRowItemController.$inject = ['$state'];

module.exports = LectureRowItemController;
