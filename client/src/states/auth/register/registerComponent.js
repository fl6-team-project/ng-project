const RegisterController = require('./controller.js');

const registerComponent = {
    template: require('./template.html'),
    controller: RegisterController,
    controllerAs: 'reg'
};

module.exports = registerComponent;