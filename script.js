// Code goes here
(function() {
  var app = angular.module('myApp', []);
      app.controller('MainController',["$http","$scope", function($http, $scope) {
      $scope.message = "Hello Angular!";
      $scope.isError = false;
      var onUserComplete = function(res) {
        $scope.user = res.data;
      }; 
      var onError = function() {
        $scope.isError = true;
        $scope.error = "could not fetch ther user";
      }
      $http.get("https://api.github.com/users/manishsaraan")
        .then(onUserComplete, onError);
    }]);
})();