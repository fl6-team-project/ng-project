const LoginController = require('./controller.js');

const loginComponent = {
    template: require('./template.html'),
    controller: LoginController,
    controllerAs: 'login'
};

module.exports = loginComponent;