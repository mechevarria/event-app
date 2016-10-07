'use strict';

var express        = require('express');
var bodyParser     = require('body-parser');
var errorHandler   = require('errorhandler');
var methodOverride = require('method-override');
var morgan         = require('morgan');
var http           = require('http');
var path           = require('path');
var db             = require('./models');

var events = require('./routes/event');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'client')));

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler());
}


app.get('/event-app/events', events.findAll);
app.get('/event-app/events/:id', events.find);
app.post('/event-app/events', events.create);
app.put('/event-app/events/:id', events.update);
app.delete('/event-app/events/:id', events.destroy);

db
  .sequelize
  .sync()
  .then(function() {
    http.createServer(app).listen(app.get('port'), function() {
      console.log('Express server listening on port ' + app.get('port'));
    });
  });
