import { inputData, outputData } from "../lib/io";
import { verifyInputArray } from "../lib/verify";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {
    
    if (argv.length < 1) {
        throw new Error(`Expected <number> argument for number of records to skip.`);
    }

    const number = parseInt(argv.shift()!);

    const data = await inputData(argv);
    verifyInputArray(data, "skip");

    const remaining = data.slice(number);

    await outputData(argv, remaining);
}

export const documentation = {
    name: "skip",
    desc: "Skips the first X records of the input dataset and writes the remaining records to the output dataset.",
    syntax: "skip <skip-number> [<input-file>] [<output-file>]",
    inputs: standardCmdInputs,
    outputs: standardCmdOutputs,
    args: [
        {
            name: "skip-number",
            desc: "The number of records to skip.",
        },
        standardInputFileHelp,
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, skips 3 records and writes remaining records to standard output",
            cmd: 'command-that-produces-json | skip 3',
        },
        { 
            name: "Reads data from a file, skips 3 records and writes remaining records to standard output",
            cmd: 'skip 3 input-file.csv',
        },
        {
            name: "Reads data from a file, skips 3 records and writes remaining records to another file",
            cmd: 'skip 3  input-file.csv output-file.csv'
        },
        {
            name: "Reads JSON data from standard input, skips 3 records and writes remaining records to a file",
            cmd: 'command-that-produces-json | skip 3 - output-file.csv'
        },
    ],
};
