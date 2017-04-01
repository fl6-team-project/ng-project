require("./style.scss");

function HomeAdminController($http, $element, AuthService, adminProjServ) {
    let self = this;
    self.$element = $element;
    let id = AuthService.getUser();
    let url = '/api/users/' + id;

    let getCouses = function() {
      $http.get('/api/courses').then(function(res) {
        self.courses = res.data;
        console.log(self.courses);
      });
    }

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
          getCouses();
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

    getCouses();

    self.deleteCourse = function(id){
      console.log("teamForm235235");
      let url = '/api/courses/' + id;
      $http.delete(url).then(function(res) {
        getCouses();
        adminProjServ.updateListCourse();
      });
    }
}

HomeAdminController.$inject = ['$http', '$element', 'AuthService', 'adminProjServ'];

module.exports = HomeAdminController;
