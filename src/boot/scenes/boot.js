import Scene from '../scene'
import Anime from '../anime'
import AnimeItem from '../animeItem'
import EventManager from '../eventManager'
import Menu from './menu'
import Splash from './splash'

const MARGIN = 48
const LOADING_BAR_HEIGHT = 24
const LOADING_BASE_PERCENTAGE = 0.309
const LOADING_TIME = (Math.random() * 2.2 + 0.22) * 1000

class Loading extends AnimeItem {
  constructor (ctxWidth, ctxHeight) {
    super()

    this.width = ctxWidth * LOADING_BASE_PERCENTAGE
    this.height = LOADING_BAR_HEIGHT
    this.x = (ctxWidth - this.width) / 2
    this.y = ctxHeight * 3 / 4
  }

  update (ctx, start, now) {
    if (this.end) return
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#ffffff'
    const progress = now - start
    if (progress > LOADING_TIME) {
      this.end = true
      this.dispatchEvent(new Event('end'))
      return
    }
    ctx.strokeRect(this.x, this.y, this.width, this.height)
    ctx.fillRect(this.x, this.y, this.width * progress / LOADING_TIME, this.height)
  }
}

class Boot extends Scene {
  constructor (ctx) {
    super('BOOT', ctx)

    this.anime = null
    this.em = null
  }

  start () {
    this.hulu.add(new Menu(this.ctx))
    this.hulu.add(new Splash(this.ctx))
  }

  show () {
    this.initStatic()
    this.initAnime()
    this.initEvents()
  }

  initStatic () {
    let text = 'F8 = Boot Menu'
    this.ctx.font = '16px sans'
    this.ctx.fillStyle = '#ffffff'
    const textMetrics = this.ctx.measureText(text)
    this.ctx.fillText(text, this.ctx.canvas.width - MARGIN - textMetrics.width, MARGIN)

    text = 'Booting from the cloud'
    this.ctx.font = '18px sans'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(text, this.ctx.canvas.width / 2, this.ctx.canvas.height * 3 / 4 - 32)
    this.ctx.textAlign = 'start'
  }

  initAnime () {
    this.anime = new Anime(this.ctx)

    const loading = new Loading(this.ctx.canvas.width, this.ctx.canvas.height)
    loading.addEventListener('end', e => {
      this.hulu.switch('SPLASH')
    })
    this.anime.add(loading)
    this.anime.run()
  }

  initEvents () {
    this.em = new EventManager(window)
    const bootKeydownHandler = e => {
      if (e.keyCode === 119) { // F8
        this.hulu.switch('MENU')
      }
    }
    this.em.add('keydown', bootKeydownHandler)
  }

  hide () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.anime.stop()
    this.em.clear()
  }
}

export default Boot
