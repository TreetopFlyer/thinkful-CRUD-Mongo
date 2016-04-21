var Item = require('../models/item.js');

exports.save = function(inName, inCallbackDone, inCallbackError){
    Item.create({name:inName}, function(inError, inItem){
       if(inError){
           inCallbackError(inError);
       } 
       else{
           inCallbackDone(inItem);
       }
    });
};

exports.delete = function(inName, inCallbackDone, inCallbackError){
    Item.findOneAndRemove({name:inName}, function(inError, inItem){
       if(inError){
           inCallbackError(inError);
       } 
       else{
           inCallbackDone(inItem);
       }
    });
};

exports.update = function(inNameOld, inNameNew, inCallbackDone, inCallbackError){
    Item.findOneAndUpdate({name:inNameOld}, {name:inNameNew}, function(inError, inItem){
       if(inError){
           inCallbackError(inError);
       } 
       else{
           inCallbackDone(inItem);
       }
    });
};


exports.list = function(inCallbackDone, inCallbackError){
    Item.find(function(inError, inItems){
        if(inError){
           inCallbackError(inError);
       } 
       else{
           inCallbackDone(inItems);
       }
    });
};