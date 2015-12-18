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
  zip: String,
  // optional
  $optional$: true,
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
  var opt = false

  return Object.keys(model).every(function (field) {
    var type = model[field]
      , data = object[field]

    if (field === '$optional$' && type === true) {
      opt = true
      return true
    }

    if (typeof data === 'object') {
      // multiple possible types
      return _verify(type, data)
    }
    else if (type instanceof Array) {
      // array of a type
      if (opt) return opt
      type = type[0]
      if (data instanceof Array) {
        return data.every(function (datum) {
          return (datum instanceof type)
            || typeof data === typeof type()
        })
      }
      else return false
    }
    else {
      // just a type
      return opt
        || (data instanceof type)
        || typeof data === typeof type()
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
