const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: false },
    summary: { type: String, required: false },
    subreddit: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  })
  
const Post = mongoose.model('Post', PostSchema)

module.exports = Post