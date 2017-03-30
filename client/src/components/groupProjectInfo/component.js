const groupProjectInfoController = require('./controller');

const groupProjectInfoComponent = {
  bindings: {
    project: '='
  },
  template: require('./template.html'),
  controller: groupProjectInfoController
};

module.exports = groupProjectInfoComponent;
