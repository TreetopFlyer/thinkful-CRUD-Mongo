var Item = require('../models/item');
var mongoose = require('mongoose');

exports.run = function(inCallbackSuccess, inCallbackFailure){
    Item.create({name:'broad beans'}, {name:'tomatoes'}, {name:'peppers'}, function(inError, inItems)
    {
        if(inError){
            inCallbackFailure(inError);
        }
        else{
            inCallbackSuccess(inItems);
        }
    })
};

if(require.main === module){
    require('./connect');
    exports.run(function(){mongoose.disconnect();}, console.error);
}
