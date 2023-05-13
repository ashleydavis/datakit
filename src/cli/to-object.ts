import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import { inputData, outputData } from "../lib/io";
import { verifyInputArray } from "../lib/verify";
import { run } from "../lib/command";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {

    const data = await inputData(argv);
    verifyInputArray(data, "to-object");

    const keySelectorFn = loadUserFn(argv, `r => r.key`);
    const valueSelectorFn = loadUserFn(argv, `r => r.value`);

    const reduced = data.reduce((a: any, r: any) => {
        const key = invokeUserFn(() => keySelectorFn.fn(r), keySelectorFn.details);
        const value = invokeUserFn(() => valueSelectorFn.fn(r), valueSelectorFn.details);
        a[key] = value;
        return a;
    }, {});

    await outputData(argv, reduced);
}

export const documentation = {
    name: "to-object",
    desc: "Creates a JSON object from key/value pairs extracted from the input dataset.",
    syntax: "to-object <input-file> <key-selector-fn> <value-selector-fn> [<output-file>]",
    inputs: standardCmdInputs,
    outputs: [
        "JSON file",
        "YAML file",
        "JSON formatted data on standard output.",
    ],
    args: [
        standardInputFileHelp,
        {
            name: "key-selector-fn",
            desc: "A JavaScript function to select the key from each record of the input dataset. Specifying a file name will load the JavaScript code from the file.",
        },
        {
            name: "value-selector-fn",
            desc: "A JavaScript function to select the value from each record of the input dataset. Specifying a file name will load the JavaScript code from the file.",
        },
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input and writes the JSON object to standard output",
            cmd: 'command-that-produces-json | to-object - "r => r.key" "r => r.value"',
        },
        {
            name: "Reads data from a file, applies the transformation and writes to standard output",
            cmd: 'to-object input-file.csv "r => r.key" "r => r.value"',
        },
        {
            name: "Reads data from a file, applies the transformation and writes output to another file",
            cmd: 'to-object input-file.csv "r => r.key" "r => r.value" output-file.json'
        },
        {
            name: "Loads JavaScript files for the key and value selector functions",
            cmd: 'to-object input-file.csv my-key-selector.js my-value-selector.js',
        },
    ],
    notes: [
        "Unlike many other datakit commands the to-object command cannot output to the CSV format."
    ],
};

if (require.main === module) {
    run(main, documentation);
}