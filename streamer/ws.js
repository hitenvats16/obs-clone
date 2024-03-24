import { ffmpegExecuter } from './util.js'

export default function initSockets(io) {
  io.on('connection', (socket) => {
    const youtubeKey = socket.handshake.auth.key
    const process = ffmpegExecuter(youtubeKey)
    socket.on('stream', (data) => {
      process.stdin.write(data, (err) => {
        if(err){
          console.log('ERROR:', err)
        }
      })
    })
  })
}
