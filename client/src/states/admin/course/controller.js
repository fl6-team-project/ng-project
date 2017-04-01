function CourseComponentController($element, $http, $rootScope, adminProjServ) {
  let scope = $rootScope.$new(),
    self = this;
  self.lectures = [];
  self.$element = $element;
  jQuery(self.$element[0].querySelector('ul.tabs')).tabs();
  self.create = true;
  self.course = adminProjServ.courseChecked;

  self.lectNewSelect = {
    model: null,
    availableOptions: []
  };
  // self.lectNewSelect = [];

  let getStudents = function() {
    let url = '/api/course/students/' + self.course._id;

    $http.get(url).then(function(res) {
      self.students = res.data;
    });
  }

  let getProjects = function() {
    $http.get('/api/course/projects').then(function(res) {
      self.projects = res.data;
      // console.log(self.projects);
    });
  }

  let getLectures = function() {
    let lectArr = self.course.lectures;
    for (var i = 0; i < lectArr.length; i++) {
      $http.get('/api/lectures/' + lectArr[i]).then(function(res) {
        self.lectures.push(res.data);
      });
    }
  }

  let getNewLect = function() {
    let url = '/api/lectures/nonecourse/' +  self.course._id;
    $http.get(url).then(function(res) {
      console.log(res.data);
      self.lectNewSelect.availableOptions = res.data;
      jQuery(document).ready(function() {
        jQuery('select.selectLectures').material_select();
      });
    });
  }

  getLectures();
  // getNewLect();
  getProjects();
  getStudents();

  scope.$on('updateCourseItem', function(event) {
    self.course = adminProjServ.courseChecked;
    console.log("self.course Name " + self.course.name);
    getLectures();
    // getNewLect();
    getProjects();
    getStudents();
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
