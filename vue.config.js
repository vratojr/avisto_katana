const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname,"./client/dist"),
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client/src/"),
        "@shared": path.resolve(__dirname, "shared/"),
      }
    },
  },

  // To specify a custom tsconfig location
  chainWebpack: config => {
    config
      .plugin("fork-ts-checker")
      .tap(args => {
        args[0].tsconfig = "./client/tsconfig.json";
        return args;
      });
  },

  devServer: {
    historyApiFallback: true,
    noInfo: true,
    proxy: "http://localhost:3000",
    contentBase: './dist',
    port: 8080,
    disableHostCheck: true
  }

};
