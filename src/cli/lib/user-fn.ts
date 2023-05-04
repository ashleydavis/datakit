import * as path from "path";
import * as fs from "fs";
import { isFunction } from "../../lib/utils";
import { consumeOptionalArg } from "./args";

//
// Loads a user function.
//
export function loadUserFn(argv: string[], exampleFn: string): { userFn: Function, loadSourceCode: () => string, fileName?: string } {

    let userFn: any;

    if (argv.length < 1) {
        throw new Error(`Expected a user function, something like: "${exampleFn}"`);
    }

    let fileName: string | undefined = consumeOptionalArg(argv, ["-f", "--file"], "my-file.js");
    let loadSourceCode: (() => string) | undefined = undefined;
    if (fileName) {
        const filePath = path.resolve(fileName);
        loadSourceCode = () => fs.readFileSync(filePath, "utf8");
        userFn = require(filePath);
        fileName = path.basename(fileName);
    }
    else {
        fileName = "<anonymous>";
        const sourceCode = argv.shift()!;
        loadSourceCode = () => sourceCode;
        userFn = eval(sourceCode);
    }

    if (!isFunction(userFn)) {
        throw new Error(`Expected a user function! Got a ${typeof(userFn)}`);
    }

    return {
        userFn,
        loadSourceCode,
        fileName,
    };
}