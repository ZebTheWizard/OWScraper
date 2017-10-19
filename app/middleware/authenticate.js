module.exports = {
  required(req, res, next) {
    console.log('user should be authenticated');
    next()
    // res.end('Authentication Required')
  }
}
