import { fromCsv, toJson } from "..";
import { readStdin } from "../lib/io";

async function main() {
    const input = await readStdin(); //todo: this can just called inputJson!!
    const data = fromCsv(input);
    console.log(toJson(data));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });