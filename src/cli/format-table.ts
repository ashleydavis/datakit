import { fromJson } from "..";
import { readStdin } from "../lib/read-stdin";
const { table } = require("table"); // Use import when I update TypeScript. 
import chalk from 'chalk';

async function main() {
    const input = await readStdin();
    const data = fromJson<any>(input);
    const header = data.length > 0 ? Object.keys(data[0]) : [];
    const boldHeader = header.map(column => chalk.bold(column));
    const rows = data.map(row => header.map(field => row[field]))
    console.log(table([boldHeader].concat(rows)));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });