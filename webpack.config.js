const ESLintWebpackPlugin = require("eslint-webpack-plugin");
module.exports = {
  mode: 'production',
  plugins: [
    new ESLintWebpackPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    })
  ],
  module: {
    rules: [
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
      }
    ]
  }
}
