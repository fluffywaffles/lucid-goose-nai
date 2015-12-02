require! {
  'bify-wify'
}

module.exports = (gulp, $) !->
  gulp.task \watch:bower ->
    gulp.watch 'bower.json', [ 'wiredep', 'fonts' ]

  gulp.task \watch:fonts ->
    gulp.watch 'res/fonts/**/*', [ 'fonts' ]

  gulp.task \watch:compile ->
    gulp.watch 'src/jade/**/*.jade', [ 'jade' ]
    gulp.watch 'src/styles/**/*.styl', [ 'stylus' ]
    gulp.watch 'src/scripts/**/*.ls', [ 'bundle:ls' ]
    gulp.watch 'src/tags/**/*', [ 'riot' ]

  gulp.task \watch:images ->
    gulp.watch 'res/images/**/*', [ 'images' ]

  gulp.task \watch, [
    'watch:images'
    'watch:compile'
    'watch:fonts'
    'watch:bower'
  ]
