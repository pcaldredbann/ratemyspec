import 'webpack-dev-server';
import * as path from 'path';
import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

interface WebpackConfiguration extends webpack.Configuration {
    devServer?: webpackDevServer.Configuration
}

const isDev = process?.env?.NODE_ENV === 'development';

const config: WebpackConfiguration = {
    devServer: {
        port: 3000,
    },
    devtool: 'inline-source-map',
    entry: {
        app: {
            dependOn: ['react-libs'],
            import: path.resolve(__dirname, 'src'),
        },
        'react-libs': ['react', 'react-dom'],
    },
    mode: isDev ? 'development' : 'production',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: ['ts-loader'],
            },
            {
                exclude: /node_modules/,
                test: /\.(jpe?g|png|svg|woff2?|bmp|ico)$/,
                use: ['asset'],
            },
            {
                exclude: /node_modules/,
                test: /\.s?css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: path.resolve(__dirname, 'src/index.html'),
        }),
        new MiniCssExtractPlugin({ filename: 'css/[name].css'  }),
    ],
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.jsx',
            '.js',
        ],
    },
};

export default config;