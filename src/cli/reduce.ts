import { inputData, outputData } from "../lib/io";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import "./lib/load-globals";
import { verifyInputArray } from "../lib/verify";

async function main() {
    const argv = process.argv.slice(2);

    const data = await inputData(argv);
    verifyInputArray(data, "reduce");

    const { fn, details } = loadUserFn(argv, `(accumulator, record) => accumulate(accumulator, record)`);

    if (argv.length < 1) {
        throw new Error(`Expected argument for initial value.`);
    }

    const initialValue = JSON.parse(argv[0]);

    const reduced = data.reduce((a: any, r: any) => invokeUserFn(() => fn(a, r), details), initialValue);

    await outputData(argv, reduced);
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });