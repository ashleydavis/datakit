import { toCsv } from "..";
import { inputJson } from "../lib/io";

async function main() {

    const argv = process.argv.slice(2); 
    const data = await inputJson(argv);
    console.log(toCsv(data));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });