import { inputData, outputData, readStdin } from "../lib/io";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import { verifyInputArray } from "../lib/verify";

async function main() {
    const argv = process.argv.slice(2);
    
    const data = await inputData(argv);
    verifyInputArray(data, "filter");

    const { fn, details } = loadUserFn(argv, `r => predicate(key)`);

    const filtered = data.filter((record: any) => invokeUserFn(() => fn(record), details));

    await outputData(argv, filtered)
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });