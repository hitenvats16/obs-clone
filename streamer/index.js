import Http from 'http'
import Express from 'express'
import path from 'path'
import { Server as SocketIO } from 'socket.io'

import { PORT } from './config.js'
import initSockets from './ws.js'
import morgan from 'morgan'

const app = Express()
const server = Http.createServer(app)
const socketIo = new SocketIO(server)
initSockets(socketIo)

app.use(morgan("dev"))
app.use(Express.static(path.resolve('./public')))

server.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
})