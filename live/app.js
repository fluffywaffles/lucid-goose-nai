var express = require('express')
  , auth    = require('basic-auth-connect')
  , http    = require('http')

var app = express()

app.use(auth('nainstall', process.env.NAIPASSWORD))
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.redirect('/public/index.html')
})

http.createServer(app).listen(3005)

