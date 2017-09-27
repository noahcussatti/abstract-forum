angular
  .module("forumApp")
  .service("forumDiscussionService", function ($http) {
    // post variables
    var _posts = [];
    var _postId = 2;
    // Declaring Post Constructor
    function Post(id, name, paragraph, upvote, user) {
      this.id = id;
      this.name = name;
      this.paragraph = paragraph;
      this.upvote = upvote;
      this.user = user;
    }
    // Gets Posts to Put on Main Forum Page
    this.getPosts = function (cb) {
      if (_posts.length == 0) {
        $http.get("../db/discussionThreads.json")
          .success(function (response) {
            _posts = response;
            cb(_posts);
          })
          .error(function (error) {
            console.log(error);
          });
      }
      else {
        cb(_posts);
      };
    };
    // Grabbing Posts by their IDs
    this.getPostById = function (id) {
      if (id === undefined || id === null || id === "") {
        var post = {
          name: "",
          paragraph: "",
          upvote: 0,
          user: {
          },
        };
        return post;
      }
      else {
        for (var i = 0; i < _posts.length; i++) {
          if (_posts[i].id == id) {
            return _posts[i]
          };
        };
      };
    };
    // Function to create a new thread
    this.addPost = function (name, paragraph, upvote, user, userId, userName, password, email, profilePicture, birthDate, isCurrentUser, reply) {
      user = {
        id: userId,
        userName: userName,
        password: password,
        email: email,
        profilePicture: profilePicture,
        birthDate: birthDate,
        isCurrentUser: isCurrentUser
      };
      console.log(user);
      _posts.push(new Post(_postId++, name, paragraph, upvote, user));
      console.log(_posts);
    };
  });