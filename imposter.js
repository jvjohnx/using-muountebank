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

/*
1 node.js libraries that make calling HTTP services easier
2 The node.js way of exposing a function to different files
3 Calls the REST API to create an imposter
4 The entry point to the fluent interface—each call creates a new stub
5 Adds a new request predicate to the stub
6 Adds a new response to the stub
*/
