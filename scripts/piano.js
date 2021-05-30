const teclas = document.querySelectorAll('.oitava > div')
const context = new AudioContext()

let oscillator = null

function emitirSom(tecla) {    
  if (tecla.classList.contains('selecionada')) {
    oscillator = context.createOscillator()

    oscillator.type = 'sawtooth'
    oscillator.connect(context.destination)

    console.log(tecla)

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
  emitirSom(tecla)
}

function marcar(tecla) {
  tecla.classList.add('selecionada')
  emitirSom(tecla)
}

teclas.forEach(function (tecla) {
  tecla.onmousedown = (event) => marcar(tecla, event)
  tecla.onmouseup = (event) => desmarcar(tecla, event)
  tecla.onmouseleave = (event) => desmarcar(tecla, event)  
})

document.addEventListener('keydown', (event) => {  
  const tecla = document.querySelector(`[key-value="${event.key}"]`)
  marcar(tecla)
})

document.addEventListener('keyup', (event) => {  
  const tecla = document.querySelector(`[key-value="${event.key}"]`)
  desmarcar(tecla)
})

//API das faixas musicais: https://awiclass.monoame.com/api/command.php?type=get&name=music_dodoro