import { fromJson, toJson } from "..";
import { readStdin } from "../lib/io";
import "./lib/load-globals";
import { verifyInputArray } from "../lib/verify";

async function main() {
    const argv = process.argv.slice(2);
    if (argv.length < 1) {
        throw new Error(`Expected <number> argument.`);
    }

    const number = parseInt(argv[0]);
    const input = await readStdin();
    const data = fromJson(input);
    verifyInputArray(data, "take");

    const transformed = data.slice(0, number);
    console.log(toJson(transformed));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });