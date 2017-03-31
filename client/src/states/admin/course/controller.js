function CourseComponentController($element, $http, $rootScope, adminProjServ) {
  let scope = $rootScope.$new(),
    self = this;

  self.$element = $element;
  jQuery(self.$element[0].querySelector('ul.tabs')).tabs();
  self.create = true;
  // adminProjServ.courseId = self.course._id;
  let getStudents = function(){
    let url = '/api/course/students/' + self.course._id;

    $http.get(url).then(function(res) {
        self.students = res.data;
    });
  }

  let getProjects = function(){
    $http.get('/api/course/projects').then(function(res) {
        self.projects = res.data;
        console.log(self.projects);
    });
  }

  scope.$on('updateCourseItem', function(event) {
      getProjects();
      getStudents();
  });

  scope.$on('getCourseInfo', function(event, data) {
    self.course = data;
    adminProjServ.courseId = self.course._id;
    getStudents();
    getProjects();
  });

}

CourseComponentController.$inject = ['$element', '$http', '$rootScope', 'adminProjServ'];
module.exports = CourseComponentController;
