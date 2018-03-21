const path = require("path");

const config = {
  // The base directory for resolving the entry option
  resolve: {
    modules: [path.resolve("./node_modules")],
    alias: {
      icons: path.resolve("./src/styles/Icons/assets")
    }
  },

  module: {
    rules: [
      // Babel loader, will use your project’s .babelrc
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },

      // Helps importing files
      {
        test: /\.(png|gif|jpg|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },

      // Fonts
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader?name=public/fonts/[name].[ext]"
      },

      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },

      {
        test: /\.scss$/,
        use: [
          {
            // creates style nodes from JS strings
            loader: "style-loader"
          },
          {
            // translates CSS into CommonJS
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]_[local]_[hash:base64:5]",
              sourceMap: true,
              camelCase: true
            }
          },
          {
            // compiles Sass to CSS
            loader: "sass-loader"
          }
        ]
      }
    ]
  }
};

module.exports = config;
