const express = require('express')
const router = express.Router();

const Post = require('../models/post')
const Comment = require('../models/comment')


// CREATE Comment
router.post("/:postId/comments", function(req, res) {
    // INSTANTIATE INSTANCE OF MODEL
    const comment = new Comment(req.body);
  
    // SAVE INSTANCE OF Comment MODEL TO DB
    comment
      .save()
      .then(comment => {
        return Post.findById(req.params.postId);
      })
      .then(post => {
        post.comments.unshift(comment);
        return post.save();
      })
      .then(post => {
        res.redirect(`/posts/`+req.params.postId);
      })
      .catch(err => {
        console.log(err);
      });
  });

module.exports = router