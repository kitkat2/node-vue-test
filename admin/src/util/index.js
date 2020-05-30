const dateFormatter = function(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1 > 9? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
  let day = date.getDate() > 9? `${date.getDate()}` : `0${date.getDate()}`;
  let hour = date.getHours() > 9? `${date.getHours()}` : `0${date.getHours()}` ; //获取当前小时数(0-23)
  let minute = date.getMinutes() > 9? `${date.getMinutes()}` : `0${date.getMinutes()}` ; //获取当前分钟数(0-59)
  let second = date.getSeconds() > 9? `${date.getSeconds()}` : `0${date.getSeconds()}` ; //获取当前秒数(0-59)
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export default {
  dateFormatter,
}