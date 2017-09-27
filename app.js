var app = angular.module("forumApp", ["ui.router"])

app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "./views/home.html",
      controller: "userController"
    })
    // User
    .state("users", {
      url: "/users",
      templateUrl: "./views/user_index",
      controller: "userController"
    })
    .state("newUser", {
      url: "/users/signup",
      templateUrl: "./views/user_form.html",
      controller: "userController"
    })
    .state("signInUser", {
      url: "/users/sign-in",
      templateUrl: "./views/user_signIn.html",
      controller: "userController"
    })
    .state("profileUser", {
      url: "/users/:id",
      templateUrl: "./views/user_profile.html",
      controller: "userController"
    })
    .state("editUser", {
      url: "/users/:id/edit",
      templateUrl: "./views/user_form.html",
      controller: "userController"
    })
    // Forum
    .state("forum", {
      url: "/forum",
      templateUrl: "./views/forum_index",
      controller: "forumController"
    })
    // Forum Rules Thread
    .state("forumRules", {
      url: "/forum/rules",
      templateUrl: "./views/forum_rules",
      controller: "forumController"
    })
    .state("forumRuleForm", {
      url: "/forum/rules/reply",
      templateUrl: "./views/forum_form.html",
      controller: "forumController"
    })
    // Forum General Thread
    .state("forumGeneral", {
      url: "/forum/general-discussion",
      templateUrl: "./views/forum_discussion.html",
      controller: "forumDiscussionController"
    })
    .state("forumGeneralForm", {
      url: "/forum/general-discussion/reply",
      templateUrl: "./views/forum_discussion_form.html",
      controller: "forumDiscussionController"
    })
    // Forum Application Thread
    .state("forumApplication", {
      url: "/forum/applications",
      templateUrl: "./views/forum_application.html",
      controller: "forumApplicationController"
    })
    .state("forumApplicationForm", {
      url: "/forum/applications/reply",
      templateUrl: "./views/forum_application_form.html",
      controller: "forumApplicationController"
    })
    // Forum Introductions Thread
    .state("forumIntroduction", {
      url: "/forum/introductions",
      templateUrl: "./views/forum_introduction.html",
      controller: "forumIntroductionController"
    })
    .state("forumIntroductionForm", {
      url: "/forum/introductions/reply",
      templateUrl: "./views/forum_introduction_form.html",
      controller: "forumIntroductionController"
    })

});