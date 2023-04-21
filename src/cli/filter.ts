import { fromJson, toJson } from "..";
import { readStdin } from "../lib/read-stdin";
import minimist from "minimist";
import { loadTransformFn } from "./lib/transform-fn";
import { isArray } from "util";

async function main() {
    const argv = minimist(process.argv.slice(2));

    const predicateFn = loadTransformFn(argv);
    const input = await readStdin();
    const data = fromJson(input);

    if (!isArray(data)) {
        throw new Error(`Expected input to 'filter' to be an array.`);
    }

    const filtered = data.filter(predicateFn);
    console.log(toJson(filtered));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });