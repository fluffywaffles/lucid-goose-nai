var axios   = require('axios')
  , connect = require('connect')
  , http    = require('http')
  , PouchDB = require('pouchdb')

var app = connect()

var db  = new PouchDB('http://localhost:5984/nai')

app.use('/api', function (req, res, next) {
  console.log('api!')
  db.info().then(function (info) {
    console.log(info)
    res.end(JSON.stringify(info))
    next()
  })
})

app.use('/api/technicians', function (req, res, next) {
  // use allDocs to get technicians from the database
  // paginate via offset / stride and req.query
})

app.use('/api/work-orders', function (req, res, next) {
  // use axios to make basic auth requests to bluefolder
  // api key is in .env (require('.env').load())
  // transform xml to json and vice versa at the server layer
})

http.createServer(app).listen(9999)
