const express = require('express')
const postRoutes = require('./post.js')
const commentRoutes = require('./comment.js')
const authRoutes = require('./auth.js')
const repliesRoutes = require('./replies.js')

const Post = require('../models/post')


const router = express.Router()

router.use('/posts', postRoutes)
router.use('/posts', commentRoutes)
router.use('/', repliesRoutes)
router.use('/', authRoutes)


router.get('/', (req, res) => {
  var currentUser = req.user;
  console.log('currentUser');
  console.log(req.user);
  console.log(currentUser);
  Post.find({}).lean().populate('author')
    .then(posts => {
      posts.sort(function(a,b) {return (a.voteScore < b.voteScore) ? 1 : ((b.voteScore < a.voteScore) ? -1 : 0);} );
      res.render('posts-index', {
        'posts':posts,
        'currentUser':currentUser
      });
    })
    .catch(err => {
      console.log(err.message);
    })
})



module.exports = router