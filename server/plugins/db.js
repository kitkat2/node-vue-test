module.exports = app =>{
    const mongoose =  require('mongoose')

    mongoose.connect('mongodb://127.0.0.1:27017/papers',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, '连接错误：'));
    db.once('open', () => {
        console.log('MongoDB连接成功！！');
    });
}