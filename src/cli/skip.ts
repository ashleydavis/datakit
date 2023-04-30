import { fromJson, toJson } from "..";
import { readStdin } from "../lib/io";
import minimist from "minimist";
import "./lib/load-globals";
import { isArray } from "../lib/utils";

async function main() {
    const argv = minimist(process.argv.slice(2));
    if (argv._.length < 1) {
        throw new Error(`Expected <number> argument.`);
    }

    const number = parseInt(argv._[0]);
    const input = await readStdin();
    const data = fromJson(input);

    if (!isArray(data)) {
        throw new Error(`Expected input to 'skip' to be an array.`);
    }

    const transformed = data.slice(number);
    console.log(toJson(transformed));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });