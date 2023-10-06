import { inputData, outputData } from "../lib/io";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import { verifyInputArray } from "../lib/verify";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";

//
// Create batches from an array.
//
function createBatches(array: any[], batchSize: number): any[] {
    
    const batches = [];

    for (let i = 0; i < array.length; i += batchSize) {
        batches.push(array.slice(i, i + batchSize));
    }

    return batches;
}

export async function main(argv: string[]): Promise<void> {

    if (argv.length < 1) {
        throw new Error(`Expected <number> argument for for batch size.`);
    }

    const batchSize = parseInt(argv.shift()!);

    const data = await inputData(argv);
    verifyInputArray(data, "batch");

    const output = createBatches(data, batchSize);
    await outputData(argv, output);
}

export const documentation = {
    name: "batch",
    desc: "Outputs the input dataset as an array of arrays, each sub-array containing the specified number of records.",
    syntax: "batch <batch-size> [<input-file>] [<output-file>]",
    inputs: standardCmdInputs,
    outputs: [
        "JSON file",
        "YAML file",
        "JSON formatted data on standard output.",
    ],
    args: [
        {
            name: "batch-size",
            desc: "Specifies the size for each batch.",
        },
        standardInputFileHelp,
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, batches the records into groups of 5 and writes to standard output",
            cmd: 'command-that-produces-json | batch 5',
        },
        {
            name: "Reads data from a file, batches the records into groups of 5 and writes to standard output",
            cmd: 'batch 5 input-file.csv',
        },
        {
            name: "Reads data from a file, batches the records into groups of 5 and writes output to another file",
            cmd: 'batch 5 input-file.csv output-file.csv'
        },
        {
            name: "Reads JSON data from standard input, applies the transformation and writes output to another file",
            cmd: 'command-that-produces-json | batch 5 - output-file.csv'
        },
    ],
};
