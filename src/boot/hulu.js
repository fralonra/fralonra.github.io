import Scene from './scene'

class Hulu {
  constructor () {
    this.list = Object.create(null)
    this.current = null
  }

  add (scene) {
    scene.hulu = this
    this.list[scene.name] = scene
  }

  switch (key, destroy = false) {
    const scene = this.list[key]
    if (scene instanceof Scene) {
      if (!scene.started) {
        scene.start()
      }
      if (this.current) {
        if (!destroy) {
          this.current.hide()
        } else {
          this.current.destroy()
        }
      }
      scene.show()
      this.current = scene
    }
  }
}

export default Hulu
