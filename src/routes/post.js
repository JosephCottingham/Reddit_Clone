const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = require('../models/post');
const User = require('../models/user');


// all posts page
router.get('/', (req, res) => {
  var currentUser = req.user;
  res.render('posts-new', { currentUser });
})

// new post
router.get('/new', (req, res) => {
  var currentUser = req.user;
  res.render('posts-new', { 'currentUser':currentUser });
})

router.post('/new', (req, res) => {
  var currentUser = req.user;
  console.log(currentUser);
  if (currentUser) {
    console.log('req.body');
    var post = new Post({
      title: req.body.title,
      url: req.body.url,
      summary: req.body.summary,
      subreddit: req.body.subreddit,
      author:  mongoose.Types.ObjectId(currentUser._id),
    })
    post.author=req.user._id;
    post.save().then(post => {
        return User.findById(req.user._id);
    }).then(user => {
        user.posts.unshift(post);
        user.save();
        // REDIRECT TO THE NEW POST
        res.redirect(`/posts/${post._id}`);
    })
    .catch(err => {
        console.log(err.message);
    });
    } else {
        return res.status(401); // UNAUTHORIZED
    }
});

// single post page
router.get('/:postId', (req, res) => {
  var currentUser = req.user;
  // LOOK UP THE POST
  Post.findById(req.params.postId).populate('comments').lean().then((post) => {
    res.render('post-show', {
      post, currentUser
    })
  }).catch((err) => {
    console.log(err.message)
  })
})


// SUBREDDIT
router.get("/n/:subreddit", function (req, res) {
  var currentUser = req.user;
  Post.find({
      subreddit: req.params.subreddit
    }).lean()
    .then(posts => {
      res.render("posts-index", {
        posts, currentUser
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router