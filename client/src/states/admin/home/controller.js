require("./style.scss");

function HomeAdminController($http, $element, AuthService) {
    let self = this;
    self.$element = $element;
    let id = AuthService.getUser();
    let url = '/api/users/' + id;
    $http.get(url).then(function (res) {
        self.role = res.data.userRole;
    });

    self.saveCourse = function(){
      let data = {
        name: self.courseName,
        startFrom: self.startFrom
      };
      $http.post('/api/courses', data).then(function(res) {
          self.course = res.data;
          self.courseName = '';
          self.startFrom = '';
        },
        function(err) {
          self.error = true;
        });
    }

    $http.get('/api/lectures/').then(function (res) {
        self.lectCount = res.data.length
    });

    $http.get('/api/users/').then(function (res) {
        self.userCount = res.data.length
    });


    // jQuery(self.$element[0].querySelector('ul.tabs')).tabs();
}

HomeAdminController.$inject = ['$http', '$element', 'AuthService'];

module.exports = HomeAdminController;
