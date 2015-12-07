
riot.tag2('account-nav', '<nav> <ul> <li onclick="{reset}">NAI Admin Page</li> <li each="{breadcrumbs}" riot-style="opacity: {opacity}" class="crumb"><a href="#{link}">{title}</a></li> </ul> </nav>', '', '', function(opts) {
var self, r;
this.breadcrumbs = [];
this.reset = function(){
  return riot.route('/');
};
self = this;
r = riot.route.create();
r('/work-order/*', function(order){
  var oldLen;
  oldLen = self.breadcrumbs.filter(function(b){
    return b.opacity > 0;
  }).length;
  self.update({
    breadcrumbs: [{
      title: 'Work Order #' + order + ' (' + projects.projects[order].description + ')',
      link: '/work-order/' + order,
      opacity: oldLen === 0 ? 0 : 1
    }]
  });
  return setTimeout(function(){
    return self.update({
      breadcrumbs: self.breadcrumbs.map(function(b){
        b.opacity = 1;
        return b;
      })
    }, 500);
  });
});
r(function(){
  return self.update({
    breadcrumbs: self.breadcrumbs.map(function(b){
      b.opacity = 0;
      return b;
    })
  });
});
}, '{ }');

riot.tag2('main', '<div class="content"> <div class="projects card active"> <projects></projects> </div> <div class="details card {active(details, true)}"> <project-details></project-details> </div> <div class="technician card {active(viewTech, true)}"> <technician></technician> </div> </div>', '', '', function(opts) {
var self, r;
this.details = false;
this.viewTech = false;
this.active = function(test, value){
  if (test === value) {
    return 'active';
  } else {
    return '';
  }
};
self = this;
r = riot.route.create();
r('/work-order/*', function(){
  return self.update({
    viewTech: false,
    details: true
  });
});
r('/technician/*', function(){
  return self.update({
    viewTech: true
  });
});
r(function(){
  return self.update({
    details: false,
    viewTech: false
  });
});
}, '{ }');

riot.tag2('projects', '<h3>Work Orders</h3> <h4 if="{loading}">Loading...</h4> <ol hide="{loading}"> <li each="{projects}"><a href="#/work-order/{index}">{description}</a></li> </ol>', '', '', function(opts) {
var self;
this.projects = app.projects;
this.loading = true;
self = this;
app.on('update', function(){
  return self.update({
    projects: app.projects,
    loading: false
  });
});
}, '{ }');

riot.tag2('project-details', '<h3>{project.description}</h3> <div class="pileup"> <div class="block"> <h4>Customer</h4> <p>{project.customercontactname}</p> </div> <div class="block"> <h4>Location</h4> <p></p>{location()} </div> </div> <technician-list></technician-list>', '', '', function(opts) {
var self, r;
this.reset = function(){
  return riot.route('/');
};
self = this;
this.location = function(){
  var locationParts;
  locationParts = [self.project.customerlocationcity, self.project.customerlocationcountry, self.project.customerlocationpostalcode].filter(function(locPart){
    return locPart.toString() !== '[object Object]';
  });
  if (locationParts.length > 1) {
    return locationParts.join(', ');
  } else {
    return locationParts[0];
  }
};
r = riot.route.create();
r('/work-order/*', function(order){
  self.update({
    project: app.projects[order]
  });
  app.on('update', function(){
    return self.update({
      project: app.projects[order]
    });
  });
  if (!self.project) {
    return self.reset();
  }
});
}, '{ }');

riot.tag2('technician-list', '<div class="content"> <h4>Assigned Technicians</h4> <p show="{loading}" style="color: green">Loading...</p> <div hide="{loading}" class="hide-while-load"> <p if="{assigned.length === 0}" style="color: gray"><i>There are no technicians assigned to this work order.</i></p> <ul> <technician-item each="{assigned}" action="Remove"></technician-item> </ul> </div> <h4>Available Technicians (Top 5 Closest)</h4> <p show="{loading}" style="color: green">Loading...</p> <div hide="{loading}" class="hide-while-load"> <p if="{available.length === 0}" style="color: gray"><i>There are no technicians available for this work order.</i></p> <ul> <technician-item each="{available}" action="Assign"></technician-item> </ul> </div> </div>', '', '', function(opts) {
var self, r, slice$ = [].slice;
this.project = app.currentProject;
this.assigned = [];
this.assignedIds = [];
this.available = [];
this.loading = true;
self = this;
this.assign = function(tech){
  var assigned;
  tech.index = self.assigned.length;
  assigned = slice$.call(self.assigned).concat([{
    id: tech._id,
    distance: tech.distance,
    name: tech.name
  }]);
  self.update({
    assigned: assigned,
    assignedIds: assigned.map(function(it){
      return it.id;
    })
  });
  self.calculateAvailable();
  return self.sync();
};
this.unassign = function(tech){
  var removed;
  removed = self.assigned.slice();
  removed.splice(tech.index, 1);
  self.update({
    assigned: removed,
    assignedIds: removed.map(function(it){
      return it.id;
    })
  });
  self.calculateAvailable();
  return self.sync();
};
this.calculateAvailable = function(){
  var available, i$, ref$, len$, t, x$;
  available = [];
  for (i$ = 0, len$ = (ref$ = app.nearbyTechnicians).length; i$ < len$; ++i$) {
    t = ref$[i$];
    if (available.length > 5) {
      break;
    }
    if (in$(t.id, self.assignedIds)) {
      console.log('already assigned', t);
    } else {
      available.push(t);
    }
  }
  self.update({
    available: available
  });
  x$ = app.loadTechnicians(self.available);
  x$.then(function(arg$){
    var response, avail;
    response = arg$.data;
    avail = [].slice.call(self.available);
    response.rows.forEach(function(t, i){
      if (t.error) {
        return avail[i].error = true;
      } else {
        t.doc.distance = avail[i].distance;
        t.doc.index = i;
        return avail[i] = t.doc;
      }
    });
    return self.update({
      available: avail
    });
  });
  x$['catch'](function(err){
    return console.log(err);
  });
  return x$;
};
this.sync = function(){
  var t;
  return axios.post(config.api + '/technician/assign', {
    project: self.project,
    technicians: (function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = self.assigned).length; i$ < len$; ++i$) {
        t = ref$[i$];
        results$.push({
          id: t.id,
          name: t.name,
          distance: t.distance
        });
      }
      return results$;
    }())
  }).then(function(arg$){
    var response, xml, json;
    response = arg$.data;
    xml = response.data;
    json = xml2json.parser(xml);
    if (json.response.status !== "ok") {
      throw 'Assign/Remove Failed';
    } else {
      return console.log('success', json.response);
    }
  })['catch'](function(err){
    return console.log(err);
  });
};
app.on('technicians-loaded', function(){
  var assigned, available;
  assigned = [];
  available = [];
  assigned = app.currentTechnicians;
  self.assignedIds = assigned.map(function(it){
    return it.id;
  });
  self.update({
    assigned: assigned,
    loading: false
  });
  return self.calculateAvailable();
});
r = riot.route.create();
r('/work-order/*', function(){
  return self.update({
    loading: true
  });
});
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}
}, '{ }');

riot.tag2('technician-item', '<span onclick="{viewTechnician}">{name.first} {name.last}</span><span>{distance} miles away</span> <button onclick="{assignOrRemove}">{action}</button>', '', '', function(opts) {
var self;
self = this;
this.action = this.root.attributes.action.value;
this.assignOrRemove = function(){
  if (self.action === 'Assign') {
    return self.parent.assign(self);
  } else {
    return self.parent.unassign(self);
  }
};
this.viewTechnician = function(){
  return riot.route('/technician/' + (self._id || self.id));
};
}, '{ }');

riot.tag2('technician', '<h3 show="{loading}">Loading...</h3> <div hide="{loading}" class="hide-while-loading"> <h3>{tech.name.first} {tech.name.last}</h3> <p><a href="mailto:{tech.email}">{tech.email}</a> | {tech.phone}</p> <h4>Address</h4> <p>{tech.address}, {tech.city}, {tech.state} {tech.zip}</p> <h4>States</h4> <p>{tech.states}</p> <h4>Skills</h4> <p>{tech.skills}</p> <h4>Phone Systems</h4> <p>{tech.phoneSystems}</p> <h4>Field of Work</h4> <p>{tech.fieldOfWork}</p> <h4>Billing Rates</h4> <p>Standard: {tech.billing.standard}, Overtime: {tech.billing.overtime}, Weekend: {tech.billing.weekend}</p> <h4>W9 TIN</h4> <p>{tech.w9tin}</p> <h4>Insured?</h4> <p>{tech.insured}</p> <h4>Union?</h4> <p>{tech.union}</p> </div>', '', '', function(opts) {
var self, r;
self = this;
r = riot.route.create();
r('/technician/*', function(tid){
  return app.loadTechnicians([{
    id: tid
  }]).then(function(response){
    console.log(response);
    self.update({
      tech: response.data.rows[0].doc
    });
    return console.log(self.tech);
  })['catch'](function(err){
    return console.log(err);
  });
});
}, '{ }');