const express = require('express');
const app = express();
const morgan = require('morgan'); // Middleware for logging
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const evaluatorRoutes = require('./api/routes/evaluators');
const nonprofitRoutes = require('./api/routes/nonprofits');
const options = {
    autoIndex: false, // Don't build indexes
    // reconnectTries: 30, // Retry up to 30 times
    // reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

mongoose.connect(process.env.MONGODB_URI,
    options).then(() => {
        console.log('MongoDB is connected')
    }).catch(err=>{
      console.log('MongoDB connection unsuccessful: ' + err)
    //  setTimeout(connectWithRetry, 5000)
    });

app.use(morgan('dev'));
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
app.use('/api/v0/evaluators', evaluatorRoutes);
app.use('/api/v0/nonprofits', nonprofitRoutes);

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