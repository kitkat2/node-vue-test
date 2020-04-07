// 登录校验中间件
module.exports = options => {
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../models/User')
    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请提供jwt token,请先登录')
        let id = ''
        const data = jwt.verify(token, req.app.get('secret'), (err, decoded)=>{
            if (err){
                res.status(401).send({
                    message: '登录已过期，请重新登录'
                })
            } 
            id =  decoded.id
               
        })
        assert(id, 401, '无效的jwt token, 请先登录')
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '用户不存在')
        console.log(req.user)
        await next()
    }
}