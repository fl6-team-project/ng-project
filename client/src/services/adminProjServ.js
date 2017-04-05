function adminProjServ($rootScope, $http) {
  let adminProjServ = {};

  adminProjServ.updateDataAdmCourse = function() {
    $rootScope.$broadcast('updateCourseItem');
  }

  adminProjServ.updateListCourse = function() {
    $rootScope.$broadcast('getCouses');
  }

  adminProjServ.updatePersons = function(url, data) {
    console.log("update PErs");
    console.log(data);
    $http.put(url, data).then(function(res) {
        console.log(res.data);
      },
      function(err) {
        self.error = true;
      });
  }

  return adminProjServ;
}

adminProjServ.$inject = ['$rootScope', '$http'];
module.exports = adminProjServ;
