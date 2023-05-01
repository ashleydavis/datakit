import { inputJson, outputJson } from "../lib/io";
import minimist from "minimist";
import { loadTransformFn } from "./lib/transform-fn";
import "./lib/load-globals";
import { isArray } from "../lib/utils";

export async function main(args: string[]) {
    const argv = minimist(args);

    const transformFn = loadTransformFn(argv);

    const data = await inputJson();
    if (!isArray(data)) {
        throw new Error(`Expected input to 'map' to be an array.`);
    }

    const transformed = data.map(transformFn as any);
    outputJson(transformed);
}

if (require.main === module) {
    main(process.argv.slice(2))
        .catch(err => {
            console.error(`Failed with error:`);
            console.error(err);
            process.exit(1);
        });
}
