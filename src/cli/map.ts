import { inputJson, outputJson } from "../lib/io";
import minimist from "minimist";
import { loadTransformFn } from "./lib/transform-fn";
import "./lib/load-globals";
import { verifyInputArray } from "../lib/verify";

export async function main(args: string[]) {
    const argv = minimist(args);
    const transformFn = loadTransformFn(argv);
    const data = await inputJson();
    verifyInputArray(data, "map");

    const transformed = data.map(transformFn as any);

    outputJson(transformed);
}

if (require.main === module) {
    main(process.argv.slice(2))
        .catch(err => {
            if (err.message) {
                console.error(`Error: ${err.message}`);
            }
            else {
                console.error(`Failed with error:`);
                console.error(err);
            }
            process.exit(1);
        });
}
