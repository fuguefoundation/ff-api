![GitHub](https://img.shields.io/github/license/fuguefoundation/ff-dapp)

<p align="center">
  <img src="https://github.com/fuguefoundation/dapp-nonprofit/blob/master/src/assets/images/logo_150.png">
</p>

## Quick Start

1. Clone repo and run `npm install`
2. To run locally, [install MongoDB](https://docs.mongodb.com/manual/installation/). In production we are using a Heroku + [MongoDB Cloud](https://cloud.mongodb.com/) backend. We have a a functioning example of this API on Heroku, to which we can add devs/access as necessary. 
3. You will need to add `process.env` environmental variables for use with `app.js` (for `MONGODB_URI` specifically, maybe you know a way to improve this for a local dev environment). Create a `nodemon.json` file in the root directory and add variables as key value pairs (see `nodemon_example.json` for template).
4. `npm start` and navigate to appropriate route (e.g., `http://localhost:3000/api/v0/evaluators` or other route).
5. Postman is a useful app for working with APIs (sending GET/POST requests, etc.).

## About

This API intends to promote the principles of [effective altruism](https://www.effectivealtruism.org/) by (initially) storing information about well-established nonprofit organizations as selected by certain charity evaluators. The initial purpose of this API is to feed data into a [decentralized application](https://github.com/fuguefoundation/ff-dapp) that enables users to donate ERC20-based cryptocurrency evenly across a selection of these identified nonprofits.

<p align="center">
  <img src="https://github.com/fuguefoundation/ff-dapp/blob/master/src/assets/images/ff-dapp-flow.jpg">
</p>

## Docs

API [docs are here](https://fuguefoundation.org/docs/api-docs.html). This API is under active development, and so the docs are a work in progress as the data structures and schema continue to develop. Ultimately the docs will be written in accordance with the OpenAPI specification using a platform like Swagger or similar. 

The basic API concept is to call an `evaluator` object and its corresponding `nonprofit` objects for integration into a dapp. There is also a newly developed `nft` route for integration into Open Sea (currently on Rinkeby). 

## Contributing to the project

This is an open source project. Contributions are welcomed & encouraged! :smile: If you'd like to improve the code base, please see [Contributing Guidelines](https://github.com/fuguefoundation/ff-api/blob/master/.github/CONTRIBUTING.md). Also check out the [Change Log](https://github.com/fuguefoundation/ff-api/blob/master/.github/CHANGELOG.md) for more details.

## Resources

* Node.js + Express
* [MongoDB](https://cloud.mongodb.com/) + Mongoose
* Heroku
* [OpenAPI Specification](https://swagger.io/specification/)
* Code is inspired from studying the Academind [Building a RESTful API with Node.js](https://www.youtube.com/playlist?list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q) series