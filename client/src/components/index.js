require("./style.scss");
let personsItemComponent = require("./personItem/component"),
    lectureItemComponent = require("./lectureCardItem/component"),
    feedbackPopUpComponent = require("./feedbackPopUp/component"),
    lectureRowItemComponent = require("./lectureRowItem/component");

module.exports = function(app) {

  app.component('lectureRowItem', lectureRowItemComponent);
  app.component('lectureCardItem', lectureItemComponent);
  app.component('personItem', personsItemComponent);
  app.component('feedbackPopUp', feedbackPopUpComponent);

  const recentTasksController = require("./tasks/recentTasksController.js");
  app.component('recentTaskItem', {
    bindings: {
      task: '='
    },
    template: require('./tasks/template.html'),
    controller: recentTasksController,
    controllerAs: 'recentTaskItem'
  });

  const closedTasksController = require("./tasks/closedTasksController.js");
  app.component('closedTaskItem', {
    bindings: {
      task: '='
    },
    template: require('./tasks/template.html'),
    controller: closedTasksController,
    controllerAs: 'recentTaskItem'
  });

  const formTasksController = require("./tasks/formTasksController.js");
  app.component('formTasks', {
    bindings: {
      lecture: '='
    },
    template: require('./tasks/formTasks.html'),
    controller: formTasksController,
    controllerAs: 'formTasks'
  });

  const tasksSharedService = require("./tasks/tasksSharedService.js");
  app.factory('tasksSharedService', tasksSharedService);
}
