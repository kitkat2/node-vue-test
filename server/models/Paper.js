const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String},
    avatar: { type: String},
    brief: {type: String},
    email: {type: String},
    passwd: {type: String},
    isBlocked: {type: Boolean},
    isLogoff: {type: Boolean},
    authority:{type: String}

})

module.exports = mongoose.model('User', schema)