import * as MethodType from "./MethodType";
import * as FileType from "./FileType";
import * as TestType from "./TestType";
import * as SetpType from "./SetpType";

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
    /** 打开非Raw下的js文件 */
    OpenNormalJs = "OpenNormalJs",
    /** 打开dist下的js文件 */
    OpenDistJs = "OpenDistJs",
    /** 测试ts类 */
    TestTsClass = "TestTsClass",
    /** 得到当前文件的文件名 */
    GetCurrentFileName = "GetCurrentFileName",
    /** 创建UiViewBase */
    CreateUiViewBase = "CreateUiViewBase",
}

/** 对于命令的方法结构类型 */
type TMacroFun = () => Promise<void>;

/** 命令接口类型 */
type TMacroCommands = {
    [key in EMacroKey]: {
        no: number;
        func: TMacroFun;
    };
};

/** vscode macros 插件获取命令的入口 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const macroCommands: TMacroCommands = {
    [EMacroKey.MoveToFuncStart]: { no: 0, func: MethodType.MoveToFuncStart },
    [EMacroKey.MoveToFuncEnd]: { no: 0, func: MethodType.MoveToFuncEnd },
    [EMacroKey.OpenTestTs]: { no: 0, func: FileType.OpenTestTs },
    [EMacroKey.OpenRawJs]: { no: 0, func: FileType.OpenJs.bind(null, 'JavaScript_Raw', 'Raw') },
    [EMacroKey.OpenNormalJs]: { no: 0, func: FileType.OpenJs.bind(null, 'JavaScript', 'Normal') },
    [EMacroKey.OpenDistJs]: { no: 0, func: FileType.OpenJs.bind(null, 'dist', 'Dist') },
    [EMacroKey.TestTsClass]: { no: 0, func: TestType.TestTsClass },
    [EMacroKey.GetCurrentFileName]: { no: 0, func: FileType.GetCurrentFileName },
    [EMacroKey.CreateUiViewBase]: { no: 0, func: SetpType.CreateUiViewBase },
};
