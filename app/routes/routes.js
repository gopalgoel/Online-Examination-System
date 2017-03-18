/*

Acts as an accumulator of all API endpoints 

*/
var path = require('path');
var userApi = require(path.join(__dirname,'userApi'));
var quesApi = require(path.join(__dirname,'quesApi'));
var testApi = require(path.join(__dirname,'testApi'));
module.exports = function(app){
    userApi(app);
    quesApi(app);
    testApi(app);
}