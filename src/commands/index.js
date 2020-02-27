const baseURL = 'https://fralonra.github.io/'

const commands = [{
  label: 'Rona',
  command: 'rona',
  action () {
    window.open(baseURL + 'rona', '_blank')
  }
}]

export default commands
