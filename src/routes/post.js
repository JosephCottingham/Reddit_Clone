const express = require('express')
const router = express.Router();

const Post = require('../models/post')

// all posts page
router.get('/', (req, res) => {
  var currentUser = req.user;
  res.render('posts-new');
})

// new post
router.get('/new', (req, res) => {
  var currentUser = req.user;
  res.render('posts-new');
})

router.post('/new', (req, res) => {
  if (req.user) {
    Post.create({
      title: req.body.title,
      url: req.body.url,
      summary: req.body.summary,
      subreddit: req.body.subreddit
    })

    return res.redirect('/')
  } else {
    return res.status(401); // UNAUTHORIZED
  }
})

// single post page
router.get('/:postId', (req, res) => {
  var currentUser = req.user;
  // LOOK UP THE POST
  Post.findById(req.params.postId).lean().populate('comments').then((post) => {
    res.render('post-show', {
      post
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
        posts
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router