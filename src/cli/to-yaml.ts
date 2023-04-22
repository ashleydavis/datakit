import { readStdin } from "../lib/read-stdin";
const YAML = require("yaml");

async function main() {
    const input = await readStdin();
    const data = JSON.parse(input);
    console.log(YAML.stringify(data));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });