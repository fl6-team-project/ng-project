require ('./style.scss');

function LectureDataInputController($http, $state, $timeout) {
    self = this;

    //wait when rendering finished and update labels
    $timeout(function () {

        // @todo needed to fix the date picker
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 3 // Creates a dropdown of 15 years to control year
        });
        Materialize.updateTextFields();
    });


    self.saveEditing = function (id, object) {
        $http.put('/api/lectures/'+id, object).then(function(res) {
            self.lectures = res.data;
            $state.go('teacher.lectures');
        });
    };

}

LectureDataInputController.$inject = ['$http', "$state", "$timeout"];
module.exports = LectureDataInputController;