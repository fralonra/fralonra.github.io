class Anime {
  constructor (ctx) {
    this.ctx = ctx
    this.start = null
    this.list = []
    this.callbackId = null
  }

  add (item) {
    this.list.push(item)
  }

  clear () {
    this.list = []
  }

  run () {
    this.callbackId = window.requestAnimationFrame(timestamp => { this.update(timestamp) })
  }

  update (timestamp) {
    if (!this.start) this.start = timestamp
    for (const item of this.list) {
      item.update(this.ctx, this.start, timestamp)
    }
    if (this.list.every(item => item.end)) return
    this.run()
  }

  stop () {
    window.cancelAnimationFrame(this.callbackId)
  }
}

export default Anime
