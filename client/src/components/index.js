require("./style.scss");

module.exports = function(app) {
  const lectureItemController = require("./lectureItemController.js");
  app.component('lectureItem', {
    bindings: {
      lecture: '='
    },
    template: require('./lectureItem.html'),
    controller: lectureItemController,
    controllerAs: 'lectureItem'
  });
}
