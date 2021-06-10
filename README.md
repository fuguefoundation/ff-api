![GitHub](https://img.shields.io/github/license/fuguefoundation/ff-dapp)

<p align="center">
  <img src="https://github.com/fuguefoundation/dapp-nonprofit/blob/master/src/assets/images/logo_150.png">
</p>

## Quick Start

1. Clone repo and run `npm install`
2. To run locally, [install MongoDB](https://docs.mongodb.com/manual/installation/). We however are using a Heroku + mLab backend, which provides a `MONGODB_URI`, [check out the docs here](https://devcenter.heroku.com/articles/mongolab). We have a a functioning example of this API on Heroku, to which we can add devs/access as necessary. Either way, you will need to add `process.env` environmental variables for use with `app.js`. Create a `nodemon.json` file in the root directory and add variables as key value pairs: `{ env: { "KEY": "VALUE" }}`.
    * This method with `mLab` integration has been deprecated and we are now using [MongoDB Cloud](https://cloud.mongodb.com/)
3. `npm start` and navigate to appropriate route (e.g., `http://localhost:3000/api/v0/nonprofits` or other path).
4. Postman is also a useful app for working with APIs (sending GET/POST requests, etc.).

## About

* [MongoDB](https://cloud.mongodb.com/) + Mongoose
* Heroku
* Node.js + Express

This API intends to promote the principles of [effective altruism](https://www.effectivealtruism.org/) by (initially) storing information about well-established nonprofit organizations as selected by certain charity evaluators. The initial purpose of this API is to feed data into a [decentralized application](https://github.com/fuguefoundation/ff-dapp) that enables users to donate ERC20-based cryptocurrency evenly across a selection of these identified nonprofits.

<p align="center">
  <img src="https://github.com/fuguefoundation/ff-dapp/blob/master/src/assets/images/ff-dapp-flow.jpg">
</p>

## Docs

API [docs are here](https://fuguefoundation.org/docs/api-docs.html). This API is under active development, and docs will be updated regularly as the data structures and schema continue to develop. The basic concept is to enable a `evaluator` object and its corresponding `nonprofit` objects.

## Contributing to the project

This is an open source project. Contributions are welcomed & encouraged! :smile: If you'd like to improve the code base, please see [Contributing Guidelines](https://github.com/fuguefoundation/ff-api/blob/master/.github/CONTRIBUTING.md). Also check out the [Change Log](https://github.com/fuguefoundation/ff-api/blob/master/.github/CHANGELOG.md) for more details.

## Resources

* [OpenAPI Specification](https://swagger.io/specification/)
* Code is inspired from studying the Academind [Building a RESTful API with Node.js](https://www.youtube.com/playlist?list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q) series