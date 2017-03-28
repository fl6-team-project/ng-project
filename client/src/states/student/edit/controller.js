function EditController($http, $element, $rootScope) {
  let self = this;
  let scope = $rootScope.$new();
  scope.$on('setData', function(event, data) {
    self.user = data;
  });

  self.editProfile = function(){
    let url = '/api/users/' + self.user._id;
    let data = self.user;
    console.log(data);
    self.error = false;

    $http.put(url, data).then(function(res) {
        self.student = res.data;
      },
      function(err) {
        self.error = true;
      });
    self.text = '';
  }
}

EditController.$inject = ['$http', '$element', '$rootScope'];
module.exports = EditController;
