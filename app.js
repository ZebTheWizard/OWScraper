const express = require('express');
const app = express()
const server = require('http').Server(app)
const nunjucks = require('nunjucks')
const bodyParser  =  require('body-parser')

global.use = function(path) {
  return require(__dirname + "/" + path)
}

nunjucks.configure('views', {
  autoescape: true,
  express: app
})

server.listen(8000, ()=>{console.log('Server is ready and listening on port 8000')})



const home = require('./app/controllers/home');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/:platform/:region/:name/:mode', home.index)
app.get('/', home.test)
app.use('/public', use('routes/public'))
