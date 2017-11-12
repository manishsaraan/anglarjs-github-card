(function(){
	 var github = function($http, ){
          
         var getUser = function(username){
             return $http.get("https://api.github.com/users/"+username)
                         .then(function(res){
                         	 return res.data;
                         });
         };
         var getRepos = function(user) {
         	return $http.get(user.repos_url)
         	            .then(function(res){
                           return res.data;
                         });
         };
	 	 return {
           getUser : getUser,
           getRepos : getRepos
	 	 }
	 };

	 var app = angular.module('myApp');
         app.factory('github',github);
})();