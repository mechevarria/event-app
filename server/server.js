'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));


require('./routes')(app);
var models = require('./models');

models.sequelize.sync()
    .then(function () {
        http.createServer(app).listen(app.get('port'), function () {
            console.log('Express server listening on port ' + app.get('port'));  //eslint-disable-line no-console
        });
    });
