
riot.tag2('projects', '<h3>Projects</h3> <ol> <li each="{projects}">{name}</li> </ol>', '', '', function(opts) {
    this.projects = [
      { name: 'Project 1' }
    ]
}, '{ }');