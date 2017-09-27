angular
  .module("forumApp")
  .controller("homeController", function ($scope, $state, $stateParams, userService) {

    var _user = userService.getUserById($stateParams.id);
    $scope.user = _user;
    $scope.userLength = _user.length;

    userService.getUsers(function (response) {
      $scope.users = response;
    });
    // Sign out User
    $scope.signOutUser = function () {
      userService.signOutUser();
      $state.go("home");
    }
  });