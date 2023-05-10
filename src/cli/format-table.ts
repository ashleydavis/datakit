import { inputData, writeStdout } from "../lib/io";
import { table } from "table";
import chalk from 'chalk';
import { run } from "../lib/command";
import { standardCmdInputs, standardInputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {

    const data = await inputData(argv);

    const header = data.length > 0 ? Object.keys(data[0]) : [];
    const boldHeader = header.map(column => chalk.bold(column));
    const rows = data.map((row: any) => header.map(field => row[field]))

    writeStdout(table([boldHeader].concat(rows)));
}

export const documentation = {
    name: "format-table",
    desc: "Formats data to table rendered in ascii.",
    syntax: "format-table <input-file>",
    inputs: standardCmdInputs,
    outputs: [
        "A table rendered in ascii output to standard output."
    ],
    args: [
        standardInputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, renders the data to an ascii table on standard output",
            cmd: 'command-that-produces-json | format-table -',
        },
        {
            name: "Reads data from a JSON file, renders the data to an ascii table on standard output",
            cmd: 'format-table input-file.json',
        },
        {
            name: "Reads data from a YAML file, renders the data to an ascii table on standard output",
            cmd: 'format-table input-file.yaml',
        },
    ],
};

if (require.main === module) {
    run(main, documentation);
}