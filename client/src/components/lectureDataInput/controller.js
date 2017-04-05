require ('./style.scss');

function LectureDataInputController($http, $state, $timeout, AuthService) {
    self = this;
    self.role = '';

    $http.get('/api/teachers').then(function (res) {
        self.teachers = res.data;
        jQuery(document).ready(function() {
            jQuery('select.selectTeach').material_select();
        });
    });

    $http.get('/api/courses').then(function(res) {
      self.courseId = res.data;
      jQuery(document).ready(function() {
          jQuery('select.selectCourse').material_select();
      });
    });

    AuthService.userRole().then(function (userRole) {
        self.role = userRole;
    });

    //wait when rendering finished and update labels
    $timeout(function () {
        Materialize.updateTextFields();
    });

    //updating lecture in DB
    self.saveEditing = function (id, object) {
        $http.put('/api/lectures/' + id, object).then(function(res) {
            //redirect to lecture list
            $state.go( self.role + '.lectures');
        });
    };

    self.addLecture = function (object) {
        $http.post('/api/lectures', object).then(function(res) {
            //redirect to lecture list
            $state.go( self.role + '.lectures');
        });
    };

}


LectureDataInputController.prototype.$onInit = function() {
    self = this;
    // preset a date to date input
    if(self.lecture){
        self.lecture.lectureScheduledDate = new Date(self.lecture.lectureScheduledDate);
        self.lecture.homeworkDeadline = new Date(self.lecture.homeworkDeadline);
    }

};

LectureDataInputController.$inject = ['$http', "$state", "$timeout", "AuthService"];
module.exports = LectureDataInputController;
