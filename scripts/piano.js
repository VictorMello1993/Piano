const keys = document.querySelectorAll('.oitava > div')

function createAudioTracks() {
  const audioTracks = document.createElement('div')

  audioTracks.classList.add('tracks')
  document.body.appendChild(audioTracks)

  const trackList = document.querySelector('.tracks')

  //4 oitavas = 49 teclas
  for (let i = 0; i < 48; i++) {
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

function setKeyValueOnAudioTracks(){
  const audios = document.querySelectorAll('audio')

  for (let i = 0; i < Array.from(audios).length; i++) {
    const octave = keys[i].parentNode.attributes[1].name
    const note = keys[i].attributes[1].name

    audios[i].setAttribute('key-value', keys[i].getAttribute('key-value'))    
    audios[i].setAttribute('note', octave + note)    
  }
}

function sound(key, event) {
  if (key.classList.contains('selecionada')) {
    const octave = key.parentNode.attributes[1].name
    const note = key.attributes[1].name    
    let audio    

    if(event.type === 'keydown'){
      audio = document.querySelector(`audio[key-value="${key.getAttribute('key-value')}"]`)
    }
    else if(event.type === 'mousedown'){
      audio = document.querySelector(`audio[note="${octave + note}"]`)
    }

    audio.currentTime = 0
    audio.play()
  }
}

function markOff(key, event) {
  key.classList.remove('selecionada')
  sound(key, event)
}

function mark(key, event) {
  key.classList.add('selecionada')
  sound(key, event)
}

keys.forEach((key) => {
  key.onmousedown = (event) => {    
    mark(key, event)
  }

  key.onmouseup = (event) => {    
    markOff(key, event)
  }
  
  key.onmouseleave = (event) => {    
    markOff(key, event)
  }
})

document.addEventListener('keydown', (event) => {
  const key = document.querySelector(`div[key-value="${event.key}"]`)    
  mark(key, event)
})

document.addEventListener('keyup', (event) => {
  const key = document.querySelector(`div[key-value="${event.key}"]`)  
  markOff(key, event)
})

createAudioTracks()
setKeyValueOnAudioTracks()


//API das faixas musicais: https://awiclass.monoame.com/pianosound/