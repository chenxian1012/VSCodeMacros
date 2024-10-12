# VSCode Macros

通过 VSCode Macros 插件编写的自定义宏。

## 前提条件

* 电脑需要安装 [Node.js](https://nodejs.org/zh-cn)。
* VS Code 需要安装 [VSCode Macros](https://marketplace.visualstudio.com/items?itemName=EXCEEDSYSTEM.vscode-macros)。

## 安装步骤

1. **全局安装 TypeScript 模块**：
   ```bash
   npm install typescript -g
   ```

2. **用 VS Code 打开工作区文件**：
   打开 `macros.code-workspace` 文件。

3. **初始化开发模块环境**：
   在终端中输入以下命令：
   ```bash
   npm install
   ```

4. **运行 npm 脚本**：
   运行 `watch` 脚本以监听更新对应的 JavaScript 文件。

5. **配置 VS Code 用户设置**：
   在用户设置中添加以下配置：
   ```json
   "vscodemacros.macroFilePath": "项目所在位置\\dist\\Macros.js"
   ```

## 说明

完成以上步骤后，您将能够使用自定义宏来提高开发效率。如有任何问题，请查阅插件文档或联系支持。
