module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const UserModel = require('../../models/User')
  // 将通过url动态传递的参数合并到router，使其能通过req.params获取
  // 子路由继承父路由的参数
  const router = express.Router({
      mergeParams: true
  });

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')

  // 图片上传接口
  const multer = require('multer')
  const upload = multer({
      dest: __dirname + '/../../uploads'
  })
  app.post('/common/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
      const file = req.file
      file.url = `http://localhost:3000/uploads/${file.filename}`
      res.send(file)
  })

  // 用户登录接口
  app.post('/common/api/login', async (req, res) => {
      const {
          name,
          passwd
      } = req.body
      //  根据用户名找用户
      const user = await UserModel.findOne({
          name
      }).select('+passwd')
      // moogose select('-XXX') 前缀 - 被排除， 前缀 + 被强制选择
      // 强制取出密码
      assert(user, 422, '用户不存在')
      // 校验密码 用bcrypt
      const isValid = require('bcryptjs').compareSync(passwd, user.passwd)
      assert(isValid, 422, '密码错误')

      // 返回token

      // 利用jwt的sign方法生成一个token
      const token = jwt.sign({
          id: user._id,
      }, app.get('secret'),  { expiresIn: '1 days' }) // 设置一个token过期的时间
      res.send({token})
  })

  // 错误处理函数
  app.use(async(err, req, res, next) => {
      res.status(err.status || '500' ).send({
          message: err.message
      })
  })

}