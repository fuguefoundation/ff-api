const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Nonprofit = require('../models/nonprofit');
const Classifier = require('../models/classifier');

router.get('/', (req, res, next) => {
	Nonprofit.find()
		.select('name stats classifier _id')
		.populate('classifier', 'name')
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				nonprofits: docs.map(doc => {
					return {
						name: doc.name,
						stats: doc.stats,
						classifier: doc.classifier,
						_id: doc._id,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/nonprofits/' + doc._id
						}
					}
				})
			}
			res.status(200).json(response);
		}).catch(err => {
			console.log(err);
			res.status(500).json({error: err});
	});
});

router.post('/', (req, res, next) => {
	//make sure classifier exists
	Classifier.findById(req.body.classifierId)
		.then(classifier => {
			if(!classifier){
				return res.status(404).json({
					message: "Classifier not found. Check classifier ID"
				});
			}
			const Nonprofit = new Nonprofit({
				_id: new mongoose.Types.ObjectId(),
				name: req.body.name,
				stats: req.body.stats,
				classifier: req.body.classifierId
			});
			return discovery.save()
		})
		.then(result =>{
			res.status(201).json({
				message: "Nonprofit created",
				createdDiscovery: {
					name: result.name,
					stats: result.stats,
					_id: result._id,
					request: {
						type: 'GET',
						url: 'http://localhost:3000/nonprofits/' + result._id
					}
				}
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: "Classifier not found",
				error: err
			})
		});
});

router.get('/:nonprofitId', (req, res, next) => {
	const id = req.params.discoveryId;
	Nonprofit.findById(id)
		.select('name stats classifier _id')
		.populate('classifier')
		.exec()
		.then(doc => {
			if (doc){
				res.status(200).json({
					nonprofit: doc,
					request: {
						type: 'GET',
						description: 'Get all nonprofits',
						url: 'http://localhost:3000/nonprofits'
					}
				});
			} else {
				res.status(404).json({message: "No valid entry for provided ID"})
			}
		}).catch( err => {
			console.log(err);
			res.status(500).json({error: err});
	});
});

router.delete('/:nonprofitId', (req, res, next) => {
	const id = req.params.discoveryId;
	Nonprofit.remove({_id: id})
	.exec()
	.then(result =>{
		res.status(200).json({
			message: 'Nonprofit deleted',
			request: {
				type: 'POST',
				url: 'http://localhost:3000/nonprofits',
				body: { name: 'String', stats: 'Number', classifierId: 'ID' }
			}
		});
	}).catch(err =>{
		console.log(err);
		res.status(500).json({error: err})
	});
});

module.exports = router;