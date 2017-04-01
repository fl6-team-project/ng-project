const feedbackPopUpController = require("./controller.js");

const feedbackPopUpComponent = {
  bindings: {
    lecture: '=',
    serv: '='
  },
  template: require('./template.html'),
  controller: feedbackPopUpController,
  controllerAs: 'feedbackPopUp'
};

module.exports = feedbackPopUpComponent;
