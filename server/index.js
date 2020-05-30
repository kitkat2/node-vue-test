const express = require('express')

const app = express()

// set 表示在当前实例上设置一个变量
// 设置一个用于jwt生成token的密钥
app.set('secret', 'i2dff9fw4rf9fw3gs8')

app.use(require('cors')())
app.use(express.json())
// 静态文件托管 使静态文件可以通过'/uploads'这个路径访问到
app.use('/uploads', express.static(__dirname+'/uploads'))

require('./routes/admin')(app);
require('./routes/web')(app);
require('./routes/common')(app);
require('./plugins/db')(app);
// require('./plugins/libOffice')(app);



app.listen(3000, ()=>{
    console.log("http://localhost:3000");
});