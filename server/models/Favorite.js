const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const Paper = require('./Paper')
const User = require('./User')
const schema = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    paper: { type: mongoose.SchemaTypes.ObjectId, ref: 'Paper'},
    favoriteCount: {type: Number, default: 0}, //论文当前被收藏次数 
    date: { type: Date, default: Date.now }, // 收藏时间

})

module.exports = mongoose.model('Favorite', schema)