import * as vscode from "vscode";

/** 输出信息Logkey */
export const LogKey = {
    /** 未找到活动文本编辑器 */
    NotFindEditor: "未找到活动文本编辑器",
    /** 需要选择ts文件 */
    NeedSelectTsFile: "需要选择ts文件",
};

/**
 * 等待一定时间
 * @param time 时间单位毫秒，默认`500`
 */
export async function WaitTime(time = 500) {
    await new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * 打开对应文件
 * @param fileName 文件名
 */
export async function OpenFile(fileName: string) {
    await vscode.commands.executeCommand("workbench.action.quickOpen", `${fileName}`);
    await WaitTime();
    await vscode.commands.executeCommand("workbench.action.acceptSelectedQuickOpenItem");
    await vscode.window.showInformationMessage(`打开：${fileName}`);
}

/**
 * @private
 * @param key 查找字符串
 * @param isRegex 是否为正则表达式
 */
async function _FindWithArgs(key: string, isRegex: boolean): Promise<boolean> {
    //   void vscode.window.showInformationMessage(`查找：${key}`);
    const edit = vscode.window.activeTextEditor;
    if (!edit) {
        return false;
    }

    try {
        await vscode.commands.executeCommand("editor.actions.findWithArgs", {
            searchString: key,
            isRegex: isRegex,
            matchWholeWord: false,
            isCaseSensitive: false,
        });
    } catch (error) {
        void vscode.window.showErrorMessage(`${error}`);
        return false;
    }

    return true;
}

/**
 * 从当前往上面找
 * @param key 要查找的关键字
 * @param isRegex 是否为正则表达式
 */
export async function FindStrFromLast(key: string, isRegex = false): Promise<boolean> {
    const result = await _FindWithArgs(key, isRegex);
    if (!result) return false;

    await vscode.commands.executeCommand("editor.action.previousMatchFindAction"); // 移动到上一个匹配项
    await vscode.commands.executeCommand("closeFindWidget"); // 关闭查找
    await vscode.commands.executeCommand("cursorHome"); // 移动到行头
    await vscode.window.showInformationMessage("已定位到方法头");

    return true;
}

/**
 * 从当前往下面找
 * @param key 要查找的关键字
 * @param isRegex 是否为正则表达式
 * @exports
 */
export async function FindStrFromNext(key: string, isRegex = false): Promise<boolean> {
    const result = await _FindWithArgs(key, isRegex);
    if (!result) return false;

    await vscode.commands.executeCommand("editor.action.nextMatchFindAction"); // 移动到下一个匹配项
    await vscode.commands.executeCommand("closeFindWidget"); // 关闭查找
    await vscode.commands.executeCommand("cursorUp"); // 向上移动一行
    await vscode.commands.executeCommand("cursorDown"); //先上后下才能定位
    await vscode.commands.executeCommand("cursorEnd"); // 移动到行尾
    await vscode.window.showInformationMessage("已定位到方法尾");

    return true;
}

/** 
 * 当前编辑文件从光标所在位置往上判断是否为类文件
 * `return undefind = 没有定位到编辑文件`
 */
export function EditFileIsClass(): boolean | undefined {
    const edit = vscode.window.activeTextEditor;
    if (!edit) {
        void vscode.window.showErrorMessage(LogKey.NotFindEditor);
        return undefined;
    }

    const range = new vscode.Range(
        new vscode.Position(0, 0),
        edit.selection.active
    );
    const index = edit.document.getText(range).indexOf("class ");
    const isClass = index !== -1;
    void vscode.window.showInformationMessage(`当前文件为Class：${isClass}`);
    return isClass;
}