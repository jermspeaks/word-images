var app = angular.module('wordImages', []);

app.factory('words', ['$http', function($http){
  var o = {
    phrase: ''
  };

  o.encoded = function(){
    return encodeURIComponent(o.phrase);
  };
  return o;
}]);

app.controller('SearchCtrl', ['$scope', '$http', 'words', function($scope, $http, words){
  $scope.words = words;

  $scope.searchTerm = function(){
    $scope.words.phrase = $scope.query;
    $scope.url = "http://api.wordnik.com:80/v4/word.json/" + $scope.words.encoded() + "?useCanonical=false&includeSuggestions=false&api_key=" + apiKey;
    $http.get($scope.url)
      .success(function(){
        console.log('success');
      })
      .error(function(){
        console.log('failure');
      });
    // Create the http get request to wordnik
    // the data holds the search term
    // The request is a JSON request.


  };
}]);