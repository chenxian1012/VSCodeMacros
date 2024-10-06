# VSCodeMacros
通过VSCode Macros插件，编写的自定义宏

* 电脑需要安装 [nodejs](https://nodejs.org/zh-cn)
* `vs code`需要安装 [VSCode Macros](https://marketplace.visualstudio.com/items?itemName=EXCEEDSYSTEM.vscode-macros)
1. `npm install typescript -g`  npm 全局安装ts模块 
2. 用`vs code`打开 `macros.code-workspace` 文件
3. 进入终端输入 `npm install` 初始化开发模块环境
4. 运行npm脚本 `watch`  监听更新对应js
5. `vs code`用户设置： `"vscodemacros.macroFilePath": "项目所在位置\\dist\\Macros.js",`