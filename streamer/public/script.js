// This will manage the global state
window.state = {}

function initRecorder(media) {
  const recorder = new MediaRecorder(media, {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    framerate: 24,
  })
  window.state.recorder = recorder
  recorder.ondataavailable = (be) => {
    window.state.socket.emit('stream', be.data)
  }
}

function toggleBtns({ start, stop }) {
  start.disabled = !start.disabled
  stop.disabled = !stop.disabled
}

function getYoutubeStreamingKey() {
  const key = window.prompt('Enter youtube streaming key')
  if (!key) {
    return getYoutubeStreamingKey()
  }
  return key
}

function init() {
  const startBtn = document.querySelector('#start-btn')
  const stopBtn = document.querySelector('#stop-btn')
  window.addEventListener('load', async (e) => {
    const media = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    })
    if (!media.active) {
      window.alert('Video permission required')
    }
    const previewWindow = document.querySelector('#video-preview')
    window.state.media = media
    initRecorder(media)
    previewWindow.srcObject = media
    const youtubeKey = getYoutubeStreamingKey()
    window.state.socket = new io({
      auth: {
        key: youtubeKey,
      },
    })
  })

  startBtn.addEventListener('click', async (e) => {
    window.state.recorder.start(40)
    toggleBtns({
      start: startBtn,
      stop: stopBtn,
    })
  })

  stopBtn.addEventListener('click', async (e) => {
    window.state.recorder.stop()
    toggleBtns({
      start: startBtn,
      stop: stopBtn,
    })
  })
}

init()
