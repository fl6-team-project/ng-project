require('./style.scss');

function LecturesRowListController($http, $state, $timeout) {
    let self = this;

    $http.get('/api/lectures').then(function(res) {
        self.lectures = res.data;
    });

    $timeout(function () {
        $('.collapsible').collapsible({
            accordion : true
        });
    });

    self.runEdit = function (lecture) {
        console.log(lecture);
        $state.go('teacher.editLecture', {lecture: lecture });
    };
}


LecturesRowListController.$inject = ['$http', '$state', '$timeout'];

module.exports = LecturesRowListController;
