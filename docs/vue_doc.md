# vue document content
vue 基础配置信息, 模板配置加载方式。

## install
1. CDN 通过 script src import 方式, vue.js. 支持 dev mini 不同的版本方式
2. npm instal vue, vue 插件方式， 结合 webpack 打包支持
3. vue cli 客户端支持单 Page 页面开发方式
4. 支持不同的模块下， UMD, commonJs, Es Module(webpack 作为模块化导入方式)

## Vue 集成开发方式
1. 集成 ``` npm install vue -save ``` 安装vue 插件
  - vue.js 引入 vue 模块内容, 支持组件
  - html 定义模块 id=main, import 对应的 script 内容
  - webpack.config.js 添加 alias resolve: { alias: { 'vue': 'vue/dist/vue.js' } }
2 vue 模板集成
  - 安装 ``` npm install vue-loader vue-html-loader --save-dev vue-template-compiler --save-dev ``` 
  - 编写 vue 组件支持

## vue html 控件支持， v-* 方式， vue 绑定插件方式
- 条件判断 v-if  
- name 属性绑定信息方式, v-bind:name 
- v-for="todo in todos" list 数据的遍历方式
- v-on:click 通过 on 绑定不同的 事件操作
- v-model 通过 Dom控件方式, 修改message  数据内容
- vue component 用户自定义标签组件方式， 组件是没有数据内容。 通过 props 动态数据绑定，显示不同 Component 组件方式。
  - 定义组件完成 类似， v-for 循环方式， v-bind 不同的属性， props[] 用于绑定显示属性方式
- 大型的web 前端项目, 自定义不同的 template 模块， 填充对应的div 模块内容。

## vue 对象生命周期
Component 生命周期创建
![](https://vuejs.org/images/lifecycle.png?_sw-precache=6f2c97f045ba988851b02056c01c8d62)

