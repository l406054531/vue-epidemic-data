'use strict'
const path = require('path')
const defaultConfigs = require('./src/config.js')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
// 压缩js
const TerserPlugin = require("terser-webpack-plugin");
function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = defaultConfigs.title // page title
const port = process.env.port || 8082 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  // 部署应用的基本url  可用 process.env.NODE_ENV 环境变量控制
  publicPath: '',

  // 指定生产环境目录
  outputDir: 'dist',

  // 指定生成静态资源的生成目录
  assetsDir: 'static',

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效
  lintOnSave: false, // process.env.NODE_ENV === 'development',

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  /**
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   * 打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
   * map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
   * 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
   * */
  productionSourceMap: false,
  // productionGzip:true,

  pwa: {
    iconPaths: {
      favicon32: './logo.png',
      favicon16: './logo.png',
      appleTouchIcon: './logo.png',
      maskIcon: './logo.png',
      msTileImage: './logo.png'
    }
  },

  // 开发服务配置
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/api': {
        target: 'http://47.106.221.76:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
    },

  },

  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '~': resolve('src/styles'),
        '@public': resolve('public')
      }
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      }),
      //下面是下载的插件的配置
      new CompressionWebpackPlugin({
        filename: '[file].gz[query]', //  使得多个.gz文件合并成一个文件，这种方式压缩后的文件少，建议使用
        algorithm: 'gzip', // 官方默认压缩算法也是gzip
        test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/, // 使用正则给匹配到的文件做压缩，这里是给html、css、js以及字体（.ttf和.woff和.eot）做压缩
        threshold: 10240, //以字节为单位压缩超过此大小的文件，使用默认值10240吧
        minRatio: 0.8, // 最小压缩比率，官方默认0.8
        //是否删除原有静态资源文件，即只保留压缩后的.gz文件，建议这个置为false，还保留源文件。以防：
        // 假如出现访问.gz文件访问不到的时候，还可以访问源文件双重保障
        deleteOriginalAssets: false
      }),

    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'], // 移除console
            },
            format: {
              comments: false, // 删除注释
            },
          },
          parallel: true,
        }),
      ],
    },
  },

  chainWebpack (config) {
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    config.module
      .rule('js')
      .test(/\.js$/)
      .use('babel-loader')
      .loader('babel-loader')
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/styles/variables.scss'),
        path.resolve(__dirname, './src/styles/mixins.scss')
      ]
    }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
}