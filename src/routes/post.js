const express = require('express')
const router = express.Router();

const Post = require('../models/post')

// all posts page
router.get('/', (req, res) => {
    res.render('posts-new');
})

// new post
router.get('/new', (req, res) => {
    res.render('posts-new');
})

router.post('/new', (req, res) => {
    Post.create({
        title: req.body.title,
        url: req.body.url,
        summary: req.body.summary,
        subreddit: req.body.subreddit
    })

    return res.redirect('/')
})

// single post page
router.get('/:postId', (req, res) => {
  // LOOK UP THE POST
  Post.findById(req.params.postId).lean()
    .then(post => {
      res.render("posts-show", { post });
    })
    .catch(err => {
      console.log(err.message);
    });
})


// SUBREDDIT
router.get("/n/:subreddit", function(req, res) {
    Post.find({ subreddit: req.params.subreddit }).lean()
    .then(posts => {
      res.render("posts-index", { posts });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router