const mongoose = require('mongoose')
const User = require('./User')
const Paper = require('./Paper')
mongoose.set('useFindAndModify', false)
const schema = new mongoose.Schema({
    creator: {type : mongoose.SchemaTypes.ObjectId, ref: 'User'},
    paperId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Paper'},
    content: {type: String, default: ''}, // 笔记内容
    contentHtml: {type: String},
    createTime: { type: Date, default: Date.now}, // 发布时间


})

module.exports = mongoose.model('Note', schema)