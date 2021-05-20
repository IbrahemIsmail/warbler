// require('dotenv').load();

const jwt = require('jsonwebtoken');

exports.loginRequired = function(req, res, next){
	try{
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
			if(decoded) return next();
			else return next({status: 401, message: 'Please log in first'});
		})
	} catch(err){
		return next({status: 401, message: 'Please log in first'});
	}
}

exports.ensureCorrectUser = function(req, res, next){
	try{
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
			console.log(decoded._id, req.params.id);
			if(decoded && decoded._id === req.params.id) return next();
			else return next({status: 401, message: 'Unathourized'});
		})
	} catch(err){
		return next({status: 401, message: 'Unathourized'});
	}
}