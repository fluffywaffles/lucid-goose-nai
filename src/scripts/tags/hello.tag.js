
riot.tag2('hello', '<h3>{msg}</h3>', 'hello,[riot-tag="hello"] { font-size: 20px }', '', function(opts) {
    this.msg = 'Hi!'

}, '{ }');