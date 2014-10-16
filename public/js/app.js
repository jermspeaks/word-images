
var app = angular.module('wordImages', []);

app.factory('words', ['$http', function($http){
  var o = {
    phrase: '',
    relatedWords: []
  };

  o.encoded = function(){
    return encodeURIComponent(o.phrase);
  };

  o.relatedWords = function(){
    // http get request for Wordnik API related words given one word
    
    $http.get($scope.url)
      .success(function(data){
        console.log(data);
        // $scope.words.relatedWords = data[0].words;
      })
      .error(function(){
        console.log('failure');
      });
  };

  o.wordImages = function(){
    // http get request for Flickr API first three images about the word
  };

  o.relatedImages = function(){
    // http get request for other words Flickr API first three images, looped for each related word
  };



  return o;
}]);

app.controller('SearchCtrl', ['$scope', '$http', 'words', function($scope, $http, words){
  $scope.words = words;

  $scope.searchTerm = function(){
    $scope.words.phrase = $scope.query;
    $scope.url = "/search?q=" + $scope.words.encoded();
    // Find Images of the Word

    // Find Related Words
    $http.get($scope.url)
      .success(function(data){
        console.log(data);
        // $scope.words.relatedWords = data[0].words;
      })
      .error(function(){
        console.log('failure');
      });
  };
}]);