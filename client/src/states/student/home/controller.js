function lectureCardItemController($http, $element) {
    let self = this;
    self.$element = $element;

    $http.get('/api/lectures/last').then(function (res) {
        self.lectures = res.data;
    });

    jQuery(self.$element[0].querySelector('ul.tabs')).tabs();
}

lectureCardItemController.$inject = ['$http', '$element'];

module.exports = lectureCardItemController;
