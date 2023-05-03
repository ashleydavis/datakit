import { fromJson } from "..";
import { readStdin } from "../lib/io";
import { loadUserFn } from "./lib/user-fn";
import "./lib/load-globals";
import { isArray } from "../lib/utils";

async function main() {
    const argv = process.argv.slice(2);

    const transformFn = loadUserFn(argv, `(accumulator, record) => accumulate(accumulator, record)`);

    if (argv.length < 1) {
        throw new Error(`Expected argument for initial value.`);
    }

    const input = await readStdin();
    const data = fromJson(input);

    if (!isArray(data)) {
        throw new Error(`Expected input to 'reduce' to be an array.`);
    }

    const initialValue = JSON.parse(argv[0]);
    const reduced = data.reduce(transformFn as any, initialValue);
    console.log(JSON.stringify(reduced, null, 4));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });