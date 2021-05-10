const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isDev) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin()
        ]
    }

    return config
}

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: {
        app: path.resolve(__dirname, 'src', 'index.js'),
        animate: path.resolve(__dirname, 'src', 'js', 'animate.js'),
        gallery: path.resolve(__dirname, 'src', 'js', 'gallery.js'),
        anchors: path.resolve(__dirname, 'src', 'js', 'anchors.js'),
        sign_up: path.resolve(__dirname, 'src', 'js', 'sign_up.js')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: fileName('js')
    },
    optimization: optimization(),
    devServer: {
        port: 4500,
        hot: isDev,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                   {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread']
                        }
                   }
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        }
                    }, {loader: 'css-loader'}, {loader: 'sass-loader'}
                ]
            },
            {
                test: /\.(png|jpg|svj|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: fileName('css')
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'images'),
                    to:  path.resolve(__dirname, 'build', 'images')
                },
                {
                    from: path.resolve(__dirname, 'src', 'js', 'data.json'),
                    to:  path.resolve(__dirname, 'build')
                }
            ]
        }),
        new CleanWebpackPlugin()
    ]
}