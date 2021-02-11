const express = require('express')
const postRoutes = require('./post.js')
const commentRoutes = require('./comment.js')
const authRoutes = require('./auth.js')

const Post = require('../models/post')


const router = express.Router()

router.use('/posts', postRoutes)
router.use('/posts', commentRoutes)
router.use('/', authRoutes)

router.get("/", (req, res) => {
    var currentUser = req.user;
  
    Post.find({})
      .then(posts => {
        res.render("posts-index", { posts, currentUser });
      })
      .catch(err => {
        console.log(err.message);
      });
  });


module.exports = router