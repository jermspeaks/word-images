
var app = angular.module('wordImages', []);

app.factory('wordService', ['$http', function($http){
  var o = {
    phrase: '',
    relatedWords: [],
    relatedImages: []
  };

  o.encoded = function(phrase){
    return encodeURIComponent(phrase);
  };

  o.flickrApi = function(){
    var url;
    return url;
  };

  o.wordnikApi = function(phrase){
    var url = "http://api.wordnik.com/v4/word.json/" + o.encoded(phrase) + '/relatedWords';
    return url;
  };

  o.findRelatedWords = function(phrase){
    // http get request for Wordnik API related words given one word
    var url = o.wordnikApi(phrase);
    $http.get(url, {
        params: {
          useCanonical: false,
          relationshipTypes: "same-context",
          limitPerRelationshipType: 3,
          api_key: 'cc81d7e8860759297300909ef310ea2bbed676b7658348a08'
        }
     })
      .success(function(data){
        var related = data[0].words;
        angular.copy(related, o.relatedWords);
      })
      .error(function(){
        console.log('failure');
      });
  };

  o.wordImages = function(){
    // http get request for Flickr API first three images about the word
  };
  return o;
}]);

app.controller('SearchCtrl', ['$scope', '$http', 'wordService', function($scope, $http, wordService){
  $scope.wordService = wordService;

  $scope.searchTerm = function(){
    $scope.wordService.phrase = $scope.query;
    $scope.wordService.findRelatedWords($scope.wordService.phrase);
    console.log(wordService);
  };
}]);