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
        summary: req.body.summary
    })

    return res.send({
        message: 'Create new post',
        data: req.body
    })
})

// single post page
router.get('/:postId', (req, res) => {
    return res.send(`Post with id ${req.params.postId}`)
})

/** Route to update an existing message. */
router.put('/:messageId', (req, res) => {
    return res.send({
        message: `Update message with id ${req.params.messageId}`,
        data: req.body
    })
})

/** Route to delete a message. */
router.delete('/:messageId', (req, res) => {
    return res.send(`Delete message with id ${req.params.messageId}`)
})

module.exports = router