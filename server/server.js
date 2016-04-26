var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

mongoose.connect('mongodb://weblabs:weblabs@ds053190.mlab.com:53190/students');

var db = mongoose.connection;

function find (collec, query, callback) {
    mongoose.connectio.db.collection(collec, function (err, collection) {
    collection.find(query).toArray(callback);
    });
}

var itemScheme = mongoose.Schema({
  personFirst: String,
  personLast: String,
  phone: Number,
  passportFirst: String,
  passportLast: String,
  passportID: String,
  place: String,
  email: String
});

var Find = mongoose.model('Find', itemScheme);
var Found = mongoose.model('Found', itemScheme)
db.once('open', function() {

  // find('students', {}, function(e,c){console.log(e,c)})

})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname + '/../public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../public/index.html'))
})

app.post('/found', function (req, res) {
  var tempItem = new Found({
    personFirst: req.body.personFirst,
    personLast: req.body.personLast,
    place: req.body.place,
    passportFirst: req.body.passportFirst,
    passportLast: req.body.passportLast,
    passportID: req.body.passportID,
    phone: req.body.phone,
    email: req.body.email
  });

  Find.find({
    passportFirst: tempItem.passportFirst,
    passportLast: tempItem.passportLast,
  }, function(err, data){
    // console.log(data)
    if (data.length == 0) {
      tempItem.save(function (err, item) {
        console.log('SUCCESSFULLY SAVED');
        res.send(false)
      })
    } else {
      console.log('FOUND SOME DATA');
      res.send(data);
    }
  })
})

app.post('/find', function (req, res) {
  var tempItem = new Find({
    personFirst: req.body.passportFirst,
    personLast: req.body.passportLast,
    place: req.body.place,
    passportFirst: req.body.passportFirst,
    passportLast: req.body.passportLast,
    passportID: req.body.passportID,
    phone: req.body.phone,
    email: req.body.email
  });
  Found.find({
    personFirst: tempItem.personFirst,
    personLast: tempItem.personLast
  }, function(err, data){
    if (data.length == 0) {
      tempItem.save(function (err, item) {
        console.log('SUCCESSFULLY SAVED');
        res.send(false)
      })
    } else {
      console.log('FOUND SOME DATA');
      res.send(data);
    }
  })
})

app.listen(3000);
