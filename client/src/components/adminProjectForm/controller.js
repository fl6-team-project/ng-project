function adminProjectFormController($http, adminProjServ, $rootScope) {
  let scope = $rootScope.$new(),
    self = this;
  self.leadInfo = null;
  self.leadAll = [];
  self.course = adminProjServ.courseChecked;

  self.leads = {
    model: null,
    availableOptions: []
  };

  self.stud = {
    model: null,
    availableOptions: []
  };


  self.getLeadsData = function(id) {
    $http.get('/api/teachers/nonproj/').then(function(res) {
      self.leads.model = id;
      self.leadAll = res.data;
      // if (id !== null) {
      //   let updProj = {
      //     groupProjectId: ''
      //   };
      //   let url = '/api/project/users/' + id;
      //   adminProjServ.updatePersons(url, updProj);
      // }
      self.leads.availableOptions = self.leadAll;
      jQuery(document).ready(function() {
        jQuery('select.selectLead').material_select();
      });
    });
  };

  self.getStudentsData = function(students) {
    let url = '/api/course/students/nonproj/' + self.course._id;
    self.stud.model = students;

    $http.get(url).then(function(res) {
      self.students = res.data;
      // if (students !== null) {
      //   for (let i = 0; i < students.length; i++) {
      //     let updProj = {
      //       groupProjectId: ''
      //     };
      //     let url = '/api/project/users/' + students[i];
      //     adminProjServ.updatePersons(url, updProj);
      //   }
      // }
      self.stud.availableOptions = self.students;
      jQuery(document).ready(function() {
        jQuery('select.selectStudents').material_select();
      });
    });
  }

  self.saveTeam = function() {
    let data = {
      lead: self.leads.model,
      students: self.stud.model,
      courseId: self.course._id
    };

    let studChanArr = self.stud.model;
    // if (self.create) {
    let url = '/api/course/projects/' + self.course._id;
    $http.post(url, data).then(function(res) {
        self.projCur = res.data;
        console.log("self.projCur");
        console.log(self.projCur);
        let updProj = {
          groupProjectId: self.projCur._id
        };
        let url = '/api/project/users/' + self.leads.model;
        adminProjServ.updatePersons(url, updProj);
        let studProjArr = self.stud.model;
        for (let i = 0; i < studProjArr.length; i++) {
          url = '/api/project/users/' + studProjArr[i];
          adminProjServ.updatePersons(url, updProj);
        }
        adminProjServ.updateDataAdmCourse();
      },
      function(err) {
        self.error = true;
      });

    // }
    // else {
    //   let url = '/api/project/team/' + self.projId;
    //   let data = {
    //     lead: self.leads.model,
    //     students: self.stud.model
    //   };
    //   $http.put(url, data).then(function(res) {
    //       self.projCur = res.data;
    //       let updProj = {
    //         groupProjectId: self.projId
    //       };
    //       let url = '/api/project/users/' + self.leads.model;
    //       adminProjServ.updatePersons(url, updProj);
    //       let studProjArr = self.stud.model;
    //       for (let i = 0; i < studProjArr.length; i++) {
    //         url = '/api/project/users/' + studProjArr[i];
    //         adminProjServ.updatePersons(url, updProj);
    //       }
    //       self.create = true;
    //       adminProjServ.updateDataAdmCourse();
    //     },
    //     function(err) {
    //       self.error = true;
    //     });
    // }
  }

  scope.$on('updateCourseItem', function(event) {
    self.course = adminProjServ.courseChecked;
    self.getLeadsData(self.leadEdit);
    self.getStudentsData(self.studEdit);
  });
}

adminProjectFormController.prototype.$onInit = function() {
  let self = this;
  self.leadEdit = null;
  self.studEdit = null;
  if (!self.create) {
    self.projId = self.projectitem._id;
    self.leadEdit = self.projectitem.lead;
    self.studEdit = self.projectitem.students;
    self.getLeadsData(self.leadEdit);
    self.getStudentsData(self.studEdit);
  }
}

//
// adminProjectFormController.prototype.$postLink = function () {
//   jQuery(document).ready(function() {
//     jQuery('select').material_select();
//   });
// }

adminProjectFormController.$inject = ['$http', 'adminProjServ', '$rootScope'];
module.exports = adminProjectFormController;
