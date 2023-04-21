import { fromJson, toJson } from "..";
import { readStdin } from "../lib/read-stdin";
import minimist from "minimist";
import * as fs from "fs-extra";
import * as path from "path";

async function main() {
    const argv = minimist(process.argv.slice(2));

    const input = await readStdin();
    const data = fromJson(input);

    let transformFn: any;
    let transformFile = argv.f || argv.file;
    if (transformFile) {
        transformFn = require(path.resolve(transformFile));
    }
    else {
        if (argv._.length !== 1) {
            throw new Error(`Expected transformation argument: transform "data => transformed_data"`);
        }

        const transform = argv._[0];
        transformFn = eval(transform);
    }
    console.log(toJson(transformFn(data)));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });