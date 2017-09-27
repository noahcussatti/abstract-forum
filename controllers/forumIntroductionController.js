angular
  .module("forumApp")
  .controller("forumIntroductionController", function ($scope, $state, $stateParams, forumIntroductionService, userService) {
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
    // Grabbing Posts
    var _post = forumIntroductionService.getPostById($stateParams.id);
    $scope.post = _post;
    forumIntroductionService.getPosts(function (response) {
      $scope.threads = response;
    });

    $scope.upvoteDisabled = false;
    $scope.disableUpvote = function () {
      $scope.post.isUpvoted = true;
      $scope.post.isUpvoted == "Liked!"
    };
    // Add Post Function (connects to forumIntroductionService)
    $scope.addPost = function () {
      forumIntroductionService.addPost($scope.post.name, $scope.post.paragraph, $scope.post.upvote, $scope.post.isUpvoted, $scope.post.user, $scope.theCurrentUser.id, $scope.theCurrentUser.userName, $scope.theCurrentUser.password, $scope.theCurrentUser.email, $scope.theCurrentUser.profilePicture, $scope.theCurrentUser.birthDate, $scope.theCurrentUser.isCurrentUser);
      console.log($scope.theCurrentUser.id);
      console.log(_post);
      $state.go("forumIntroduction");
    };
    // Sign out User
    $scope.signOutUser = function () {
      userService.signOutUser();
      $state.go("home");
    };
  });