class EventManager {
  constructor (target) {
    this.target = target
    this.list = Object.create(null)
  }

  add (event, handler) {
    let queue = this.list[event]
    if (!queue) {
      queue = []
      this.list[event] = queue
    }
    queue.push(handler)
    this.target.addEventListener(event, handler)
  }

  clear (event) {
    if (!event) {
      const events = Object.keys(this.list)
      for (const e of events) {
        this.clear(e)
      }
      return
    }
    const queue = this.list[event]
    if (!queue) return
    for (const handler of queue) {
      this.target.removeEventListener(event, handler)
    }
    this.list[event] = []
  }
}

export default EventManager
