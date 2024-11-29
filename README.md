# VSCode Macros

使用 VSCode Macros 插件创建自定义宏。

## 前提条件

- 安装 [Node.js](https://nodejs.org/zh-cn)。
- 安装 [VSCode Macros](https://marketplace.visualstudio.com/items?itemName=EXCEEDSYSTEM.vscode-macros) 插件。

## 安装步骤

1. **安装 TypeScript**：
   ```bash
   npm install typescript -g
   ```

2. **打开工作区**：
   使用 VS Code 打开 `macros.code-workspace` 文件。

3. **初始化环境**：
   在终端中运行：
   ```bash
   npm install
   ```

4. **运行监听脚本**：
   执行 `watch` 脚本以监控 JavaScript 文件的更新。

5. **配置用户设置**：
   在 VS Code 用户设置中添加：
   ```json
   "vscodemacros.macroFilePath": "项目路径\\dist\\Macros.js"
   ```

## 说明

完成以上步骤后，您可以使用自定义宏来提高开发效率。如有问题，请查阅插件文档或联系支持。
