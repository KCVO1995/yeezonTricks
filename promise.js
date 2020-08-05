// 传入 Jssdk 请求函数，返回 Promise
const jdkAjax = (jdk,post) => {
  return new Promise((resolve, reject = '') => {
    const cb = data => data.res.code === 200? resolve(data.res) : reject('error')
    post ? jdk(post,cb) : jdk(cb)
  })
}
