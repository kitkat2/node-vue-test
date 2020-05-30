module.exports = (url,callback) => {
  // fs模块
  const fs = require('fs');
  console.log();
  
  // 引入第三方模块moment
  // npm --> 模块管理工具
  console.log(__dirname+url)
  fs.readFile(__dirname+url, 'utf8', callback);
}