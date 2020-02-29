import Scene from '../scene'
import Anime from '../anime'
import AnimeItem from '../animeItem'

const LOADING_WIDTH = 160
const LOADING_DOT_RADIUS = 6
const LOADING_DOT_COLOR_NORMAL = '#ffffff'
const LOADING_DOT_COLOR_HIGHLIGHT = '#ff4012'
const LOADING_PROCESS_INTERVAL = 800
const LOADING_TIME = (Math.random() * 3.2 + 0.32) * 1000

class Dot {
  constructor ({
    x = 0,
    y = 0,
    r = LOADING_DOT_RADIUS,
    color = LOADING_DOT_COLOR_NORMAL
  }) {
    this.x = x
    this.y = y
    this.r = r
    this.color = color
  }

  draw (ctx) {
    ctx.clearRect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2)
    ctx.save()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.closePath()
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r)
    gradient.addColorStop(0.4, this.color)
    gradient.addColorStop(1, this.color + '00')
    ctx.fillStyle = gradient
    ctx.fill()
    ctx.restore()
  }
}

class Loading extends AnimeItem {
  constructor (ctxWidth, ctxHeight, dotCount = 5) {
    super()

    this.width = Math.min(LOADING_WIDTH, ctxWidth * 0.9)
    this.left = (ctxWidth - this.width) / 2
    this.top = ctxHeight * 3 / 4
    this.lastUpdate = 0

    this.dots = []
    this.inited = false
    this.highlightDotIndex = 0
    this.initDots(dotCount)
  }

  initDots (dotCount) {
    const dotSpace = this.width / dotCount
    const gap = (dotSpace - LOADING_DOT_RADIUS * 2) / 2
    for (let i = 0; i < dotCount; ++i) {
      const dot = new Dot({
        x: this.left + i * dotSpace + gap + LOADING_DOT_RADIUS,
        y: this.top + LOADING_DOT_RADIUS
      })
      if (i === this.highlightDotIndex) {
        dot.color = LOADING_DOT_COLOR_HIGHLIGHT
      }
      this.dots.push(dot)
    }
  }

  changeHighlightDotColor (ctx, color = LOADING_DOT_COLOR_NORMAL) {
    this.dots[this.highlightDotIndex].color = color
    this.dots[this.highlightDotIndex].draw(ctx)
  }

  update (ctx, start, now) {
    if (this.end) return
    if (!this.lastUpdate) this.lastUpdate = now
    const progress = now - start
    if (progress > LOADING_TIME) {
      this.end = true
      this.dispatchEvent(new Event('end'))
      return
    }
    if (now - this.lastUpdate > LOADING_PROCESS_INTERVAL || !this.inited) {
      this.updateDots(ctx)
      this.lastUpdate = now
    }
  }

  updateDots (ctx) {
    if (!this.inited) {
      for (const dot of this.dots) {
        dot.draw(ctx)
      }
      this.inited = true
    } else {
      this.changeHighlightDotColor(ctx)
      this.highlightDotIndex = this.highlightDotIndex >= this.dots.length - 1
        ? 0
        : this.highlightDotIndex + 1
      this.changeHighlightDotColor(ctx, LOADING_DOT_COLOR_HIGHLIGHT)
    }
  }
}

class Splash extends Scene {
  constructor (ctx) {
    super('SPLASH', ctx)

    this.anime = null
  }

  show () {
    this.initStatic()
    this.initAnime()
  }

  initStatic () {
    const text = 'You are on the way'
    this.ctx.font = '18px sans'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(text, this.ctx.canvas.width / 2, this.ctx.canvas.height * 3 / 4 - 32)
    this.ctx.textAlign = 'start'
  }

  initAnime () {
    this.anime = new Anime(this.ctx)

    const loading = new Loading(this.ctx.canvas.width, this.ctx.canvas.height)
    loading.addEventListener('end', () => {
      this.hide()
      document.body.removeChild(document.getElementById('boot'))
      window.dispatchEvent(new Event('booted'))
    })
    this.anime.add(loading)
    this.anime.run()
  }

  hide () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.anime.stop()
  }
}

export default Splash
