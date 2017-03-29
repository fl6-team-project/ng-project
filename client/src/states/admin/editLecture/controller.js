function EditLectureController($stateParams) {
    self = this;
    self.lecture = $stateParams.lecture;
}
EditLectureController.$inject = ['$stateParams'];

module.exports = EditLectureController;
