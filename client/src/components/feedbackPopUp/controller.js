function feedbackPopUpController($http, $element, AuthService) {

  let self = this;

  self.$onInit = function() {
    self.userId = AuthService.getUser();
    $http.get('/api/feedbacks/homework/' + self.lecture._id).then(function(res) {
          self.homeworks = [];
              res.data.forEach(function (obj) {
                self.homeworks.push(obj.homeworks);
              });
        },
        function(err) {
          self.error = true;
        });
    $http.get('/api/feedback/lecture/' + self.lecture._id).then(function(res) {
          self.studFeedback = res.data;
            self.studFeedback.forEach(function (feedback) {
                $http.get('/api/users/'+feedback.userId).then(function (res) {
                    feedback.studentName = res.data.firstName + ' ' + res.data.lastName;
                });
            });
        // console.log(self.studFeedback);
        },
        function(err) {
          self.error = true;
        });

  };

  self.$element = $element;
    self.feedback = '';
  self.sendFeedback = function() {
    let data = {
      userId: self.userId,
      lectureId: self.lecture._id,
      overal: self.overal,
      whatWasGood: self.whatWasGood,
      whatWasBad: self.whatWasBad,
        studentName: self.studentName
    };

    $http.post('/api/feedbacks', data).then(function(res) {
        self.feedback = res.data;
      },
      function(err) {
        self.error = true;
      });
    self.overal = '';
    self.whatWasGood = '';
    self.whatWasBad = '';
  };

  self.sendHWFeedback = function() {
    let data = {
      lectureId: self.lecture._id,
      homeworks: self.homeworks
    };


    $http.post('/api/feedbacks/homework', data).then(function(res) {
        self.feedback = res.data;
      },
      function(err) {
        self.error = true;
      });
  };


}

feedbackPopUpController.$inject = ['$http', '$element', 'AuthService'];
module.exports = feedbackPopUpController;
