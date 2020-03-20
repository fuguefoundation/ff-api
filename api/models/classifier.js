const mongoose = require('mongoose');

const classifierSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {type: String, required: true},
    url: {type: String, required: true},
	image: {type: String, required: true},
	logo: {type: String, required: true},
	desc: {type: String, required: true},
	short_desc: {type: String, required: true}
});

module.exports = mongoose.model('Classifer', classifierSchema);