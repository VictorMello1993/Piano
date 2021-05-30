const teclas = document.querySelectorAll('.oitava > div')
const context = new AudioContext()

let oscillator = null

function emitirNota(tecla) {
  if (tecla.classList.contains('selecionada')) {
    oscillator = context.createOscillator()

    oscillator.type = 'square'
    oscillator.connect(context.destination)

    const frequencia = Number(tecla.attributes[1].value)

    oscillator.frequency.value = frequencia
    oscillator.start(0)
  }
  else if (oscillator) {
    oscillator.stop(0)
    oscillator = null
  }
}

function desmarcar(tecla) {
  tecla.classList.remove('selecionada')
  emitirNota(tecla)
}

function marcar(tecla) {
  tecla.classList.add('selecionada')
  emitirNota(tecla)
}

teclas.forEach(function (tecla) {
  tecla.onmousedown = () => marcar(tecla)
  tecla.onmouseup = () => desmarcar(tecla)
  tecla.onmouseleave = () => desmarcar(tecla)
})