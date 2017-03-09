var response = {};
response.isError = false;
response.Error = "";
response.success = "";
response.data = "";

var createResponse = function(isError,Error,success,data){
    response.isError = isError;
    response.Error = Error;
    response.success = success;
    response.data = data;
    return response;
};
module.exports = createResponse;