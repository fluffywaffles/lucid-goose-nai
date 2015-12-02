riot.mount '*'

riot.route '/work-order/*' (index) ->
  console.log app.projects[index].servicerequestid
  axios.get config.api + '/work-orders/get?id=' + app.projects[index].servicerequestid
    ..then ({ data: response }) ->
      xml = response.data
      json = xml2json.parser xml

      servicerequest = json.response.servicerequest
      if servicerequest.customfields
        technicians = servicerequest.customfields.customfield.value

        try
          app.current-technicians = JSON.parse technicians
        catch e
          app.current-technicians = [ ]

      axios.get config.api + '/technicians/nearby?zip=' + servicerequest.customerlocationpostalcode
        ..then ({ data: response }) ->
          # sparse list of technicians sorted by closest to farthest
          app.nearby-technicians = response
          console.log(response)
          app.trigger \technicians-loaded
        ..catch (err) ->
          console.log(err)
    ..catch (err) ->
      console.log err

riot.route.start true
