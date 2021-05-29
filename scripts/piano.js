const notas = {
  Do: 33,
  DoSustenido: 34.947,
  Re: 37.026,
  ReSustenido: 39.237,
  Mi: 20.79,
  Fa: 22.03,
  FaSustenido: 23.33,
  Sol: 24.72,
  SolSustenido: 26.19,
  La: 27.75,
  LaSustenido: 29.4,
  Si: 31.15
}

let osciladorList = []

const teclas = document.querySelectorAll('.oitava > div')

function configurarAudioContext() {

}

function obterFrequencia(tecla) {
  const oitava = tecla.parentNode.getAttributeNames()
  if (osciladorList) {
    if (oitava.includes('o1')) {
      return notas.Do
    }
  }
}

function emitirNota(tecla) {
  if (tecla.classList.contains('selecionada')) {
    const context = new AudioContext()
    const oscillator = context.createOscillator()
    const contextGain = context.createGain()

    oscillator.type = 'square'

    oscillator.connect(contextGain)

    contextGain.connect(context.destination)
    contextGain.gain.exponentialRampToValueAtTime(0.02, context.currentTime + 0.04)

    oscillator.frequency.value = obterFrequencia(tecla)

    oscillator.start()
    osciladorList.push(oscillator)
  }
  else {
    if (osciladorList) {
      osciladorList[0].stop()
      osciladorList.pop(osciladorList[0])
    }
  }
}

function desmarcar(tecla) {
  tecla.classList.remove('selecionada')
  emitirNota(tecla)
}

teclas.forEach(function (tecla) {
  tecla.onmousedown = function () {
    tecla.classList.add('selecionada')
    emitirNota(tecla)
  }

  configurarAudioContext()

  tecla.onmouseup = () => desmarcar(tecla)
  tecla.onmouseleave = () => desmarcar(tecla)
})