var technician = {
  name: {
    first: String,
    last: String,
  },
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zip: Number,
  states: [ String ],
  skills: [ String ],
  phoneSystems: [ String ],
  fieldOfWork: String,
  billing: {
    standard: String,
    overtime: String,
    weekend: String,
  },
  w9tin: String,
  insured: Boolean,
  union: Boolean,
}

function _verify (model, object) {
  return Object.keys(model).every(function (field) {
    var type = model[field]
      , data = object[field]

    console.log(type)
    console.log(data)

    if (typeof data === 'object') {
      // multiple possible types
      return _verify(type, data)
    }
    else if (type instanceof Array) {
      // array of a type
      type = type[0]
      if (data instanceof Array) {
        return data.every(function (datum) {
          return datum instanceof type
        })
      }
      else return false
    }
    else {
      // just a type
      return data instanceof type
        || typeof data == typeof type()
    }
  })
}

function verifyTechnician (object) {
  return _verify(technician, object)
}

module.exports = {
  technician: technician,
  _verify: _verify,
  verifyTechnician: verifyTechnician
}
