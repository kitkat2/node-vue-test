const mongoose = require('mongoose')
const User = require('./User')
const Paper = require('./Paper')
mongoose.set('useFindAndModify', false)
const schema = new mongoose.Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },// 被评论的用户信息
    paperId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Paper' , required: true}, // 浏览的论文
    viewTime: { type: Date, default: Date.now}, // 浏览时间
})

module.exports = mongoose.model('History', schema)