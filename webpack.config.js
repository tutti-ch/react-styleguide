const path = require("path");
const root = path.resolve(__dirname);
const dist = path.join(root, "dist");
const isDev = true;
const isProd = false;
const ExtractCSSChunks = require("extract-css-chunks-webpack-plugin");
const mode = process.env.NODE_ENV || "production";

const config = {
  mode,
  // The base directory for resolving the entry option
  resolve: {
    modules: [path.resolve("./node_modules")],
    alias: {
      icons: path.resolve("./src/styles/Icons/assets")
    }
  },

  entry: {
    main: [path.join(root, "src/index.js")]
  },

  output: {
    chunkFilename: "[name].[chunkhash].js",
    path: dist, // The path to the bundle directory
    publicPath: process.env.BASENAME || "/" // This tells webpack to server files always from the root path
  },

  module: {
    rules: [
      // Babel loader, will use your project’s .babelrc
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },

      // Helps importing files
      {
        test: /\.(png|jpg|gif|svg|pdf|ai|mp4)$/,
        loader: "file-loader",
        options: {
          name: () => (isProd ? "[hash:base64:5].[ext]" : "[path][name].[ext]")
        }
      },

      // Fonts
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader?name=public/fonts/[name].[ext]"
      },

      // {
      //   test: /\.css$/,
      //   use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      // },

      {
        test: /\.scss$/,
        use: [
          !isDev ? ExtractCSSChunks.loader : "style-loader",

          // translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              // Hash the class names
              localIdentName: isProd
                ? "[hash:base64:5]"
                : "[name]__[local]___[hash:base64:5]",

              // Enables us to import scss files and use class names in JS
              modules: true,

              // So that you can import myWrapper instead of ["my-wrapper"]
              camelCase: true

              // minimize: {
              //   autoprefixer: {
              //     add: true,
              //     remove: true,
              //     browsers: ["ie >= 11", "Safari >= 9"]
              //   },
              //   mergeIdents: true,
              //   discardUnused: true,
              //   safe: true,
              //   sourcemap: isDev,
              //   normalizeWhitespace: !isDev
              // }
            }
          },

          // resolve @import statements
          "resolve-url-loader",

          // compile sass to css
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              includePaths: [path.join(root, "src/client/styles")]
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
