import { fromYaml, toJson } from "..";
import { readStdin } from "../lib/read-stdin";

async function main() {
    const input = await readStdin();
    const data = fromYaml(input);
    console.log(toJson(data));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });