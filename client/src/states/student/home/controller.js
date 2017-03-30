function lectureCardItemController($http, $element, AuthService) {
    let self = this;
    self.$element = $element;
    self.role = AuthService.getUser().data.role;

    $http.get('/api/lectures/last').then(function (res) {
        self.lectures = res.data;
    });

    console.log(AuthService.getUser().data);

    jQuery(self.$element[0].querySelector('ul.tabs')).tabs();
}

lectureCardItemController.$inject = ['$http', '$element', 'AuthService'];

module.exports = lectureCardItemController;
