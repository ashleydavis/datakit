import { inputJson, outputJson, readStdin } from "../lib/io";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import { isArray } from "../lib/utils";

async function main() {
    const argv = process.argv.slice(2);
    
    const data = await inputJson(argv);
    if (!isArray(data)) {
        throw new Error(`Expected input to 'filter' to be an array.`);
    }

    const { fn, details } = loadUserFn(argv, `r => predicate(key)`);

    const filtered = data.filter(record => invokeUserFn(() => fn(record), details));

    outputJson(filtered)
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });