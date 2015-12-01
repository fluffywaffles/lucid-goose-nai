module.exports = (gulp, $) !->
  gulp.task \images ->
    gulp.src 'res/images/**/*'
      .pipe $.cache $.imagemin {
        +progressive
        +interlaced
        svgoPlugins: [ {
          -cleanupIDs
        } ]
      }
      .pipe gulp.dest '.tmp/images'
