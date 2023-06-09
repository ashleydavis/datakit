import { inputData, outputData } from "../lib/io";
import { verifyInputArray } from "../lib/verify";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {

    const data = await inputData(argv);
    verifyInputArray(data, "flatten");

    const transformed = data.flat(1);

    await outputData(argv, transformed);
}

export const documentation = {
    name: "flatten",
    desc: "Flattens a nested dataset by 1 level. Works just like `array.flat` in JavaScript with an argument of 1 or the `flatten` function in Lodash.",
    syntax: "flatten [<input-file>] [<output-file>]",
    inputs: standardCmdInputs,
    outputs: standardCmdOutputs,
    args: [
        standardInputFileHelp,
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, flattens it and writes to standard output",
            cmd: 'command-that-produces-json | flatten',
        },
        {
            name: "Reads data from a file, flattens it and writes to standard output",
            cmd: 'flatten input-file.json',
        },
        {
            name: "Reads data from a file, flattens it and writes output to another file",
            cmd: 'flatten input-file.json output-file.json'
        },
        {
            name: "Reads JSON data from standard input, flattens it and writes output to another file",
            cmd: 'command-that-produces-json | flatten - output-file.json'
        },
    ],
    notes: [
        "There is no reason to use this command with CSV data, because CSV data can't be nested. Use this command with JSON and YAML data.",
    ],
};
