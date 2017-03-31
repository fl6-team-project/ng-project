require("./style.scss");
let personsItemComponent = require("./personItem/component"),
    personsSmallItemComponent = require("./personSmallItem/component"),
    lectureItemComponent = require("./lectureCardItem/component"),
    feedbackPopUpComponent = require("./feedbackPopUp/component"),
    popUpService = require("./feedbackPopUp/popUpService"),
    adminProjServ = require("./adminTeamItem/adminProjServ"),
    groupProjectTeamComponent = require("./groupProjectTeam/component"),
    groupProjectInfoComponent = require("./groupProjectInfo/component"),
    lectureRowItemComponent = require("./lectureRowItem/component"),
    lectureDataInputComponent = require("./lectureDataInput/component"),
    adminTeamItemComponent = require("./adminTeamItem/component"),
    adminProjectFormComponent = require("./adminProjectForm/component"),
    popUpInfoComponent = require("./popUpInfo/component");

module.exports = function(app) {

  app.component('lectureRowItem', lectureRowItemComponent);
  app.component('lectureCardItem', lectureItemComponent);
  app.component('personItem', personsItemComponent);
  app.component('personSmallItem', personsSmallItemComponent);
  app.component('lectureDataInput', lectureDataInputComponent);
  app.component('feedbackPopUp', feedbackPopUpComponent);
  app.component('groupProjectTeam', groupProjectTeamComponent);
  app.component('groupProjectInfo', groupProjectInfoComponent);
  app.component('adminTeamItem', adminTeamItemComponent);
  app.component('popUpInfo', popUpInfoComponent);
  app.component('adminProjectForm', adminProjectFormComponent);

  const recentTasksController = require("./tasks/recentTasksController.js");
  app.component('recentTaskItem', {
    bindings: {
      task: '='
    },
    template: require('./tasks/template.html'),
    controller: recentTasksController
  });

  const closedTasksController = require("./tasks/closedTasksController.js");
  app.component('closedTaskItem', {
    bindings: {
      task: '='
    },
    template: require('./tasks/template.html'),
    controller: closedTasksController
  });

  const formTasksController = require("./tasks/formTasksController.js");
  app.component('formTasks', {
    bindings: {
      lecture: '='
    },
    template: require('./tasks/formTasks.html'),
    controller: formTasksController
  });

  const tasksSharedService = require("./tasks/tasksSharedService.js");
  app.factory('tasksSharedService', tasksSharedService);
  app.factory('popUpService', popUpService);
  app.factory('adminProjServ', adminProjServ);
}
