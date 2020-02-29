const baseURL = 'https://fralonra.github.io/'

const commands = [{
  label: 'Rona',
  command: 'rona',
  action () {
    window.open(baseURL + 'rona', '_blank')
  }
}, {
  label: 'WASM-Playground',
  command: 'wasm',
  action () {
    window.open('https://fralonra-wasm.netlify.com/', '_blank')
  }
}]

export default commands
