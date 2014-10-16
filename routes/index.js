var express = require('express');
var router = express.Router();
var client = require("swagger-client")
client.authorizations.add("apiKey", new client.ApiKeyAuthorization("api_key", "cc81d7e8860759297300909ef310ea2bbed676b7658348a08", "header"));




/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Search Investigator' });
});

// GET Related Words
router.get('/search', function(req, res) {
  var query = req.query.q
  var swagger = new client.SwaggerApi('http://api.wordnik.com/v4/word.json/');
  swagger.build();
  console.log(swagger.apis);

  var test = {
    callback: swagger
  }
  res.json(test);
  // res.json(relatedWords);
});

// GET Flickr Images

module.exports = router;
