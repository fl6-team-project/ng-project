const EditController = require('./controller.js');

const editComponent = {
    bindings: {
        userobj: '='
    },
    template: require('./template.html'),
    controller: EditController
};

module.exports = editComponent;
