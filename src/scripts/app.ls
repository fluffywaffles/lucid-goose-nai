
require './_config'

# setup
app = {
  projects: [
    { description: 'Loading...' }
  ]
}

window.app = riot.observable(app)

app.on \load-projects (data) ->
  app.projects = data
  app.trigger \update

app.on \update ->
  console.log 'update view'

# init
axios.get config.api + '/work-orders'
  ..then ({ data: response }) ->
    xml = response.data
    json = xml2json.parser xml
    servicerequests = json.response.servicerequestlist.servicerequest

    servicerequests.for-each (p, i) ->
      p.index = i

    app.trigger \load-projects servicerequests
  ..catch (err) ->
    console.log err
