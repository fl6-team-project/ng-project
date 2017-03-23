function UsersListController($http) {
  let self = this;

  $http.get('/api/users').then(function(res) {
    self.persons = res.data;
  });
}


var personsListComponent = {
	bindings: {
		persons: '=?'
	},
	// We can set a templateUrl but then webpack will not load it into bundle
    // So we have to require template also
    // and setup a html-loader to correctly process html bundling

    // Will not bundled:
    //templateUrl: './states/studentList/template.html',

    // Will be bundled correctly:
	template: require('./personsList.html'),
	controller: UsersListController
};

UsersListController.$inject = ['$http'];

module.exports = personsListComponent;