const HomeListController = require ('./controller');

const homeComponent = {
    bindings: {
        lectures: '=?'
    },
    controller: HomeListController,
    template: require('./template.html')
};

module.exports = homeComponent;