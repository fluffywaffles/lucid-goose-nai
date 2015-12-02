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
    +   '<serviceRequestList>'
    +     '<listType> basic </listType>'
    +   '</serviceRequestList>'
    + '</request>'
  )
}

blueFolder.serviceRequests.get = function (id) {
  return blueFolder._req (
    serviceRequestsEndpoint + '/get.aspx',
      '<request>'
    +   '<serviceRequestId>' + id + '</serviceRequestId>'
    + '</request>'
  )
}

blueFolder.serviceRequests.assignTech = function (sr, tech) {
  return blueFolder._req (
    serviceRequestsEndpoint + '/edit.aspx',
    '<request>'
    +  '<serviceRequestEdit>'
    +    '<customFields>'
    +      '<customField name="technicians">'
    +        JSON.stringify(tech)
    +      '</customField>'
    +    '</customFields>'
    +    '<serviceRequestId>' + sr.servicerequestid + '</serviceRequestId>'
    +  '</serviceRequestEdit>'
    +'</request>'
  )
}

module.exports = blueFolder
