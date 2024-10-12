import * as vscode from "vscode";
import * as Common from "./Common";

/** 添加新命令接口需要在这里先定义 */
enum EMacroKey {
    /** 移动到方法头 */
    MoveToFuncStart = "MoveToFuncStart",
    /** 移动到方法尾 */
    MoveToFuncEnd = "MoveToFuncEnd",
    /** 打开Test.ts */
    OpenTestTs = "OpenTestTs",
    /** 打开Raw下的js文件 */
    OpenRawJs = "OpenRawJs",
}

/** 对于命令的方法结构类型 */
type TMacroFun = () => Promise<void>;

/** 命令接口类型 */
type IMacroCommands = {
    [key in EMacroKey]: {
        no: number;
        func: TMacroFun;
    };
};

/** vscode macros 插件获取命令的入口 */
export const macroCommands: IMacroCommands = {
    [EMacroKey.MoveToFuncStart]: { no: 0, func: MoveToFuncStart },
    [EMacroKey.MoveToFuncEnd]: { no: 0, func: MoveToFuncEnd },
    [EMacroKey.OpenTestTs]: { no: 0, func: OpenTestTs },
    [EMacroKey.OpenRawJs]: { no: 0, func: OpenRawJs },
};

/** 移动到方法头 */
async function MoveToFuncStart() {
    const isClass = Common.EditFileIsClass();
    if (isClass === undefined) return;
    const key = isClass ? /\{\n {8}\S/g : /\{\n {4}\S/g;
    await Common.FindStrFromLast(key.source, true);
}

/** 移动到方法尾 */
async function MoveToFuncEnd() {
    const isClass = Common.EditFileIsClass();
    if (isClass === undefined) return;
    const key = isClass ? /\n {4}\}/g : /\n {0}\}/g;
    await Common.FindStrFromNext(key.source, true);
}

/** 打开Test.ts文件,定位到test方法 */
async function OpenTestTs() {
    const fileName = "Game/Test.ts";
    await Common.OpenFile(fileName);
}

/** 找到当前文件对应的Raw下的js文件 */
async function OpenRawJs() {
    const edit = vscode.window.activeTextEditor;
    if (!edit) {
        vscode.window.showErrorMessage(Common.LogKey.NotFindEditor);
        return;
    }

    const document = edit.document;
    const fileName = document.fileName;
    const fileExtension = fileName.split('.').pop(); // 使用 split() 获取文件扩展名
    if (fileExtension !== "ts") {
        vscode.window.showErrorMessage(Common.LogKey.NeedSelectTsFile);
        return;
    }

    // 拿到文件名，去掉后缀名
    const fileNameWithoutExtension = fileName.substring(
        fileName.lastIndexOf("\\") + 1,
        fileName.lastIndexOf(".")
    );

    // 调用快捷键 ctrl + p
    await vscode.commands.executeCommand(
        "workbench.action.quickOpen",
        `JavaScript_Raw/${fileNameWithoutExtension}.js`
    );
    await Common.WaitTime();

    // 接受选择结果
    await vscode.commands.executeCommand("workbench.action.acceptSelectedQuickOpenItem");
    await vscode.window.showInformationMessage(`打开：${fileNameWithoutExtension}.js (Raw)`);
}
