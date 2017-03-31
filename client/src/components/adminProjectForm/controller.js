function adminProjectFormController($http, adminProjServ) {
  let self = this;
  self.leadAll = [];
  self.studentsInfo = [];
  self.leads = {
    model: null,
    availableOptions: []
  };

  self.stud = {
    model: [],
    availableOptions: []
  };

  self.getLeadsData = function(id) {
    let url = '/api/teachers/' + id;
    $http.get(url).then(function(res) {
      self.leadInfo = res.data;
      self.leads.model = self.leadInfo._id;
    });
    $http.get('/api/teachers/').then(function(res) {
      self.leadAll = res.data;
      self.leads.availableOptions = self.leadAll;
      jQuery(document).ready(function() {
        jQuery('select.selectLead').material_select();
      });
    });
  };

  self.getStudentsData = function(students) {
    for (var i = 0; i < students.length; i++) {
      let url = '/api/users/' + students[i];
      $http.get(url).then(function(res) {
        self.stud.model.push(res.data);
        console.log(self.stud.model);
      });
    }

    let urlSt = '/api/course/students/' + adminProjServ.courseId;
    $http.get(urlSt).then(function(res) {
      self.stud = res.data;
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
    console.log(self.projId );
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

adminProjectFormController.prototype.$onInit = function() {
  let self = this;
  self.projId = self.projectitem._id;
  // console.log(self.projectitem.students);
  self.getLeadsData(self.projectitem.lead);
  self.getStudentsData(self.projectitem.students);

}

adminProjectFormController.$inject = ['$http', 'adminProjServ'];
module.exports = adminProjectFormController;
