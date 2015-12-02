var axios = require('axios')

var zipcode = { }

zipcode.distance = function (zip1, zip2) {
  return axios.get(
    'https://www.zipcodeapi.com/rest/'
    + process.env.zipcodeAPIKey
    + '/distance.json/' + zip1 + '/' + zip2 + '/mile'
  )
}

zipcode.distanceFrom = function (zip1) {
  return function (zip2) {
    return zipcode.distance(zip1, zip2)
  }
}

module.exports = zipcode
