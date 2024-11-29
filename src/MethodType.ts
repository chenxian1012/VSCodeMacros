/**
 * 处理方法相关的命令
 */

import * as Common from "./Common";

/** 移动到方法头 */
export async function MoveToFuncStart() {
    const isClass = Common.EditFileIsClass();
    if (isClass === undefined) return;
    const key = isClass ? /\{\n {8}\S/g : /\{\n {4}\S/g;
    await Common.FindStrFromLast(key.source, true);
}

/** 移动到方法尾 */
export async function MoveToFuncEnd() {
    const isClass = Common.EditFileIsClass();
    if (isClass === undefined) return;
    const key = isClass ? /\n {4}\}/g : /\n {0}\}/g;
    await Common.FindStrFromNext(key.source, true);
}