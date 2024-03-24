import { spawn } from 'child_process'

export function ffmpegExecuter(streamingKey) {
  const options = [
    '-i',
    '-',
    '-c:v',
    'libx264',
    '-preset',
    'ultrafast',
    '-tune',
    'zerolatency',
    '-r',
    `25`,
    '-g',
    `50`,
    '-keyint_min',
    `25`,
    '-crf',
    '25',
    '-pix_fmt',
    'yuv420p',
    '-sc_threshold',
    '0',
    '-profile:v',
    'main',
    '-level',
    '3.1',
    '-c:a',
    'aac',
    '-b:a',
    '128k',
    '-ar',
    128000 / 4,
    '-f',
    'flv',
    `rtmp://a.rtmp.youtube.com/live2/${streamingKey}`,
  ]
  const process = spawn('ffmpeg', options)

  process.stdout.on('data', (data) => {
    console.log(`FFMPEG:DATA: ${data}`)
  })

  process.stderr.on('data', (data) => {
    console.error(`FFMPEG:ERROR: ${data}`)
  })

  process.on('close', (code) => {
    console.log(`ffmpeg process exited with code ${code}`)
  })

  return process
}
