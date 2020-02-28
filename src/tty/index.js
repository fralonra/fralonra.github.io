import xterm from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
import commands from '../commands'

const cmdMap = commands
  .filter(c => c.command)
  .reduce((p, c) => {
    const command = {
      action: c.action
    }
    if (c.text) command.text = c.text
    p[c.command] = command
    return p
  }, {})
cmdMap.help = {
  text: 'Bailing out, you are on your own. Good luck.'
}
cmdMap.exit = {
  text: 'You haven\'t got enough Orb of Toz. The door won\'t open for you.'
}
cmdMap.reboot = {
  text: 'Rebooting...',
  action () {
    setTimeout(() => {
      window.location.reload()
    }, 800)
  }
}

function mixinTerm (term) {
  term.prompt = function () {
    term.writeln('')
    term.write('\x1B[0m$ ')
  }
}

function command (cmd) {
  const c = cmdMap[cmd]
  if (!c) return 'Unkown command ' + cmd
  if (c.action) {
    Promise.resolve().then(() => {
      c.action()
    })
  }
  return c.text || cmd
}

function init () {
  window.addEventListener('booted', setupTTY)
}

function setupTTY () {
  let cmd = []
  const fontSize = 15
  const term = new xterm.Terminal({
    cursorBlink: true,
    fontSize,
    rows: Math.floor(window.innerHeight / (fontSize + 2))
  })
  mixinTerm(term)
  const fitAddon = new FitAddon()
  term.loadAddon(fitAddon)
  term.open(document.getElementById('tty'))
  term.focus()
  fitAddon.fit()

  term.write('Alas! Welcome to \x1B[1;3;31mAbove The Clouds')
  term.prompt()

  term.onKey(function (evt) {
    const e = evt.domEvent
    const printable = !e.altKey && !e.altGraphKey && !e.ctrlKey && !e.metaKey

    if (e.keyCode === 13) { // enter
      term.prompt()
      if (cmd.length) {
        term.write(command(cmd.join('')))
        term.prompt()
      }
      cmd = []
    } else if (e.keyCode === 8) { // backspace
      if (term.buffer.cursorX > 2) {
        term.write('\b \b')
        cmd.pop()
      }
    } else if (printable) {
      cmd.push(evt.key)
      term.write(evt.key)
    }
  })
}

init()
