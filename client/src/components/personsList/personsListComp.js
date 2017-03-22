function UsersListController() {
}

app.component('personsList', {
	bindings: {
		persons: '=?'
	},
	templateUrl: 'js/components/personsList.html',
	controller: UsersListController
});