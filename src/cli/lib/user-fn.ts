import * as path from "path";
import { isFunction } from "../../lib/utils";
import { consumeOptionalArg } from "./args";

//
// Loads a user function.
//
export function loadUserFn(argv: string[], exampleFn: string): Function {
    let userFn: any;
    if (argv.length < 1) {
        throw new Error(`Expected a user function, something like: "${exampleFn}"`);
    }

    let transformFile: string | undefined = consumeOptionalArg(argv, ["-f", "--file"], "my-file.js");
    if (transformFile) {
        userFn = require(path.resolve(transformFile));
    }
    else {
        const transform = argv.shift()!;
        userFn = eval(transform);
    }

    if (!isFunction(userFn)) {
        throw new Error(`Expected a user function! Got a ${typeof(userFn)}`);
    }

    return userFn;
}