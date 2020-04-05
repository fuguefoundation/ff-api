const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Nonprofit = require('../models/nonprofit');
const Evaluator = require('../models/evaluator');

router.get('/', (req, res, next) => {
	Nonprofit.find()
		.select('name stats evaluator _id')
		.populate('evaluator', 'name')
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				nonprofits: docs.map(doc => {
					return {
						name: doc.name,
						stats: doc.stats,
						evaluator: doc.evaluator,
						_id: doc._id,
						request: {
							type: 'GET',
							url: 'api/v0/nonprofits/' + doc._id
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
	//make sure evaluator exists
	Evaluator.findById(req.body.evaluatorId)
		.then(evaluator => {
			if(!evaluator){
				return res.status(404).json({
					message: "Evaluator not found. Check evaluator ID"
				});
			}
			const Nonprofit = new Nonprofit({
				_id: new mongoose.Types.ObjectId(),
				name: req.body.name,
				stats: req.body.stats,
				evaluator: req.body.evaluatorId
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
						url: 'api/v0/nonprofits/' + result._id
					}
				}
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: "Evaluator not found",
				error: err
			})
		});
});

router.get('/:nonprofitId', (req, res, next) => {
	const id = req.params.discoveryId;
	Nonprofit.findById(id)
		.select('name stats evaluator _id')
		.populate('evaluator')
		.exec()
		.then(doc => {
			if (doc){
				res.status(200).json({
					nonprofit: doc,
					request: {
						type: 'GET',
						description: 'Get all nonprofits',
						url: 'api/v0/nonprofits'
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

router.patch('/:nonprofitId', (req, res, next) => {
	const id = req.params.nonprofitId;
	const updateOps = {};
	for (const ops of req.body){
		updateOps[ops.propName] = ops.value;
	}
	Nonprofit.update({_id: id}, { $set: updateOps }).exec().then(result => {
		res.status(200).json({
			message: 'Nonprofit updated',
			request: {
				type: 'GET',
				url: 'api/v0/nonprofits/' + id
			}
		});
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
				url: 'api/v0/nonprofits',
				body: { name: 'String', stats: 'Number', evaluatorId: 'ID' }
			}
		});
	}).catch(err =>{
		console.log(err);
		res.status(500).json({error: err})
	});
});

module.exports = router;