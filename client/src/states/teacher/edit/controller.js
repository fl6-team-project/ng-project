require("./style.scss");

function EditController($http, $element, $scope, $timeout, AuthService) {
  let self = this;
  self.$element = $element;
  self.editMess = {
    'title': 'Error',
    'message': "Sorry, smth wrong. Let/'s try later!",
    "btn": "Ok"
  };

  let id = AuthService.getUser();
  let url = '/api/users/' + id;
  $http.get(url).then(function(res) {
    self.user = res.data;
  });

  self.editProfile = function() {
    console.log("save");
    let url = '/api/users/' + self.user._id;
    let data = self.user;
    console.log(data);
    self.error = false;

    $http.put(url, data).then(function(res) {
        self.student = res.data;
        self.editMess = {
          'title': 'Success',
          'message': 'Your profile was edited',
          "btn": "Cool!"
        };
        jQuery('.modal').modal();
        jQuery('.modal').modal('open');
      },
      function(err) {
        self.error = true;
        jQuery('.modal').modal();
        jQuery('.modal').modal('open');
      });
  }

}

EditController.$inject = ['$http', '$element', '$scope', '$timeout', 'AuthService'];
module.exports = EditController;
