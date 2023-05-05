import * as path from "path";
import * as fs from "fs";
import { isFunction } from "../../lib/utils";
import { consumeOptionalArg } from "./args";
import chalk from "chalk";

export interface IUserFn {
    //
    // User defined function to be invoked for data transformation.
    //
    fn: Function;

    //
    // Function to lazy load source code error reporting.
    //
    loadSourceCode: () => string;
    
    //
    // The name of the file.
    //
    fileName: string;
}

//
// Loads a user function.
//
export function loadUserFn(argv: string[], exampleFn: string): IUserFn {

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
        fn: userFn,
        loadSourceCode,
        fileName,
    };
}

//
// Invokes a user function and handlers errors.
//
export function invokeUserFn(userFn: IUserFn): any {
    try {
        return userFn.fn();
    }
    catch (err: any) {
        if (err.stack) {
            const matches = (new RegExp(`${userFn.fileName}:(\\d+):(\\d+)`)).exec(err.stack);
            if (matches) {

                const message = err.message || firstLine(err.stack);
                const lineNumber = parseInt(matches[1]);
                const columnNumber = parseInt(matches[2]);

                console.error(chalk.red(`Error: `) + message);
                console.error(` ${chalk.cyan("-->")} ${userFn.fileName}:${lineNumber}:${columnNumber}`)

                const sourceCode = userFn.loadSourceCode();
                const sourceCodeLines = sourceCode.split("\n");
                console.error();
                console.error(sourceCodeLines.slice(Math.max(0, lineNumber-3), lineNumber-1).map(line => "    " + line).join("\n"));
                console.error(`${chalk.red("  > ")}${sourceCodeLines[lineNumber-1]}`);
                console.error(" ".repeat(columnNumber-1) + chalk.red("    ^ "  + message));
                console.error(sourceCodeLines.slice(lineNumber, lineNumber + 3).map(line => "    " + line).join("\n"));

                console.error();
                console.error(err.stack.split("\n").map((line: string) => "  " + line).join("\n"));
                console.error();

                throw new Error(`Runtime error from user function`);
            }
        }
        
        throw err;
    }
}

//
// Extracts the first line of the input string and return it.
//
function firstLine(input: string) {
    const newlineIndex = input.indexOf("\n");
    if (newlineIndex > 0) {
        return input.substring(0, newlineIndex).trimEnd();
    }
    else {
        return input.trimEnd();
    }    
}
