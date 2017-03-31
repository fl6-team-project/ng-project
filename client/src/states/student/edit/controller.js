require("./style.scss");

function EditController($http, $element, $scope, Upload, $timeout) {
  let self = this;
  self.$element = $element;
  self.editMess = {
    'title': 'Error',
    'message': "Sorry, smth wrong. Let/'s try later!",
    "btn": "Ok"
  };
  // let scope = $rootScope.$new();
  // scope.$on('setData', function(event, data) {
  //   self.user = data;
  // });


  let id = '58da511b462e204c9caafdb8';
  let url = '/api/users/' + id;
  $http.get(url).then(function(res) {
    self.user = res.data;
  });

  self.editProfile = function() {
    let url = '/api/users/' + self.user._id;
    let data = self.user;
    console.log(data);
    self.error = false;

    $http.put(url, data).then(function(res) {
        self.student = res.data;
        self.editMess = {
          'title': 'Success',
          'message': 'Your profile edit',
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

  $scope.uploadPic = function(file) {
    file.upload = Upload.upload({
      // url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
      url: '/api/edit/upload',
      headers: {
        'Content-Type': file.type
      },
      data: {
        username: $scope.username,
        file: file
      },
    });

    file.upload.then(function(response) {
      $timeout(function() {
        file.result = response.data;
      });
    }, function(response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function(evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }

}

EditController.$inject = ['$http', '$element', '$scope', 'Upload', '$timeout'];
module.exports = EditController;
