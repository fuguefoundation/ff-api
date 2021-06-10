const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const NFT = require('../models/nft');

router.get('/', (req, res, next) => {
    NFT.find()
        .select('id name description image external_url animation_url youtube_url background_color attributes')
        .exec()
        .then(docs => {
            const response = docs.map(doc => {
                return {
                    id: doc.id,
                    name: doc.name,
                    description: doc.description,
                    image: doc.image,
                    external_url: doc.external_url,
                    animation_url: doc.animation_url,
                    youtube_url: doc.youtube_url,
                    background_color: doc.background_color,
                    attributes: doc.attributes,
                    request: {
                        type: 'GET',
                        url: 'api/v0/nfts/' + doc.id
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
    const nft = new NFT({
        id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        external_url: req.body.external_url,
        animation_url: req.body.animation_url,
        youtube_url: req.body.youtube_url,
        background_color: req.body.background_color,
        attributes: req.body.attributes
    });

    nft.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "New NFT created",
            createdNFT: {
                id: result.id,
                name: result.name,
                request: {
                    type: 'GET',
                    url: '/api/v0/nfts/' + result.id
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

router.get('/:nftId', (req, res, next) => {
    const id = req.params.nftId;
    NFT.findById(id)
        .select('id name description image external_url animation_url youtube_url background_color attributes')
        .exec()
        .then(doc => {
            if (doc) {
                const response = {
                    id: doc.id,
                    name: doc.name,
                    description: doc.description,
                    image: doc.image,
                    external_url: doc.external_url,
                    animation_url: doc.animation_url,
                    youtube_url: doc.youtube_url,
                    background_color: doc.background_color,
                    attributes: doc.attributes,
                    request: {
                        type: 'GET',
                        url: 'api/v0/nfts'
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

router.patch('/:nftId', (req, res, next) => {
    const id = req.params.nftId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    NFT.update({
        id: id
    }, {
        $set: updateOps
    }).exec().then(result => {
        res.status(200).json({
            message: 'NFT updated',
            request: {
                type: 'GET',
                url: 'api/v0/nfts/' + id
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:nftId', (req, res, next) => {
    const id = req.params.nftId;
    NFT.remove({
            id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'NFT deleted',
                request: {
                    type: 'POST',
                    url: 'api/v0/nfts',
                    body: {
                        name: 'String',
                        description: 'String',
                        image: 'String',
                        external_url: 'String',
                        animation_url: 'String',
                        youtube_url: 'String',
                        background_color: 'String',
                        attributes: 'Object Array',
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