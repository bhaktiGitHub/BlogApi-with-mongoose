
const express = require('express');
// we'll use morgan to log the HTTP layer
const morgan = require('morgan');
// we'll use body-parser's json() method to 
// parse JSON data sent in requests to this app
const bodyParser = require('body-parser');

// we import the ShoppingList model, which we'll
// interact with in our GET endpoint
// const {blog} = require('./model');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

const blogRouter = require('./blogRouter');
app.use('/blog-posts', blogRouter);


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
