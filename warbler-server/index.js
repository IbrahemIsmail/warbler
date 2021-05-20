require('dotenv').config(); //prossess.env._______

const express        = require('express'),
	  app            = express(),
	  PORT           =  process.env.PORT || 8080,
	  bodyParser     = require('body-parser'),
	  errorHandler   = require('./handlers/error'),
	  authRoutes     = require('./routes/auth'),
	  cors           = require('cors'),
	  db             = require('./models'),
	  messagesRoutes = require('./routes/messages');

const {loginRequired, ensureCorrectUser} = require('./middleware/auth');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', loginRequired, ensureCorrectUser, messagesRoutes);

app.get('/api/messages', loginRequired, async function(req, res, next){
	try{
		let messages = await db.Message.find()
		.sort({createdAt: 'desc'}).populate('user', {
			username: true,
			profileImageUrl: true
		});
		return res.status(200).json(messages);
	} catch(err){
		return next(err);
	}
})

app.use((req, res, next)=>{
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(errorHandler);

app.listen(PORT, ()=>{
	console.log(`Server is running on port ${PORT}`);
});