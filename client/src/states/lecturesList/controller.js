require("./style.scss");

function lecturesListController($http) {
  let self = this;

  $http.get('/api/lectures').then(function(res) {
    self.lectures = res.data;
  });

}

lecturesListController.$inject = ['$http'];

module.exports = lecturesListController;
