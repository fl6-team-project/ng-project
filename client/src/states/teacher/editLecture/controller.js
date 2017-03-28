function EditLectureController($http, $stateParams) {
    self = this;
    self.lecture = $stateParams.lecture;

    $http.get('/api/lectures').then(function(res) {
        self.lectures = res.data;
    });

}
EditLectureController.$inject = ['$http','$stateParams'];

module.exports = EditLectureController;
