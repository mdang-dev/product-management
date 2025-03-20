const { DefinePlugin } = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new DefinePlugin({
      "process.env.name": JSON.stringify("MD"),
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
