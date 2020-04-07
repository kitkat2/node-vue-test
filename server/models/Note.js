const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    creator: {type : mongoose.SchemaTypes.ObjectId, ref: 'User'},
    paperId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Paper'},
    paragraph: {type: Number}, // 表示笔记标记的段落
    start: {type: Number}, // 表示笔记开始的位置
    offset: {type: Number}, // 表示笔记的偏移字数
    content: {type: String, default: ''}, // 笔记内容
    isPublic: {type: Boolean}, //是否公开笔记内容
    likeCount: {type: Number}, // 表示笔记被点赞数
})

module.exports = mongoose.model('Note', schema)