var chai = require('chai');
var chaiHttp = require('chai-http');


global.environment = 'test';
var server = require('../server');
var Item = require('../models/item');
var seed = require('../db/seed');

var should = chai.should();
var app = server.app;
chai.use(chaiHttp);


function checkResponse(inResponse, inStatusCode){
    inResponse.should.be.json;
    inResponse.should.have.status(inStatusCode);
};

function checkArray(inArray, inLength){
    inArray.should.be.a('array');
    inArray.length.should.equal(inLength);
};

function checkItem(inObj, inName){
    inObj.should.be.a('object');
    inObj.should.have.property('name');
    inObj.name.should.be.a('string');
    inObj.name.should.equal(inName);
};

describe('Shopping List HTTP API', function() {
    
    before(function(done) {
        seed.setup(function(){done();});
    });
    
    describe('Correct use', function()
    {
        describe('GET', function(){
            it('Should return a list of all Items', function(done)
            {
                chai.request(app).get('/items').end(function(inError, inResponse){
                    checkResponse(inResponse, 200);
                    checkArray(inResponse.body, 3);
                    done();
                });
            });
        });
        
        describe('POST', function(){
            it('Should return the appended Item', function(done){
                chai.request(app).post('/items').send({'name':'corn'}).end(function(inError, inResponse){
                    checkResponse(inResponse, 200);
                    checkItem(inResponse.body, 'corn');
                    done();
                });
            });
            it('Should modify the list of stored Items', function(done){
                chai.request(app).get('/items').end(function(inError, inResponse){
                    checkResponse(inResponse, 200);
                    checkArray(inResponse.body, 4);
                    done();
                });
            });
        });
        
        describe('PUT', function(){
            it('Should return the modified Item', function(done){
                chai.request(app).put('/items').send({'nameOld':'corn', 'nameNew':'avocados'}).end(function(inError, inResponse){
                    checkResponse(inResponse, 200);
                    checkItem(inResponse.body, 'corn');
                    done();
                });
            });
            it('Should modify the stored Item', function(done){
                chai.request(app).get('/items').end(function(inError, inResponse){
                    checkResponse(inResponse, 200);
                    checkItem(inResponse.body[3], 'avocados');
                    checkArray(inResponse.body, 4);
                    done();
                });
            });
        });
        
        describe('DELETE', function(){
            it('Should return the deleted Item', function(done){
                chai.request(app).delete('/items').send({'name':'avocados'}).end(function(inError, inResponse){
                    inResponse.should.have.status(200);
                    checkItem(inResponse.body, 'avocados');
                    done();
                });
            });
            it('Should modify the list of stored Items', function(done){
                chai.request(app).get('/items').end(function(inError, inResponse){
                    inResponse.should.have.status(200);
                    checkItem(inResponse.body[2], 'peppers');
                    checkArray(inResponse.body, 3);
                    done();
                });
            });
        });
    });
    
    describe('Error handling', function()
    {
        describe('GET', function(){
            it('Should return a 404 on bad request', function(done){
                chai.request(app).get('/itmes').end(function(inError, inResponse){
                    checkResponse(inResponse, 404);
                    done();
                });
            });
        });
        
        describe('POST', function(){
            it('Should return a 400 with malformed body', function(done){
                chai.request(app).post('/items').send({'ItemName':true}).end(function(inError, inResponse){
                    checkResponse(inResponse, 400);
                    done();
                });
            });
        });
        
        describe('PUT', function(){
            it('Should return a 400 with malformed body', function(done){
                chai.request(app).post('/items').send({'new_name':'popcorn', 'old_name':'corn'}).end(function(inError, inResponse){
                    checkResponse(inResponse, 400);
                    done();
                });
            });
            it('Should return a 400 with bad lookup', function(done){
                chai.request(app).post('/items').send({'nameOld':'starfruit', 'nameNew':'kiwi'}).end(function(inError, inResponse){
                    checkResponse(inResponse, 400);
                    done();
                });
            });
        });
        
        describe('DELETE', function(){
            it('Should return a 400 with malformed body', function(done){
                chai.request(app).post('/items').send({'deleteThis':'popcorn'}).end(function(inError, inResponse){
                    checkResponse(inResponse, 400);
                    done();
                });
            });
            it('Should return a 400 with bad lookup', function(done){
                chai.request(app).delete('/items').send({'name':'tomatillo'}).end(function(inError, inResponse){
                    checkResponse(inResponse, 400);
                    done();
                });
            });
        });
    });
    
    after(function(done){
        seed.teardown(function(){done();});
    });

});