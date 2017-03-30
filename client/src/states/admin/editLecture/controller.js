function EditLectureController($stateParams) {
    self = this;
    self.lecture = $stateParams.lecture;
    self.lecture = 'edit';
}
EditLectureController.$inject = ['$stateParams'];

module.exports = EditLectureController;
