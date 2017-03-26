let personsItemComponent = require("./personItem/component"),
    lectureItemComponent = require("./lectureCardItem/component"),
    lectureRowItemComponent = require("./lectureRowItem/component");

module.exports = function(app) {

  app.component('lectureRowItem', lectureRowItemComponent);
  app.component('lectureCardItem', lectureItemComponent);
  app.component('personItem', personsItemComponent);
}
