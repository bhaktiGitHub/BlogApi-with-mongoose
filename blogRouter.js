
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

var mongoose = require('mongoose');

mongoose.connect('mongodb://bhakti:1234@ds257848.mlab.com:57848/thinkfuldb');
var db = mongoose.connection;


var blogSchema = mongoose.Schema({
  id:String,
  title:String,
  content: String,
  author:String,
  publishDate:Number,
  

},
{
  timestamps:true
})


var Blog = mongoose.model("Blog" , blogSchema , "blogposts");


const {BlogPosts} = require('./model');

BlogPosts.create('my first blogpost', 'blah blah' , 'bhakti');
BlogPosts.create('my second blogpost', 'blogpost 2' , 'bhakti');


router.get('/', (req, res) => {
 Blog.find({} , function(err , data)
    {
      if(err)
      {
        console.log(err);
      }

      res.json(data);
    });
});


router.post('/', jsonParser, (req, res) => {
  
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  // const item = BlogPosts.create(req.body.title, req.body.content,req.body.author);
  var blog = new Blog(req.body);
  blog.save(function(err, document)
  {
    if(err){
      console.log(err);
    }

    res.status(201).json(document);
  })
  
});

router.delete('/:id', (req, res) => {
  // BlogPosts.delete(req.params.id);
  // console.log(`Deleted BlogPosts item \`${req.params.ID}\``);
  // res.status(204).end();
  Blog
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(202).json({message:"Item deleted"}).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  
  Blog
    .findByIdAndUpdate(req.params.id ,req.body , function(err , doc)
    {
      console.log(doc);
      
      
    })
   res.status(200).json({message:'updated'});
})

module.exports = router;