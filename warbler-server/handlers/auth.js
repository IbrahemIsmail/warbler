const db  = require('../models'),
	  jwt = require('jsonwebtoken');

exports.signup = async function(req, res, next){
	try{
		let user = await db.User.create(req.body);
		let {_id, username, profileImageUrl} = user;
		let token = jwt.sign({
			_id,
			username,
			profileImageUrl
		}, process.env.SECRET_KEY);
		return res.status(200).json({
			_id,
			username,
			profileImageUrl,
			token
		});
	} catch(err){
		// if validation fails
		if(err.code === 11000){
			err.message = 'Sorry, that username and/or email is taken';
		}
		return next({
			status: 400,
			message: err.message
		})
	}
}

exports.signin = async function(req, res, next){
	try{
		let user = await db.User.findOne({email: req.body.email});
		let {_id, username, profileImageUrl} = user;
		let isMatch = await user.comparePassword(req.body.password);
		if(isMatch){
			let token = jwt.sign({
				_id,
				username,
				profileImageUrl
			}, process.env.SECRET_KEY);
			return res.status(200).json({
				_id,
				username,
				profileImageUrl,
				token
			});
		}
		else if(!isMatch) throw err;
	} catch(err){
		return next({status: 400, message: 'Invalid Email/Password.'})
	}
}






