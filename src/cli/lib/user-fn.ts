import minimist from "minimist";
import * as path from "path";
import { isFunction } from "../../lib/utils";

//
// Loads a user function.
//
export function loadUserFn(argv: minimist.ParsedArgs): Function {
    let transformFn: any;
    let transformFile = argv.f || argv.file;
    if (transformFile) {
        transformFn = require(path.resolve(transformFile));
    }
    else {
        if (argv._.length < 1) {
            throw new Error(`Expected transformation argument like: "data => transformed_data"`);
        }

        const transform = argv._.shift()!;
        transformFn = eval(transform);
    }

    if (!isFunction(transformFn)) {
        throw new Error(`Expected a transform function!`);
    }

    return transformFn;
}