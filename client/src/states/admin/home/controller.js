require("./style.scss");

function HomeAdminController($http, $element, AuthService, adminProjServ) {
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

          adminProjServ.updateListCourse();
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

    let getCouses = function() {
      $http.get('/api/courses').then(function(res) {
        self.courses = res.data;
        console.log(self.courses);
      });
    }

    getCouses();

    self.deleteCourse = function(id){
      self.teamForm = true;
    }
}

HomeAdminController.$inject = ['$http', '$element', 'AuthService', 'adminProjServ'];

module.exports = HomeAdminController;
