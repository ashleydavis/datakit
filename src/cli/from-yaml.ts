import { inputData, outputData, } from "../lib/io";

async function main() {
    
    const argv = process.argv.slice(2);

    const data = await inputData(argv, "yaml");

    await outputData(argv, data);
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });