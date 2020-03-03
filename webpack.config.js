const webpack = require('webpack');  // these are basically import statements
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = { //this giant object - webpack looks for this object within this file,
  entry: './src/javascripts/main.js', //tells webpack where to start. other files will have to be linked in order to run
  // if it's not referenced in a js file, webpack won't do it
  devtool: "eval-source-map", 
  module: { 
    rules: [ // this one says "any file ending in .js, run eslint on it."
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
	options: {
          formatter: require('eslint/lib/cli-engine/formatters/stylish')
        }
      },
      {
        test: /\.js$/, // then run through all .js files and use babel
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/, //then load the html
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.scss$/, //then finds any .css files, converts the sass to css, extracts all the css code and puts together
        use: [
          MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
            { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // copies over any images (can add jpeg etc if needed)
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [ // these are the imports from the top
    new HtmlWebPackPlugin({
      template: "./src/index.html", // looks for this
      filename: "./index.html" // creates a "regular" html file in your code
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css", 
      chunkFilename: "[id].css"
    }),
    new webpack.ProvidePlugin({
      $: "jquery", //installs jquery everywhere so you don't have to import it on each file
      jQuery: "jquery"
    })
  ],
  output: {  // AT THE END
		path: __dirname + "/build", // what's left is one big JS file
		filename: "bundle.js" // name that 'bundle.js' and stick that in the build file
	}
};