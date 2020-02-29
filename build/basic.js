export const babelOption = {
  presets: [['@babel/env', { modules: false }]]
}

export const files = [{
  name: 'boot',
  entry: 'src/boot/index.js'
}, {
  name: 'tty',
  entry: 'src/tty/index.js'
}, {
  name: 'sw',
  entry: 'src/sw.js',
  dest: 'public/'
}]

const defaultDest = 'public/dist/'

export function makeConfig (file, options) {
  return {
    input: file.entry,
    output: {
      file: (file.dest || defaultDest) + `${file.name}.js`,
      format: 'iife',
      name: file.name
    },
    ...options
  }
}
