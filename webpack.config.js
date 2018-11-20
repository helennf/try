const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require('path');

module.exports={
    entry:path.resolve(__dirname,'app/app.jsx'),//入口文件
    //target: 'node',
    output:{
        path:path.resolve(__dirname,'public'),//打包后的文件位置
        filename:'bundle.js'//打包后的文件
    },
    module: {
        rules:[
            {
                test: /(\.jsx|\.js)$/,
                use:[{
                    loader:"babel-loader",
                    options:{
                        presets:[
                            "env","react","es2015","stage-0"
                        ],
                        plugins: ['transform-decorators-legacy','transform-class-properties']
                    }}],
                exclude:/node_modules/ //忽略node_modeules下面的js文件
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: 'eslint-loader',
                    options:{
                        formatter: require('eslint-friendly-formatter')//默认的错误提示方式
                    }
                },
                enforce:'pre',//编译前检查
                exclude:/node_modules/,//不检测得文件
                include:[__dirname+ '/src'] //要检查的目录
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options:{
                        //
                    }
                }]
            },
            {
                test: /\.scss$/,
                use:['style-loader', 'css-loader', 'sass-loader']
            },{
                test: /\.(jpg|png|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options:{
                        limit: 8192, //1024代表1kb，小于8k以base64格式加载，否则以图片地址方式加载
                        name: 'img/[hash:8].[name].[ext]',
                        publicPath: '/dist/'
                    }
                }]
            }
            ]
    },
    devServer: {
        contentBase: './public',//默认本地服务器在跟目录
        historyApiFallback: true,//不跳转，默认会跳转且都跳到index.html上
        inline: true,//源文件改变时刷新页面
        hot: true,
        port:8085,//更改端口号，默认8080
        overlay: true //如果为false，则不在浏览器页面显示错误信息
    },
    resolve: {
        extensions: ['*','.js','.jsx']
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'My try app'
        }),
        new CleanWebpackPlugin(['public']),
        new webpack.BannerPlugin('版权所有，翻版必究')
    ]
}