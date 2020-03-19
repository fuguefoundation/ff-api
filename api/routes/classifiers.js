const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Classifier = require('../models/classifier');

router.get('/', (req, res, next) => {
	Classifier.find()
	.select('name url image logo desc short_desc _id')
	.exec()
	.then(docs => {
		const response = {
			count: docs.length,
			classifiers: docs.map(doc => {
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
						url: 'http://localhost:3000/classifiers/' + doc._id
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
	const classifier = new Classifier({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		url: req.body.url,
		image: req.body.image,
		logo: req.body.logo,
		desc: req.body.desc,
		short_desc: req.body.short_desc,
	});

	classifier.save().then(result => {
		console.log(result);
		res.status(201).json({
			message: "New classifier created",
			createdClassifier: {
				name: result.name,
				url: result.url,
				image: result.image,
				logo: result.logo,
				desc: result.desc,
				short_desc: result.short_desc,
				_id: result._id,
				request: {
					type: 'GET',
					url: 'http://localhost:3000/classifiers/' + result._id
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

router.get('/:classifierId', (req, res, next) => {
	const id = req.params.classifierId;
	Classifier.findById(id)
		.select('name type _id')
		.exec()
		.then(doc => {
			if (doc){
				res.status(200).json({
					classifier: doc,
					request: {
						type: 'GET',
						description: 'Get all classifiers',
						url: 'http://localhost:3000/classifiers'
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

router.patch('/:classifierId', (req, res, next) => {
	const id = req.params.classifierId;
	const updateOps = {};
	for (const ops of req.body){
		updateOps[ops.propName] = ops.value;
	}
	Classifier.update({_id: id}, { $set: updateOps }).exec().then(result => {
		res.status(200).json({
			message: 'Classifier updated',
			request: {
				type: 'GET',
				url: 'http://localhost:3000/classifiers/' + id
			}
		});
	}).catch( err => {
		console.log(err);
		res.status(500).json({error: err});
	});
});

router.delete('/:classifierId', (req, res, next) => {
	const id = req.params.classifierId;
	Classifier.remove({_id: id})
	.exec()
	.then(result =>{
		res.status(200).json({
			message: 'Classifier deleted',
			request: {
				type: 'POST',
				url: 'http://localhost:3000/classifiers',
				body: { name: 'String', type: 'String' }
			}
		});
	}).catch(err =>{
		console.log(err);
		res.status(500).json({error: err})
	});
});

module.exports = router;