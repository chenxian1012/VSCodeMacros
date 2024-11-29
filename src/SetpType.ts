/**
 * 处理步骤相关的命令
 */

import * as vscode from "vscode";
import * as Common from "./Common";

/** 创建UiViewBase */
export async function CreateUiViewBase() {
    const fileName = "Ui/Define/UiDefine.ts";
    await Common.OpenFile(fileName);
    await Common.WaitTime();
    const key = 'export const enum EUiViewName';
    await Common.FindStrFromNext(key);
    await vscode.commands.executeCommand("editor.action.jumpToBracket");
    await vscode.commands.executeCommand("editor.action.insertLineBefore");
    const edit = vscode.window.activeTextEditor!;
    const position = edit.selection.active; // 获取当前光标位置
    await edit.edit(editBuilder => {
        editBuilder.insert(position, "ViewName = 'ViewName',");
    });
    await vscode.commands.executeCommand("cursorHome"); // 移动到行头
    await vscode.commands.executeCommand("editor.action.rename"); // 重命名
    await vscode.commands.executeCommand("cursorWordRight"); // 移动到单词右边
    await vscode.commands.executeCommand("cursorWordLeft"); // 移动到单词左边
    await vscode.commands.executeCommand("cursorWordEndRightSelect"); // 选中单词
    await vscode.commands.executeCommand("editor.action.clipboardCopyAction"); // 复制
    await vscode.commands.executeCommand("cursorEnd"); // 移动到行尾
    await vscode.commands.executeCommand("cursorWordLeft"); // 移动到单词左边
    await vscode.commands.executeCommand("cursorWordEndLeftSelect"); // 选中单词
    await vscode.commands.executeCommand("editor.action.clipboardPasteAction"); // 粘贴
    await _ShowInputBoxAndCopy();
    await _ShowQuickPickAndCopy();
    await vscode.commands.executeCommand("extension.createNew");
    vscode.window.showInformationMessage(`已等待完成1`);
}

/** 弹出输入框并复制输入内容 */
async function _ShowInputBoxAndCopy() {
    // 弹出输入框，提示用户输入内容
    const input = await vscode.window.showInputBox({ prompt: "请输入内容" });

    // 检查用户是否输入了内容
    if (input) {
        // 将输入的内容复制到剪贴板
        await vscode.env.clipboard.writeText(input);
        vscode.window.showInformationMessage(`已复制内容到剪贴板：${input}`);
    } else {
        vscode.window.showWarningMessage("没有输入内容");
    }
}

/** 弹出选择框并复制选择的内容 */
async function _ShowQuickPickAndCopy() {
    // 定义可选列表内容
    const options = ["选项1", "选项2", "选项3", "选项4"];

    // 弹出选择框，提示用户选择内容
    const selectedOption = await vscode.window.showQuickPick(options, {
        placeHolder: "请选择一个选项"
    });

    // 检查用户是否选择了内容
    if (selectedOption) {
        // 将选择的内容复制到剪贴板
        await vscode.env.clipboard.writeText(selectedOption);
        vscode.window.showInformationMessage(`已复制内容到剪贴板：${selectedOption}`);
    } else {
        vscode.window.showWarningMessage("没有选择任何内容");
    }
}