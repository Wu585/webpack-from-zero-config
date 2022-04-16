const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    main: '@/index.js',
    admin: '@/admin.js',
  },
  plugins: [
    new ESLintWebpackPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: "admin.html",
      chunks: ['admin']
    })
  ],
  output: {
    filename: "[name].[contenthash].js"
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          priority: 10,
          minSize: 0, /* 如果不写 0，由于 React 文件尺寸太小，会直接跳过 */
          test: /[\\/]node_modules[\\/]/, // 为了匹配 /node_modules/ 或 \node_modules\
          name: 'vendors', // 文件名
          chunks: 'all',  // all 表示同步加载和异步加载，async 表示异步加载，initial 表示同步加载
          // 这三行的整体意思就是把两种加载方式的来自 node_modules 目录的文件打包为 vendors.xxx.js
          // 其中 vendors 是第三方的意思
        },
        common: {
          priority: 5,
          minSize: 0,
          minChunks: 2,
          chunks: 'all',
          name: 'common'
        }
      },
    },
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src/')
    }
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                compileType: 'icss'
              }
            }
          },
          {
            loader: "less-loader",
            options: {
              additionalData: `
              @import "~@/less-vars.less";
              `,
            }
          }
        ]
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env'],
              ['@babel/preset-react', {runtime: 'classic'}],
              ['@babel/preset-typescript']
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                compileType: 'icss'
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              additionalData: `
              @import "~@/scss-vars.scss";
              `,
              sassOptions: {
                includePaths: [__dirname]
              }
            }
          }
        ]
      }
    ]
  }
}
