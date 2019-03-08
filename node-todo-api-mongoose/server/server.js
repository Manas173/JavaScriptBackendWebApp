var {mongoose} = require('../mongoose.js');
var express = require('express');
var bodyParser = require('body-parser');
var {Todo} = require('../models/Todo.js');
var {Users} = require('../models/Users.js');
var {ObjectId} = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.post('/todo',(req,res)=>{
	var obj=new Todo({
		text: req.body.text
	});
	obj.save().then((response)=>{
		res.send(response);
	},(err)=>{
		res.status(400).send('Error while posting');
	})
})

app.get('/todos/:id',(req,res)=>{
	var id = req.params.id;
	if(!ObjectId.isValid(id))
		return res.status(404).send({'error':'ID invalid'})
	Todo.findById(id).then((response)=>{
		if(!response)
			return res.status(400).send({'error' : 'ID not found!'})
		res.status(200).send(response);
	}).catch((e)=>{
		res.send('Error has occured !')
	})
})

app.get('/todo',(req,res)=>{
	Todo.find().then((response)=>{
		res.send({response});
	},(err)=>{
		res.status(400).send({err});
	})
})

app.post('/user',(req,res)=>{
	var obj = new Users({
		email: req.body.email,
		name: req.body.name
	})
	obj.save().then((response)=>{
		res.send('Saved user');
	},(err)=>{
		res.status(400).send(err);
	})
})

app.listen(3000,()=>{
	console.log(`Server connected to port 3000`);
})

module.exports = {
	app
};