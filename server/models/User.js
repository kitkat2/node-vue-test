const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String},
    avatar: { type: String},
    brief: {type: String},
    email: {type: String},
    passwd: {
      type: String,
      select: false, // 设置密码默认查询时不可查
      set(val){
        return require('bcryptjs').hashSync(val, 10)
        // 第二个参数10为加密指数，指数越高越安全，也越耗时
        // 一般取10 ~ 12
      }
    },
    isBlocked: {type: Boolean},
    isLogoff: {type: Boolean},
    authority:{type: String}

})

module.exports = mongoose.model('User', schema)