import { inputJson, outputJson } from "../lib/io";
import { loadUserFn } from "./lib/user-fn";
import { verifyInputArray } from "../lib/verify";
import { run } from "../lib/command";

export async function main(argv: string[]): Promise<void> {

    const transformFn = loadUserFn(argv, `r => transform(r)`);
    const data = await inputJson();
    verifyInputArray(data, "map");

    const transformed = data.map(transformFn as any);

    outputJson(transformed);
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
            desc: "A JavaScript function to transform each record of the input dataset. Specifying a file name will load the JavaScript from the file.",
        },
        {
            name: "output-file",
            desc: "The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes the output to written to standard output instead of a file.",
        }
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, applies the transformation and writes to standard output",
            cmd: 'command-that-produces-json | map - "r => r.x"',
        },
        {
            name: "Reads data from a file, applies the transformation and writes to standard output",
            cmd: 'map input-file.csv "r -> r.x"',
        },
        {
            name: "Reads data from a file, applies the transformation and writes output to another file",
            cmd: 'map input-file.csv "r -> r.x" output-file.csv'
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