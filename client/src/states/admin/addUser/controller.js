function AddUserController($http) {
    let self = this;

    self.addUser = function(user){

        $http.post('/api/users', user).then(function(res) {
            console.log(res);
        });
    }
}
AddUserController.prototype.$postLink = function () {
    $('select').material_select();
}
AddUserController.$inject = ['$http'];
module.exports = AddUserController;
