module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  runtimeCompiler: false,
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    proxy: "http://localhost:3000",
    contentBase: './dist',
    port: 8080
  }
}