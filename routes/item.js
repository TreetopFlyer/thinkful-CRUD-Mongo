var express = require('express');
var Item = require('../services/item');
var router = express.Router();

router.get('/', function(inReq, inRes){
    Item.list(function(inItems){
        inRes.status(200).json(inItems);
    }, function(inError){
        inRes.status(400).json(inError);
    });
});

router.post('/', function(inReq, inRes){
    Item.save(inReq.body.name, function(inItem){
        inRes.status(200).json(inItem);
    }, function(inError){
        inRes.status(400).json(inError);
    });
});

router.put('/', function(inReq, inRes){
    Item.update(inReq.body.nameOld, inReq.body.nameNew, function(inItem){
        inRes.status(200).json(inItem);
    }, function(inError){
        inRes.status(400).json(inError);
    });
});

router.delete('/', function(inReq, inRes){
    Item.delete(inReq.body.name, function(inItem){
        inRes.status(200).json(inItem);
    }, function(inError){
        inRes.status(400).json(inError);
    });
});

module.exports = router;