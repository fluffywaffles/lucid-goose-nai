compile-tasks = <[
  jade
  stylus
  livescript
  riot
]>

serve-tasks = <[
  fonts
  images
]> ++ compileTasks

build-tasks = <[

]> ++ serveTasks

module.exports = {
  compileTasks
  serveTasks
  buildTasks
}
