const HtmlWebPackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPluning = require('mini-css-extract-plugin');
const OptimaceCssPluning = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');



//  TODAS LAS REFERENCIAS PARA UTILIZAR WEBPACK EN JAVASCRIPT
module.exports = {

    mode: 'production',

    optimization: {
        minimizer:[
            new OptimaceCssPluning()
        ]

    },
    output: { 
        filename: 'main.[contentHash].js',
        
        
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /style\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                ]
                  
                
              },
            {
                test: /style\.css$/,
                use: [
                    MiniCssExtractPluning.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]'
                            
                        }
                    }
                ]
            }
            
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPluning({
            filename: '[name].[contentHash].css',
            ignoreOrder: false,
        }),
        new CopyPlugin([
            {from:'src/assets', to: 'assets/'

        }]),
        new MinifyPlugin(),
        new CleanWebpackPlugin(),
    ]

}

