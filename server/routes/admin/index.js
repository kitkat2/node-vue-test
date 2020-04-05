module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/User')
    // 将通过url动态传递的参数合并到router，使其能通过req.params获取
    // 子路由继承父路由的参数
    const router = express.Router({
        mergeParams: true
    });

    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')

    // 提交用户信息表单接口 --> 新增用户
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 编辑用户信息接口
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 获取用户信息接口
    router.get('/', async (req, res) => {
        // const datas = await req.Model.find().populate('parent').limit(10)
        const datas = await req.Model.find().populate('parent')
        res.send(datas)
    })
    // 聚合查询，获取父级分类/所属分类信息接口
    router.get('/options', async (req, res) => {
        const datas = await req.Model.find().populate('parent')
        res.send(datas)
    })
    // 获取单个用户的信息接口
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 删除某个用户的信息接口
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id)
        if (model)
            res.send({
                success: true
            })
    })
    // 利用inflection插件转换类名，作为中间件将类名合并到路由中，实现通用的crud接口
    const resourceMiddleware = require('../../middleware/resource')
    app.use('/admin/api/rest/:resource', authMiddleware() , resourceMiddleware(), router)


    // 图片上传接口
    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        console.log(__dirname);
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 用户登录接口
    app.post('/admin/api/login', async (req, res) => {
        const {
            name,
            passwd
        } = req.body
        //  根据用户名找用户
        const user = await AdminUser.findOne({
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
            username: user.name,
        }, app.get('secret'))
        res.send({token})
    })

    // 错误处理函数
    app.use(async(err, req, res, next) => {
        res.status(err.status || '500' ).send({
            message: err.message
        })
    })

}