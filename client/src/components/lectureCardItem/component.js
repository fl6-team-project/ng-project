const lectureItemController = require('./controller');

const lectureItemComponent = {
    bindings: {
        lecture: '='
    },
    template: require('./template.html'),
    controller: lectureItemController
};

module.exports = lectureItemComponent;