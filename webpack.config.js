const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  plugins: [
    new ESLintWebpackPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    new MiniCssExtractPlugin({
      filename:'[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin()
  ],
  output: {
    filename: "[name].[contenthash].js"
  },
  optimization: {
    runtimeChunk: 'single'
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
            loader:'css-loader',
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
