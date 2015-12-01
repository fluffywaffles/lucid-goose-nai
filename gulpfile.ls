require! {
  gulp
  'browser-sync'
  wiredep
  del
}

$ = (require 'gulp-load-plugins')!
$.browser-sync = browser-sync.create!
$.wiredep      = wiredep.stream
$.del          = del

$.gulp-load-subtasks = require 'gulp-load-subtasks/livescript'

$.gulp-load-subtasks 'tasks/**/*.ls', $

gulp.task \develop, [ \clean:tmp ], ->
  gulp.start [ \serve:tmp:live ]

gulp.task \default, [ \develop ]
