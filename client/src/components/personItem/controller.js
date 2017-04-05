require("./style.scss");

function UsersListController(AuthService, adminProjServ) {
  let self = this;
  self.role = '';
  AuthService.userRole().then(function (userRole) {
      self.role = userRole;
      console.log(self.role);
  });

  self.delUserCourse = function(id){
    let dataCourse = {};
    dataCourse.courseId = '';
    dataCourse.groupProjectId = '';
    let url = '/api/course/users/delcourse/' + id;
    adminProjServ.updatePersons(url, dataCourse);
    adminProjServ.updateDataAdmCourse();
    self.person.courseId = '';
  }
}

UsersListController.$inject = ['AuthService', 'adminProjServ'];
module.exports = UsersListController;
