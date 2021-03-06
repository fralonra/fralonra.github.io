import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
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
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    babel(babelOption),
    terser()
  ]
  for (let file of files) {
    config.push(makeConfig(file, {
      plugins: basicPlugins
    }))
  }
  return config
}

export default getConfig()
