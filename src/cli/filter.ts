import { inputData, outputData } from "../lib/io";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import { verifyInputArray } from "../lib/verify";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {
    
    const { fn, details } = loadUserFn(argv, `r => predicate(r)`);

    const data = await inputData(argv);
    verifyInputArray(data, "filter");

    const filtered = data.filter((record: any) => invokeUserFn(() => fn(record), details));

    await outputData(argv, filtered);
}

export const documentation = {
    name: "filter",
    desc: "Creates an output dataset by filtering the input dataset through the predicate function. Works just like `array.filter` in JavaScript.",
    syntax: "filter <predicate-fn> [<input-file>] [<output-file>]",
    inputs: standardCmdInputs,
    outputs: standardCmdOutputs,
    args: [
        {
            name: "predicate-fn",
            desc: "A JavaScript predicate function that is passed each record in the dataset and returns true/truthy to keep the record or false/falsy to rmeove the record. Specifying a file name will load the JavaScript code from the file.",
        },
        standardInputFileHelp,
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, applies the filter and writes to standard output",
            cmd: `command-that-produces-json | filter "record => record.id === '1234'"`,
        },
        {
            name: "Reads data from a file, applies the filter and writes to standard output",
            cmd: `filter "record => record.id === '1234'" input-file.csv`,
        },
        {
            name: "Reads data from a file, applies the filter and writes output to another file",
            cmd: `filter "record => record.id === '1234'"  input-file.csv output-file.csv`,
        },
        {
            name: "Reads JSON data from standard input, applies the filter and writes output to another file",
            cmd: `command-that-produces-json | filter "record => record.id === '1234'" - output-file.csv`,
        },
        {
            name: "Loads a JavaScript file for the filter function",
            cmd: `filter --file my-filter.js input-file.csv output-file.csv`,
        },
    ],
};
