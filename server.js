require('dotenv').load()

var axios      = require('axios')
  , express    = require('express')
  , bodyParser = require('body-parser')
  , http       = require('http')
  , PouchDB    = require('pouchdb')
  , uuid       = require('uuid')
  , technician = require('./technician')
  , blueFolder = require('./blueFolder')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var db  = new PouchDB('http://localhost:5984/nai')

app.route('/api')
  .get(function (req, res) {
    console.log('api!')
    db.info().then(function (info) {
      console.log(info)
      res.json(info)
    })
  })

app.route('/api/technicians')
  .get(function (req, res) {
    // use allDocs to get technicians from the database
    // paginate via offset / stride and req.query
    db.allDocs().then(function (docs) {
      console.log(docs)
      res.json(docs)
    }).catch(function (err) {
      res.json(err)
    })
  }).put(function (req, res) {
    var prospective = req.body

    if (technician.verifyTechnician(prospective)) {
      prospective._id = 'tech_' + uuid.v4()
      db.put(prospective)
        .then(function (response) {
        res.send('successfully created \n\n\n' + JSON.stringify(response))
      }).catch(function (err) {
        res.json(err)
      })
    } else {
      res.send('Invalid technician.')
    }
  })

app.route('/api/work-orders')
  .get(function (req, res) {
    blueFolder.serviceRequests.list()
      .then(function (data) {
        res.json(data)
      }).catch(function (err) {
        res.json(err)
      })
  })

http.createServer(app).listen(9999)
