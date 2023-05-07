import { inputJson, outputJson } from "../lib/io";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import { run } from "../lib/command";

async function main(argv: string[]): Promise<void> {

    const data = await inputJson(argv);
    const { fn, details } = loadUserFn(argv, `dataset => transform(dataset)`);

    const transformed = invokeUserFn(() => fn(data), details);

    outputJson(transformed);
}

export const documentation = {
    name: "transform",
    desc: "Transforms an entire dataset through a user defined function.",
    syntax: "transform <input-file> <transformer-fn> [<output-file>]",
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
            desc: "A JavaScript function to transform the input dataset. Specifying a file name will load the JavaScript code from the file.",
        },
        {
            name: "output-file",
            desc: "The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes the output to written to standard output instead of a file.",
        }
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, applies the transformation and writes to standard output",
            cmd: 'command-that-produces-json | transform - "dataset => transform(dataset)"',
        },
        {
            name: "Reads data from a file, applies the transformation and writes to standard output",
            cmd: 'transform input-file.csv "dataset => transform(dataset)"',
        },
        {
            name: "Reads data from a file, applies the transformation and writes output to another file",
            cmd: 'transform input-file.csv "dataset => transform(dataset)" output-file.csv'
        },
        {
            name: "Loads a JavaScript file for the transformation",
            cmd: 'transform input-file.csv my-transformation.js',
        },
    ],
};

if (require.main === module) {
    run(main, documentation);
}