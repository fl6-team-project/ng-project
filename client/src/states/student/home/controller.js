function lectureCardItemController($http) {
    let self = this;

    $http.get('/api/lectures').then(function (res) {
        self.lectures = res.data;
    });
}

lectureCardItemController.$inject = ['$http'];

module.exports = lectureCardItemController;