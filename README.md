<p align="center">
  <img src="https://github.com/fuguefoundation/dapp-nonprofit/blob/master/src/assets/images/logo_150.png">
</p>

## Quick Start

1. Clone repo and run `npm install`
2. To run locally, [install MongoDB](https://docs.mongodb.com/manual/installation/). We however are using a Heroku + mLab backend, which provides a `MONGODB_URI`, [check out the docs here](https://devcenter.heroku.com/articles/mongolab). We have a a functioning example of this API on Heroku, to which we can add devs/access as necessary. Either way, you will need to add `process.env` environmental variables for use with `app.js`. Create a `nodemon.json` file in the root directory and add variables as key value pairs: `{ env: { "KEY": "VALUE" }}`. 
3. `npm start` and navigate to `http://localhost:3000/api/v0/nonprofits` or `http://localhost:3000/api/v0/evaluators`.

## About

* MongoDB (Heroku + mLab)
* Node.js + Express

This API intends to promote the principles of [effective altruism](https://www.effectivealtruism.org/) by (initially) storing information about well-established nonprofit organizations as selected by certain charity evaluators. The initial purpose of this API is to feed data into a [decentralized application](https://github.com/fuguefoundation/ff-dapp) that enables users to donate ERC20-based cryptocurrency evenly across a selection of these identified nonprofits.

<p align="center">
  <img src="https://github.com/fuguefoundation/ff-dapp/blob/master/src/assets/images/ff-dapp-flow.jpg">
</p>

API [docs are here](https://fuguefoundation.org/docs/api-docs.html). Docs will be updated regularly as the data structures and schema are developed. The basic concept is to have a `nonprofit` object and an `evaluator` object.

### Nonprofit

```
    Schema({
        _id: mongoose.Schema.Types.ObjectId,
        evaluator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Evaluator',
            require: true
        },
        name: {type: String, required: true},
        url: {type: String, required: true},
        image: {type: String, required: true},
        logo: {type: String, required: true},
        desc: {type: String, required: true},
        short_desc: {type: String, required: true},
        stats: { 
            metric1: Number, 
            metric2: Number
        }
    });
```

### Evaluator

```
    Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: {type: String, required: true},
        url: {type: String, required: true},
        image: {type: String, required: true},
        logo: {type: String, required: true},
        desc: {type: String, required: true},
        short_desc: {type: String, required: true}
    });
```

## Resources

* Code is based off the Academind [Building a RESTful API with Node.js](https://www.youtube.com/playlist?list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q) series