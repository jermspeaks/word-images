Word to Image App
=================

When you search for a word, it displays the images for that word and related words. The application is supposed to show related images, so that will be on the next revision.

### Technologies:

* AngularJS
* NodeJS
* ExpressJS
* Bootstrap

### Libraries:

* [X2JS](https://code.google.com/p/x2js/) - Flickr API outputs XML, and AngularJS is very JSON-centric, so I decided to convert the XML to JSON using this library. The XML data has proper headers, so no customization was needed.

### Data:
* Wordnik API
* Flickr API

### How to start app:

In your terminal:

```
$ npm start
```

Go to localhost:3000 and start playing around.


### Next Revision:

* Unit Testing
* Related Images (replaced for related words)