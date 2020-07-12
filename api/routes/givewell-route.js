const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Givewell = require('../models/givewell');

router.get('/', (req, res, next) => {
    Givewell.find()
        .select('evaluator image title title_program short_desc desc info donate_fiat last_update')
        .exec()
        .then(docs => {
            const response = docs.map(doc => {
                return {
                    id: doc.id,
                    evaluator: doc.evaluator,
                    image: doc.image,
                    title: doc.title,
                    title_program: doc.title_program,
                    short_desc: doc.short_desc,
                    desc: doc.desc,
                    info: doc.info,
                    donate_fiat: doc.donate_fiat,
                    last_update: doc.last_update,
                    request: {
                        type: 'GET',
                        url: 'api/v0/givewell/' + doc.id
                    }
                }
            });
            res.status(200).json(response);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    console.log(req.file);
    const givewell = new Givewell({
        id: new mongoose.Types.ObjectId(),
        evaluator: req.body.evaluator,
        image: req.body.image,
        title: req.body.title,
        title_program: req.body.title_program,
        short_desc: req.body.short_desc,
        desc: req.body.desc,
        info: req.body.info,
        donate_fiat: req.body.donate_fiat,
        last_update: req.body.last_update      
    });

    givewell.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "New Givewell object created",
            createdGivewell: {
                id: result.id,
                title: result.title,
                request: {
                    type: 'GET',
                    url: '/api/v0/givewell/' + result.id
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:givewellId', (req, res, next) => {
    const id = req.params.givewellId;
    Givewell.findById(id)
        .select('evaluator image title title_program short_desc desc info donate_fiat last_update')
        .exec()
        .then(doc => {
            if (doc) {
                const response = {
                    id: doc.id,
                    evaluator: doc.evaluator,
                    image: doc.image,
                    title: doc.title,
                    title_program: doc.title_program,
                    short_desc: doc.short_desc,
                    desc: doc.desc,
                    info: doc.info,
                    donate_fiat: doc.donate_fiat,
                    last_update: doc.last_update,
                    request: {
                        type: 'GET',
                        url: 'api/v0/givewell/' + doc.id
                    }
                };
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: "No valid entry for provided ID"
                })
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:givewellId', (req, res, next) => {
    const id = req.params.givewellId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Givewell.update({
        id: id
    }, {
        $set: updateOps
    }).exec().then(result => {
        res.status(200).json({
            message: 'Givewell updated',
            request: {
                type: 'GET',
                url: 'api/v0/givewell/' + id
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:givewellId', (req, res, next) => {
    const id = req.params.givewellId;
    Givewell.remove({
            id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Givewell deleted',
                request: {
                    type: 'POST',
                    url: 'api/v0/givewell',
                    body: {
                        evaluator: 'String',
                        image: 'String',
                        title: 'String',
                        title_program: 'String',
                        short_desc: 'String',
                        desc: 'String',
                        info: 'String',
                        donate_fiat: 'String',
                        last_update: 'String' 
                    }
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;