var Item = require('../models/item');
var mongoose = require('mongoose');

exports.setup = function(inCallbackSuccess, inCallbackFailure){
    Item.create({name:'broad beans'}, {name:'tomatoes'}, {name:'peppers'}, function(inError, inItems){
        if(inError){
            inCallbackFailure(inError);
        }
        else{
            inCallbackSuccess(inItems);
        }
    });
};

exports.teardown = function(inCallbackSuccess, inCallbackFailure){
    Item.remove(function(inError, inItems){
        if(inError){
            inCallbackFailure(inError);
        }
        else{
            inCallbackSuccess(inItems);
        }
    });
};

if(require.main === module){
    require('./connect');
    exports.setup(function(){mongoose.disconnect();}, console.error);
}
