const feedbackPopUpController = require("./controller.js");

const feedbackPopUpComponent = {
  bindings: {
    lecture: '='
  },
  template: require('./template.html'),
  controller: feedbackPopUpController,
  controllerAs: 'feedbackPopUp'
};

module.exports = feedbackPopUpComponent;
