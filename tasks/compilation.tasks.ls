require! {
  'bify-wify': bify-wify
}

module.exports = (gulp, $) !->

  reload = $.browserSync.reload

  gulp.task \jade ->
    gulp.src [ 'src/jade/**/*.jade', '!src/jade/{includes,includes/**,tags,tags/**}' ]
      .pipe $.plumber!
      .pipe $.sourcemaps.init!
      .pipe $.jade { +pretty }
      .pipe $.sourcemaps.write!
      .pipe gulp.dest \.tmp
      .pipe reload { +stream }

  gulp.task \stylus ->
    gulp.src 'src/styles/main.styl'
      .pipe $.plumber!
      .pipe $.sourcemaps.init!
      .pipe $.stylus!
      .pipe $.sourcemaps.write!
      .pipe gulp.dest \.tmp/styles
      .pipe reload { +stream }

  gulp.task \livescript ->
    gulp.src 'src/scripts/**/*.ls'
      .pipe $.plumber!
      .pipe $.sourcemaps.init!
      .pipe $.livescript { +pretty }
      .pipe $.sourcemaps.write!
      .pipe gulp.dest \.tmp/scripts
      .pipe reload { +stream }

  gulp.task \browserify ->
    bify-wify.fbify '.tmp/scripts/main.js',
                    'main.bundle.js',
                    '.tmp/scripts'
