import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

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
    serve({
      open: true,
      contentBase: 'public'
    })
  ]
  const livereloadPlugins = livereload('public')
  for (let file of files) {
    const plugins = file.name === 'sw'
      ? basicPlugins
      : [...basicPlugins, livereloadPlugins]
    config.push(makeConfig(file, {
      plugins
    }))
  }
  return config
}

export default getConfig()
