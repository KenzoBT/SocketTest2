const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

let counter = 0

app.get('/', (req, res) => {
  //res.send('<h1>Hello, World!</h1>')
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {

  console.log('a user connected')

  socket.emit('add counter', counter)

  socket.on('add counter', () => {
    //console.log('Counter++ request received')
    counter = counter + 1
    io.emit('add counter', counter)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
