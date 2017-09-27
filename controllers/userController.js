angular
  .module("forumApp")
  .controller("userController", function ($scope, $state, $stateParams, userService) {

    // Grabbing Users by their ID
    var _user = userService.getUserById($stateParams.id);
    $scope.user = _user;
    $scope.userLength = _user.length;
    $scope.showInvalidLogin = false;
    // Getting Current Users to know who is signed in ATM
    var _theCurrentUsers = userService.whoIsSignedIn();
    $scope.theCurrentUser = _theCurrentUsers;

    if (_theCurrentUsers == null || _theCurrentUsers == undefined || _theCurrentUsers == "") {
      $scope.showSignIn = true;
      $scope.showNewThread = false;
      $scope.showPostThread = false;
    }
    else {
      $scope.showSignIn = false;
      $scope.showNewThread = true;
      $scope.showPostThread = true;
    };
    // Getting Users
    userService.getUsers(function (response) {
      $scope.users = response
    });
    // Show Sign in function (checks to see if there is a signed in user)
    if (_theCurrentUsers == null || _theCurrentUsers == undefined || _theCurrentUsers == "") {
      $scope.showSignIn = true;
    }
    else {
      $scope.showSignIn = false;
    };
    // Checking to see if a user is Creating or Updating their Account
    if ($stateParams.id === undefined || $stateParams.id === null || $stateParams.id === "") {
      $scope.formHeader = "Create an Account"
      $scope.submitButton = true;
      $scope.updateButton = false;
    }
    else {
      $scope.formHeader = "Update Your Account"
      $scope.submitButton = false;
      $scope.updateButton = true;
    };
    // Adding a User
    $scope.addUser = function () {
      userService.addUser($scope.user.userName, $scope.user.password, $scope.user.email, $scope.user.profilePicture, $scope.user.birthDate);
      $state.go("users");
    };
    // Updating a User
    $scope.updateUser = function () {
      userService.updateUser($stateParams.id);
      $state.go("profileUser", { "id": $stateParams.id });
    };
    // Deleting a User
    $scope.deleteUser = function () {
      userService.deleteUser($stateParams.id);
      $state.go("users");
    };
    // Allow user to Sign in
    $scope.signInUser = function () {
      userService.signInUser($scope.currentUser.userName, $scope.currentUser.password);
      $state.go("users");
    };
    // Allow Current User to Sign out
    $scope.signOutUser = function () {
      userService.signOutUser();
      $state.go("home");
    };

  });