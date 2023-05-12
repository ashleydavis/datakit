import { inputData, outputData } from "../lib/io";
import { verifyInputArray } from "../lib/verify";
import { run } from "../lib/command";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {
    
    const data = await inputData(argv);
    verifyInputArray(data, "skip");

    if (argv.length < 1) {
        throw new Error(`Expected <number> argument for number of records to skip.`);
    }

    const number = parseInt(argv.shift()!);

    const remaining = data.slice(number);
    await outputData(argv, remaining);
}

export const documentation = {
    name: "skip",
    desc: "Skips the first X records of the input dataset and writes the remaining records to the output dataset.",
    syntax: "skip <input-file> <skip-number> [<output-file>]",
    inputs: standardCmdInputs,
    outputs: standardCmdOutputs,
    args: [
        standardInputFileHelp,
        {
            name: "skip-number",
            desc: "The number of records to skip.",
        },
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, skips 3 records and writes remaining records to standard output",
            cmd: 'command-that-produces-json | skip - 3',
        },
        { 
            name: "Reads data from a file, skips 3 records and writes remaining records to standard output",
            cmd: 'skip input-file.csv 3',
        },
        {
            name: "Reads data from a file, skips 3 records and writes remaining records to another file",
            cmd: 'skip input-file.csv 3 output-file.csv'
        },
    ],
};

if (require.main === module) {
    run(main, documentation);
}