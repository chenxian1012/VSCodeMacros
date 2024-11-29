/**
 * 处理文件类型相关的命令
 */

import * as Common from "./Common";
import * as vscode from "vscode";
import path from "path";

/** 打开Test.ts文件,定位到test方法 */
export async function OpenTestTs() {
    const fileName = "Game/Test.ts";
    await Common.OpenFile(fileName);
}

/**
 * 找到当前文件对应的js文件并打开
 * @param folder 文件夹名
 * @param desc 描述
 */
export async function OpenJs(folder: string, desc: string) {
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
        `${folder}/${fileNameWithoutExtension}.js`
    );
    await Common.WaitTime();

    // 接受选择结果
    await vscode.commands.executeCommand("workbench.action.acceptSelectedQuickOpenItem");
    await vscode.window.showInformationMessage(`打开：${fileNameWithoutExtension}.js (${desc})`);
}

/** 得到当前文件的文件名（不需要拓展名） */
export async function GetCurrentFileName() {
    const edit = vscode.window.activeTextEditor;
    if (!edit) {
        vscode.window.showErrorMessage(Common.LogKey.NotFindEditor);
        return;
    }
    const document = edit.document;
    const fileName = document.fileName;
    const fileNameWithoutExtension = path.parse(fileName).name;
    await vscode.env.clipboard.writeText(fileNameWithoutExtension);
    vscode.window.showInformationMessage(`已复制文件名到剪贴板：${fileNameWithoutExtension}`);
}