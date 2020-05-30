module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const path = require('path')
  const fs = require('fs')



  const resourceMiddleware = require('../../middleware/resource')
  // const queryMiddleware = require('../../middleware/query')
  const UserModel = require('../../models/User')
  const CommentModel = require('../../models/Comment')
  const PaperModel = require('../../models/Paper')

  // 通用crud接口

  /**
   * 新增信息
   */
  router.post('/create', async (req, res) => {
    const model = await req.Model.create(req.body)
    if (req.resource === "favorites") {
      await PaperModel.findByIdAndUpdate(req.body.paper, {
        favoriteCount: req.body.favoriteCount
      })
    } else if (req.resource === "likes") {
      if (req.body.type === 'c') {
        await CommentModel.findByIdAndUpdate(req.body.comment, {
          likeCount: req.body.likeCount
        })
      } else if (req.body.type === 'n') {
        await require('../../models/Note').findByIdAndUpdate(req.body.note, {
          likeCount: req.body.likeCount
        })
      }
    }
    res.send(model)
  })

  /**
   * 删除信息
   */

  // 通过id删除
  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id)
    if (model)
      res.send({
        success: true
      })
  })
  // 条件查找后删除数据
  router.post('/delete', async (req, res) => {
    const model = await req.Model.findOneAndRemove(req.body)
    if (req.resource === "favorites") {
      await PaperModel.findByIdAndUpdate(req.body.paper, {
        favoriteCount: --model.favoriteCount
      })
      console.log(model)
    } else if (req.resource === "likes") {
      if (req.body.type === 'c') {
        await CommentModel.findByIdAndUpdate(req.body.comment, {
          likeCount: --model.likeCount
        })
      } else if (req.body.type === 'n') {
        await require(`../../models/Note`).findByIdAndUpdate(req.body.note, {
          likeCount: --model.likeCount
        })
      }
    }
    res.send({
      success: true,
    })
  })
  /** 
   * 查找信息
   */
  // 查找父级元素的所有子元素
  router.get('/parent', async (req, res) => {
    const parent = await req.Model.findOne(req.query);
    const datas = await req.Model.find({
      parent: parent._id
    })
    res.send(datas)
  })

  // 通用查找接口
  router.post('/', async (req, res) => {
    const datas = await req.Model.find(req.body)  
    res.send(datas)
  })
  // 查询点赞状态
  router.post('/activeState', async (req, res) => {
    const datas = await req.Model.find(req.body)
    res.send({
      len: datas.length
    })
  })
  // 分页查询
  router.post('/page', async (req, res) => {
    const {
      crtPage,
      pageSize,
      sortedBy
    } = await req.body.page
    let options = {}
    options.path = req.resource === 'favorites'? 'paper' : req.resource === 'history' || req.resource === 'notes'? 'paperId' : ''
    const total = await req.Model.find(req.body.query).countDocuments()
    const datas = await req.Model.find(req.body.query).populate(options).sort(sortedBy).skip((crtPage - 1) * pageSize).limit(pageSize)
    res.send({
      total,
      datas
    })
  })

  /**
   * 更改信息
   */
  //更新信息 （主要用于用户信息的更改）
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  app.use('/web/api/rest/:resource', resourceMiddleware(), router)



  // 进入网站 根据token判断用户是否已登录 已经登录则返回用户信息
  app.get('/web/api/userinit', async (req, res) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    let _id = '';
    if (token) {
      jwt.verify(token, req.app.get('secret'), (err, decoded) => {
        _id = decoded.id
      })
      if (_id) {
        let user = await UserModel.findOne({
          _id
        })
        assert(user, 401, '登录失效，请重新登录')
        res.send(user)
      }
    }
  })

  // 用户注册
  app.post('/web/api/register', async (req, res) => {
    const {
      email
    } = req.body
    //  根据email找用户
    const user = await UserModel.findOne({
      email
    })
    assert(!user, 422, '用户已存在')
    const u = await UserModel.create({
      ...req.body,
      name: email,
      authority: 0
    })
    // 返回token

    // 利用jwt的sign方法生成一个token
    const token = jwt.sign({
      id: u._id,
    }, app.get('secret'), {
      expiresIn: '1 days'
    }) // 设置一个token过期的时间
    res.send({
      token,
      message: '注册成功！'
    })
  })


  /**
   * 评论查询
   */

  //热门评论
  app.get('/web/api/comments/hot', async (req, res) => {
    const sortedBy = {
      likeCount: -1
    }
    const count = 5
    const datas = await CommentModel.find(req.query).populate('from').populate('to').populate({
      path: 'parentId',
      populate: {
        path: 'from',
        select: ['name', '_id']
      }
    }).sort(sortedBy).limit(count)
    res.send(datas)
  })
  // 分页查询最新评论
  app.post('/web/api/comments/new', async (req, res) => {
    const {
      crtPage,
      pageSize,
      sortedBy
    } = await req.body.page
    const total = await CommentModel.find(req.body.query).countDocuments()
    const datas = await CommentModel.find(req.body.query).populate('from').populate('to').populate({
      path: 'parentId',
      populate: {
        path: 'from',
        select: ['name', '_id']
      }
    }).sort(sortedBy).skip((crtPage - 1) * pageSize).limit(pageSize)
    res.send({
      total,
      datas
    })
  })
  // 收藏记录查询
  // app.post('/web/api/favorites/list', async (req, res) => {
  //   const {
  //     crtPage,
  //     pageSize,
  //     sortedBy
  //   } = await req.body.page
  //   const total = await CommentModel.find(req.body.query).countDocuments()
  //   const datas = await CommentModel.find(req.body.query).populate('paper').populate({path: 'parentId', populate:{path: 'from', select: ['name','_id']}}).sort(sortedBy).skip((crtPage - 1) * pageSize).limit(pageSize)
  //   res.send({
  //     total,
  //     datas
  //   })
  // })

  // app.get('/web/api/getPaperOnline', async (req, res) => {
  //   const fs = require('../../plugins/fs')
  //   const getData = (err, data) => {
  //     if (err) throw err;
  //     res.setHeader('Content-type', 'text/html;charset=utf-8');
  //     res.end(data);
  //   }
  //   const data = fs('../../uploads/resources/word.html', getData);
  // })

  app.get('/web/api/getPaperOnline', async (req, res, next) => {
    const model = await PaperModel.findOne(req.query).select('body')
    const fileName = model.body.filename
    var currDir = path.join(__dirname, '../../uploads/resources/'),
      currFile = path.join(currDir, fileName),
      stats = fs.statSync(currFile);

    fs.exists(currFile, function (exist) {
      if (exist) {
        res.set({
          "Content-type": "application/octet-stream",
          "Content-Disposition": "attachment;filename=" + encodeURI(fileName),
          'Content-Length': stats.size
        });
        let fReadStream = fs.createReadStream(currFile);
        fReadStream.pipe(res);
      } else {
        res.send({
          message: "file not exist!"
        });
        res.end();
      }
    });
  });

  app.use(async (err, req, res, next) => {
    res.status(err.status || '500').send({
      message: err.message
    })
  })

}