const teclas = document.querySelectorAll('.oitava > div')

function createAudioTracks() {
  const audioTracks = document.createElement('div')

  audioTracks.classList.add('tracks')
  document.body.appendChild(audioTracks)

  const trackList = document.querySelector('.tracks')

  for (let i = 0; i < 47; i++) {
    let audio = document.createElement('audio')

    if (i < 6) {
      audio.src = '../assets/audio/piano00' + `${i + 4}` + '.wav'
    }
    else {
      audio.src = '../assets/audio/piano0' + `${i + 4}` + '.wav'
    }

    trackList.appendChild(audio)
  }

  document.body.appendChild(trackList)
}

function setKeyValueOnAudioTracks(tecla){
  const audios = document.querySelectorAll('audio')
  
  audios.forEach((audio) => {
    audio.setAttribute('key-value', tecla.getAttribute('key-value') )
  })
}

function emitirSom(tecla, event) {
  if (tecla.classList.contains('selecionada')) {

    if(event.type === 'keydown'){
      const audio = document.querySelector(`audio[key-value="${tecla.getAttribute('key-value')}"]`)
      audio.currentTime = 0
      audio.play()
    }
  }
}

function desmarcar(tecla) {
  tecla.classList.remove('selecionada')
  emitirSom(tecla)
}

function marcar(tecla, event) {
  tecla.classList.add('selecionada')
  emitirSom(tecla, event)
}

teclas.forEach((tecla) => {
  tecla.onmousedown = (event) => {
    setKeyValueOnAudioTracks(tecla)
    marcar(tecla, event)
  }

  tecla.onmouseup = (event) => {
    setKeyValueOnAudioTracks(tecla)
    desmarcar(tecla, event)
  }
  
  tecla.onmouseleave = (event) => {
    setKeyValueOnAudioTracks(tecla)
    desmarcar(tecla, event)
  }
})

document.addEventListener('keydown', (event) => {
  const tecla = document.querySelector(`div[key-value="${event.key}"]`)
  
  setKeyValueOnAudioTracks(tecla)
  marcar(tecla, event)
})

document.addEventListener('keyup', (event) => {
  const tecla = document.querySelector(`div[key-value="${event.key}"]`)

  setKeyValueOnAudioTracks(tecla)
  desmarcar(tecla, event)
})

createAudioTracks()


//API das faixas musicais: https://awiclass.monoame.com/api/command.php?type=get&name=music_dodoro