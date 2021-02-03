const express = require('express')
const postRoutes = require('./post.js')

const router = express.Router()

router.use('/posts', postRoutes)

module.exports = router