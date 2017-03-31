const HomeAdminController = require ('./controller');

const homeAdminComponent = {
    bindings: {
        courses: '='
    },
    controller: HomeAdminController,
    template: require('./template.html')
};

module.exports = homeAdminComponent;
