'use strict';

var express        = require('express');
var bodyParser     = require('body-parser');
var errorHandler   = require('errorhandler');
var methodOverride = require('method-override');
var morgan         = require('morgan');
var http           = require('http');
var path           = require('path');
var db             = require('./models');

var items = require('./routes/item-routes');

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

app.get('/item-app/items', items.findAll);
app.get('/item-app/items/:id', items.find);
app.post('/item-app/items', items.create);
app.put('/item-app/items/:id', items.update);
app.delete('/item-app/items/:id', items.destroy);

db
  .sequelize
  .sync()
  .then(function() {
    http.createServer(app).listen(app.get('port'), function() {
      console.log('Express server listening on port ' + app.get('port'));  //eslint-disable-line no-console
    });
  });
