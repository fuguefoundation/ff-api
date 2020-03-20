const express = require('express');
const app = express();
const morgan = require('morgan'); // Middleware for logging
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const classifierRoutes = require('./api/routes/classifiers');
const nonprofitRoutes = require('./api/routes/nonprofits');

mongoose.connect('mongodb://' + process.env.HEROKU_USERNAME + ':' + process.env.HEROKU_KEY + '@' + process.env.MLAB_ADDRESS_PORT + '/' + process.env.HEROKU_USERNAME,
	{
        useNewUrlParser: true,
        useUnifiedTopology: true
	}
);

app.use(morgan('dev'));
//app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
	//second param can restrict access to certain pages only
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Accept, Content-Type, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

//Routes that handle requests
app.use('/classifiers', classifierRoutes);
app.use('/nonprofits', nonprofitRoutes);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) =>{
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;