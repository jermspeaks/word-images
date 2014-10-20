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
    var url = 'https://api.flickr.com/services/rest/';
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
        console.log('Wordnik failure');
        o.relatedWords.push('no word found');
      });
  };

  o.findImages = function(phrase){
    var url = o.flickrApi(phrase);
    $http.get(url, {
      params: {
        method: 'flickr.photos.search',
        api_key: 'd71c11e736e7e05378ba9efb01aa58e5',
        tags: phrase,
        privacy_filter: 1,
        per_page: 8,
        content_type: 1
      },
      transformResponse: function(data){
        var x2js = new X2JS();
        var json = x2js.xml_str2json(data);
        return json;
      }
    })
    .success(function(data){
      var related = data.rsp.photos.photo;
      var i = 0, link = '', image = {}, images = [];
      for(var i = 0; i < 8; i++) {
        image.link = 'https://farm' + related[i]._farm + '.staticflickr.com/' + related[i]._server + '/' + related[i]._id + '_' + related[i]._secret + '_m.jpg'
        image.title = related[i]._title
        images.push(image);
        image = {};
      }
      angular.copy(images, o.relatedImages);
    })
    .error(function(){
      console.log('Flickr failure');
      var image = {
        link: 'http://www.hollandlift.com/wp-content/themes/hollandlift/assets/images/no_image.jpg',
        title: 'no image found'
      };
      o.relatedImages.push(image);
    });
  };
  return o;
}]);

app.controller('SearchCtrl', ['$scope', '$http', 'wordService', function($scope, $http, wordService){
  $scope.word = wordService;

  $scope.searchTerm = function(){
    $scope.word.phrase = $scope.query;
    $scope.word.findRelatedWords($scope.word.phrase);
    $scope.word.findImages($scope.word.phrase);
    $scope.word.findRelatedImages;
    console.log(wordService);
  };
}]);