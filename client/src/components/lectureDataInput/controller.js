require ('./style.scss');

function LectureDataInputController($http) {
    self = this;

    self.saveEditing = function (id, object) {
        console.log(object);
        $http.put('/api/lectures/'+id).then(function(res) {
            self.lectures = res.data;
        });
    };


}

LectureDataInputController.$inject = ['$http'];
module.exports = LectureDataInputController;