// Code goes here
(function() {
  var app = angular.module('myApp', []);
      app.controller('MainController',["$http","$scope", function($http, $scope) {
      $scope.message = "Github Viewer!";
      $scope.isError = false;
    
      var onUserComplete = function(res) {
        $scope.user = res.data;      
        $http.get($scope.user.repos_url).then(onRepos, onError);
      }; 
      
      //fetch all the repos
      var onRepos = function(res){
         $scope.repos = res.data;
      }
      var onError = function() {
        $scope.isError = true;
        $scope.error = "could not fetch the data";
      };

      $scope.search = function(username){
               $http.get("https://api.github.com/users/"+username)
                    .then(onUserComplete, onError);
      };

    }]);
})();