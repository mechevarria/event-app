'use strict';

var db = require('../models');

exports.findAll = function(req, res) {
    db.Event.findAll().then(function(entities) {
        res.json(entities)
    });
}

exports.find = function(req, res) {
    db.Event.find({
        where: {
            id: req.param('id')
        }
    }).then(function(entity) {
        if (entity) {
            res.json(entity)
        } else {
            res.sendStatus(404)
        }
    });
}

exports.create = function(req, res) {
    db.Event.create(req.body).then(function(entity) {
        res.statusCode = 201
        res.json(entity)
    });
}

exports.update = function(req, res) {
    db.Event.find({
        where: {
            id: req.param('id')
        }
    }).then(function(entity) {
        if (entity) {
            entity.updateAttributes(req.body).then(function(entity) {
                res.json(entity)
            })
        } else {
            res.sendStatus(404)
        }
    });
}

exports.destroy = function(req, res) {
    db.Event.find({
        where: {
            id: req.params.id
        }
    }).then(function(entity) {
        if (entity) {
            entity.destroy().then(function() {
                res.sendStatus(204)
            })
        } else {
            res.sendStatus(404)
        }
    });
}
