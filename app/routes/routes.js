/*

Acts as an accumulator of all API endpoints 

*/
var path = require('path');
var userApi = require(path.join(__dirname,'userApi'));

module.exports = function(app){
    userApi(app);
}