let personsItemComponent = require("./personItem/component"),
    lectureItemComponent = require("./lectureCardItem/component"),
    lectureRowItemComponent = require("./lectureRowItem/component");
    lectureDataInputComponent = require("./lectureDataInput/component");

module.exports = function(app) {

  app.component('lectureRowItem', lectureRowItemComponent);
  app.component('lectureCardItem', lectureItemComponent);
  app.component('personItem', personsItemComponent);
  app.component('lectureDataInput', lectureDataInputComponent);
}
