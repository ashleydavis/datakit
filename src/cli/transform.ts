import { readStdin } from "../lib/io";
import { loadUserFn } from "./lib/user-fn";
import "./lib/load-globals";

async function main() {
    const argv = process.argv.slice(2);
    const transformFn = loadUserFn(argv, `dataset => transform(dataset)`);
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