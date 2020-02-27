import Yula from './yula'

function init () {
  window.POWER_ON = performance.now()
  const ctx = document.getElementById('boot').getContext('2d')
  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight

  const yula = new Yula(ctx)
  yula.start()
}

init()
