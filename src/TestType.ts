/**
 * 处理测试相关的命令
 */

import * as vscode from "vscode";
import * as Common from "./Common";
import ts from "typescript";

/** 测试ts类 */
export async function TestTsClass() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage(Common.LogKey.NotFindEditor);
        return;
    }

    const document = editor.document;
    const fileName = document.fileName;
    const fileExtension = fileName.split('.').pop(); // 使用 split() 获取文件扩展名
    if (fileExtension !== "ts") {
        vscode.window.showErrorMessage(Common.LogKey.NeedSelectTsFile);
        return;
    }
    const position = editor.selection.active;

    // 获取文档的完整文本
    const sourceCode = document.getText();

    // 使用 TypeScript 编译器 API 解析代码
    const sourceFile = ts.createSourceFile(
        fileName,
        sourceCode,
        ts.ScriptTarget.Latest,
        true
    );

    // 遍历语法树，查找方法定义
    let methodStartLine: number | undefined;

    const findMethodStart = (node: ts.Node) => {
        if (ts.isMethodDeclaration(node) || ts.isFunctionDeclaration(node)) {
            const { line } = document.positionAt(node.getStart());
            const { line: endLine } = document.positionAt(node.getEnd());

            // 检查光标是否在方法体内
            if (position.line > line && position.line <= endLine) {
                methodStartLine = line;
            }
        }
        ts.forEachChild(node, findMethodStart);
    };

    findMethodStart(sourceFile);

    if (methodStartLine !== undefined) {
        const newPosition = new vscode.Position(methodStartLine + 1, 0);
        editor.selection = new vscode.Selection(newPosition, newPosition);
        editor.revealRange(new vscode.Range(newPosition, newPosition));
    }
}