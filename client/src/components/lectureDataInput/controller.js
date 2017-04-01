require ('./style.scss');

function LectureDataInputController($http, $state, $timeout, AuthService) {
    self = this;
    self.role = '';

    self.data = {
        model: null,
        availableOptions: [
            {id: '1', name: 'Option A'},
            {id: '2', name: 'Option B'},
            {id: '3', name: 'Option C'}
        ]
    };

    $http.get('/api/teachers').then(function (res) {
        self.teachers = res.data;
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
LectureDataInputController.prototype.$postLink = function () {
    $('select').material_select();
};

LectureDataInputController.$inject = ['$http', "$state", "$timeout", "AuthService"];
module.exports = LectureDataInputController;