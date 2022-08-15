const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

  devServer: {
    open: true,
    hot: true,
    port: 8080,
    static: {
      directory: './src',
      watch: true
    }
  },

  // entry: "./src/js/index.js",
  entry: ["@babel/polyfill", "./src/js/index.js"],

  output: {
    filename: '[name].[contenthash].js',
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },

  devtool: 'source-map',

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  module: {
    rules: [

      // изображения
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },

      // изображения из html
      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      // шрифты
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },

      // js
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }

    ],
  },


  plugins: [

    // Подключаем файл html, стили и скрипты встроятся автоматически
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
  ],

};

