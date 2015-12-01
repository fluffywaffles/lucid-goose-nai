var axios = require('axios')

var serviceRequestsEndpoint = 'https://app.bluefolder.com/api/2.0/serviceRequests'

var blueFolder = Object.create(null)

blueFolder._auth = new Buffer(
  process.env.bluefolderAPIKey
  + ':bogusss'
).toString('base64')

blueFolder._reqConf = {
  timeout: 5000,
  headers: {
    'Authorization': 'Basic ' + blueFolder._auth
  }
}

blueFolder._req = function (endpoint, request) {
  return axios.post(endpoint, request, blueFolder._reqConf)
}

blueFolder.serviceRequests = Object.create(null)
blueFolder.serviceRequests.list = function () {
  return blueFolder._req (
    serviceRequestsEndpoint + '/list.aspx',
    '<request>'
      + '<serviceRequestList>'
        + '<listType> basic </listType>'
      + '</serviceRequestList>'
    + '</request>'
  )
}

module.exports = blueFolder
