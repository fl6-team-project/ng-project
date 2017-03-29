function AddLectureController($http, $stateParams) {
    self = this;
    self.lecture = $stateParams.lecture;

    $http.get('/api/lectures').then(function(res) {
        self.lectures = res.data;
    });

}
AddLectureController.$inject = ['$http','$stateParams'];

module.exports = AddLectureController;
