import { inputData, outputData } from "../lib/io";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {

    const { fn, details } = loadUserFn(argv, `dataset => transform(dataset)`);

    const data = await inputData(argv);

    const transformed = invokeUserFn(() => fn(data), details);

    await outputData(argv, transformed);
}

export const documentation = {
    name: "transform",
    desc: "Transforms an entire dataset through a user defined function.",
    syntax: "transform <transformer-fn> [<input-file>] [<output-file>]",
    inputs: standardCmdInputs,
    outputs: standardCmdOutputs,
    args: [
        {
            name: "transformer-fn",
            desc: "A JavaScript function to transform the input dataset. Specifying a file name will load the JavaScript code from the file.",
        },
        standardInputFileHelp,
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, applies the transformation and writes to standard output",
            cmd: 'command-that-produces-json | transform "dataset => transform(dataset)"',
        },
        {
            name: "Reads data from a file, applies the transformation and writes to standard output",
            cmd: 'transform "dataset => transform(dataset)" input-file.csv',
        },
        {
            name: "Reads data from a file, applies the transformation and writes output to another file",
            cmd: 'transform "dataset => transform(dataset)" input-file.csv output-file.csv'
        },
        {
            name: "Reads JSON data from standard input, applies the transformation and writes output to a file",
            cmd: 'command-that-produces-json | transform "dataset => transform(dataset)" - output-file.csv'
        },
        {
            name: "Loads a JavaScript file for the transformation",
            cmd: 'transform --file my-transformation.js input-file.csv',
        },
    ],
};
