function adminProjServ($rootScope, $http) {
  let adminProjServ = {};

  adminProjServ.updateDataAdmCourse = function() {
    $rootScope.$broadcast('updateDataAdmCourse');
  }

  return adminProjServ;
}

adminProjServ.$inject = ['$rootScope', '$http'];
module.exports = adminProjServ;
