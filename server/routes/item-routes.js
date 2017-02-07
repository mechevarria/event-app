'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    models.Item.findAll().then(function(entities) {
        res.json(entities);
    });
});

router.get('/:id', function(req, res) {
    models.Item.find({
        where: {
            id: req.params.id
        }
    }).then(function(entity) {
        if (entity) {
            res.json(entity);
        } else {
            res.sendStatus(404);
        }
    });
});

router.post('/', function(req, res) {
    models.Item.create(req.body).then(function(entity) {
        res.statusCode = 201;
        res.json(entity);
    });
});

router.put('/:id', function(req, res) {
    models.Item.find({
        where: {
            id: req.params.id
        }
    }).then(function(entity) {
        if (entity) {
            entity.updateAttributes(req.body).then(function(entity) {
                res.json(entity);
            });
        } else {
            res.sendStatus(404);
        }
    });
});

router.delete('/:id', function(req, res) {
    models.Item.find({
        where: {
            id: req.params.id
        }
    }).then(function(entity) {
        if (entity) {
            entity.destroy().then(function() {
                res.sendStatus(204);
            });
        } else {
            res.sendStatus(404);
        }
    });
});

module.exports = router;
