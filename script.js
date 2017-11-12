// Code goes here
(function() {
  var app = angular.module('myApp', []);
      app.controller('MainController',["$http","$scope", function($http, $scope) {
      $scope.message = "Github Viewer!";
      $scope.isError = false;
    
      var onUserComplete = function(res) {
        $scope.user = res.data;      

      }; 

      var onError = function() {
        $scope.isError = true;
        $scope.error = "could not fetch ther user";
      };

      $scope.search = function(username){
               $http.get("https://api.github.com/users/"+username)
                    .then(onUserComplete, onError);
      };

    }]);
})();