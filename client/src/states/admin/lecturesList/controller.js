require ('./style.scss');

function LecturesListController($state) {
    let self = this;
    self.runAdd = function () {
        $state.go('admin.addLecture');
    };

}
LecturesListController.$inject = ['$state'];

module.exports = LecturesListController;
