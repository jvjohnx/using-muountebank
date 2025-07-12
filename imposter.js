/*Fluent api to create an imposter programattically
Info from Testing Microservices with Mounteban by Brandon Byars
*/

require('any-promise/register/q');                  //1
var request = require('request-promise-any');       //1

module.exports = function (options) {               //2
  var config = options || {};
  config.stubs = [];

  function create () {                              //3
    return request({
      method: "POST",
      uri: "http://localhost:2525/imposters",
      json: true,
      body: config
    });
  }

  function withStub () {                            //4
    var stub = { responses: [], predicates: [] },
      builders = {
        matchingRequest: function (predicate) {     //5
          stub.predicates.push(predicate);
          return builders;
        },
        respondingWith: function (response) {       //6
          stub.responses.push({ is: response });
          return builders;
        },
        create: create,
        withStub: withStub
      };

    config.stubs.push(stub);
    return builders;
  }

  return {
    withStub: withStub,
    create: create
  };
};
