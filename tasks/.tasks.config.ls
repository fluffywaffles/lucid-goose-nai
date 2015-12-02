compile-tasks = <[
  jade
  stylus
  bundle:ls
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
