import { fromJson, toJson } from "..";
import { readStdin } from "../lib/read-stdin";
import minimist from "minimist";
import { loadTransformFn } from "./lib/transform-fn";
import { isArray } from "util";
import "./lib/load-globals";

async function main() {
    const argv = minimist(process.argv.slice(2));

    const transformFn = loadTransformFn(argv);
    const input = await readStdin();
    const data = fromJson(input);

    if (!isArray(data)) {
        throw new Error(`Expected input to 'map' to be an array.`);
    }

    const transformed = data.map(transformFn);
    console.log(toJson(transformed));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });