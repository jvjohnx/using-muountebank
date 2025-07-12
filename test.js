/*Creating the product imposter using code


*/

var imposter = require('./imposter'),                  //1
  productPort = 3000;

function createProductImposter() {
  return imposter({                                    //2
      port: productPort,
      protocol: "http",
      name: "Product Service"
    })
    .withStub()
    .matchingRequest({equals: {path: "/products"}})    //3
    .respondingWith({                                  //4
      statusCode: 200,
      headers: {"Content-Type": "application/json"},
      body: {
        products: [
          {
            id: "2599b7f4",
            name: "The Midas Dogbowl",
            description: "Pure gold"
          },
          {
            id: "e1977c9e",
            name: "Fishtank Amore",
            description: "Show your fish some love"
          }
        ]
      }
    })
    .create();                                        //5
}

/*
1 Imports your fluent interface
2 Passes the root-level information into the entry function
3 Adds the request predicate
4 Adds the response
5 Sends a POST to the mountebank endpoint to create the imposter
*/
