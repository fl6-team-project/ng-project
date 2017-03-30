const AddUserController = require ('./controller');

const addUserComponent = {
    controller: AddUserController,
    template: require('./template.html')
};

module.exports = addUserComponent;