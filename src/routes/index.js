const express = require('express')
const postRoutes = require('./post.js')
const commentRoutes = require('./comment.js')

const router = express.Router()

router.use('/posts', postRoutes)
router.use('/posts', commentRoutes)


module.exports = router