import { fromJson, toJson } from "..";
import { readStdin } from "../lib/read-stdin";
import minimist from "minimist";
import { loadTransformFn } from "./lib/transform-fn";

async function main() {
    const argv = minimist(process.argv.slice(2));
    const transformFn = loadTransformFn(argv);
    const input = await readStdin();
    const data = fromJson(input);
    const transformed = transformFn(data);
    console.log(toJson(transformed));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });