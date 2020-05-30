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

    // 提交信息表单接口 --> 新增
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 编辑资源信息接口 --> 修改
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 分页查询
    router.post('/page', async (req, res) => {
        const {
            crtPage,
            pageSize,
            sortedBy
        } = await req.body.page
        const search = req.body.search
        let total = 0
        let datas = []
        if (search) {
            console.log(search)
            const key = Object.keys(search)[0]
            const value = new RegExp(search[key], 'i')
            console.log(key, value)
            let params = {}
            params[key] = {
                $regex: value
            }
            total = await req.Model.find(params).countDocuments()
            datas = await req.Model.find(params).populate('parent').sort(sortedBy).skip((crtPage - 1) * pageSize).limit(pageSize)
        } else {
            total = await req.Model.find().countDocuments()
            datas = await req.Model.find().populate('parent').sort(sortedBy).skip((crtPage - 1) * pageSize).limit(pageSize)
        }


        res.send({
            total,
            datas
        })
    })
    router.get('/', async (req, res) => {
        // const datas = await req.Model.find().populate('parent').limit(10)
        let options = {}
        const total = await req.Model.find().populate(options).count()
        const datas = await req.Model.find().populate(options).limit(10)
        res.send({
            total,
            datas
        })
    })
    // 聚合查询收藏记录
    router.post('/page/favo', async (req, res) => {
        const {
            crtPage,
            pageSize,
            sortedBy
        } = await req.body.page
        const total = await req.Model.find().countDocuments()
        let datas = []
        if (req.resource === 'history') {
            datas = await req.Model.find().populate('paperId', 'title').populate('userId', 'name').sort(sortedBy).skip((crtPage - 1) * pageSize).limit(pageSize)
        }else if (req.resource === 'comments') {
            datas = await req.Model.find().populate('paperId', 'title').populate('from', 'name').populate('to', 'name').sort(sortedBy).skip((crtPage - 1) * pageSize).limit(pageSize)
        }else if (req.resource === 'notes') {
            datas = await req.Model.find().populate('paperId', 'title').populate('creator', 'name').sort(sortedBy).skip((crtPage - 1) * pageSize).limit(pageSize)
        }else {
            datas = await req.Model.find().populate('paper', 'title').populate('user', 'name').sort(sortedBy).skip((crtPage - 1) * pageSize).limit(pageSize)
        }
        res.send({
            total,
            datas
        })
    })
   
    // 获取父级分类/所属分类信息接口
    router.get('/options/:reg', async (req, res) => {
        let reg = new RegExp(req.params.reg)
        const datas = await req.Model.find({
            value: reg
        })
        res.send(datas)
    })
    // 获取单个元素信息接口
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 删除某个用户的信息接口
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id)
        if (req.query.update) {
            const uVal = req.query.update
            let update = {}
            update[uVal] = --model[uVal]
            if (req.resource === 'likes') {
                await require('../../models/Comment').findByIdAndUpdate(model.paper, update)
            } else {
                await require('../../models/Paper').findByIdAndUpdate(model.paper, update)
            }
        }
        res.send({
            success: true
        })
    })
    // 利用inflection插件转换类名，作为中间件将类名合并到路由中，实现通用的crud接口
    const resourceMiddleware = require('../../middleware/resource')
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)


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
    // 文件上传接口
    const uploadfile = multer({
        dest: __dirname + '/../../uploads/resources'
    })
    app.post('/admin/api/upload/resources', authMiddleware(), uploadfile.single('file'), async (req, res) => {
        const file = req.file
        console.log(__dirname);
        file.url = `http://localhost:3000/uploads/resources/${file.filename}`
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

        const isManager = user.authority === '2'
        assert(isManager, 422, '您没有权限进入本系统')

        // 返回token

        // 利用jwt的sign方法生成一个token
        const token = jwt.sign({
            id: user._id,
        }, app.get('secret'), {
            expiresIn: '1 days'
        }) // 设置一个token过期的时间
        res.send({
            token
        })
    })

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.status || '500').send({
            message: err.message
        })
    })

}