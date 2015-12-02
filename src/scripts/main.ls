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
        technicians = servicerequest.customfields.customfield.value
        try
          app.current-technicians = JSON.parse technicians
        catch e
          console.error(e)

      axios.get config.api + '/technicians/nearby?zip=' + servicerequest.customerlocationpostalcode
        ..then ({ data: response }) ->
          # list of technicians sorted by closest to farthest
          app.nearby-technicians = response
          app.trigger \technicians-loaded
        ..catch (err) ->
          console.log err
    ..catch (err) ->
      console.log err

# kickoff router
riot.route.start true
