const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Evaluator = require('../models/evaluator');

router.get('/', (req, res, next) => {
	Evaluator.find()
	.select('name url image logo desc short_desc _id')
	.exec()
	.then(docs => {
		const response = {
			count: docs.length,
			evaluators: docs.map(doc => {
				return {
					name: doc.name,
					url: doc.url,
					image: doc.image,
					logo: doc.logo,
					desc: doc.desc,
					short_desc: doc.short_desc,
					_id: doc._id,
					request: {
						type: 'GET',
						url: 'api/v0/evaluators/' + doc._id
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
	console.log(req.file);
	const evaluator = new Evaluator({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		url: req.body.url,
		image: req.body.image,
		logo: req.body.logo,
		desc: req.body.desc,
		short_desc: req.body.short_desc,
	});

	evaluator.save().then(result => {
		console.log(result);
		res.status(201).json({
			message: "New evaluator created",
			createdEvaluator: {
				name: result.name,
				url: result.url,
				image: result.image,
				logo: result.logo,
				desc: result.desc,
				short_desc: result.short_desc,
				_id: result._id,
				request: {
					type: 'GET',
					url: '/api/v0/evaluators/' + result._id
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

router.get('/:evaluatorId', (req, res, next) => {
	const id = req.params.evaluatorId;
	Evaluator.findById(id)
		.select('name type _id')
		.exec()
		.then(doc => {
			if (doc){
				res.status(200).json({
					evaluator: doc,
					request: {
						type: 'GET',
						description: 'Get all evaluators',
						url: 'api/v0/evaluators'
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

router.patch('/:evaluatorId', (req, res, next) => {
	const id = req.params.evaluatorId;
	const updateOps = {};
	for (const ops of req.body){
		updateOps[ops.propName] = ops.value;
	}
	Evaluator.update({_id: id}, { $set: updateOps }).exec().then(result => {
		res.status(200).json({
			message: 'Evaluator updated',
			request: {
				type: 'GET',
				url: 'api/v0/evaluators/' + id
			}
		});
	}).catch( err => {
		console.log(err);
		res.status(500).json({error: err});
	});
});

router.delete('/:evaluatorId', (req, res, next) => {
	const id = req.params.evaluatorId;
	Evaluator.remove({_id: id})
	.exec()
	.then(result =>{
		res.status(200).json({
			message: 'Evaluator deleted',
			request: {
				type: 'POST',
				url: 'api/v0/evaluators',
				body: { name: 'String', type: 'String' }
			}
		});
	}).catch(err =>{
		console.log(err);
		res.status(500).json({error: err})
	});
});

module.exports = router;