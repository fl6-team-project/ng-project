function EditLectureController($stateParams) {
    self = this;
    self.lecture = $stateParams.lecture;
    self.actionMethod = 'edit';
}
EditLectureController.$inject = ['$stateParams'];

module.exports = EditLectureController;
