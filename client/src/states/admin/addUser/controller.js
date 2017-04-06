function AddUserController($http) {
  let self = this;
  self.editMess = {
    'title': 'Error',
    'message': "Sorry, smth wrong. Try later!",
    "btn": "Ok"
  };

  self.addUser = function(user) {

    $http.post('/api/users', user).then(function(res) {
      console.log(res);
      self.editMess = {
        'title': 'Success',
        'message': 'New user add',
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
AddUserController.prototype.$postLink = function() {
  $('select').material_select();
}
AddUserController.$inject = ['$http'];
module.exports = AddUserController;
