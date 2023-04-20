import { fromJson, toJson } from "..";
import { readStdin } from "../lib/read-stdin";
import minimist from "minimist";

async function main() {
    const argv = minimist(process.argv.slice(2));
    if (argv._.length !== 1) {
        throw new Error(`Expected transformation argument: transform "data => transformed_data"`);
    }

    const input = await readStdin();
    const data = fromJson(input);

    const transform = argv._[0];
    const transformFn = eval(transform);
    console.log(toJson(transformFn(data)));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });