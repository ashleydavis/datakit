import { fromJson, toJson } from "..";
import { readStdin, writeStdout } from "../lib/io";
import minimist from "minimist";
import { loadTransformFn } from "./lib/transform-fn";
import "./lib/load-globals";
import { isArray } from "../lib/utils";

export async function main(args: string[]) {
    const argv = minimist(args);

    const transformFn = loadTransformFn(argv);
    const input = await readStdin();
    const data = fromJson(input);

    if (!isArray(data)) {
        throw new Error(`Expected input to 'map' to be an array.`);
    }

    const transformed = data.map(transformFn as any);
    writeStdout(toJson(transformed));
}

if (require.main === module) {
    main(process.argv.slice(2))
        .catch(err => {
            console.error(`Failed with error:`);
            console.error(err);
            process.exit(1);
        });
}
