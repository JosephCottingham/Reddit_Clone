const express = require('express')
const router = express.Router();

const Post = require('../models/post')
const Comment = require('../models/comment')


// CREATE Comment
router.post("/:postId/comments", function (req, res) {
  var currentUser = req.user;
  // INSTANTIATE INSTANCE OF MODEL
  if (currentUser) {
    const comment = new Comment({
      content: req.body.content,
      author: currentUser._id,
    });

    // SAVE INSTANCE OF Comment MODEL TO DB
    comment
      .save()
      .then(comment => {
        return Promise.all([
          Post.findById(req.params.postId)
        ]);
      })
      .then(([post, user]) => {
        post.comments.unshift(comment);
        return Promise.all([
          post.save()
        ]);
      })
      .then(post => {
        res.redirect(`/posts/${req.params.postId}`);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    return res.status(401); // UNAUTHORIZED
  }
});

module.exports = router