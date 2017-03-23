var personsItemComponent = require("./personItem/personItemComponent"),
    lectureItemComponent = require("./lectureItem/lectureItemComponent");

module.exports = function(app) {

  app.component('lectureItem', lectureItemComponent);
  app.component('personItem', personsItemComponent);
}
