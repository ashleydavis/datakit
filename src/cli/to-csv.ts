import { fromJson, toCsv } from "..";
import { readStdin } from "../lib/io";

async function main() {
    const input = await readStdin();
    const data = fromJson(input);
    console.log(toCsv(data));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });