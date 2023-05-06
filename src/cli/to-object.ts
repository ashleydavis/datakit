import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import "./lib/load-globals";
import { isArray } from "../lib/utils";
import { inputJson, outputJson } from "../lib/io";

async function main() {
    const argv = process.argv.slice(2);
    const data = await inputJson(argv);
    const keySelectorFn = loadUserFn(argv, `r => r.key`);
    const valueSelectorFn = loadUserFn(argv, `r => r.value`);

    if (!isArray(data)) {
        throw new Error(`Expected input to 'to-object' to be an array.`);
    }

    const reduced = data.reduce((a: any, r: any) => {
        const key = invokeUserFn(() => keySelectorFn.fn(r), keySelectorFn.details);
        const value = invokeUserFn(() => valueSelectorFn.fn(r), valueSelectorFn.details);
        a[key] = value;
        return a;
    }, {});

    outputJson(reduced);
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });