const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    from: {
        _id: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', require: true },
        name: { type: String },
    }, // 发布评论的用户信息（id和姓名）
    to: {
        _id: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    }, // 被评论的用户信息
    paperId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Paper' , required: true}, // 被评论的论文
    content: { type: String , required: true}, // 评论内容
    like_Count: { type: Number , default: 0}, // 评论点赞数
    creatTime: { type: Date, default: Date.now}, // 评论发布时间
    // 父级id，表示被评论或回复的对象，默认为0，表示是当前评论第一级的评论，为_id时表示子回复
    parentId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Comment', required: true, default: 0 },
})

module.exports = mongoose.model('Comment', schema)