import { fromJson, toJson } from "..";
import { readStdin } from "../lib/read-stdin";
import minimist from "minimist";
import { loadTransformFn } from "./lib/transform-fn";
import "./lib/load-globals";
import { isArray } from "../lib/utils";

async function main() {
    const argv = minimist(process.argv.slice(2));

    const transformFn = loadTransformFn(argv);

    if (argv._.length < 1) {
        throw new Error(`Expected argument for initial value.`);
    }

    const input = await readStdin();
    const data = fromJson(input);

    if (!isArray(data)) {
        throw new Error(`Expected input to 'reduce' to be an array.`);
    }

    const initialValue = JSON.parse(argv._[0]);
    const reduced = data.reduce(transformFn as any, initialValue);
    console.log(JSON.stringify(reduced, null, 4));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });