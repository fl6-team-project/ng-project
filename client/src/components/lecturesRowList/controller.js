require('./style.scss');

function LecturesRowListController($http, $state, $timeout, popUpService) {
    let self = this;

    $http.get('/api/lectures').then(function(res) {
        self.lectures = res.data.sort(function (a, b) {
            return new Date(a.lectureScheduledDate).getTime() - new Date(b.lectureScheduledDate).getTime();
        });
    });

    $timeout(function () {
        $('.collapsible').collapsible({
            accordion : true
        });
    });

    self.runEdit = function (lecture) {
        $state.go('teacher.editLecture', {lecture: lecture });
    };
    self.openPopUpClick = function(id){
        popUpService.openPopUpClick(id);
    }
}


LecturesRowListController.$inject = ['$http', '$state', '$timeout', 'popUpService'];

module.exports = LecturesRowListController;
