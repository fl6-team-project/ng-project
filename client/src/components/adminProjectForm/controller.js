function adminProjectFormController($http, adminProjServ) {
  let self = this;
  self.leadInfo = null;
  self.leadAll = [];
  self.studentsInfo = [];
  self.leads = {
    model: null,
    availableOptions: []
  };

  self.stud = {
    model: null,
    availableOptions: []
  };

  self.getLeadsData = function(id) {
    $http.get('/api/teachers/').then(function(res) {
      self.leads.model = id;
      self.leadAll = res.data;
      self.leads.availableOptions = self.leadAll;
      jQuery(document).ready(function() {
        jQuery('select.selectLead').material_select();
      });
    });
  };

  self.getStudentsData = function(students) {
    let urlSt = '/api/course/students/' + adminProjServ.courseId;
    $http.get(urlSt).then(function(res) {
      self.stud.model = students;
      self.stud = res.data;
      console.log(adminProjServ.courseId);
      console.log(self.stud);
      self.stud.availableOptions = self.stud;

      jQuery(document).ready(function() {
        jQuery('select.selectStudents').material_select();
      });
    });

  };


  self.saveTeam = function() {
    let data = {
      lead: self.leads.model,
      students: self.stud.model,
      courseId: adminProjServ.courseId
    };
    if (self.create) {
      $http.post('/course/projects', data).then(function(res) {
          self.project = res.data;
          adminProjServ.updateDataAdmCourse();
        },
        function(err) {
          self.error = true;
        });
    } else {
      let url = '/api/project/team/' + self.projId;
      $http.put(url, data).then(function(res) {
          self.project = res.data;
          adminProjServ.updateDataAdmCourse();
        },
        function(err) {
          self.error = true;
        });
    }
  }
}

adminProjectFormController.prototype.$onInit = function() {
  let self = this;
  self.leadEdit = null;
  self.studEdit = null;

  if (!self.create) {
    self.projId = self.projectitem._id;
    self.leadEdit = self.projectitem.lead;
    self.studEdit = self.projectitem.students;
  }
  self.getLeadsData(self.leadEdit);
  self.getStudentsData(self.studEdit);
}

adminProjectFormController.$inject = ['$http', 'adminProjServ'];
module.exports = adminProjectFormController;
