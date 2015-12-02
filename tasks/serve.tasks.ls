config = require './_tasks.config.ls'

module.exports = (gulp, $) !->
  bsInit = (baseDir) ->
    $.browserSync.init {
      server: {
        baseDir: baseDir
        routes: {
          '/bower_components': 'bower_components'
        }
      }
    }

  gulp.task \serve:dist, config.serve-tasks, ->
    bsInit [ 'dist' ]

  gulp.task \serve:tmp, config.serve-tasks, ->
    bsInit [ '.tmp', 'src' ]

  gulp.task \serve:tmp:live, [ 'serve:tmp' ], ->
    gulp.start \watch

  gulp.task \serve:dist:live, [ 'serve:dist' ], ->
    gulp.start \watch
