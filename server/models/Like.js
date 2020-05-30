const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const Paper = require('./Paper')
const Comment = require('./Comment')
const Note = require('./Note')
const schema = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    comment: { type: mongoose.SchemaTypes.ObjectId, ref: 'Comment'}, //点赞的评论
    note: { type: mongoose.SchemaTypes.ObjectId, ref: 'Note'}, //点赞的笔记
    likeCount: {type: Number, default: 0}, //当前点赞数 
    type: {type: String}, // 点赞类型，点赞的是评论还是笔记  'n'/ 'c'
})

module.exports = mongoose.model('Like', schema)