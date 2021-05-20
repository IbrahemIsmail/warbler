const mongoose = require('mongoose'),
	  dbUrl    = process.env.DB_URL;

mongoose.set('debug', true);

// 'mongodb://localhost/warbler'

mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

module.exports.User = require('./user');
module.exports.Message = require('./message');