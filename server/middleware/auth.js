// 登录校验中间件
module.exports = options => {
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../models/User')
    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请提供jwt token,请先登录')
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '无效的jwt token, 请先登录')
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '用户不存在')
        console.log(req.user)
        await next()
    }
}