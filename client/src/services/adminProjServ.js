function adminProjServ($rootScope, $http) {
  let adminProjServ = {};

  adminProjServ.updateDataAdmCourse = function() {
    $rootScope.$broadcast('updateCourseItem');
  }

  adminProjServ.updateListCourse = function() {
    $rootScope.$broadcast('getCouses');
  }

  return adminProjServ;
}

adminProjServ.$inject = ['$rootScope', '$http'];
module.exports = adminProjServ;
