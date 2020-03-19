const express = require('express')

const app = express()

app.use(require('cors')())
app.use(express.json())
// 静态文件托管 使静态文件可以通过'/uploads'这个路径访问到
app.use('/uploads', express.static(__dirname+'/uploads'))

require('./routes/admin')(app);
require('./plugins/db')(app);



app.listen(3000, ()=>{
    console.log("http://localhost:3000");
});