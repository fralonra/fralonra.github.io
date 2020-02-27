import Hulu from './hulu'
import Boot from './scenes/boot'

class Yula {
  constructor (ctx) {
    this.ctx = ctx
    this.hulu = new Hulu()
    this.hulu.add(new Boot(ctx))
  }

  start () {
    this.hulu.switch('BOOT')
  }
}

export default Yula
