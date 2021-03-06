const express = require('express')
const router = express.Router();

var Post = require("../models/post");
var Comment = require("../models/comment");
var User = require("../models/user");

// NEW REPLY
router.get("/posts/:postId/comments/:commentId/replies/new", (req, res) => {
    var currentUser = req.user;
    if (currentUser==null) {
        return res.redirect(`/login`);
    }
    let post;
    Post.findById(req.params.postId).lean()
        .then(p => {
            post = p;
            return Comment.findById(req.params.commentId).lean();
        })
        .then(comment => {
            res.render("replies-new", {
                post,
                comment,
                currentUser
            });
        })
        .catch(err => {
            console.log(err.message);
        });
});

// CREATE REPLY
router.post("/posts/:postId/comments/:commentId/replies", (req, res) => {
    var currentUser = req.user
    if (currentUser==null) {
        return res.redirect(`/login`);
    }
    // TURN REPLY INTO A COMMENT OBJECT
    const reply = new Comment(req.body);
    reply.author = req.user._id
    // LOOKUP THE PARENT POST
    Post.findById(req.params.postId)
        .then(post => {
            // FIND THE CHILD COMMENT
            Promise.all([
                    reply.save(),
                    Comment.findById(req.params.commentId),
                ])
                .then(([reply, comment]) => {
                    // ADD THE REPLY
                    comment.comments.unshift(reply._id);

                    return Promise.all([
                        comment.save(),
                    ]);
                })
                .then(() => {
                    res.redirect(`/posts/${req.params.postId}`);
                })
                .catch(console.error);
            // SAVE THE CHANGE TO THE PARENT DOCUMENT
            return post.save();
        })
});

module.exports = router