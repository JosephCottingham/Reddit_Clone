const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Populate = require("../util/autopopulate");

const PostSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: false },
    summary: { type: String, required: false },
    subreddit: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    author : { type: Schema.Types.ObjectId, ref: "User", required: true }
  })
// Always populate the author field
PostSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))

const Post = mongoose.model('Post', PostSchema)

module.exports = Post