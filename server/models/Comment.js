const mongoose = require('mongoose')
const User = require('./User')
const Paper = require('./Paper')
mongoose.set('useFindAndModify', false)
const schema = new mongoose.Schema({
    from:  { type: mongoose.SchemaTypes.ObjectId, ref: 'User', require: true }, // 发布评论的用户信息
    to: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' }, // 被评论的用户信息
    paperId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Paper' , required: true}, // 被评论的论文
    content: { type: String , required: true}, // 评论内容
    likeCount: { type: Number , default: 0}, // 评论点赞数
    createTime: { type: Date, default: Date.now}, // 评论发布时间
    // 父级id，表示被评论或回复的对象，默认为''，表示是当前评论第一级的评论，为_id时表示子回复
    parentId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Comment'},
})

module.exports = mongoose.model('Comment', schema)