module.exports = app => {
    const express = require('express')

    // 将通过url动态传递的参数合并到router，使其能通过req.params获取
    // 子路由继承父路由的参数
    const router = express.Router({
        mergeParams: true
    });

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
        const datas = await req.Model.find().populate('parent').limit(10)
        res.send(datas)
    })
    // 获取父级信息接口
     router.get('/parents-option', async (req, res) => {
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
        if(model)
          res.send({ success: true})
    })
    // 利用inflection插件转换类名，作为中间件将类名合并到路由中，实现通用的crud接口
    app.use('/admin/api/rest/:resource', async(req, res, next) =>{
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    } , router)


    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads'})
    app.post('/admin/api/upload', upload.single('file'), async(req, res) =>{
      const file = req.file
      console.log(__dirname);
      file.url = `http://localhost:3000/uploads/${file.filename}`
      res.send(file)
    })
}