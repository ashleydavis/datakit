import { inputData, outputData } from "../lib/io";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import { verifyInputArray } from "../lib/verify";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {

    const data = await inputData(argv);
    const { fn, details } = loadUserFn(argv, `record => transform(record)`);
    verifyInputArray(data, "map");

    const transformed = data.map((record: any) => invokeUserFn(() => fn(record), details));

    await outputData(argv, transformed);
}

export const documentation = {
    name: "map",
    desc: "Creates an output dataset by calling the transformer function on every record of the input dataset. Works just like `array.map` in JavaScript.",
    syntax: "map <input-file> <transformer-fn> [<output-file>]",
    inputs: standardCmdInputs,
    outputs: standardCmdOutputs,
    args: [
        standardInputFileHelp,
        {
            name: "transformer-fn",
            desc: "A JavaScript function to transform each record of the input dataset. Specifying a file name will load the JavaScript code from the file.",
        },
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, applies the transformation and writes to standard output",
            cmd: 'command-that-produces-json | map - "record => record.x"',
        },
        {
            name: "Reads data from a file, applies the transformation and writes to standard output",
            cmd: 'map input-file.csv "record => record.x"',
        },
        {
            name: "Reads data from a file, applies the transformation and writes output to another file",
            cmd: 'map input-file.csv "record => record.x" output-file.csv'
        },
        {
            name: "Loads a JavaScript file for the transformation",
            cmd: 'map input-file.csv my-transformation.js',
        },
    ],
};
