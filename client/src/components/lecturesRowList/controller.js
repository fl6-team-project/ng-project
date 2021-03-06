require('./style.scss');

function LecturesRowListController($http, $state, $timeout, AuthService, popUpService) {
    let self = this;

    self.role = '';
    self.userId = AuthService.getUser();

    $http.get('/api/teachers').then(function(res) {
        self.teachers = res.data;
        self.getTeacher = function (teacherId) {

            return self.teachers.find(function (teacher) {
                return teacher._id === teacherId;
            })
        };
    });


    AuthService.userRole().then(function (userRole) {
        self.role = userRole;
    });

    self.runEdit = function (lecture, $event) {
        $event.preventDefault();
        $state.go(self.role + '.editLecture', {lecture: lecture });
    };

    self.runDelete = function (id) {
        $http.delete('/api/lectures/' + id ).then(function() {

            //remove lecture from list to re-render list
            self.lectures = self.lectures.filter(function (lecture) {
                return lecture._id !== id ;
            });
        });

    };

    self.openPopUpClick = function(id){
      popUpService.openPopUpClick(id);
    };

    $timeout(function () {
        $('.collapsible').collapsible({
            accordion : true
        });
    });
}


LecturesRowListController.$inject = ['$http', '$state', '$timeout', 'AuthService', 'popUpService'];

module.exports = LecturesRowListController;
