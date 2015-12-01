module.exports = (gulp, $) ->

  bower-files = require 'main-bower-files'
  font-filter = {
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }

  gulp.task 'fonts' ->
    gulp.src (bowerFiles fontFilter).concat 'res/fonts/**/*'
      .pipe gulp.dest '.tmp/fonts'
