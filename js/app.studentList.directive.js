app.directive('studentList', function () {
   return {
       templateUrl: './templates/userList.template.html',
       restrict: 'EA',
       controller: 'studentListCtrl',
       controllerAs: 'studentList',
       scope: true
   }
});