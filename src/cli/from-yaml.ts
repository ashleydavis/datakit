import { readStdin } from "../lib/io";
const YAML = require("yaml");

async function main() {
    
    const input = await readStdin(); //todo: this can just called inputJson!!
    const data = YAML.parse(input);
    console.log(JSON.stringify(data, null, 4));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });