const lectureItemController = require('./lectureItemController');

var lectureItemComponent = {
    bindings: {
        lectures: '=?'
    },
    template: require('./lectureItem.html'),
    controller: lectureItemController
};

module.exports = lectureItemComponent;