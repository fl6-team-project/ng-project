const groupProjectTeamController = require('./controller');

const groupProjectTeamComponent = {
  bindings: {
    project: '='
  },
  template: require('./template.html'),
  controller: groupProjectTeamController
};

module.exports = groupProjectTeamComponent;
