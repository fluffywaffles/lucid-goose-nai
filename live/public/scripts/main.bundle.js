(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
  riot.mount('*');
  riot.route('/work-order/*', function(index){
    var x$;
    x$ = axios.get(config.api + '/work-orders/get?id=' + app.projects[index].servicerequestid);
    x$.then(function(arg$){
      var response, xml, json, servicerequest, technicians, e, x$;
      response = arg$.data;
      xml = response.data;
      json = xml2json.parser(xml);
      servicerequest = json.response.servicerequest;
      app.currentTechnicians = [];
      if (servicerequest.customfields) {
        technicians = servicerequest.customfields.customfield.value;
        try {
          app.currentTechnicians = JSON.parse(technicians);
        } catch (e$) {
          e = e$;
          console.info('Parse fail. Assume no technicians are assigned.');
          console.info(e);
        }
      }
      x$ = axios.get(config.api + '/technician/nearby?zip=' + servicerequest.customerlocationpostalcode);
      x$.then(function(arg$){
        var response;
        response = arg$.data;
        app.nearbyTechnicians = response;
        return app.trigger('technicians-loaded');
      });
      x$['catch'](function(err){
        return console.log(err);
      });
      return x$;
    });
    x$['catch'](function(err){
      return console.log(err);
    });
    return x$;
  });
  app.loadTechnicians = function(techs){
    var req;
    req = config.api + '/technician?';
    techs.forEach(function(t){
      return req += '&take[]=' + t.id;
    });
    return axios.get(req);
  };
  riot.route.start(true);
}).call(this);


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9iaWZ5LXdpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9zb3VyY2UvbWFpbi5scyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7RUNHQSxJQUFJLENBQUMsTUFBTSxHQUFBO0VBR1gsSUFBSSxDQUFDLE1BQU0saUJBQWdCLFFBQUEsQ0FBQSxLQUFBOztTQUN6QixLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBSSxDQUFBLENBQUEsQ0FBRSxzQkFBdUIsQ0FBQSxDQUFBLENBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFELENBQU8sQ0FBQyxnQkFBMUQ7SUFDUixFQUFFLENBQUEsS0FBSyxRQUFBLENBQUEsSUFBQTs7TUFBUyxnQkFBTjtNQUNSLEdBQUksQ0FBQSxDQUFBLENBQUUsUUFBUSxDQUFDO01BQ2YsSUFBSyxDQUFBLENBQUEsQ0FBRSxRQUFRLENBQUMsT0FBTyxHQUFBO01BRXZCLGNBQWUsQ0FBQSxDQUFBLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQztNQUUvQixHQUFHLENBQUMsa0JBQW9CLENBQUEsQ0FBQSxDQUFFO01BRTFCLElBQUcsY0FBYyxDQUFDLFlBQWxCO1FBQ0UsV0FBWSxDQUFBLENBQUEsQ0FBRSxjQUFjLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQztRQUN0RDtVQUNFLEdBQUcsQ0FBQyxrQkFBb0IsQ0FBQSxDQUFBLENBQUUsSUFBSSxDQUFDLE1BQU0sV0FBQTtTQUN2QztVQUFNO1VBQ0osT0FBTyxDQUFDLEtBQUssaURBQUE7VUFDYixPQUFPLENBQUMsS0FBSyxDQUFBOzs7V0FFakIsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUksQ0FBQSxDQUFBLENBQUUseUJBQTBCLENBQUEsQ0FBQSxDQUFFLGNBQWMsQ0FBQywwQkFBeEQ7TUFDUixFQUFFLENBQUEsS0FBSyxRQUFBLENBQUEsSUFBQTs7UUFBUyxnQkFBTjtRQUVSLEdBQUcsQ0FBQyxpQkFBbUIsQ0FBQSxDQUFBLENBQUU7ZUFDekIsR0FBRyxDQUFDLFFBQVEsb0JBQUE7T0FIUDtNQUlQLEVBQUUsQ0FBQSxPQUFBLEVBQU0sUUFBQSxDQUFBLEdBQUE7ZUFDTixPQUFPLENBQUMsSUFBSSxHQUFBO09BRE47O0tBckJMO0lBdUJQLEVBQUUsQ0FBQSxPQUFBLEVBQU0sUUFBQSxDQUFBLEdBQUE7YUFDTixPQUFPLENBQUMsSUFBSSxHQUFBO0tBRE47O0dBekJEO0VBNEJYLEdBQUcsQ0FBQyxlQUFpQixDQUFBLENBQUEsQ0FBRSxRQUFBLENBQUEsS0FBQTs7SUFDckIsR0FBSSxDQUFBLENBQUEsQ0FBRSxNQUFNLENBQUMsR0FBSSxDQUFBLENBQUEsQ0FBRTtJQUNuQixLQUFLLENBQUMsUUFBUyxRQUFBLENBQUEsQ0FBQTthQUNiLEdBQUksQ0FBQSxFQUFBLENBQUcsVUFBVyxDQUFBLENBQUEsQ0FBRSxDQUFDLENBQUM7S0FEVDtXQUVmLEtBQUssQ0FBQyxJQUFJLEdBQUE7O0VBR1osSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIyBtYWluXG5cbiMgc3RhcnQgYXBwXG5yaW90Lm1vdW50ICcqJ1xuXG4jIG1haW4gcm91dGVcbnJpb3Qucm91dGUgJy93b3JrLW9yZGVyLyonIChpbmRleCkgLT5cbiAgYXhpb3MuZ2V0IGNvbmZpZy5hcGkgKyAnL3dvcmstb3JkZXJzL2dldD9pZD0nICsgYXBwLnByb2plY3RzW2luZGV4XS5zZXJ2aWNlcmVxdWVzdGlkXG4gICAgLi50aGVuICh7IGRhdGE6IHJlc3BvbnNlIH0pIC0+XG4gICAgICB4bWwgPSByZXNwb25zZS5kYXRhXG4gICAgICBqc29uID0geG1sMmpzb24ucGFyc2VyIHhtbFxuXG4gICAgICBzZXJ2aWNlcmVxdWVzdCA9IGpzb24ucmVzcG9uc2Uuc2VydmljZXJlcXVlc3RcblxuICAgICAgYXBwLmN1cnJlbnQtdGVjaG5pY2lhbnMgPSBbIF1cblxuICAgICAgaWYgc2VydmljZXJlcXVlc3QuY3VzdG9tZmllbGRzXG4gICAgICAgIHRlY2huaWNpYW5zID0gc2VydmljZXJlcXVlc3QuY3VzdG9tZmllbGRzLmN1c3RvbWZpZWxkLnZhbHVlXG4gICAgICAgIHRyeVxuICAgICAgICAgIGFwcC5jdXJyZW50LXRlY2huaWNpYW5zID0gSlNPTi5wYXJzZSB0ZWNobmljaWFuc1xuICAgICAgICBjYXRjaCBlXG4gICAgICAgICAgY29uc29sZS5pbmZvICdQYXJzZSBmYWlsLiBBc3N1bWUgbm8gdGVjaG5pY2lhbnMgYXJlIGFzc2lnbmVkLidcbiAgICAgICAgICBjb25zb2xlLmluZm8gZVxuXG4gICAgICBheGlvcy5nZXQgY29uZmlnLmFwaSArICcvdGVjaG5pY2lhbi9uZWFyYnk/emlwPScgKyBzZXJ2aWNlcmVxdWVzdC5jdXN0b21lcmxvY2F0aW9ucG9zdGFsY29kZVxuICAgICAgICAuLnRoZW4gKHsgZGF0YTogcmVzcG9uc2UgfSkgLT5cbiAgICAgICAgICAjIGxpc3Qgb2YgdGVjaG5pY2lhbnMgc29ydGVkIGJ5IGNsb3Nlc3QgdG8gZmFydGhlc3RcbiAgICAgICAgICBhcHAubmVhcmJ5LXRlY2huaWNpYW5zID0gcmVzcG9uc2VcbiAgICAgICAgICBhcHAudHJpZ2dlciBcXHRlY2huaWNpYW5zLWxvYWRlZFxuICAgICAgICAuLmNhdGNoIChlcnIpIC0+XG4gICAgICAgICAgY29uc29sZS5sb2cgZXJyXG4gICAgLi5jYXRjaCAoZXJyKSAtPlxuICAgICAgY29uc29sZS5sb2cgZXJyXG5cbmFwcC5sb2FkLXRlY2huaWNpYW5zID0gKHRlY2hzKSAtPlxuICByZXEgPSBjb25maWcuYXBpICsgJy90ZWNobmljaWFuPydcbiAgdGVjaHMuZm9yLWVhY2ggKHQpIC0+XG4gICAgcmVxICs9ICcmdGFrZVtdPScgKyB0LmlkXG4gIGF4aW9zLmdldCByZXFcblxuIyBraWNrb2ZmIHJvdXRlclxucmlvdC5yb3V0ZS5zdGFydCB0cnVlXG4iXX0=
