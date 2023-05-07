import { inputData, outputData } from "../lib/io";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import { verifyInputArray } from "../lib/verify";
import { run } from "../lib/command";

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
    inputs: [
        "JSON file",
        "CSV file", 
        "Yaml file",
        "JSON formatted array on standard input.",
    ],
    outputs: [
        "JSON file",
        "CSV file", 
        "Yaml file",
        "JSON formatted array on standard output.",
    ],
    args: [
        {
            name: "input-file",
            desc: "Can be an input file name (json, csv or  yaml) or a hypen to indicate reading JSON data from standard input.",
        },
        {
            name: "transformer-fn",
            desc: "A JavaScript function to transform each record of the input dataset. Specifying a file name will load the JavaScript code from the file.",
        },
        {
            name: "output-file",
            desc: "The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes the output to written to standard output instead of a file.",
        }
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

if (require.main === module) {
    run(main, documentation);
}