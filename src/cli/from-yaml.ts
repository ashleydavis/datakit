import { outputJson, readStdin } from "../lib/io";
const YAML = require("yaml");

async function main() {
    
    const input = await readStdin();
    const data = YAML.parse(input);

    const argv = process.argv.slice(2);
    await outputJson(argv, data);
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });