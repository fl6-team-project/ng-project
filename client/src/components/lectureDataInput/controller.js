require ('./style.scss');

function LectureDataInputController($http, $state, $timeout) {
    self = this;

    //wait when rendering finished and update labels
    $timeout(function () {
        Materialize.updateTextFields();
    });

    //updating lecture in DB
    self.saveEditing = function (id, object) {
        $http.put('/api/lectures/' + id, object).then(function(res) {
            self.lectures = res.data;

            //redirect to lecture list
            //@todo automated redirection to user role
            $state.go('teacher.lectures');
        });
    };

}


LectureDataInputController.prototype.$onInit = function() {
    self = this;
    // preset a date to date input
    self.lecture.lectureScheduledDate = new Date(self.lecture.lectureScheduledDate);
    self.lecture.homeworkDeadline = new Date(self.lecture.homeworkDeadline);
};

LectureDataInputController.$inject = ['$http', "$state", "$timeout"];
module.exports = LectureDataInputController;