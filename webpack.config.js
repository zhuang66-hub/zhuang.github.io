const path = require('path')

module.exports = {
  // 入口
  entry: './src/index.js',
  output: {
    // 虚拟打包路径  //这个路径下的文件可以在浏览器中访问到 不会真的生成
    publicPath: 'xuni',
    filename: 'bundle.js'
  },
  devServer: {   //npm run dev 启动指令   开启端口号为8080 静态文件夹为www
    port: 8080,  //端口号
    contentBase: 'www'  //静态资源文件夹
  }
}
