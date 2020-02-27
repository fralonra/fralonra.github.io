import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

import {
  files,
  babelOption,
  makeConfig
} from './basic'

function getConfig () {
  const config = []
  const basicPlugins = [
    resolve(),
    postcss(),
    commonjs(),
    babel(babelOption)
  ]
  for (let file of files) {
    config.push(makeConfig(file, {
      plugins: [...basicPlugins, terser()]
    }))
  }
  return config
}

export default getConfig()
