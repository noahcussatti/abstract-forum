angular
  .module("forumApp")
  .service("userService", function ($http) {
    // User Variables
    var _users = []
    var _userId = 4
    // Current User Array
    var _theCurrentUser = []
    // User Constructor
    function User(id, userName, password, email, profilePicture, birthDate, currentUser) {
      this.id = id;
      this.userName = userName;
      this.password = password;
      this.email = email;
      this.profilePicture = profilePicture;
      this.birthDate = birthDate;
      this.isCurrentUser = false;
    }
    // Gets Users
    this.getUsers = function (cb) {
      if (_users.length == 0) {
        $http.get("../db/users.json")
          .success(function (response) {
            _users = response
            cb(_users)
          })
          .error(function (error) {
            console.log(error);
          })
      }
      else {
        cb(_users)
      }
    }
    // Grabs Users by their IDs
    this.getUserById = function (id) {
      if (id === undefined || id === null || id === "") {
        var user = {
          userName: "",
          password: "",
          email: "",
          profilePicture: "",
          birthDate: "",
          isCurrentUser: ""
        }
        return user
      }
      else {
        for (var i = 0; i < _users.length; i++) {
          if (_users[i].id == id) {
            return _users[i]
          }
        }
      }
    }
    // Registering a New User
    this.addUser = function (userName, password, email, profilePicture, birthDate, currentUser) {
      if (profilePicture === "" || profilePicture === null || profilePicture === undefined) {
        if (userName === "" || userName === null || userName === undefined) {
          _users.unshift(new User(_userId++, "Guest", password, email, "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png", birthDate, currentUser))
          console.log(_users);
        }
        else {
          _users.unshift(new User(_userId++, userName, password, email, "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png", birthDate, currentUser))
          console.log(_users);
        }
      }
      else {
        if (userName === "" || userName === null || userName === undefined) {
          _users.unshift(new User(_userId++, "Guest", password, email, profilePicture, birthDate, currentUser))
          console.log(_users);
        }
        else {
          _users.unshift(new User(_userId++, userName, password, email, profilePicture, birthDate, currentUser))
          console.log(_users);
        }
      }
    }
    // Updating a User's Profile
    this.updateUser = function (userId, userName, password, email, profilePicture, birthDate, currentUser) {
      // _users.splice(userId, 1, new User(userId, userName, password, email, profilePicture, birthDate, currentUser))
    }
    // Deleting User's Account
    this.deleteUser = function (userId) {
      for (var i = 0; i < _users.length; i++) {
        if (_users[i].id == userId) {
          _users.splice(i, 1)
        }
      }
    }
    // Signing in a User to set them as Current User
    this.signInUser = function (userName, password) {
      if (_theCurrentUser.length > 0) {
      } else {
        for (var i = 0; i < _users.length; i++) {
          if ((_users[i].userName == userName) && (_users[i].password == password)) {
            _users[i].isCurrentUser = true;
            console.log(_users)
            _theCurrentUser.push(_users[i])
            console.log(_theCurrentUser)
          }
          else {
            console.log("wrong")
            _users[i].isCurrentUser = false;
          }
        }
      }
    }
    // Checking which user is Signed In
    this.whoIsSignedIn = function () {
      for (var i = 0; i < _users.length; i++) {
        if (_users[i].isCurrentUser == true) {
          return _users[i]
        }
      }
    }
    // Sign Out User
    this.signOutUser = function () {
      if (_theCurrentUser.length >= 1) {
        _theCurrentUser.splice(0, 1)
        for (var i = 0; i < _users.length; i++) {
          _users[i].isCurrentUser = false;
        }
        console.log(_theCurrentUser)
      }
    }
  });