
// module.exports = {
//     lintOnSave: false,
//     assetsDir: 'static',
//     parallel: false,
//     publicPath: './',
// };

'use strict'
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: false,
    outputDir: 'dist',
    publicPath: '',
    // publicPath: './',
    // parallel: false,
    // assetsDir: 'static',
    // lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    //除了 index.html 之外的静态资源要存放的路径/ 把所有的静态资源打包到 dist下的该文件夹下
    // assetsSubDirectory: 'static',  
    //代表打包后，index.html里面引用资源的的相对地址
    // assetsPublicPath: '/', 
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
         }
    },
    // devServer: {
    //     proxy: {
    //         '/api': {
    //                 target: 'http://192.168.9.136:8888',
    //                 // target: 'http://localhost:8080',
    //                 pathRewrite: { '^/api':''},
    //                 //ws: true,  // 用于支持websocket
    //                 changeOrigin: true, // 伪装同源
    //             }
    //         }
    // },
}
