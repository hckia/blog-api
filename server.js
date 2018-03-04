const express = require('express');
// morgan to log HTTP layer
const morgan = require('morgan');
// parse JSON data
const bodyParser = require('body-parser');

//import model plus endpoits
const {BlogPosts} = require('./model');

const jsonParser = bodyParser.json();
const app = express();

//use the http layerl og
app.use(morgan('common'));

BlogPosts.create("The land of make believe", "Its become apparent that everyone on YouTube's comments section is living in the land of make believe.", "Abraham Lincoln", "March 4th, 2018");

//grab all
app.get('/blog-posts', (req,res) => {
	res.json(BlogPosts.get());
});

//create
app.post('/blog-posts', jsonParser,(req,res) => {
	const requiredFields = ['title','content','author','publishDate'];
	for (let i=0;i<requiredFields.length;i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const item = BlogPosts.create(req.body.title,req.body.content,req.body.author,req.body.publishDate);
	res.status(201).json(item);
});

//update
app.put('/blog-posts/:id', jsonParser,(req,res) => {
	const requiredFields = ['title','content','author','id'];
	for (let i=0;i<requiredFields.length;i++) {
		//ask about publishDate and the best way to update this optional field
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}

	if(req.params.id !== req.body.id){
		const message = `Request path id \`${req.params.id}\` and request body id \`${req.body.id}\` must match`;
		console.error(message);
		return res.status(400).send(message);
	}
	console.log(`Updating shopping list item \`${req.params.id}\``);
	BlogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	});
	res.status(204).end();
})

app.delete('/blog-posts/:id', (req, res) => {
  ShoppingList.delete(req.params.id);
  console.log(`Deleting blog post id \`${req.params.id}\``);
  res.status(204).end();
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});