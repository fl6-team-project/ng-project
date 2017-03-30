function lectureCardItemController($http, $element, AuthService) {
    let self = this;
    self.$element = $element;
    let id = AuthService.getUser();
    let url = '/api/users/' + id;
    $http.get(url).then(function (res) {
        self.role = res.data.userRole;
    });

    $http.get('/api/lectures/last').then(function (res) {
        self.lectures = res.data;
    });


    jQuery(self.$element[0].querySelector('ul.tabs')).tabs();
}

lectureCardItemController.$inject = ['$http', '$element', 'AuthService'];

module.exports = lectureCardItemController;
