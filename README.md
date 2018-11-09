# Webpack Intergation
webpack 集成不同嗯 loaders plugins 等配置信息

## install 配置脚本启动方式
npm 项目方式导入webpack ``` npm install --save-dev webpack webpack-cli ```

运行方式
  - 通过 npx webpack 运行打包进程
  - npm scripts 脚本支持, ``` webpack --config webpack.config.js ```

## external libarary 引入方式
传统js lib, 通过在html 中添加 src script 方式, 执行。

webpack 通过 npm install <module> 导入对应模块, js import 对应的模块。 webpack 打包自动依赖打入方式。

demo:
  1. npm install lodash (上线需要的) ``` npm install --save lodash ```
  2. index.js import 对应的模块
  3. html 中移出对应的依赖模块 （src 等内容）
  4. html 中仅仅引入 index.js 在 webpack 中 打包的产物
  5. npx webpack 方式, export 对应的接口。 默认 entry: src/index.js 产物 dist/main.js

webpack 通过Es6 支持 export import 方式, 对于传统浏览器， Babel 支持转换, 去适配传统的浏览器。

## configuration 配置支持
webpack.confog.js webpack 配置文件的支持, ``` npx webpack --config webpack.config.js ``` 命令指定 webpack 运行配置的目录方式。

类似 在 package.json 添加配置 "build": "webpack --config webpack.config.js" 配置。 通过 ``` npm run build ``` 命令方式运行。

## Asset source load package 静态资源的加载方式(image css, etc等信息)
原始处理方式, 前端打包时候， 把这些资源文件目录统一拷贝到 dist 中， 提供运行适用。(资源文件管理? 依赖关系? 是否有用Assert资源)

webpack 通过Js  依赖方式, 构建依赖图，动态捆绑方式。 copy 资源信息。

- load css 文件信息 ``` npm install --save-dev style-loader css-loader ```, 加载 style css loader 内容
- module 中 加入 style-loader css-loader 格式内容加载
```
  module: {
    rules: [
      {
        test: /\.css$/, use: ['style-loader', 'css-loader']
      }
    ]
  }
```
- 类似可以指定 less cass 不同 css 格式支持
- file loader 方式 加载不同 静态资源文件加载方式 ``` npm install --save-dev file-loader ```
```
  {
    test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']
  }
```
- index.js 添加 Image 图片配置引入方式, (注意指定文件打印的路径, main.js 文件引入路径配置方式)
- css 中 也可以使用 资源文件方式, 类似的Font 字体资源文件， 
- 对应 xml cvs data 资源文件的load 加载 ``` npm install --save-dev csv-loader xml-loader ```, js 不同 资源文件 load 方式。

## output 打包输出管理方式
- 上面 entry index.js, 输出对应的 bundle.js, html 当前仅仅引入了 bundle.js。 如何 HTML 自定引入依赖的 js 文件？？
  - 手动方式, entry 指定所有的 index.js 文件。 html import 所有output 文件内容。
- 插件 HtmlWebpackPlugin ``` npm install --save-dev html-webpack-plugin ```
```
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],
```
- 编译后 dist 中 自动生成 index.html, 自动 import 所有的 scripts
- dist clean 方式 ``` npm install --save-dev clean-webpack-plugin ```  保证每次清除 (类似 mvn clean)
```
const CleanWebpackPlugin = require('clean-webpack-plugin');
new CleanWebpackPlugin(['dist']),
```
- 输出 ``` npm install --save-dev webpack-manifest-plugin ``` 
```
var ManifestPlugin = require('webpack-manifest-plugin');
module.exports = {
    // ...
    plugins: [
      new ManifestPlugin()
    ]
};

生成对应的 maniftest.json 方式
{
  "mods/alpha.js": "mods/alpha.1234567890.js",
  "mods/omega.js": "mods/omega.0987654321.js"
}
```
## development 开发模式支持
- 设置 ``` mode: 'development' ``` 开发模式, 导出查看 js 格式化后文件配置。
- 通过 inline-source-map 方式, main.js 引入 a.js, b.js. c.js 不同文件, 错误输出 指定文件内容。
  - add ``` devtool: 'inline-source-map', ``` 输出指定文件的错误信息内容。
- auto compile 自动编译配置方式
  + watch 模式 ``` watch": "webpack --watch ```, 修改自动编译方式
  + plugin 导入方式 ``` npm install --save-dev webpack-dev-server ``` 
  ```
  webpack.config.js
  devServer: {
    contentBase: './dist'
  },
  tells webpack-dev-server to serve the files from the dist directory on localhost:8080
  package.json 启动命令
  "start": "webpack-dev-server --open",
  ```
  + plugin 导入 ``` npm install --save-dev express webpack-dev-middleware ``` 
    - 支持 通过 express , middleware 启动web 服务方式
    ```
    server.js 服务启动方式
    const express = require('express');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');

    const app = express();
    const config = require('./webpack.config.js');
    const compiler = webpack(config);

    // Tell express to use the webpack-dev-middleware and use the webpack.config.js
    // configuration file as a base.
    app.use(webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    }));

    // Serve the files on port 3000.
    app.listen(3000, function () {
      console.log('Example app listening on port 3000!\n');
    });

    package.json 启动对应的 server
    "server": "node server.js",

    ```
# hot module replacement 热模块替换部署方式
支持 js css, 不同 模块, 模块热部署方式， 单模块重新加载。

# production
- 通过 ``` npm install --save-dev webpack-merge ``` dev 模块， 指定server等等。 production 做最小的 打包方式。
- npm script 指定不同的配置文件， 运行不同的模式。
```
  // 定义合并模块
  const merge = require('webpack-merge');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
    mode: 'production',
  });

  // index.js 指定 load 模块
  import { cube } from './math.js';

  if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
  }

  function component() {
    var element = document.createElement('pre');

    element.innerHTML = [
      'Hello webpack!',
      '5 cubed is equal to ' + cube(5)
    ].join('\n\n');

    return element;
  }
  document.body.appendChild(component());
```
- dev tool: 指定 sourcemap,  miniCss  最小css 文件插件方式。

## Code Split 执行代码拆分方式
- EntryPoint 方式, js import 拆分方式。 通过打包方式, 运行不同的模块支持
- SplitChunksPlugin 插件拆分方式， 

## env 支持不同的参数获取方式
不同的参数插件获取支持配置方式

## webpack hot 热部署支持 ``` npm install vue-hot-reload-api --save-dev ```

## 安装 babel 用于 es6 装换 es5 兼容方式
```
npm install babel-core babel-loader babel-plugin-transform-runtime --save-dev 
npm install babel-preset-stage-0 babel-runtime babel-preset-es2015 --save-dev 

{
  "presets": ["es2015", "stage-0"],
  "plugins": ["transform-runtime"]
}
```

# Vue router 路由指定方式 ``` npm install vue-router --save ``` 路由
参考 docs 目录下  vue-router 路由插件

# vueX 

# vue model state 拆分修改

# Vue 组件化， 数值的传递方式

# koa-router koa 跨域访问方式

# less elementUI 组件支持









