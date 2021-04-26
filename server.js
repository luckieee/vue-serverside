const express = require('express')
const server = express()
const renderVueApp = require('./render-vue-app')

server.use('/dist', express.static('./dist'))
server.use('/public', express.static('./public'))

server.get('*', renderVueApp(server))

server.listen(5000)
console.log('ctrl + click link or copy paste paste http://localhost:5000')


/*const createApp = require('./app')

server.get('*', (req, res) => {
  const context = { url: req.url }
  const app = createApp(context)

  renderer.renderToString(app, (err, html) => {
    // handle error...
    res.end(html)
  })
})*/