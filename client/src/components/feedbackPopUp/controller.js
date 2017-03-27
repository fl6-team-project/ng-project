function feedbackPopUpController($http, $element) {
  let self = this;
  self.$element = $element;

  // $scope.$parent.openPopUpClick = function(id){
  //   console.log("click");
  //   let idLecture = '#fb'+id;
  //   console.log(idLecture);
  //   jQuery(self.$element[0].querySelector(idLecture)).modal();
  //   jQuery(self.$element[0].querySelector(idLecture)).modal('open');
  // }

  self.sendFeedback = function(){
    let data = {
      lectureId: self.lecture._id,
      overal: self.overal,
      whatWasGood: self.whatWasGood,
      whatWasBad: self.whatWasBad
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
  }
}

feedbackPopUpController.$inject = ['$http', '$element'];
module.exports = feedbackPopUpController;
