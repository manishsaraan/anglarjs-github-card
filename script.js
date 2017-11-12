// Code goes here
(function() {
  var app = angular.module('myApp', []);
      app.controller('MainController',["github","$scope", "$interval", "$anchorScroll", "$location", function(github, $scope, $interval, $anchorScroll, $location) {
      $scope.message = "Github Viewer!";
      $scope.isError = false;
      $scope.repoSortOrder = "-stargazers_count";
      $scope.countdown = 10;   
      var onUserComplete = function(data) {
        $scope.isError = false;
        $scope.user = data;      
        github.getRepos($scope.user).then(onRepos, onError);
      }; 
      
      //fetch all the repos
      var onRepos = function(data){
         $scope.repos = data;
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
              github.getUser(username).then(onUserComplete, onError);
               //if user beats the countdown, cancel search
               if(countdownInterval){
                 $interval.cancel(countdownInterval);
                 $scope.countdown = null;
               }
      };
      
    }]);
})();