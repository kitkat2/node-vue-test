const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: { type: String},     // 论文标题
    subtitle: { type: String},  // 论文副标题
    summary: {type: String},    // 论文摘要
    author: {                   // 作者信息
        names: {type: String},
        brief: {type: String}
    },
    publishDate: {type: String},// 发表日期
    keyword: {type: String},    // 论文关键词，每个关键词间用逗号隔开
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref:'Category'}], // 论文分类
    body: {type: String},   // 论文内容
    type: {type: String},   // 论文类型（期刊、年鉴、报纸等）
    journal: {
        name: {type: String}, // 论文刊登期刊
        issn: {type: String}, // 期刊出版号
        sourceType: {type: String} // 来源类别
    },
    conference: {
        name: {type: String}, // 会议名称
        level: {type: String}, // 会议级别
        date: {type: String} // 会议时间
    },
    newspaper: {
        name: {type: String}, // 报纸名称
        issn: {type: String}, // 出版刊号
        date: {type: String}  // 出版日期
    },
    yearbook: {
        name:  {type: String}, //年鉴名称 
        issn: {type: String},  //出版号
    }
})

module.exports = mongoose.model('Paper', schema)