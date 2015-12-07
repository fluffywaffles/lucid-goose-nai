(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
  window.config = {
    api: 'http://localhost:9999/api'
  };
}).call(this);


},{}],2:[function(require,module,exports){
(function(){
  var app, x$;
  require('./_config');
  app = {
    projects: [{
      description: 'Loading...'
    }]
  };
  window.app = riot.observable(app);
  app.on('load-projects', function(data){
    app.projects = data;
    return app.trigger('update');
  });
  app.on('update', function(){
    return console.log('update view');
  });
  x$ = axios.get(config.api + '/work-orders');
  x$.then(function(arg$){
    var response, xml, json, servicerequests;
    response = arg$.data;
    xml = response.data;
    json = xml2json.parser(xml);
    servicerequests = json.response.servicerequestlist.servicerequest;
    servicerequests.forEach(function(p, i){
      return p.index = i;
    });
    return app.trigger('load-projects', servicerequests);
  });
  x$['catch'](function(err){
    return console.log(err);
  });
}).call(this);


},{"./_config":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9iaWZ5LXdpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9zb3VyY2UvX2NvbmZpZy5scyIsIi9zb3VyY2UvYXBwLmxzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztFQ0VBLE1BQU0sQ0FBQyxNQUFPLENBQUEsQ0FBQSxDQUFFO0lBQ2QsS0FBSztFQURTOzs7Ozs7O0VDRGhCLFFBQVEsV0FBQTtFQUdSLEdBQUksQ0FBQSxDQUFBLENBQUU7SUFDSixVQUFVLENBQ1I7TUFBRSxhQUFhO0lBQWYsQ0FEUTtFQUROO0VBTU4sTUFBTSxDQUFDLEdBQUksQ0FBQSxDQUFBLENBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRDtFQUU1QixHQUFHLENBQUMsR0FBRyxpQkFBZSxRQUFBLENBQUEsSUFBQTtJQUNwQixHQUFHLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FBRTtXQUNmLEdBQUcsQ0FBQyxRQUFRLFFBQUE7R0FGUDtFQUlQLEdBQUcsQ0FBQyxHQUFHLFVBQVEsUUFBQSxDQUFBO1dBQ2IsT0FBTyxDQUFDLElBQUksYUFBQTtHQURQO09BSVAsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUksQ0FBQSxDQUFBLENBQUUsY0FBYjtFQUNSLEVBQUUsQ0FBQSxLQUFLLFFBQUEsQ0FBQSxJQUFBOztJQUFTLGdCQUFOO0lBQ1IsR0FBSSxDQUFBLENBQUEsQ0FBRSxRQUFRLENBQUM7SUFDZixJQUFLLENBQUEsQ0FBQSxDQUFFLFFBQVEsQ0FBQyxPQUFPLEdBQUE7SUFDdkIsZUFBZ0IsQ0FBQSxDQUFBLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztJQUVuRCxlQUFlLENBQUMsUUFBUyxRQUFBLENBQUEsQ0FBQSxFQUFBLENBQUE7YUFDdkIsQ0FBQyxDQUFDLEtBQU0sQ0FBQSxDQUFBLENBQUU7S0FEYTtXQUd6QixHQUFHLENBQUMsUUFBUSxpQkFBZSxlQUFmO0dBUlA7RUFTUCxFQUFFLENBQUEsT0FBQSxFQUFNLFFBQUEsQ0FBQSxHQUFBO1dBQ04sT0FBTyxDQUFDLElBQUksR0FBQTtHQUROIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiMgY29uZmlnOiBjaGFuZ2UgYXBpIHRvIHdoZXJldmVyIHBvaW50cyB0byB0aGUgYXBpIGVuZHBvaW50XG4jIGNhbiBhbmQgc2hvdWxkIGJlIGhvc3RlZCBzZXBhcmF0ZWx5XG53aW5kb3cuY29uZmlnID0ge1xuICBhcGk6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTkvYXBpJ1xufVxuIiwiXG5yZXF1aXJlICcuL19jb25maWcnXG5cbiMgc2V0dXBcbmFwcCA9IHtcbiAgcHJvamVjdHM6IFtcbiAgICB7IGRlc2NyaXB0aW9uOiAnTG9hZGluZy4uLicgfVxuICBdXG59XG5cbndpbmRvdy5hcHAgPSByaW90Lm9ic2VydmFibGUoYXBwKVxuXG5hcHAub24gXFxsb2FkLXByb2plY3RzIChkYXRhKSAtPlxuICBhcHAucHJvamVjdHMgPSBkYXRhXG4gIGFwcC50cmlnZ2VyIFxcdXBkYXRlXG5cbmFwcC5vbiBcXHVwZGF0ZSAtPlxuICBjb25zb2xlLmxvZyAndXBkYXRlIHZpZXcnXG5cbiMgaW5pdFxuYXhpb3MuZ2V0IGNvbmZpZy5hcGkgKyAnL3dvcmstb3JkZXJzJ1xuICAuLnRoZW4gKHsgZGF0YTogcmVzcG9uc2UgfSkgLT5cbiAgICB4bWwgPSByZXNwb25zZS5kYXRhXG4gICAganNvbiA9IHhtbDJqc29uLnBhcnNlciB4bWxcbiAgICBzZXJ2aWNlcmVxdWVzdHMgPSBqc29uLnJlc3BvbnNlLnNlcnZpY2VyZXF1ZXN0bGlzdC5zZXJ2aWNlcmVxdWVzdFxuXG4gICAgc2VydmljZXJlcXVlc3RzLmZvci1lYWNoIChwLCBpKSAtPlxuICAgICAgcC5pbmRleCA9IGlcblxuICAgIGFwcC50cmlnZ2VyIFxcbG9hZC1wcm9qZWN0cyBzZXJ2aWNlcmVxdWVzdHNcbiAgLi5jYXRjaCAoZXJyKSAtPlxuICAgIGNvbnNvbGUubG9nIGVyclxuIl19
