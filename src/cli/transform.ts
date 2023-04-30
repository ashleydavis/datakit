import { readStdin } from "../lib/io";
import minimist from "minimist";
import { loadTransformFn } from "./lib/transform-fn";
import "./lib/load-globals";

async function main() {
    const argv = minimist(process.argv.slice(2));
    const transformFn = loadTransformFn(argv);
    const input = await readStdin();
    const data = JSON.parse(input);
    const transformed = transformFn(data);
    console.log(JSON.stringify(transformed, null, 4));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });