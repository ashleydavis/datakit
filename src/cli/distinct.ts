import { inputData, outputData } from "../lib/io";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";
import { verifyInputArray } from "../lib/verify";

export async function main(argv: string[]): Promise<void> {

    const data = await inputData(argv);
    verifyInputArray(data, "distinct");

    const valuesAlreadySeen: Set<any> = new Set<any>();

    const output: any[] = [];

    for (const record of data) {

        if (valuesAlreadySeen.has(record)) {
            // Already seen this value.
            // Skip it and continue to next item.
            continue;
        }

        valuesAlreadySeen.add(record);
        output.push(record);
    }

    await outputData(argv, output);
}

export const documentation = {
    name: "distinct",
    desc: "Returns the set of distinct values from the input dataset. Removes duplicate values from the dataset.",
    syntax: "distinct [<input-file>] [<output-file>]",
    inputs: standardCmdInputs,
    outputs: standardCmdOutputs,
    args: [
        standardInputFileHelp,
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, removes duplicate values and writes to standard output",
            cmd: 'command-that-produces-json | distinct -',
        },
        {
            name: "Reads data from a file, removes duplicate values and writes to standard output",
            cmd: 'distinct input-file.csv',
        },
        {
            name: "Reads data from a file, removes duplicate values and writes output to another file",
            cmd: 'distinct input-file.csv output-file.csv'
        },
    ],
};