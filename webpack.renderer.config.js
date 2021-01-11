const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");
const CopyWebpackPlugin = require("copy-webpack-plugin");

rules.push(
  {
    test: /\.css$/,
    use: [{ loader: "style-loader" }, { loader: "css-loader" }],
  },
  {
    test: /\.s[ac]ss$/,
    use: [
      { loader: "style-loader" },
      { loader: "css-loader" },
      { loader: "sass-loader" },
    ],
  }
);

plugins.push(
  new CopyWebpackPlugin({
    patterns: [
      {
        from: "src/img",
        to: "img",
      },
    ],
  })
);

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss", ".sass"],
  },
};
