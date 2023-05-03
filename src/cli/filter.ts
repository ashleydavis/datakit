import { fromJson, toJson } from "..";
import { readStdin } from "../lib/io";
import minimist from "minimist";
import { loadTransformFn } from "./lib/user-fn";
import { isArray } from "../lib/utils";

async function main() {
    const argv = minimist(process.argv.slice(2));

    const predicateFn = loadTransformFn(argv);
    const input = await readStdin();
    const data = fromJson(input);

    if (!isArray(data)) {
        throw new Error(`Expected input to 'filter' to be an array.`);
    }

    const filtered = data.filter(predicateFn as any);
    console.log(toJson(filtered));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });