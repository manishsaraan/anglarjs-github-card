// Code goes here
(function() {
  var app = angular.module('myApp', []);
      app.controller('MainController',["$http","$scope", "$interval", "$anchorScroll", "$location", function($http, $scope, $interval, $anchorScroll, $location) {
      $scope.message = "Github Viewer!";
      $scope.isError = false;
      $scope.repoSortOrder = "-stargazers_count";
      $scope.countdown = 10;   
      var onUserComplete = function(res) {
        $scope.isError = false;
        $scope.user = res.data;      
        $http.get($scope.user.repos_url).then(onRepos, onError);
      }; 
      
      //fetch all the repos
      var onRepos = function(res){
         $scope.repos = res.data;
         $location.hash("userDetails");
         $anchorScroll();
      }

      var decrementCountdown = function(){
         $scope.countdown -= 1;
         if($scope.countdown < 1){
           $scope.search($scope.username);
         }
      };
      var countdownInterval = null;
      var startCountdown = function(){
         countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
      };
      startCountdown();

      var onError = function() {
        $scope.isError = true;
        $scope.error = "could not fetch the data";
      };

      $scope.search = function(username){
               $http.get("https://api.github.com/users/"+username)
                    .then(onUserComplete, onError);
               //if user beats the countdown, cancel search
               if(countdownInterval){
                 $interval.cancel(countdownInterval);
                 $scope.countdown = null;
               }
      };
      
    }]);
})();