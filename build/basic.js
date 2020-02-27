export const babelOption = {
  presets: [['@babel/env', { modules: false }]]
}

export const files = [
  'src/boot',
  'src/tty'
]

export function makeConfig (file, options) {
  const fileName = file.split('/').pop()
  return {
    input: file + '/index.js',
    output: {
      file: `dist/${fileName}.js`,
      format: 'iife',
      name: fileName
    },
    ...options
  }
}
