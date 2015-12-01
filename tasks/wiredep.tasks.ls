module.exports = (gulp, $) !->
  gulp.task \wiredep ->
    gulp.src 'src/jade/**/*.jade'
      .pipe $.wiredep!
      .pipe gulp.dest 'src/jade'

    gulp.src 'src/styles/**/*.styl'
      .pipe $.wiredep!
      .pipe gulp.dest 'src/styles'
