# main

# start app
riot.mount '*'

# main route
riot.route '/work-order/*' (index) ->
  axios.get config.api + '/work-orders/get?id=' + app.projects[index].servicerequestid
    ..then ({ data: response }) ->
      xml = response.data
      json = xml2json.parser xml

      servicerequest = json.response.servicerequest

      app.current-technicians = [ ]

      if servicerequest.customfields
        custom-fields = servicerequest.customfields.customfield

        technicians = [].filter.call custom-fields, (f) ->
          f.name is 'technicians'

        try
          app.current-technicians = JSON.parse technicians.0.value
        catch e
          console.info 'Parse fail. Assume no technicians are assigned.'
          console.info e

      axios.get config.api + '/technician/nearby?zip=' + servicerequest.customerlocationpostalcode
        ..then ({ data: response }) ->
          # list of technicians sorted by closest to farthest
          app.nearby-technicians = response
          app.trigger \technicians-loaded
        ..catch (err) ->
          console.log err
    ..catch (err) ->
      console.log err

app.load-technicians = (techs) ->
  req = config.api + '/technician?'
  techs.for-each (t) ->
    req += '&take[]=' + t.id
  axios.get req

# kickoff router
riot.route.start true
