require('dotenv').load()

var axios      = require('axios')
  , express    = require('express')
  , bodyParser = require('body-parser')
  , http       = require('http')
  , PouchDB    = require('pouchdb')
  , uuid       = require('uuid')
  , technician = require('./technician')
  , blueFolder = require('./blueFolder')
  , zipcode    = require('./zipcode')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  // Be nice to OPTIONS
  if (req.method === 'OPTIONS') res.statusCode(200).send('ok')

  next()
})

var db  = new PouchDB('http://localhost:5984/nai')

var technician_ddoc = {
  _id: '_design/technicians',
  views: {
    by_zip: {
      map: function (doc) { emit(doc.zip) }.toString()
    }
  }
}

app.get('/api', function (req, res) {
  db.info().then(function (info) {
    console.log(info)
    res.json(info)
  })
})

app.all('/api/technicians', function (req, res, next) {
  db.get(technician_ddoc._id).then(function (ddoc) {
    console.log('update index')
    technician_ddoc._rev = ddoc._rev
    return db.put(technician_ddoc)
  }).catch(function(err) {
    console.log('generate index')
    return db.put(technician_ddoc)
  }).then(function () {
    console.log('index up! Leggo')
    db.query('technician_index/by_zip', {
      limit: 0
    }).then(function (res) {
      console.log('index populated!')
      next()
    }).catch(function (err) {
      res.json(err)
    })
  }).catch(function (err) {
    res.json(err)
  })
})

app.get('/api/technician/nearby', function (req, res) {
  console.log(req.query)
  db.query('technicians/by_zip').catch(function (err) {
    res.json(err)
  }).then(function (docs) {
    distance = zipcode.distanceFrom(req.query.zip)
    distances = docs.rows.map(function (t) {
      return function () {
        return distance(t.key)
          .then(function (data) {
          t.distance = data.data.distance
          return t
        }).catch (function (err) {
          console.log(err)
          return err
        })
      }
    })
    return axios.all(distances.map(function (d) { return d() }))
  }).then(axios.spread(function () {
    res.json([].slice.call(arguments).sort(function (a, b) {
      return a.distance > b.distance
    }))
  }))
})

app.route('/api/technician')
  .get(function (req, res) {
    db.allDocs({
      include_docs: true,
      keys: req.query.take,
      key: req.query.id
    }).then(function (docs) {
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

app.get('/api/work-orders', function (req, res) {
  blueFolder.serviceRequests.list()
    .then(function (data) {
      res.json(data)
    }).catch(function (err) {
      res.json(err)
    })
})

app.get('/api/work-orders/get', function (req, res) {
  blueFolder.serviceRequests.get(req.query.id)
    .then(function (data) {
    res.json(data)
  }).catch(function (err) {
    res.json(err)
  })
})

http.createServer(app).listen(9999)
