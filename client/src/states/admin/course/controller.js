function CourseComponentController($element, $http, $rootScope, adminProjServ) {
  let scope = $rootScope.$new(),
    self = this;
  self.$element = $element;
  jQuery(self.$element[0].querySelector('ul.tabs')).tabs();
  self.create = true;


  self.studNew = {
    model: null,
    availableOptions: []
  };
  // self.lectNewSelect = [];

  let getStudents = function() {
    self.students = '';
    let url = '/api/course/students/' + self.course._id;
    $http.get(url).then(function(res) {
      self.students = res.data;
      adminProjServ.students = self.students;
    });
  }

  let getStudentsNew = function() {
    $http.get('/api/students/new').then(function(res) {
      console.log(res.data);
      self.studNew.availableOptions = res.data;
      jQuery(document).ready(function() {
        jQuery('select.selectStudentsNew').material_select();
      });
    });
  }

  let getProjects = function() {
    self.projects = '';
    let url = '/api/course/projects/' + self.course._id;
    $http.get(url).then(function(res) {
      self.projects = res.data;
    });
  }

  let getLectures = function() {
    self.lectures = '';
    let url = '/api/course/lectures/' + self.course._id;
    $http.get(url).then(function(res) {
      self.lectures = res.data;
    });
  }

  self.addStudCourse = function() {
    let newStud = self.studNew.model;

    let dataCourse = {};
    dataCourse.courseId = self.course._id;
    console.log(dataCourse);

    for (let i = 0; i < newStud.length; i++) {
      console.log(newStud[i]);

      let url = '/api/course/users/' + newStud[i];
      adminProjServ.updatePersons(url, dataCourse);
      adminProjServ.updateDataAdmCourse();
    }
  }

  scope.$on('updateCourseItem', function(event) {
    console.log("updateCourseItem in course");
    self.course = adminProjServ.courseChecked;
    console.log(self.course);
    getLectures();
    getProjects();
    getStudents();
    getStudentsNew();
  });


  // self.course = adminProjServ.courseChecked;
  // adminProjServ.courseId = self.courseChecked._id;
  // scope.$on('getCourseInfo', function(event, data) {
  //   self.course = data;
  //   adminProjServ.courseId = self.course._id;
  //   getStudents();
  //   getProjects();
  // });

}

CourseComponentController.$inject = ['$element', '$http', '$rootScope', 'adminProjServ'];
module.exports = CourseComponentController;
