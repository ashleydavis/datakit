import { readStdin } from "../lib/io";
const YAML = require("yaml");

async function main() {
    const input = await readStdin();
    const data = YAML.parse(input);
    console.log(JSON.stringify(data, null, 4));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });