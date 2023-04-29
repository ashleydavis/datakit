import { fromJson, toJson } from "..";
import { readStdin } from "../lib/read-stdin";
import minimist from "minimist";
import { loadTransformFn } from "./lib/transform-fn";
import "./lib/load-globals";
import { isArray } from "../lib/utils";

async function main() {
    const argv = minimist(process.argv.slice(2));

    const keySelectorFn = loadTransformFn(argv);
    const valueSelectorFn = loadTransformFn(argv);

    const input = await readStdin();
    const data = fromJson(input);

    if (!isArray(data)) {
        throw new Error(`Expected input to 'to-object' to be an array.`);
    }

    const reduced = data.reduce((a: any, r: any) => {
        a[keySelectorFn(r)] = valueSelectorFn(r);
        return a;
    }, {});
    console.log(JSON.stringify(reduced, null, 4));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });