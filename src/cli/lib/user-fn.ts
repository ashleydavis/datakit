import * as path from "path";
import * as fs from "fs";
import { isFunction } from "../../lib/utils";
import { consumeOptionalArg } from "./args";
import chalk from "chalk";

//
// Records the details of a user function.
//
export interface IUserFnDetails {

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
export function loadUserFn(argv: string[], exampleFn: string): { fn: Function, details: IUserFnDetails } {

    let userFn: any;

    if (argv.length < 1) {
        throw new Error(`Expected a user function, something like: "${exampleFn}"`);
    }

    const fileOption = {
        names: ["file", "f"],
        placeholder: "<file-name>",
        example: "my-file.js",
        desc: "The name of the file to load the user function from.",
    }
    let fileName: string | undefined = consumeOptionalArg(argv, 0, fileOption);
    let loadSourceCode: (() => string) | undefined = undefined;
    if (fileName) {
        const filePath = path.resolve(fileName);
        loadSourceCode = () => fs.readFileSync(filePath, "utf8");
        try {
            userFn = require(filePath);
            fileName = path.basename(fileName);
        }
        catch (err: any) {
            handleUserFnError(err, { loadSourceCode, fileName });
        }
    }
    else {
        fileName = "<anonymous>";
        const sourceCode = argv.shift()!;
        loadSourceCode = () => sourceCode;
        try {
            userFn = eval(sourceCode);
        }
        catch (err: any) {
            handleUserFnError(err, { loadSourceCode, fileName });
        }
    }

    if (!isFunction(userFn)) {
        throw new Error(`Expected a user function! Got a ${typeof(userFn)}`);
    }

    return {
        fn: userFn,
        details: {
            loadSourceCode,
            fileName,
        },
    };
}

//
// Wraps a user function for error handling.
//
export function invokeUserFn(fn: Function, details: IUserFnDetails): any {
    try {
        const result = fn();
        if (result && result.catch) {
            return result.catch((err: any) => {
                handleUserFnError(err, details);
            });            
        }

        return result;
    }
    catch (err: any) {
        handleUserFnError(err, details);        
    }
}

//
// Handles an error from user code.
//
function handleUserFnError(err: any, details: IUserFnDetails) {
    if (err.stack) {
        const matches = (new RegExp(`${details.fileName}:(\\d+):(\\d+)`)).exec(err.stack);
        if (matches) {
            const message = err.message || firstLine(err.stack);
            const lineNumber = parseInt(matches[1]);
            const columnNumber = parseInt(matches[2]);

            console.error(chalk.red(`Error: `) + message);
            console.error(` ${chalk.cyan("-->")} ${details.fileName}:${lineNumber}:${columnNumber}`);

            const sourceCode = details.loadSourceCode();
            const sourceCodeLines = sourceCode.split("\n");
            console.error();
            console.error(sourceCodeLines.slice(Math.max(0, lineNumber - 3), lineNumber - 1).map(line => "    " + line).join("\n"));
            console.error(`${chalk.red("  > ")}${sourceCodeLines[lineNumber - 1]}`);
            console.error(" ".repeat(columnNumber - 1) + chalk.red("    ^ " + message));
            console.error(sourceCodeLines.slice(lineNumber, lineNumber + 3).map(line => "    " + line).join("\n"));

            console.error();
            console.error(err.stack.split("\n").map((line: string) => "  " + line).join("\n"));
            console.error();

            throw new Error(`Runtime error from user function`);
        }
        else if (err.stack.startsWith("SyntaxError:")) {
            console.error(chalk.red(`Syntax error: `) + err.message);
            const sourceCode = details.loadSourceCode();
            console.error();
            console.error(sourceCode);
            console.error();
            console.error(err.stack.split("\n").map((line: string) => "  " + line).join("\n"));
            console.error();

            throw new Error(`Syntax error from user function`);
        }
    }

    throw err;
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
