require("./style.scss");

function EditController($http, $element, AuthService) {
  let self = this;
  self.$element = $element;
  self.newPassword = '';

  self.editMess = {
    'title': 'Error',
    'message': "Sorry, smth wrong. Try later!",
    "btn": "Ok"
  };

  let id = AuthService.getUser();
  let url = '/api/users/' + id;
  $http.get(url).then(function(res) {
    self.user = res.data;
  });

  self.editProfile = function() {
    let url = '/api/users/' + self.user._id;
    if(self.newPassword !== ''){
        self.user.password = self.newPassword;
    }

    let data = self.user;

    self.error = false;
    $http.put(url, data).then(function(res) {
        console.log(res);
        self.student = res.data;
        //change current values in view
        self.userobj = data;
        // console.log(data);
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

EditController.$inject = ['$http', '$element', 'AuthService'];
module.exports = EditController;
