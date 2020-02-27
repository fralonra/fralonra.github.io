import commands from '../../commands'
import Scene from '../scene'
import EventManager from '../eventManager'

const FONT_SIZE = 16
const ENTRY_GAP = 8
const HIGHLIGHT_OFFSET = ENTRY_GAP / 2

const baseMenu = [{
  label: 'Reboot',
  action () {
    window.location.reload()
  }
}]

class Menu extends Scene {
  constructor (ctx) {
    super('MENU', ctx)

    this.index = 0
    this.entries = commands.filter(c => c.label).concat(baseMenu)
    this.em = null
  }

  show () {
    this.initStatic()
    this.initEvents()
  }

  initStatic () {
    const entryHeight = FONT_SIZE + ENTRY_GAP
    this.ctx.font = `${FONT_SIZE}px sans`
    this.ctx.textBaseline = 'top'
    for (let i = 0; i < this.entries.length; i++) {
      const entry = this.entries[i]
      const left = 60
      const top = 96 + entryHeight * i
      if (i !== this.index) {
        this.ctx.fillStyle = '#ffffff'
      } else {
        const textMetrics = this.ctx.measureText(entry.label)
        this.ctx.fillStyle = '#ffffff'
        this.ctx.fillRect(left - HIGHLIGHT_OFFSET, top - HIGHLIGHT_OFFSET, textMetrics.width + ENTRY_GAP, entryHeight)
        this.ctx.fillStyle = '#000000'
      }
      this.ctx.fillText(entry.label, left, top)
    }
  }

  initEvents () {
    this.em = new EventManager(window)
    const redraw = () => {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      this.initStatic()
    }
    const menuKeyUpHandler = e => {
      switch (e.keyCode) {
        case 38: // up
          if (--this.index < 0) {
            this.index = this.entries.length - 1
          }
          redraw()
          break
        case 40: // down
          if (++this.index >= this.entries.length) {
            this.index = 0
          }
          redraw()
          break
        case 13: // enter
          if (this.entries[this.index].action) {
            this.entries[this.index].action()
          }
          break
        default:
          break
      }
    }
    this.em.add('keydown', menuKeyUpHandler)
  }

  hide () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.em.clear()
  }

  destroy () {
    this.hide()
  }
}

export default Menu
