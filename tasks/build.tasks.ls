config = require './.tasks.config'

module.exports = (gulp, $) ->
  gulp.task \build, config.build-tasks, ->
    gulp.src '.tmp/index.html'
      .pipe $.useref { searchPath: [ '.tmp', '/' ] }
      .pipe gulp.dest 'dist'

  gulp.task \build:bundles [ 'bundle:ls' ] ->
    gulp.src '.tmp/**/*.bundle.js'
      .pipe gulp.dest 'dist'

  gulp.task \build:styles [ 'stylus' ] ->
    gulp.src '.tmp/styles/*.css'
      .pipe gulp.dest 'dist/styles'
